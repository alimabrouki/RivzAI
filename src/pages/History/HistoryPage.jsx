import '../../styles/index.css';
import '../../styles/header/Header.css';
import '../../styles/history-page/HistoryPage.css';
import { Header } from '../../components/Header';
import { Search } from 'lucide-react';
import { HomeworkCards } from './HomeworkCards';
import { FilterHistory } from './FilterHistory';
import { HomeworkResult } from './HomeworkResult';
import { useState } from 'react';

export const HistoryPage = ({addedHistory,handleAddHistory,updateMessages}) => {
const [clickedCard, setClickedCard] = useState(null);

  const handleClickedCard = (homework) => {
      setClickedCard(homework)
    }


  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>History</title>
      <Header />
      <div className="history">
        <div className="wrapper">
          <h1 className="history-title">
            Your History
          </h1>
          <div className="recent-h">
            <div className="search-bar">
              <input type="text" placeholder='Search your homework history...' />
              <Search />
            </div>
            <FilterHistory />
            <HomeworkCards  handleClickedCard={handleClickedCard} recentHomework={addedHistory} />
            <HomeworkResult handleAddHistory={handleAddHistory} closeResult={() => setClickedCard(null)}  clickedCard={clickedCard} recentHomework={addedHistory} updateMessages={updateMessages} />
          </div>
        </div>
      </div>
    </>
  )
}