import { useEffect, useRef, useState } from "react";
import "../../styles/history-page/ChatPage.css";
import mathIcon from "../../assets/images/math-icon.svg";
import logo from "../../assets/images/logo.png";
import { PromptSection } from "./PromptSection";
import { ChatSection } from "./ChatSection";
import { BsFillArrowLeftCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { Chat, Message } from "../../types/Chat";
import openChat from "../../api/openChat";
import deleteChat from "../../api/deleteChat";
import updateMessage from "../../api/updateMessage";

type ChatPageProps = {
  closeChat: () => void;
  handleAiTyping: (state: boolean) => void;
  aiIsTyping: boolean;
  // deleteHistoryItem: (id: string) => void;
};

export const ChatPage = ({
  closeChat,
  handleAiTyping,
  aiIsTyping,
  // deleteHistoryItem,
}: ChatPageProps) => {
  const [chat, setChat] = useState<Chat>();
  const [isopen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { chatId } = useParams();
  const navigate = useNavigate();
  const deletionAlert = useRef<HTMLDivElement | null>(null);

  const handeMessagesChanged = (messages: Message[]) => {
    setMessages(messages);
  };

  const addAiMessage = () => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Number(crypto.randomUUID()),
          content:
            "You’re viewing a demo of RivzAI. The chat experience is under development and will be available soon.",
          role: "ai",
        },
      ]);
      handleAiTyping(false);
    }, 1500);
  };

  const editMessage = async (msgId: number, newContent: string) => {
    const newMessage = await updateMessage(msgId, newContent);

    setMessages((prev) => prev.map((m) => (m.id === msgId ? newMessage : m)));
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    async function loadChat() {
      const chat = await openChat(Number(chatId));
      setChat(chat);
      setMessages(chat.messages);
    }
    loadChat();
  }, [chatId]);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeChat();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChat]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
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
        <div className="wrapper">
          <div className="chat-header">
            <img className="math-icon" src={mathIcon} alt="" />
            <div className="homework-title">{chat.title}</div>
            <div className="head-btns">
              <BsFillTrash3Fill
                className="delete-btn"
                onClick={() => setIsOpen(!isopen)}
              />
              <BsFillArrowLeftCircleFill
                className="close-window"
                onClick={closeChat}
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
            aiIsTyping={aiIsTyping}
            messages={messages}
            handleAiTyping={handleAiTyping}
            editMessage={editMessage}
          />
          <PromptSection
            addAiMessage={addAiMessage}
            handeMessagesChanged={handeMessagesChanged}
            handleAiTyping={handleAiTyping}
            chatId={Number(chatId)}
          />
          <div className="mistakes-alert">
            RivzAI can make mistakes. Check Responses.
          </div>
        </div>
      </div>
    </>
  );
};
