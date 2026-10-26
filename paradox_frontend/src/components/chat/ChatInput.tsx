import { useRef, useState, useLayoutEffect } from "react";
import { RiSendInsLine } from "react-icons/ri";
import "../../styles/chatinput.css";
import { sendMessage } from "../../features/chat/chatThunk";
import { useAppDispatch,} from "../../store/hooks";
import { PiixPal } from "piixpal/react";
const ChatInput = () => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const trimmedText = text.trim();
  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 200;

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend()
        }
  }

  const handleSend = async () => {
    if (trimmedText) {
      setText("")
      await dispatch(sendMessage(text))
      }
  }
  
  return (
    <div className="chatinput">
      {" "}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your idea..."
        rows={1}
        className="chatinput-textarea"
      />
      <PiixPal pal="peeper" scale={4} hue={30}/>
      <button
        className="chatinput-btn"
        type="button"
        aria-label="Send message"
        disabled={!trimmedText.length}
        onClick={handleSend}
      >
        <RiSendInsLine size={25} />
      </button>
    </div>
  );
};

export default ChatInput;
