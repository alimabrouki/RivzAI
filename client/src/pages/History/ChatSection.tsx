import {
  Copy,
  Download,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Pencil,
  Check,
  X,
} from "lucide-react";
import "../../styles/history-page/ChatSection.css";
import type { Message } from "../../types/Chat";
import { useLayoutEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { TypingMessage } from "./TypingMessage";

type ChatSectionProps = {
  aiIsTyping: boolean;
  messages: Message[];
  handleAiTyping: (state: boolean) => void;
  editMessage: (msgId: number, newContent: string) => void;
};

export const ChatSection = ({
  aiIsTyping,
  messages,
  editMessage,
}: ChatSectionProps) => {
  const lastMessage = useRef<HTMLDivElement | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const startEditing = (msg: Message) => {
    setEditingId(msg.id);
    setEditingContent(msg.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEditing = (msgId: number) => {
    if (!editingContent.trim()) return;
    editMessage(msgId, editingContent);
    setEditingId(null);
    setEditingContent("");
  };

  return (
    <>
      <div className="chat-section">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
            margin: "20px 0",
          }}
          className="chat-messages"
        >
          {messages.map((prompt) => (
            <div key={prompt.id} className={`rslt-${prompt.role}-prompt`}>
              {editingId === prompt.id ? (
                <div className="edit-mode">
                  <TextareaAutosize
                    className="edit-textarea"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    minRows={1}
                    maxRows={10}
                  />
                  <div className="edit-btns">
                    <button
                      className="edit-save-btn"
                      onClick={() => saveEditing(prompt.id)}
                    >
                      <Check /> Send
                    </button>
                    <button className="edit-cancel-btn" onClick={cancelEditing}>
                      <X /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {prompt.role === "ai" ? (
                    <TypingMessage onDone={() => {}} text={prompt.content} />
                  ) : (
                    <p>{prompt.content}</p>
                  )}
                  {prompt.role === "user" && (
                    <div className="actions">
                      <Pencil onClick={() => startEditing(prompt)} />
                      <Copy onClick={() => handleCopy(prompt.content)} />
                    </div>
                  )}
                  {prompt.role === "ai" && !prompt.animated && (
                    <div className="actions">
                      <Copy onClick={() => handleCopy(prompt.content)} />
                      <Download />
                      <ThumbsUp
                        style={{
                          color:
                            prompt.reaction === "like" ? "var(--c-orange)" : "",
                        }}
                        onClick={() => {
                          // markMessageAnimation(card.id, prompt.id, "like");
                        }}
                      />
                      <ThumbsDown
                        style={{
                          color:
                            prompt.reaction === "dislike"
                              ? "var(--c-orange)"
                              : "",
                        }}
                      />
                      <Share2 />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          {aiIsTyping && (
            <div className="typing">
              <div className="typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </div>
        <div ref={lastMessage} className="dummy-msg"></div>
      </div>
    </>
  );
};
