import { memo, useState } from "react";
import { getRelativeTime } from "../../utils/getRelativeTime";
import "../../styles/history-page/HomeworkCards.css";
import { MoveRight } from "lucide-react";
import type { Chat } from "../../types/Chat";

type ChatsProps = {
  openClickedChat: (id: number) => void;
  chats: Chat[];
};

export const ChatCards = memo(({ openClickedChat, chats }: ChatsProps) => {
  const [limit, setLimit] = useState(10);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  const visibleChats = chats.slice(0, limit);

  return (
    <div className="homework-cards">
      {visibleChats.map((chat) => {
        const lastMessage = chat.messages.at(-1);
        return (
          chat && (
            <div
              onClick={() => openClickedChat(chat.id)}
              data-testid="homework-card"
              className="homework-card"
              key={chat.id}
            >
              <div className="left-line"></div>
              <div className="card-content">
                <div className="homework-title">{chat.title}</div>
                <div className="user-prompt">
                  <p>"{lastMessage?.content}"</p>
                </div>
                <div className="card-details">
                  <span className="prompt-time">
                    {getRelativeTime(chat.createdAt)}
                  </span>
                  <span className="view-details">
                    <span>View Details </span>
                    <MoveRight />
                  </span>
                </div>
              </div>
            </div>
          )
        );
      })}
      {visibleChats.length < chats.length && (
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
});
