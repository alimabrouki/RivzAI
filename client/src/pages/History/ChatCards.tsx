import { memo, useState } from "react";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { differenceInDays } from "date-fns";
import "../../styles/history-page/HomeworkCards.css";
import { MoveRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Chat } from "../../types/Chat";

type ChatsProps = {
  chats: Chat[];
};

export const ChatCards = memo(({ chats }: ChatsProps) => {
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  const openClickedChat = (chatId: number) => {
    navigate(`/history/${chatId}`);
  };

  const groups: {
    today: Chat[];
    yesterday: Chat[];
    previous7days: Chat[];
    previous30days: Chat[];
    older: Chat[];
  } = {
    today: [],
    yesterday: [],
    previous7days: [],
    previous30days: [],
    older: [],
  };

  const today = new Date();

  for (const chat of chats) {
    const daysAgo = differenceInDays(today, chat.createdAt);

    if (daysAgo === 0) {
      groups.today.push(chat);
    } else if (daysAgo === 1) {
      groups.yesterday.push(chat);
    } else if (daysAgo <= 7) {
      groups.previous7days.push(chat);
    } else if (daysAgo <= 30) {
      groups.previous30days.push(chat);
    } else {
      groups.older.push(chat);
    }
  }

  const sections = [
    {
      title: "Today",
      chats: groups.today,
    },
    {
      title: "Yesterday",
      chats: groups.yesterday,
    },
    {
      title: "Previous 7 days",
      chats: groups.previous7days,
    },
    {
      title: "Previous 30 days",
      chats: groups.previous30days,
    },
    {
      title: "Older",
      chats: groups.older,
    },
  ];

  if (chats.length === 0) {
    return (
      <div className="chat-empty-state">
        <p className="chat-empty-title">No chats yet</p>
        <p className="chat-empty-subtitle">
          Create your first chat to get started!
        </p>
        <Link to="/" className="get-started-btn">
          Start Now
        </Link>
      </div>
    );
  }

  return (
    <div className="homework-cards">
      {sections.map((section) => {
        const visibleChats = section.chats.slice(0, limit);
        return (
          section.chats.length > 0 && (
            <div key={section.title}>
              <h2 style={{ color: "var(--c-neutral-0)" }}>{section.title}</h2>
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
              {visibleChats.length < section.chats.length && (
                <div className="load-more">
                  <button onClick={handleLoadMore}>Load More</button>
                </div>
              )}
            </div>
          )
        );
      })}
    </div>
  );
});
