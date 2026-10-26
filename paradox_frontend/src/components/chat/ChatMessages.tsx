import { useEffect, useRef } from 'react'
import { useAppSelector } from '../../store/hooks'
import UserMessage from './UserMessage'
import AIMessage from './AIMessage'
import "../../styles/chatmessage.css"

const ChatMessages = () => {

  const conversation = useAppSelector((state) => state.conversation);
  const conversations = conversation.conversations;
  const activeConversationId = conversation.activeConversationId;
 
  const messages = activeConversationId
    ? (conversations?.[activeConversationId]?.messages ?? [])
    : [];
  
  const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [messages]);
    
  return (
    <div className="chat-container">
      <div className="messages-wrapper">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <UserMessage
              key={`${activeConversationId}-${index}`}
              message={message.content}
            />
          ) : (
            <AIMessage
              key={`${activeConversationId}-${index}`}
              message={message.content}
              
            />
          ),
        )}
        <div className="scroll-bottom-space" />
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ChatMessages
