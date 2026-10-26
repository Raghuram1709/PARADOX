import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { motion, } from "motion/react";
import { setActiveConversation } from "../features/chat/conversationSlice";


const ChatHistory = () => {
  const [open, setOpen] = useState(false);
  const conversations = useAppSelector((state) => state.conversation.conversations);
  const activeConversationId = useAppSelector((state) => state.conversation.activeConversationId)
  
  const dispacth = useAppDispatch();
  
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -15
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }
    return (
      <>
        <motion.p
          whileTap={{
            scale: 0.95,
          }}
          whileHover={{
            scale: 1.02,
          }}
          onClick={() => setOpen(!open)}
          className="history-btn"
        >
          History
        </motion.p>
        {open && Object.keys(conversations).length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="conversation-list"
          >
            {Object.entries(conversations).map(([id, conversation]) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className={`conversation-item ${activeConversationId === id ? "active" : ""}`}
              >
                <p
                  onClick={() => {
                    dispacth(setActiveConversation(id));
                    console.log("id clicked:", id);
                  }}
                  className="item-title"
                >
                  {conversation.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </>
    );
};

export default ChatHistory;
