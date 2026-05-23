import { redirect } from "next/navigation";
import { syncCurrentUser } from "@/lib/sync-user";
import AnimatedTitle from "@/components/AnimatedTitle";
import LessonPlanForm from "@/components/LessonPlanForm";
import { BookOpen, Clock, Target } from "lucide-react";

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

  return (
    <div className="min-h-screen from-purple-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedTitle title="Create Your" subtitle="Lesson Plan" />
        <LessonPlanForm isSubscribed={true} />

        {/* Features Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Diverse Topics Card */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="mb-4 p-3 rounded-full bg-blue-100 dark:bg-blue-950">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Diverse Topics
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choose from a wide range of subjects
              </p>
            </div>

            {/* Flexible Duration Card */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="mb-4 p-3 rounded-full bg-blue-100 dark:bg-blue-950">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Flexible Duration
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Set the perfect length for your lesson
              </p>
            </div>

            {/* Clear Objectives Card */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="mb-4 p-3 rounded-full bg-blue-100 dark:bg-blue-950">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Clear Objectives
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Define specific goals for each lesson
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

