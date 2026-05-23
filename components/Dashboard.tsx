"use client";

import { useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "./ui/button";
import { Package, Settings } from "lucide-react";
import type { LessonPlan } from "@/generated/prisma/client";

const Dashboard = ({ lessonPlans }: { lessonPlans: LessonPlan[] }) => {
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [durationFilter, setDurationFilter] = useState<number | null>(null);

  const subjects = Array.from(new Set(lessonPlans.map((plan) => plan.subject)));
  const durations = Array.from(
    new Set(lessonPlans.map((plan) => plan.duration)),
  );

  const filteredPlans = lessonPlans.filter((plan) => {
    if (subjectFilter && plan.subject !== subjectFilter) return false;
    if (durationFilter && plan.duration !== durationFilter) return false;
    return true;
  });


  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Lesson Plans</h1>
      <div className="flex space-x-4 mb-6">
        <Select
          onValueChange={(value) =>
            setSubjectFilter(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subject</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setDurationFilter(value === "all" ? null : parseInt(value))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All duration</SelectItem>
            {durations.map((duration) => (
              <SelectItem key={duration} value={duration.toString()}>
                {duration} minutes
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link href="/subscription" className={buttonVariants()}>
          Manage Subscription
        </Link>
      </div>

      {filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 hover:scale-105">
                <Link href={`/plan/${plan.id}`} className="block h-full">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 h-40 flex flex-col justify-center items-center text-center hover:from-blue-100 hover:to-indigo-100 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300">
                    <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {plan.subject}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {plan.duration} minutes
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 bg-white dark:bg-slate-750 border-t border-slate-200 dark:border-slate-600">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          <p className="text-lg font-medium mb-2">No lesson plans found.</p>
          <p className="text-sm">Create your first lesson plan to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
