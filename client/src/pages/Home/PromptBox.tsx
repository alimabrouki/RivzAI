import "../../styles/home-page/PromptBox.css";
import { RecordAudio } from "../../features/input-output/RecordAudio";
import { SolveItBtn } from "../../features/SolveItBtn";
import { UploadFile } from "../../features/input-output/UploadFile";
import { SelectOptions } from "../../features/select-options/SelectOptions";
import { MultiStepBtn } from "../../features/MultiStepBtn";
import {
  useState,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import addChat from "../../api/addChat";
import { AlertTriangle } from "lucide-react";

type PromptBoxProps = {
  openClickedChat: (id: number) => void;
};

export const PromptBox = ({ openClickedChat }: PromptBoxProps) => {
  const [textvalue, setTextValue] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const handleSubmit = async () => {
    if (!textvalue.trim()) {
      setShowWarning(true);
      return;
    }
    try {
      const result = await addChat(textvalue);
      if (result.error) {
        setError(result.error);
        return;
      }
      setTextValue("");

      openClickedChat(result.id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      setError("Something went wrong. Please try again.");
    }
  };

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        handleTextArea(e as unknown as ChangeEvent<HTMLTextAreaElement>);
      }
      if (isMobile) {
        return;
      } else {
        e.preventDefault();
        handleSubmit();
      }
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
      <textarea
        value={textvalue}
        onKeyDown={onKeyDown}
        onChange={handleTextArea}
        name=""
        id=""
        className={`prompt-input${showWarning ? " prompt-input-warning" : ""}`}
        placeholder="Put your homework here, and let's break it down together..."
      />
      <div className="inputs">
        <div className="input-output">
          <UploadFile />
          <RecordAudio />
        </div>
        <SelectOptions />
        <div className="btns">
          <MultiStepBtn />
          {error && <p>{error}</p>}
          <SolveItBtn submit={() => handleSubmit()} />
        </div>
      </div>
      <div className="formatted-prompts">
        <span>“Solve this problem”</span>
        <span>“Explain this chapter”</span>
        <span>“Correct my answer”</span>
      </div>
    </div>
  );
};
