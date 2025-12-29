import '../../styles/index.css';
import '../../styles/header/Header.css';
import '../../styles/history-page/HistoryPage.css';
import { Header } from '../../components/Header';
import { Search } from 'lucide-react';
import { HomeworkCard } from './HomeworkCard';
import { FilterHistory } from './FilterHistory';

export const HistoryPage = () => {
  const recentPrompts = JSON.parse(localStorage.getItem('newPrompt')) || [];

   const recentHomework =
    recentPrompts.map((prompt) => {  
      if (typeof prompt === 'object' && prompt.timestamp) {
        return {
          text: prompt.text || prompt,
          timestamp: prompt.timestamp
      }
      }
      if (typeof prompt === 'string') {
        return {
          text: prompt,
          timestamp: new Date().toISOString()
        }
      }
      return prompt;
  })
  

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
            <HomeworkCard recentHomework={recentHomework} />
          </div>
        </div>
      </div>
    </>
  )
}