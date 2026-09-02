import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { History, Loader2, MessageSquarePlus, PanelLeftClose } from "lucide-react";
import type { Chat } from "../../types/Chat";
import getUserChats from "../../api/getUserChats";
import logo from "../../assets/images/logo.png";
import "../../styles/history-page/ChatSidebar.css";

type ChatSidebarProps = {
  activeChatId: number;
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggle: () => void;
};

export const ChatSidebar = ({
  activeChatId,
  isOpen,
  isCollapsed,
  onClose,
  onToggle,
}: ChatSidebarProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadChats() {
      const result = await getUserChats();

      if (!ignore && Array.isArray(result)) {
        setChats(result);
      }

      if (!ignore) {
        setLoading(false);
      }
    }

    loadChats();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <aside
      className={`chat-sidebar ${isOpen ? "is-open" : ""} ${isCollapsed ? "is-collapsed" : ""}`}
    >
      <div className="chat-sidebar-top">
        <Link to="/" className="chat-sidebar-brand" onClick={onClose}>
          <img className="chat-sidebar-logo" src={logo} alt="RivzAI" />
          <span>
            Rivz<span>AI</span>
          </span>
        </Link>
        <button
          className="chat-sidebar-toggle"
          type="button"
          onClick={onToggle}
          aria-label="Close chat list"
        >
          <PanelLeftClose size={22} />
        </button>
      </div>

      <Link to="/" className="new-chat-button" onClick={onClose}>
        <MessageSquarePlus size={19} />
        New chat
      </Link>

      <div className="chat-sidebar-list" aria-label="Your conversations">
        <p className="chat-sidebar-label">Your chats</p>
        {loading ? (
          <div className="chat-sidebar-loading">
            <Loader2 size={20} />
          </div>
        ) : chats.length ? (
          chats.map((item) => (
            <Link
              key={item.id}
              to={`/history/${item.id}`}
              onClick={onClose}
              className={`chat-sidebar-item ${item.id === activeChatId ? "is-active" : ""}`}
              title={item.title}
            >
              <span>{item.title}</span>
            </Link>
          ))
        ) : (
          <p className="chat-sidebar-empty">Your new chats will appear here.</p>
        )}
      </div>

      <Link to="/history" className="chat-sidebar-history" onClick={onClose}>
        <History size={18} />
        View all history
      </Link>
    </aside>
  );
};
