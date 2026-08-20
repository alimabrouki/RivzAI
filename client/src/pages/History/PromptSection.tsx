import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RecordAudio } from "../../features/input-output/RecordAudio";
import { UploadFile } from "../../features/input-output/UploadFile";
import { SendHorizonal, AlertTriangle } from "lucide-react";
import "../../styles/history-page/PromptSection.css";
import addMessage from "../../api/addMessage";

type PromptSectionProps = {
  chatId: number;
  handleTempAiMsg: () => void;
  handleAiChunks: (chunk: string) => void;
  handleTempUserMsg: (isTyping: string) => void;
  handleError: (error: string, state: boolean) => void;
  showError: boolean;
  error: string;
  handleAiIsTyping: (bool: boolean) => void;
};

export const PromptSection = ({
  chatId,
  handleTempAiMsg,
  handleError,
  showError,
  error,
  handleAiIsTyping,
  handleAiChunks,
  handleTempUserMsg,
}: PromptSectionProps) => {
  const [isTyping, setIsTyping] = useState("");
  const promptIn = useRef<HTMLTextAreaElement | null>(null);

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(e.target.value);
  };

  const submitPrompt = async () => {
    if (!isTyping.trim() || !chatId) return;

    handleTempUserMsg(isTyping);

    handleTempAiMsg();

    setIsTyping("");

    try {
      await addMessage(chatId, isTyping, (chunk) => {
        handleAiChunks(chunk);
      });
    } catch {
      handleAiIsTyping(false);
      handleError("Something went wrong. Please try again.", true);
    }
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
      {showError && (
        <div className="error-popup">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}
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
          <SendHorizonal />
        </button>
      </div>
    </div>
  );
};
