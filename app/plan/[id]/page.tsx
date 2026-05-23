import MaxWidthWrapper from "@/components/common/MaxMidthWrapper";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react"
import Plan from "@/components/Plan";


const PlanPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    redirect("/");
  }

  const lessonPlan = await prisma.lessonPlan.findFirst({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
      sections: true,
    },
  });

  if (!lessonPlan) {
    redirect("/dashboard");
  }

  

  return (
    <MaxWidthWrapper >
       <Plan lessonPlan={lessonPlan}/>

    </MaxWidthWrapper>
  );
};

export default PlanPage;
