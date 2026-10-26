import { useEffect, useState } from "react";
import ChatInput from "./components/chat/ChatInput";
import ChatMessages from "./components/chat/ChatMessages";
import "./styles/chatmessage.css";
import "./styles/navbar.css";
import "./styles/collision.css";
import ChatHistory from "./components/ChatHistory";
import { useAppDispatch } from "./store/hooks";
import { clearActiveConversationId } from "./features/chat/conversationSlice";
import { motion } from "motion/react";


const App = () => {
  const [scrolled, setScroll] = useState(false);
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 30);

    }
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])
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
