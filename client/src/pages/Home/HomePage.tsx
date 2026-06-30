import "../../styles/index.css";
import "../../styles/header/Header.css";
import "../../styles/home-page/HomePage.css";
import { Header } from "../../components/Header";
import { HomePageWrapper } from "./HomePageWrapper";
import { PresentFeatures } from "./PresentFeatures";
import { Footer } from "./Footer";
import type { HomeworkCard } from "../../types/Chat";
import logo from "../../assets/images/logo.png";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

type HomePageProps = {
  addHistory: (newPrompt: string) => void;
  addedHistory: HomeworkCard[];
};

export const HomePage = ({ addHistory, addedHistory }: HomePageProps) => {
  const { user } = useAuth();

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>RivzAI</title>
      <Header />
      {user?.verified && (
        <div className="verified-banner">
          <FaCheckCircle size={20} />
          <span>You are verified!</span>
        </div>
      )}
      <div className="home-page">
        <HomePageWrapper addHistory={addHistory} addedHistory={addedHistory} />
      </div>
      <PresentFeatures />
      <Footer />
    </>
  );
};
