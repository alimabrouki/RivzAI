import { useEffect, useRef, useState } from "react";
import "../../styles/history-page/ChatPage.css";
import mathIcon from "../../assets/images/math-icon.svg";
import logo from "../../assets/images/logo.png";
import { PromptSection } from "./PromptSection";
import { ChatSection } from "./ChatSection";
import { BsFillArrowLeftCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import type { Chat, Message } from "../../types/Chat";
import openChat from "../../api/openChat";

type ChatPageProps = {
  closeChat: () => void;
  markMessageAnimation: (
    cardId: string,
    msgId: string,
    reactionType?: "like" | "dislike" | null,
  ) => void;
  handleAiTyping: (state: boolean) => void;
  aiIsTyping: boolean;
  // deleteHistoryItem: (id: string) => void;
};

export const ChatPage = ({
  closeChat,
  markMessageAnimation,
  handleAiTyping,
  aiIsTyping,
  // deleteHistoryItem,
}: ChatPageProps) => {
  const [chat, setChat] = useState<Chat>();
  const [isopen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { chatId } = useParams();
  const deletionAlert = useRef<HTMLDivElement | null>(null);

  const handeMessagesChanged = (messages: Message[]) => {
    setMessages(messages);
  };

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
    // return <Navigate to={"/history/"} replace />;
    return <p>loading...</p>;
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
                <div className="alert-message">
                  Are You Sure You Want To Delete '{chat.title}' ?
                </div>
                <div className="alert-btns">
                  <button
                    // onClick={() => deleteHistoryItem(clickedChat.id)}
                    className="yes-btn"
                  >
                    Yes
                  </button>
                  <button onClick={() => setIsOpen(!isopen)} className="no-btn">
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
          <ChatSection
            aiIsTyping={aiIsTyping}
            messages={messages}
            markMessageAnimation={markMessageAnimation}
            handleAiTyping={handleAiTyping}
          />
          <PromptSection
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
