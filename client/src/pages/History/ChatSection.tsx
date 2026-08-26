import { Copy, ThumbsDown, ThumbsUp, Pencil, Check, X } from "lucide-react";
import "../../styles/history-page/ChatSection.css";
import type { Message } from "../../types/Chat";
import { useLayoutEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import aiResponseReaction from "../../api/aiResponseReaction";
import { containsArabic } from "../../utils/containsArabic";

type ChatSectionProps = {
  aiIsTyping: boolean;
  messages: Message[];
  editMessage: (msgId: number, newContent: string) => void;
  handleUpdateReaction: (promptId: number, reaction: string) => void;
};

export const ChatSection = ({
  aiIsTyping,
  messages,
  editMessage,
  handleUpdateReaction,
}: ChatSectionProps) => {
  const lastMessage = useRef<HTMLDivElement | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    setCopiedId(id);
    copyTimeout.current = setTimeout(() => setCopiedId(null), 3000);
  };

  const CopyButton = ({ id, content }: { id: number; content: string }) =>
    copiedId === id ? (
      <Check className="copy-check" />
    ) : (
      <Copy onClick={() => handleCopy(id, content)} />
    );

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
          {messages.map((prompt) => {
            const isArabic = containsArabic(prompt.content);
            return (
              <div
                dir="auto"
                key={prompt.id}
                className={`${isArabic ? "arabic" : "english"} rslt-${prompt.role}-prompt`}
              >
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
                      <button
                        className="edit-cancel-btn"
                        onClick={cancelEditing}
                      >
                        <X /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-4xl font-bold mt-8 mb-5 leading-tight">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="text-3xl font-semibold mt-7 mb-4 leading-tight">
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="text-2xl font-semibold mt-6 mb-3 leading-snug">
                            {children}
                          </h3>
                        ),

                        h4: ({ children }) => (
                          <h4 className="text-xl font-semibold mt-5 mb-2">
                            {children}
                          </h4>
                        ),

                        h5: ({ children }) => (
                          <h5 className="text-lg font-semibold mt-4 mb-2">
                            {children}
                          </h5>
                        ),

                        h6: ({ children }) => (
                          <h6 className="text-base font-semibold uppercase tracking-wide mt-4 mb-2 text-gray-400">
                            {children}
                          </h6>
                        ),

                        p: ({ children }) => (
                          <p className="text-base leading-8 mb-4 text-gray-100">
                            {children}
                          </p>
                        ),

                        strong: ({ children }) => (
                          <strong className="font-bold text-white">
                            {children}
                          </strong>
                        ),

                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),

                        ul: ({ children }) => (
                          <ul className="list-disc ps-6 my-4 space-y-2">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="list-decimal ps-6 my-4 space-y-2">
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => (
                          <li className="text-base leading-8 text-gray-100">
                            {children}
                          </li>
                        ),

                        hr: () => <hr className="my-8 border-slate-700" />,

                        blockquote: ({ children }) => (
                          <blockquote className="border-s-4 border-sky-500 bg-slate-900/40 ps-4 py-2 italic my-5 text-gray-300">
                            {children}
                          </blockquote>
                        ),

                        a: ({ ...props }) => (
                          <a
                            {...props}
                            className="text-sky-400 hover:text-sky-300 underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),

                        table: ({ children }) => (
                          <div className="overflow-x-auto my-6">
                            <table className="min-w-full border border-slate-700">
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead className="bg-slate-800">{children}</thead>
                        ),

                        tbody: ({ children }) => <tbody>{children}</tbody>,

                        tr: ({ children }) => (
                          <tr className="border-b border-slate-700">
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th className="border border-slate-700 px-4 py-2 text-start font-semibold">
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td className="border border-slate-700 px-4 py-2 align-top">
                            {children}
                          </td>
                        ),

                        img: ({ ...props }) => (
                          <img
                            {...props}
                            className="rounded-lg my-6 max-w-full h-auto"
                          />
                        ),

                        code({ className, children, ...props }) {
                          const isInline = !className;

                          return isInline ? (
                            <code
                              className="rounded bg-slate-800 px-1.5 py-1 text-sm text-emerald-300 font-mono"
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <code {...props}>{children}</code>
                          );
                        },

                        pre: ({ children }) => (
                          <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto my-6">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {prompt.content}
                    </ReactMarkdown>

                    {prompt.role === "user" && (
                      <div className="actions">
                        <Pencil onClick={() => startEditing(prompt)} />
                        <CopyButton id={prompt.id} content={prompt.content} />
                      </div>
                    )}
                    {prompt.role === "ai" && !aiIsTyping && (
                      <div className="actions">
                        <CopyButton id={prompt.id} content={prompt.content} />
                        <ThumbsUp
                          style={{
                            color:
                              prompt.reaction === "like"
                                ? "var(--c-orange)"
                                : "",
                          }}
                          onClick={async () => {
                            await aiResponseReaction(prompt.id, "like");
                            handleUpdateReaction(prompt.id, "like");
                          }}
                        />
                        <ThumbsDown
                          style={{
                            color:
                              prompt.reaction === "dislike"
                                ? "var(--c-orange)"
                                : "",
                          }}
                          onClick={async () => {
                            await aiResponseReaction(prompt.id, "dislike");
                            handleUpdateReaction(prompt.id, "dislike");
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
          {aiIsTyping && (
            <div className="typing">
              <div className="typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div className="mistakes-alert">
            RivzAI can make mistakes. Check Responses.
          </div>
          <div ref={lastMessage} className="dummy-msg"></div>
        </div>
      </div>
    </>
  );
};
