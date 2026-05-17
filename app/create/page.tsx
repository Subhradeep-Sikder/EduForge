import { redirect } from "next/navigation";
import { syncCurrentUser } from "@/lib/sync-user";
import AnimatedTitle from "@/components/AnimatedTitle";

const Page = async () => {
  try {
    const dbUser = await syncCurrentUser();
    if (!dbUser) {
      redirect("/");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    redirect("/");
  }
  //---------------------------------------------------------------------------

  return (
    <div className="min-h-screen  from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedTitle title="Create Your" subtitle="Lesson Plan" />
        {/* <LessonPlanForm /> */}
      </div>
    </div>
  );
};

export default Page;
