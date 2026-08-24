import "../../styles/hooks-styles/useIntersectionAnimation.css";
import "../../styles/home-page/RecentChat.css";
import { Link } from "react-router-dom";
import { useIntersectionAnimation } from "../../hooks/useIntersectionAnimation";
import type { Chat } from "../../types/Chat";
import { useEffect, useState } from "react";
import getUserChats from "../../api/getUserChats";
import { useAuth } from "../../hooks/useAuth";

export const RecentChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const staticChats = [
    {
      id: 1,
      title: "The Water Cycle Explained",
      messages: [
        {
          id: 1,
          role: "user",
          content:
            "Explain the stages of the water cycle in a simple way, including evaporation, condensation, precipitation, and collection, as if I’m a 7th-grade student.",
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Solve Quadratic Equations",
      messages: [
        {
          id: 2,
          role: "user",
          content:
            "Solve the quadratic equation 2x² + 5x – 3 = 0 step by step, showing how to use the quadratic formula and simplify the results.",
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 3,
      title: "Photosynthesis Process",
      messages: [
        {
          id: 3,
          role: "user",
          content:
            "Describe the process of photosynthesis in plants, explaining how sunlight, water, and carbon dioxide produce glucose and oxygen, in a way that is easy to understand.",
        },
      ],
      createdAt: new Date(),
    },
  ];
  const { user } = useAuth();

  useEffect(() => {
    async function getChats() {
      if (user) {
        const result = await getUserChats();
        setChats(result);
      }
    }
    getChats();
  }, [user]);
  useIntersectionAnimation({ threshold: 0.1 });
  return (
    <div className="recent-homework slide-in">
      <h2 className="slide-in">Recent Homework</h2>

      {user
        ? chats.slice(0, 3).map((history) => (
            <Link
              key={history.id}
              to={`/history/${history.id}`}
              className="recent-prompt slide-in"
            >
              <span className="slide-in">"{history.title.slice(0, 60)}"</span>
            </Link>
          ))
        : staticChats.slice(0, 3).map((chat) => (
            <div key={chat.id} className="recent-prompt slide-in">
              <span className="slide-in">"{chat.title.slice(0, 60)}"</span>
            </div>
          ))}
    </div>
  );
};
