import { motion } from "framer-motion";
import "./index.css";

const ShowError = ({ message }: { message: string }) => {
  return (
    <motion.div
      className="error-component__container"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="error-component__icon-wrapper"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity }}
      >
        {/* SVG for alert icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="error-component__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="16" />
          <line x1="12" y1="8" x2="12" y2="10" />
        </svg>
      </motion.div>
      <motion.p
        className="error-component__message"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default ShowError;
