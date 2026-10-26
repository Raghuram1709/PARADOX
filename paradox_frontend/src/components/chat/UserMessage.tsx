import {motion} from "motion/react"

interface Props {
  message: string;
}

const UserMessage = ({ message }: Props,) => {
  

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7
      }}
      animate={{
        opacity: 1,
        scale:1
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping:20
      }}
      className="user-message">
      <p className="user-content">{message}</p>
    </motion.div>
  );
};

export default UserMessage;
