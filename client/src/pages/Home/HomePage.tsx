import "../../styles/index.css";
import "../../styles/header/Header.css";
import "../../styles/home-page/HomePage.css";
import { Header } from "../../components/Header";
import { HomePageWrapper } from "./HomePageWrapper";
import { PresentFeatures } from "./PresentFeatures";
import { Footer } from "./Footer";
import logo from "../../assets/images/logo.png";
import type { Chat } from "../../types/Chat";

type HomePageProps = {
  openClickedChat: (id: number) => void;
  chats: Chat[];
};

export const HomePage = ({ openClickedChat, chats }: HomePageProps) => {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>RivzAI</title>
      <Header />
      <div className="home-page">
        <HomePageWrapper chats={chats} openClickedChat={openClickedChat} />
      </div>
      <PresentFeatures />
      <Footer />
    </>
  );
};
