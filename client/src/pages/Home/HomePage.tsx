import "../../styles/home-page/HomePage.css";
import { Header } from "../../components/Header";
import { HomePageWrapper } from "./HomePageWrapper";
import { PresentFeatures } from "./PresentFeatures";
import { Footer } from "./Footer";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div className="home-page">
        <HomePageWrapper />
      </div>
      <PresentFeatures />
      <Footer />
    </>
  );
};
