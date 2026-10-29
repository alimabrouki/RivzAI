import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
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
  handleTempUserMsg: (promptText: string) => void;
  handleError: (error: string, state: boolean) => void;
  showError: boolean;
  error: string;
  handleAiIsTyping: (bool: boolean) => void;
  removeTempAiMsg: () => void;
  loadChat: () => Promise<void>;
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
  removeTempAiMsg,
  loadChat,
}: PromptSectionProps) => {
  const [promptText, setPromptText] = useState("");
  const promptIn = useRef<HTMLTextAreaElement | null>(null);

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) return;

    const handleGlobalTyping = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditingControl =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (
        isEditingControl ||
        e.key.length !== 1 ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey
      ) {
        return;
      }

      e.preventDefault();
      promptIn.current?.focus();
      setPromptText((current) => current + e.key);
    };

    document.addEventListener("keydown", handleGlobalTyping);
    return () => document.removeEventListener("keydown", handleGlobalTyping);
  }, [isMobile]);

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  const submitPrompt = async () => {
    if (!promptText.trim() || !chatId) return;

    handleTempUserMsg(promptText);

    handleTempAiMsg();

    setPromptText("");

    try {
      await addMessage(chatId, promptText, (chunk) => {
        handleAiChunks(chunk);
      });
      loadChat();
    } catch {
      removeTempAiMsg();
      handleError("Something went wrong. Please try again.", true);
    } finally {
      handleAiIsTyping(false);
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
        value={promptText}
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
          style={{ background: promptText ? "var(--c-dark-orange" : "" }}
          className="submit-prompt"
        >
          <SendHorizonal />
        </button>
      </div>
    </div>
  );
};
