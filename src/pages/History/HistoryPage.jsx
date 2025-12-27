import '../../styles/index.css';
import '../../styles/header/Header.css';
import '../../styles/history-page/HistoryPage.css';
import { Header } from '../../components/Header';
import { Search } from 'lucide-react';
import { getRelativeTime } from '../../utils/getRelativeTime';
import {randomColor} from 'randomcolor';

export const HistoryPage = () => {
  const recentPrompts = JSON.parse(localStorage.getItem('newPrompt')) || [];
  const recentHomework = recentPrompts.map((prompt) => ({
    Text: prompt.text || prompt,
    timestamp: prompt.timestamp || new Date().toISOString(),
    color: randomColor()
}));
  
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
          <div className="search-icon">
           <Search />
          </div>
         </div>
         <div className="filter-history">
          <button>All</button>
          <button>Bac Math</button>
          <button>Bac Science</button>
         </div>
         <div className="homework-cards">
          {recentHomework.map((homework,index) => (
          <div className='homework-card' key={index}>
            <div style={
            {
              position: 'absolute',
              left: '0',
              top: '0',
              width: '4px',
              bottom: '0',
              backgroundColor:homework.color,
              borderRadius: '16px 0 0 16px'
            }  
            } className="left-line"></div>
            <h2>Homework Title</h2>
            <div className="user-prompt">
              {homework.text}
            </div>
            <span>{getRelativeTime(homework.timestamp)}</span>
            </div>         
          ))}
         </div>
          </div>
        </div>
      </div>
    </>
  )
}