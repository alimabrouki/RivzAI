import '../../styles/index.css'
import '../../styles/header/Header.css'
import '../../styles/home-page/HomePage.css'
import { Header } from '../../components/Header'
import { HomePageWrapper } from './HomePageWrapper'
import { PresentFeatures } from './PresentFeatures'
import { Footer } from './Footer'

export const HomePage = ({addHistory, addedHistory
}) => {

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>RivzAI</title>
      <Header />
      <div className="home-page">
        <HomePageWrapper addHistory={addHistory} addedHistory={addedHistory} />
      </div>
      <PresentFeatures />
      <Footer />
    </>

  )
}