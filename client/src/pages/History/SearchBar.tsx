import { Search } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import "../../styles/history-page/SearchBar.css";
import { useNavigate } from "react-router-dom";
import type { Chat } from "../../types/Chat";

type SearchBarProps = { chats: Chat[] };

export const SearchBar = ({ chats }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const [dropped, setDropped] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  const search = useRef<HTMLDivElement | null>(null);

  const cards = useRef<(HTMLDivElement | null)[]>([]);

  const filteredCards = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();

    const startsWith = chats.filter((chatCard) =>
      chatCard.title.toLowerCase().startsWith(q),
    );

    const includes = chats.filter(
      (chatCard) =>
        !chatCard.title.toLowerCase().startsWith(q) &&
        chatCard.title.toLowerCase().includes(q),
    );
    return [...startsWith, ...includes];
  }, [chats, query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (search.current && !search.current.contains(e.target as Node)) {
        setDropped(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!filteredCards.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCards.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredCards.length) % filteredCards.length,
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      navigate(`/history/${filteredCards[activeIndex].id}`);
    }
  };
  useEffect(() => {
    const el = cards.current[activeIndex];
    if (el) {
      el.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);
  return (
    <div ref={search} className="search-bar">
      <input
        onKeyDown={handleKeyDown}
        onFocus={() => setDropped(true)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search your homework history..."
      />
      <Search />
      {query && dropped && (
        <div className="search-rslt">
          {filteredCards.length === 0 ? (
            <div className="no-results">No Homework Found</div>
          ) : (
            filteredCards.map((card, index) => (
              <div
                ref={(el) => {
                  cards.current[index] = el;
                }}
                onClick={() => navigate(`/history/${card.id}`)}
                className={`search-rslt-card ${index === activeIndex ? "highlight-rslt" : ""}`}
                key={card.id}
              >
                <div className="search-rslt-title">{card.title}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
