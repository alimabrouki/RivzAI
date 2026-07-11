import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RecordAudio } from "../../features/input-output/RecordAudio";
import { UploadFile } from "../../features/input-output/UploadFile";
import { SendHorizonal } from "lucide-react";
import "../../styles/history-page/PromptSection.css";
import addMessage from "../../api/addMessage";

type PromptSectionProps = {
  chatId: number;
  handleAiTyping: (state: boolean) => void;
};

export const PromptSection = ({
  chatId,
  handleAiTyping,
}: PromptSectionProps) => {
  const [isTyping, setIsTyping] = useState("");
  const [error, setError] = useState("");
  const promptIn = useRef<HTMLTextAreaElement | null>(null);

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(e.target.value);
  };

  const submitPrompt = async () => {
    if (!isTyping.trim() || !chatId) return;

    const result = await addMessage(chatId, isTyping);
    if (result.error) {
      setError(result.error);
    }
    setIsTyping("");
    handleAiTyping(true);

    // setTimeout(() => {}, 1500);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      if (isMobile) {
        return;
      } else {
        e.preventDefault();
        submitPrompt();
      }
    }
  };

  const focusPrompt = () => {
    promptIn.current?.focus();
  };
  return (
    <div className="prompt-section" onClick={focusPrompt}>
      <TextareaAutosize
        onKeyDown={onKey}
        value={isTyping}
        onChange={handleTextarea}
        ref={promptIn}
        className="prompt-in"
        minRows={1}
        maxRows={10}
        name=""
        id=""
        placeholder="Ask RivzAI"
      />
      <div className="prompt-btns">
        <RecordAudio />
        <UploadFile />
        <button
          onClick={submitPrompt}
          style={{ background: isTyping ? "var(--c-dark-orange" : "" }}
          className="submit-prompt"
        >
          {error && <p>{error}</p>}
          <SendHorizonal />
        </button>
      </div>
    </div>
  );
};
