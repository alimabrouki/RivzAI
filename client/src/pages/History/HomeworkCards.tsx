import { memo, useEffect, useState } from "react";
import { getRelativeTime } from "../../utils/getRelativeTime";
import "../../styles/history-page/HomeworkCards.css";
import { MoveRight } from "lucide-react";
import type { Chat } from "../../types/Chat";
import getConversations from "../../api/getConversations";

type HomeworkCardsProps = {
  handleHistoryCardClick: (homework: HomeworkCard) => void;
};

export const HomeworkCards = memo(
  ({ handleHistoryCardClick }: HomeworkCardsProps) => {
    const [limit, setLimit] = useState(10);
    const [conversations, setConversations] = useState<Chat[]>([]);
    const handleLoadMore = () => {
      setLimit((prev) => prev + 10);
    };

    useEffect(() => {
      async function getconvos() {
        const result = await getConversations();
        console.log(result);
        setConversations(result);
      }
      getconvos();
    }, []);

    const visibleConversations = conversations.slice(0, limit);

    return (
      <div className="homework-cards">
        {visibleConversations.map((conversation) => (
          <div
            onClick={() => handleHistoryCardClick(conversation)}
            data-testid="homework-card"
            className="homework-card"
            key={conversation.id}
          >
            <div className="left-line"></div>
            <div className="card-content">
              <div className="homework-title">{conversation.title}</div>
              <div className="user-prompt">
                {conversation.messages.map((message) => (
                  <p>"{message.content}"</p>
                ))}
              </div>
              <div className="card-details">
                <span className="prompt-time">
                  {getRelativeTime(conversation.createdAt)}
                </span>
                <span className="view-details">
                  <span>View Details </span>
                  <MoveRight />
                </span>
              </div>
            </div>
          </div>
        ))}
        {visibleConversations.length < conversations.length && (
          <div className="load-more">
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </div>
    );
  },
);
