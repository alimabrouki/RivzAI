import "../../styles/home-page/PromptBox.css";
import { RecordAudio } from "../../features/input-output/RecordAudio";
import { SolveItBtn } from "../../features/SolveItBtn";
import { UploadFile } from "../../features/input-output/UploadFile";
import {
  useState,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import addChat from "../../api/addChat";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PromptBox = () => {
  const [textvalue, setTextValue] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleSubmit = async () => {
    if (!textvalue.trim()) {
      setShowWarning(true);
      return;
    }
    setLoading(true);
    try {
      const result = await addChat(textvalue);
      if (result.error) {
        setError("Something went wrong. Please try again.");
        setShowError(true);
        return;
      }
      setTextValue("");
      navigate(`/history/${result.id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      setError("Something went wrong. Please try again.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="prompt-box">
      {showWarning && (
        <div className="warning-popup">
          <AlertTriangle size={16} />
          <span>Please type something</span>
        </div>
      )}
      {showError && (
        <div className="error-popup">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}
      {loading && <div className="prompt-spinner" />}
      <div className="prompt-input-area">
        <textarea
          value={textvalue}
          onKeyDown={onKeyDown}
          onChange={handleTextArea}
          className={`prompt-input${showWarning ? " prompt-input-warning" : ""}`}
          placeholder="Put your homework here, and let's break it down together..."
        />
        <div className="formatted-prompts">
          <span>"Solve this problem"</span>
          <span>"Explain this chapter"</span>
          <span>"Correct my answer"</span>
        </div>
      </div>
      <div className="inputs">
        <div className="input-output">
          <UploadFile />
          <RecordAudio />
        </div>
        <div className="btns">
          <SolveItBtn submit={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};
