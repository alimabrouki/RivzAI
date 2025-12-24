import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/HomePage.css'
import { Header } from '../../components/Header'
import { HomePageWrapper } from './HomePageWrapper'
import { PresentFeatures } from './PresentFeatures'
import { Footer } from './Footer'

export const HomePage = () => {

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>RivzAI</title>
      <Header />
      <div className="home-page">
        <HomePageWrapper />
      </div>
      <PresentFeatures />
      <Footer />
    </>

  )
}