import { useEffect, useRef, useState } from "react";
import "../../styles/history-page/ChatPage.css";
import mathIcon from "../../assets/images/math-icon.svg";
import logo from "../../assets/images/logo.png";
import { PromptSection } from "./PromptSection";
import { ChatSection } from "./ChatSection";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, PanelLeftOpen } from "lucide-react";
import type { Chat, Message } from "../../types/Chat";
import openChat from "../../api/openChat";
import deleteChat from "../../api/deleteChat";
import updateMessage from "../../api/updateMessage";
import generateFirstAiResponse from "../../api/generateFirstAiResponse";
import { ChatSidebar } from "./ChatSidebar";

export const ChatPage = () => {
  const [chat, setChat] = useState<Chat>();
  const [isopen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [aiIsTyping, setAiIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const deletionAlert = useRef<HTMLDivElement | null>(null);
  const generationStarted = useRef(false);

  const handleTempUserMsg = (isTyping: string) => {
    const tempUserMsg = {
      id: Math.floor(performance.now() * 1000),
      content: isTyping,
      role: "user",
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setAiIsTyping(true);
  };

  const handleTempAiMsg = () => {
    const tempAiMsg = {
      id: Math.floor(performance.now() * 1000) + 1,
      content: "",
      role: "ai",
    };
    setMessages((prev) => [...prev, tempAiMsg]);
  };

  const removeTempAiMsg = () => {
    setMessages((prev) => [...prev.slice(0, -1)]);
  };

  const handleAiChunks = (chunk: string) => {
    setMessages((prev) => {
      const lastMsg = prev.at(-1)!;
      return [
        ...prev.slice(0, -1),
        {
          ...lastMsg,
          content: lastMsg.content + chunk,
        },
      ];
    });
    setAiIsTyping(false);
  };

  const handleUpdateReaction = (promptId: number, reaction: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === promptId
          ? {
              ...message,
              reaction: reaction === message.reaction ? null : reaction,
            }
          : message,
      ),
    );
  };

  const editMessage = async (msgId: number, newContent: string) => {
    const newMessage = await updateMessage(msgId, newContent);

    setMessages((prev) => prev.map((m) => (m.id === msgId ? newMessage : m)));
  };

  const handleError = (error: string, state: boolean) => {
    setError(error);
    setShowError(state);
  };

  const handleAiIsTyping = (bool: boolean) => {
    setAiIsTyping(bool);
  };

  const handleSidebarTrigger = () => {
    if (window.matchMedia("(max-width: 800px)").matches) {
      setIsSidebarOpen(true);
      return;
    }

    setIsSidebarCollapsed((current) => !current);
  };

  const handleSidebarToggle = () => {
    if (window.matchMedia("(max-width: 800px)").matches) {
      setIsSidebarOpen(false);
      return;
    }

    setIsSidebarCollapsed((current) => !current);
  };

  useEffect(() => {
    let ignore = false;
    generationStarted.current = false;

    async function loadChat() {
      const chat = await openChat(Number(chatId));

      if (ignore) return;

      setChat(chat);
      setMessages(chat.messages);
    }

    loadChat();
    // this clean up will run immediatly after initial render because of React Strict Mode
    // it will prevent the first effect's state update so first ai message chunks below can update the state safely without loadChat overwrite the state update
    return () => {
      ignore = true;
    };
  }, [chatId]);

  useEffect(() => {
    if (!chat) return;
    if (chat.id !== Number(chatId)) return;
    const hasUserMessage = chat.messages.some((m) => m.role === "user");
    const hasAiMessage = chat.messages.some((m) => m.role === "ai");

    if (!hasUserMessage || hasAiMessage) return;
    if (generationStarted.current) return;
    generationStarted.current = true;
    async function generate() {
      try {
        handleTempAiMsg();
        setAiIsTyping(true);
        await generateFirstAiResponse(Number(chatId), (chunk) => {
          handleAiChunks(chunk);
        });
      } catch {
        setError("Something went wrong. Please try again.");
        setShowError(true);
      }
    }

    void generate();
  }, [chat, chatId]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        deletionAlert.current &&
        !deletionAlert.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditingControl =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (e.key === "Delete" && !isEditingControl) {
        setIsOpen(!isopen);
      }
    };
    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [isopen]);

  if (!chat) {
    return (
      <div className="chat-loading">
        <Loader2 className="chat-loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>Chat</title>
      <div className="chat-page">
        {isopen && <div className="backdrop"></div>}
        {isSidebarOpen && (
          <button
            type="button"
            className="chat-sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close chat list"
          />
        )}
        {!isopen && isSidebarCollapsed && (
          <button
            type="button"
            className="chat-sidebar-collapsed-trigger"
            onClick={handleSidebarTrigger}
            aria-label="Open chat list"
          >
            <PanelLeftOpen size={22} />
          </button>
        )}
        {!isopen && !isSidebarOpen && (
          <button
            type="button"
            className="chat-sidebar-mobile-trigger"
            onClick={handleSidebarTrigger}
            aria-label="Open chat list"
          >
            <PanelLeftOpen size={22} />
          </button>
        )}
        <ChatSidebar
          activeChatId={Number(chatId)}
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={() => setIsSidebarOpen(false)}
          onToggle={handleSidebarToggle}
        />
        <main className="chat-workspace">
          <div className="chat-header">
            <img className="math-icon" src={mathIcon} alt="" />
            <div className="homework-title">{chat.title}</div>
            <div className="head-btns">
              <BsFillTrash3Fill
                className="delete-btn"
                onClick={() => setIsOpen(!isopen)}
              />
            </div>
            {isopen && (
              <div ref={deletionAlert} className="deletion-alert">
                {isDeleted ? (
                  <div className="alert-message deleted-message">
                    {chat.title} deleted
                  </div>
                ) : (
                  <>
                    <div className="alert-message">
                      Are You Sure You Want To Delete '{chat.title}' ?
                    </div>
                    <div className="alert-btns">
                      <button
                        onClick={async () => {
                          setIsDeleting(true);
                          await deleteChat(chat.id);
                          setIsDeleting(false);
                          setIsDeleted(true);
                          setTimeout(() => navigate("/history/"), 1500);
                        }}
                        className="yes-btn"
                        disabled={isDeleting}
                      >
                        {isDeleting ? <Loader2 className="spinner" /> : "Yes"}
                      </button>
                      <button
                        onClick={() => setIsOpen(!isopen)}
                        className="no-btn"
                      >
                        No
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <ChatSection
            handleUpdateReaction={handleUpdateReaction}
            aiIsTyping={aiIsTyping}
            messages={messages}
            editMessage={editMessage}
          />
          <PromptSection
            handleAiIsTyping={handleAiIsTyping}
            showError={showError}
            error={error}
            handleError={handleError}
            handleTempUserMsg={handleTempUserMsg}
            handleTempAiMsg={handleTempAiMsg}
            removeTempAiMsg={removeTempAiMsg}
            handleAiChunks={handleAiChunks}
            chatId={Number(chatId)}
          />
        </main>
      </div>
    </>
  );
};
