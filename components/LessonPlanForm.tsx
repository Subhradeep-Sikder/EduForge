"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  Target,
  BookmarkIcon,
  Sparkles,
  GraduationCap,
  Loader2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { subtopics, topics, durations, studentLevels } from "@/constants";
import { toast } from "sonner";
import { form, object, sub } from "framer-motion/client";
import { containerVariants, itemVariants } from "@/lib/animations";

const LessonPlanForm = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: "",
    subtopic: "",
    duration: "",
    studentLevel: "",
    objective: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [customTopic, setCustomTopic] = useState<string>("");
  const [customSubtopic, setCustomSubtopic] = useState<string>("");

  const handleNext = () => {
    if (isStepValid(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleInputChange = (field: string, value: string) => {
    if (field === "objective") {
      setIsLoading(false);
    }

    if (field === "topic") {
      setCustomTopic("");
      setFormData({
        ...formData,
        topic: value,
        subtopic: "",
      });
    } else if (field === "subtopic") {
      setCustomSubtopic("");
      setFormData({ ...formData, subtopic: value });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleCustomTopicChange = (value: string) => {
    setCustomSubtopic(value);
    setFormData({ ...formData, topic: "", subtopic: "" });
    setCustomSubtopic("");
  };

  const handleCustomSubtopicChange = (value: string) => {
    setCustomSubtopic(value);
    setFormData({ ...formData, subtopic: "" });
  };

  const clearTopic = () => {
    setFormData({ ...formData, topic: "", subtopic: "" });
    setCustomSubtopic("");
    setCustomTopic("");
  };

  const clearSubtopic = () => {
    setFormData({ ...formData, subtopic: "" });
    setCustomSubtopic("");
  };

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return isSubscribed
          ? customTopic !== "" || formData.topic !== ""
          : formData.topic !== "";
      case 2:
        return isSubscribed
          ? (customTopic !== "" && customSubtopic !== "") ||
              (formData.topic !== "" && formData.subtopic !== "")
          : formData.subtopic !== "";
      case 3:
        return formData.duration !== "";
      case 4:
        return formData.studentLevel !== "";
      case 5:
        return formData.objective !== "";
      default:
        return false;
    }
  };

  const isFormComplete = () => {
    const { topic, subtopic, duration, studentLevel, objective } = formData;

    let result;

    if (isSubscribed) {
      result =
        ((customTopic !== "" && customSubtopic !== "") ||
          (topic !== "" && subtopic !== "")) &&
        duration !== "" &&
        studentLevel !== "" &&
        objective !== "";
    } else {
      result =
        topic !== "" &&
        subtopic !== "" &&
        duration !== "" &&
        studentLevel !== "" &&
        objective !== "";
    }

    return result;
  };

  useEffect(() => {
    if (formData.topic && subtopics[formData.topic as keyof typeof subtopics]) {
      setFormData((prev) => ({
        ...prev,
        subtopic: "",
      }));
    }
  }, [formData.topic]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key={"step1"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center mb-4"
              variants={itemVariants}
            >
              <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold">Select Topic</h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              {isSubscribed && (
                <div className="space-y-4 mb-4">
                  <Input
                    placeholder="Enter custom topic"
                    value={customTopic}
                    // FIXED: Changed from handleCustomSubtopicChange to handleCustomTopicChange
                    onChange={(e) => handleCustomTopicChange(e.target.value)}
                    className="w-full"
                    disabled={formData.topic !== ""}
                  />
                  <p className="text-sm text-gray-500">
                    Or choose from predefined topics
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Select
                  onValueChange={(value) => handleInputChange("topic", value)}
                  name="topic"
                  value={formData.topic}
                >
                  <SelectTrigger
                    className="w-full"
                    disabled={customSubtopic !== ""}
                  >
                    <SelectValue placeholder="choose a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isSubscribed && formData.topic && (
                  <Button
                    variant="outline"
                    className="ml-2 text-sm"
                    onClick={clearTopic}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key={"step2"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center mb-4"
              variants={itemVariants}
            >
              <BookmarkIcon className="w-6 h-6 mr-2 text-indigo-500" />
              <h2 className="text-2xl font-bold">Select Subtopic</h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              {isSubscribed && customTopic !== "" && (
                <div className="space-y-4 mb-4">
                  <Input
                    placeholder="Enter custom subtopic"
                    value={customSubtopic}
                    onChange={(e) => handleCustomSubtopicChange(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
              {(isSubscribed && customTopic === "") || !isSubscribed ? (
                <div className="flex items-center space-x-2">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("subtopic", value)
                    }
                    value={formData.subtopic}
                    name="subtopic"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="choose a subtopic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subtopics[formData.topic as keyof typeof subtopics]?.map(
                        (subtopic) => (
                          <SelectItem key={subtopic} value={subtopic}>
                            {subtopic}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  {isSubscribed && formData.subtopic && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={clearSubtopic}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key={"step3"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center mb-4"
              variants={itemVariants}
            >
              <Clock className="w-6 h-6 mr-2 text-green-500" />
              <h2 className="text-2xl font-bold">Select Duration</h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select
                name="duration"
                onValueChange={(value) => handleInputChange("duration", value)}
                value={formData.duration}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="choose a duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key={"step4"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center mb-4"
              variants={itemVariants}
            >
              <GraduationCap className="w-6 h-6 mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold">Select Student level</h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select
                name="studentLevel"
                onValueChange={(value) =>
                  handleInputChange("studentLevel", value)
                }
                value={formData.studentLevel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="choose the students level" />
                </SelectTrigger>
                <SelectContent>
                  {studentLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key={"step5"}
            initial="hidden"
            animate="visible"
            exit={"exit"}
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center mb-4"
              variants={itemVariants}
            >
              <Target className="w-6 h-6 mr-2 text-purple-500" />
              <h2 className="text-2xl font-bold">Enter lesson objective</h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                placeholder="Enter the lesson objective (max 100 characters)"
                max={100}
                value={formData.objective}
                onChange={(e) => handleInputChange("objective", e.target.value)}
                className="w-full"
                name="objective"
              />
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const fromDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      fromDataToSubmit.append(key, value);
    });

    if (isSubscribed) {
      if (customTopic) fromDataToSubmit.set("topic", customTopic);
      if (customSubtopic) fromDataToSubmit.set("subtopic", customSubtopic);
    }
    console.log("Form Data:", Object.fromEntries(fromDataToSubmit.entries()));

    try {
      //make logic to submit the form
    } catch (error) {
    } 
  };

  const renderLoadingAnimation = () => {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950/95"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Loader2 className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-slate-950 dark:text-slate-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Create Your Lesson Plan
            </motion.h2>

            <motion.p
              className="max-w-sm text-sm leading-6 text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              Our AI is working its magic to create the perfect lesson plan for you!
            </motion.p>
          </div>

          <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <Card className="relative overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />{" "}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Lesson Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full mx-1 ${
                  i <= step ? "bg-indigo-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          <motion.div className="mt-6" initial="hidden" animate="visible">
            {step < 5 ? (
              <div className="flex items-center justify-between">
                <div>
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={handlePrev}
                      variant="outline"
                    >
                      Previous
                    </Button>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid(step)}
                >
                  Next
                </Button>
              </div>
            ) : (
              <motion.div className="grid grid-cols-3 items-center">
                <div className="justify-self-start">
                  <Button type="button" onClick={handlePrev} variant="outline">
                    Previous
                  </Button>
                </div>
                <div className="justify-self-center">
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 "
                    disabled={!isFormComplete() || isLoading}
                  >
                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                    Generate Lesson Plan
                  </Button>
                </div>
                <div />
              </motion.div>
            )}
          </motion.div>
        </CardContent>
        <AnimatePresence>
          {isLoading && renderLoadingAnimation()}
        </AnimatePresence>
      </form>
    </Card>
  );
};

export default LessonPlanForm;
