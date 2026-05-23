"use client"
// Client-side component for displaying lesson plan details

import { LessonPlan, Section } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layout } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Button } from "./ui/button";

// Type that includes lesson plan with all its sections
interface PlanWithSections extends LessonPlan {
  sections: Section[];
}

// Component to display a single lesson plan with expandable sections
const Plan = ({lessonPlan}:{lessonPlan:PlanWithSections}) => {
  // Track which section is currently expanded
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Toggle section expanded state
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Animation for expanding/collapsing sections
  const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  // Animation for tags
  const tagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Top-right button for layout options */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
      >
        <Layout className="h-4 w-4 text-slate-700 dark:text-slate-300" />
      </Button>

      <motion.div
        className="max-w-5xl mx-auto py-8 px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with lesson info */}
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-emerald-600 dark:to-teal-700 rounded-xl shadow-lg p-6 md:p-8 mb-8"
          variants={itemVariants}
        >
          {/* Main subject title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{lessonPlan.subject}</h1>

          {/* Tags showing student level, topic, and subtopic */}
          <div className="flex flex-wrap gap-3">
            <motion.span
              className="bg-white/15 dark:bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 dark:border-white/20"
              variants={tagVariants}
            >
              {lessonPlan.studentLevel}
            </motion.span>
            <motion.span
              className="bg-white/15 dark:bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 dark:border-white/20"
              variants={tagVariants}
            >
              {lessonPlan.topic}
            </motion.span>
            <motion.span
              className="bg-white/15 dark:bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 dark:border-white/20"
              variants={tagVariants}
            >
              {lessonPlan.subtopic}
            </motion.span>
          </div>
        </motion.div>

        {/* Lesson sections */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lessonPlan.sections && lessonPlan.sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-emerald-900/30 transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50"
            >
              {/* Section header - clickable to expand */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="text-left">
                  {/* Section title */}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  {/* Duration display */}
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {section.duration} minutes
                  </span>
                  {/* Chevron icon that rotates when expanded */}
                  <motion.div
                    animate={{
                      rotate: expandedSection === section.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </motion.div>
                </div>
              </button>

              {/* Section content - shown when expanded */}
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <div className="px-6 py-4 bg-emerald-50 dark:bg-emerald-950/40">
                      {/* Section content text */}
                      <p className="text-emerald-900 dark:text-emerald-100 leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info - objective and total duration */}
        <motion.div
          className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Lesson Objective
          </h3>
          {/* Objective description */}
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{lessonPlan.objective}</p>
          {/* Total duration */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Duration: {lessonPlan.duration} minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Plan;


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
      >
        <Layout className="h-4 w-4 text-slate-700 dark:text-slate-300" />
      </Button>

      <motion.div
        className="max-w-5xl mx-auto py-8 px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-emerald-600 dark:to-teal-700 rounded-xl shadow-lg p-6 md:p-8 mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{lessonPlan.subject}</h1>

          <div className="flex flex-wrap gap-3">
            <motion.span
              className="bg-white/15 dark:bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 dark:border-white/20"
              variants={tagVariants}
            >
              {lessonPlan.studentLevel}
            </motion.span>
            <motion.span
              className="bg-white/15 dark:bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 dark:border-white/20"
              variants={tagVariants}
            >
              {lessonPlan.topic}
            </motion.span>
            <motion.span
              className="bg-white/15 dark:bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold text-sm border border-white/30 dark:border-white/20"
              variants={tagVariants}
            >
              {lessonPlan.subtopic}
            </motion.span>
          </div>
        </motion.div>

        {/* Sections */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lessonPlan.sections && lessonPlan.sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-emerald-900/30 transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {section.duration} minutes
                  </span>
                  <motion.div
                    animate={{
                      rotate: expandedSection === section.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <div className="px-6 py-4 bg-emerald-50 dark:bg-emerald-950/40">
                      <p className="text-emerald-900 dark:text-emerald-100 leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 md:p-8 border border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Lesson Objective
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{lessonPlan.objective}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Duration: {lessonPlan.duration} minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Plan;