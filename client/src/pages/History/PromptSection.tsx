import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RecordAudio } from "../../features/input-output/RecordAudio";
import { UploadFile } from "../../features/input-output/UploadFile";
import { SendHorizonal } from "lucide-react";
import "../../styles/history-page/PromptSection.css";
import type { Message } from "../../types/Chat";
import type { ActionResult } from "../../types/ActionResult";

type PromptSectionProps = {
  handleAddMessage: (
    chatId: number,
    message: string,
  ) => Promise<ActionResult<Message>>;
  chatId: number;
  error: string;
  handleAiTyping: (state: boolean) => void;
};

export const PromptSection = ({
  handleAddMessage,
  chatId,
  error,
  handleAiTyping,
}: PromptSectionProps) => {
  const [isTyping, setIsTyping] = useState("");

  const promptIn = useRef<HTMLTextAreaElement | null>(null);

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(e.target.value);
  };

  const submitPrompt = async () => {
    if (!isTyping.trim() || !chatId) return;

    await handleAddMessage(chatId, isTyping);

    setIsTyping("");
    handleAiTyping(true);

    setTimeout(() => {}, 1500);
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
