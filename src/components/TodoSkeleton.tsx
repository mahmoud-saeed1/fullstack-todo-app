import { motion } from "framer-motion";

const TodoSkeleton = () => {
  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1">
        <motion.div
          className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"
          initial={{ width: "0%" }}
          animate={{ width: "80%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.div
          className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </div>

      <div className="flex items-center space-x-2">
        <motion.div
          className="w-12 h-9 bg-gray-300 rounded-md dark:bg-gray-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div
          className="w-12 h-9 bg-gray-300 rounded-md dark:bg-gray-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default TodoSkeleton;
