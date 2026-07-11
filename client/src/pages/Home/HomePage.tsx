import "../../styles/index.css";
import "../../styles/header/Header.css";
import "../../styles/home-page/HomePage.css";
import { Header } from "../../components/Header";
import { HomePageWrapper } from "./HomePageWrapper";
import { PresentFeatures } from "./PresentFeatures";
import { Footer } from "./Footer";
import logo from "../../assets/images/logo.png";

type HomePageProps = {
  openClickedChat: (id: number) => void;
};

export const HomePage = ({ openClickedChat }: HomePageProps) => {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href={logo} />
      <title>RivzAI</title>
      <Header />
      <div className="home-page">
        <HomePageWrapper openClickedChat={openClickedChat} />
      </div>
      <PresentFeatures />
      <Footer />
    </>
  );
};
