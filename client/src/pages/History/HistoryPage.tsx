import "../../styles/index.css";
import "../../styles/header/Header.css";
import "../../styles/history-page/HistoryPage.css";
import { Header } from "../../components/Header";
import { ChatCards } from "./ChatCards";
import { SearchBar } from "./SearchBar";
import type { Chat } from "../../types/Chat";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import getUserChats from "../../api/getUserChats";

export const HistoryPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    async function getChats() {
      const result = await getUserChats();
      console.log(result);
      setChats(result);
    }
    getChats();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>History</title>
      <Header />
      <div className="history">
        <div className="wrapper">
          <h1 className="history-title">Your History</h1>
          <div className="recent-h">
            <SearchBar chats={chats} />
            <div className="dummy"></div>
            <ChatCards chats={chats} />
          </div>
        </div>
      </div>
    </>
  );
};
