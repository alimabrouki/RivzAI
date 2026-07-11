// import { useEffect, useLayoutEffect, useRef } from "react";
import { Copy, Download, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
// import { TypingMessage } from "./TypingMessage";
import "../../styles/history-page/ChatSection.css";
import type {
  //  Chat,
  Message,
} from "../../types/Chat";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import openChat from "../../api/openChat";

type ChatSectionProps = {
  markMessageAnimation: (
    cardId: string,
    msgId: string,
    reactionType?: "like" | "dislike" | null,
  ) => void;
  aiIsTyping: boolean;

  handleAiTyping: (state: boolean) => void;
};

export const ChatSection = ({
  // markMessageAnimation,
  aiIsTyping,
  // clickedChat,
  // handleAiTyping,
}: ChatSectionProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { chatId } = useParams();
  const lastMessage = useRef<HTMLDivElement | null>(null);

  // const aiMessage = messages.findLast((msg) => msg.role === "ai");

  useEffect(() => {
    if (!chatId) return;
    const loadChat = async () => {
      const chat = await openChat(Number(chatId));
      setMessages(chat.messages);
    };
    loadChat();
  }, [chatId]);

  useLayoutEffect(() => {
    lastMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  // useEffect(() => {
  //   if (!clickedChat) return;
  //   if (clickedChat.messages.length === 1) {
  //     handleAiTyping(true);
  //     const timeout = setTimeout(() => {
  //       addMessage(clickedChat.id, {
  //         id: crypto.randomUUID(),
  //         role: "ai",
  //         content:
  //           "You’re viewing a demo of RivzAI. The chat experience is under development and will be available soon.",
  //         animated: true,
  //         reaction: null,
  //       });
  //     }, 1500);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [clickedChat, handleAiTyping]);
  console.log(messages);
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
              {/* {prompt === aiMessage && prompt.animated ? (
                <TypingMessage
                  text={prompt.content}
                  // onDone={() => markMessageAnimation(card.id, prompt.id)}
                />
              ) : ( */}
              <p>{prompt.content}</p>
              {/* )} */}
              {prompt.role === "ai" && !prompt.animated && (
                <div className="actions">
                  <Copy />
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
                        prompt.reaction === "dislike" ? "var(--c-orange)" : "",
                    }}
                    // onClick={() => {
                    //   markMessageAnimation(card.id, prompt.id, "dislike");
                    // }}
                  />
                  <Share2 />
                </div>
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
        {/* <div ref={lastMessage} className="dummy-msg"></div> */}
      </div>
    </>
  );
};
