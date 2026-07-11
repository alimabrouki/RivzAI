import "../../styles/hooks-styles/useIntersectionAnimation.css";
import "../../styles/home-page/RecentChat.css";
import { Link } from "react-router-dom";
import { useIntersectionAnimation } from "../../hooks/useIntersectionAnimation";
import type { Chat } from "../../types/Chat";
import { useEffect, useState } from "react";
import getUserChats from "../../api/getUserChats";

export const RecentChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    async function getChats() {
      const result = await getUserChats();
      console.log(result);
      setChats(result);
    }
    getChats();
  }, []);
  useIntersectionAnimation({ threshold: 0.1 });
  return (
    <div className="recent-homework slide-in">
      <h2 className="slide-in">Recent Homework</h2>

      {chats.slice(0, 3).map((history) => (
        <Link
          key={history.id}
          to={`/history/${history.id}`}
          className="recent-prompt slide-in"
        >
          <span className="slide-in">"{history.title.slice(0, 60)}"</span>
        </Link>
      ))}
    </div>
  );
};
