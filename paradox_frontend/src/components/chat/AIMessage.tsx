import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";

interface Props {
  message: string;
}

const AIMessage = ({ message }: Props) => {
  
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 20,
      }}
      className="ai-message"
    >
      {" "}
      <div className="ai-content">
        {" "}
        <ReactMarkdown>{message}</ReactMarkdown>{" "}
      </div>{" "}
    </motion.div>
  );
};

export default AIMessage;
