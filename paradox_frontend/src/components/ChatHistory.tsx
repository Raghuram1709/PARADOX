import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { motion, AnimatePresence } from "motion/react";
import { setActiveConversation } from "../features/chat/conversationSlice";
import { useNavigate } from "react-router-dom";

const ChatHistory = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const conversations = useAppSelector(
    (state) => state.conversation.conversations
  );

  const activeConversationId = useAppSelector(
    (state) => state.conversation.activeConversationId
  );

  const dispatch = useAppDispatch();

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.15,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.p
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setOpen((prev) => !prev)}
        className={`history-btn ${open ? "active": ""}`}
      >
        History
      </motion.p>

      <AnimatePresence>
        {open && Object.keys(conversations).length > 0 && (
          <motion.div
            key="conversation-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="conversation-list"
          >
            {Object.entries(conversations).map(([id, conversation]) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className={`conversation-item ${
                  activeConversationId === id ? "active" : ""
                }`}
              >
                <p
                  onClick={() => {
                    dispatch(setActiveConversation(id));
                    navigate(`/${id}`)
                  }}
                  className="item-title"
                >
                  {conversation.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatHistory;

