"use client";
import { motion } from "framer-motion";

const AnimatedTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

        className="text-center mb-8"
        >
        
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        {title} {""}
        <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            {subtitle}
        </span>
      </h1>
      <p className="text-lg text-gray-600 mt-2">{subtitle}</p>
    </motion.div>
  );
};

export default AnimatedTitle;