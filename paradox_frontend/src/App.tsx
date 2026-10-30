import { useEffect, useState } from "react";
import ChatInput from "./components/chat/ChatInput";
import ChatMessages from "./components/chat/ChatMessages";
import "./styles/chatmessage.css";
import "./styles/navbar.css";
import "./styles/collision.css";
import ChatHistory from "./components/ChatHistory";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { clearActiveConversationId } from "./features/chat/conversationSlice";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { initiateSessionId, loadConversation } from "./features/chat/chatThunk";

const App = () => {
  const [scrolled, setScroll] = useState(false);

  const { conversationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sessionId = useAppSelector((state) => state.conversation.sessionId);
  
 
useEffect(() => {
  if (!sessionId) {
    dispatch(initiateSessionId());
  }
}, [sessionId, dispatch]);

useEffect(() => {
  if (sessionId && conversationId) {
    dispatch(loadConversation(sessionId, conversationId));
  }
}, [sessionId, conversationId, dispatch]);

useEffect(() => {
  const handleScroll = () => {
    setScroll(window.scrollY > 30);
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


  return (
    <>
      <nav className={scrolled ? "navbar scrolled": "navbar"}>
        <h1 className="title">PARADOX</h1>
        
        <div className="nav-right">
          <motion.p
            whileTap={{
              scale:0.95
            }}
            whileHover={{
              scale:1.02
            }}
            className="new-chat" onClick={() => {
              dispatch(clearActiveConversationId());
              navigate("/");
          }}>New Chat</motion.p>
          <ChatHistory />
        </div>
        
      </nav>
      <div className="ai-chat">
        <div className="chat-messages">
          <ChatMessages />
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default App;
;
