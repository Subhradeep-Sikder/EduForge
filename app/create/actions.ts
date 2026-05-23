"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";



const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const lessonPlanSchema = z.object({
  topic: z.string(),
  subtopic: z.string(),
  duration: z.string(),
  studentLevel: z.string(),
  objective: z.string(),
  sections: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
      duration: z.string(),
    })
  ),
});

const lessonPlanJsonSchema = {
  description: "A detailed lesson plan with sections",
  type: "object",
  properties: {
    topic: { type: "string" },
    subtopic: { type: "string" },
    duration: { type: "string" },
    studentLevel: { type: "string" },
    objective: { type: "string" },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          duration: { type: "string" },
        },
        required: ["title", "content", "duration"],
      },
    },
  },
  required: ["topic", "subtopic", "duration", "studentLevel", "objective", "sections"],
};




export async function CreateLessonPlan(formData: FormData) {
    const topic = formData.get("topic");
    const subtopic = formData.get("subtopic");
    const duration = formData.get("duration");
    const studentlevel = formData.get("studentlevel");
    const objectives = formData.get("objectives");

    try {
      const { userId: clerkUserId } = await auth();

      if (!clerkUserId) {
        throw new Error("User not authenticated");
      }

      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: clerkUserId,
        },
      });

      if (!user) {
        throw new Error("User not found in database");
      }
    
    const systemPrompt = "You are an expert curriculum designer specializing in creating engaging and effective lesson plans for students. Your task is to create a detailed lesson plan based on the provided topic, subtopic, duration, student level, and objectives. The lesson plan should be structured with clear sections, each containing a title, content description, and allocated time. Ensure that the lesson plan is comprehensive and tailored to the specified student level. IMPORTANT: You must respond with valid JSON only, following this exact structure: {\"topic\": string, \"subtopic\": string, \"duration\": string, \"studentLevel\": string, \"objective\": string, \"sections\": [{\"title\": string, \"content\": string, \"duration\": string}]}";

    const userPrompt = `Create a lesson plan for ${topic} with the subtopics ${subtopic} with duration of ${duration} minutes for ${studentlevel} students with the objective of ${objectives}. The sections of the lesson plan should have a duration but the sum of all section duration should not exceed ${duration} minutes. Respond with JSON only.`;

    const model = geminiClient.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 1,
      },
    });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n${userPrompt}`,
            },
          ],
        },
      ],
    });

    const textContent = response.response.candidates?.[0]?.content?.parts?.[0]?.text;
    let lessonPlan;

    if (!textContent) {
      throw new Error("Failed to get response from Gemini");
    }

    try {
      let cleanedContent = textContent.trim();

      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.replace(/^```json\n?/, "").replace(/\n?```$/, "");
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.replace(/^```\n?/, "").replace(/\n?```$/, "");
      }

      lessonPlan = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", textContent, parseError);
      throw new Error("Failed to parse lesson plan from response");
    }

if (!lessonPlan) {
    throw new Error("Failed to create lesson plan from response");
}

const validatedPlan = lessonPlanSchema.parse(lessonPlan);

console.log("✓ Plan validated successfully:", validatedPlan);

const lessonPlanDB = await prisma.lessonPlan.create({
  data: {
    title: validatedPlan.topic,
    subject: validatedPlan.subtopic,
    topic: validatedPlan.topic,
    subtopic: validatedPlan.subtopic,
    duration: parseInt(validatedPlan.duration, 10),
    objective: validatedPlan.objective,
    studentLevel: validatedPlan.studentLevel,
    userId: user.id,
    sections: {
      create: validatedPlan.sections.map((section) => ({
        title: section.title,
        content: section.content,
        duration: parseInt(section.duration, 10),
      })),
    },
  },
});

console.log("✓ Lesson plan saved to database:", lessonPlanDB.id);

revalidatePath("/dashboard");
console.log("✓ Dashboard cache revalidated");
return { success: true };

    } catch (error) {
        console.error("❌ Error creating lesson plan:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
        return { success: false };
    }
}