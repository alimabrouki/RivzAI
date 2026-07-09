import "../../styles/index.css";
import "../../styles/header/Header.css";
import "../../styles/history-page/HistoryPage.css";
import { Header } from "../../components/Header";
import { ChatCards } from "./ChatCards";
import { FilterHistory } from "./FilterHistory";
import { SearchBar } from "./SearchBar";
import type { Chat } from "../../types/Chat";
import logo from "../../assets/images/logo.png";

type HistoryPageProps = {
  chats: Chat[];
  openClickedChat: (id: number) => void;
  getChats: () => void;
};

export const HistoryPage = ({
  chats,
  openClickedChat,
  getChats,
}: HistoryPageProps) => {
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
            <FilterHistory />
            <ChatCards
              openClickedChat={openClickedChat}
              chats={chats}
              getChats={getChats}
            />
          </div>
        </div>
      </div>
    </>
  );
};
