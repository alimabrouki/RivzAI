import '../../styles/index.css';
import '../../styles/header/Header.css';
import '../../styles/history-page/HistoryPage.css';
import { Header } from '../../components/Header';
import { Search } from 'lucide-react';
import { HomeworkCards } from './HomeworkCards';
import { FilterHistory } from './FilterHistory';

export const HistoryPage = ({
  addedHistory,
 handlHistoryCardClick
}) => {

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
            <div className="dummy"></div>
            <FilterHistory />
            <HomeworkCards handlHistoryCardClick={handlHistoryCardClick} recentHomework={addedHistory} />
          </div>
        </div>
      </div>
    </>
  )
}