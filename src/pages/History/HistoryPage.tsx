import '../../styles/index.css';
import '../../styles/header/Header.css';
import '../../styles/history-page/HistoryPage.css';
import { Header } from '../../components/Header';
import { HomeworkCards } from './HomeworkCards';
import { FilterHistory } from './FilterHistory';
import { SearchBar } from './SearchBar';
import type { HomeworkCard } from '../../types/Chat';

type HistoryPageProps = {
  addedHistory: HomeworkCard[];
  handleHistoryCardClick: (homework: HomeworkCard) => void
}

export const HistoryPage = ({
  addedHistory,
 handleHistoryCardClick
}: HistoryPageProps) => {

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
            <SearchBar recentHomework={addedHistory} />
            <div className="dummy"></div>
            <FilterHistory />
            <HomeworkCards handleHistoryCardClick={handleHistoryCardClick} recentHomework={addedHistory} />
          </div>
        </div>
      </div>
    </>
  )
}