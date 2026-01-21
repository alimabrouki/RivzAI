import { memo, useState } from 'react';
import { getRelativeTime } from '../../utils/getRelativeTime';
import '../../styles/history-page/HomeworkCards.css';
import { MoveRight } from 'lucide-react';

export const HomeworkCards = memo(
  ({ recentHomework, handlHistoryCardClick }) => {
    const [limit, setLimit] = useState(10);

    const handleLoadMore = () => {
      setLimit(prev => prev + 10)
    }

    const visibleCards = recentHomework.slice(0, limit);

    return (

      <div className="homework-cards">
        {visibleCards.map((homework) => (

          <div onClick={() => handlHistoryCardClick(homework)} className='homework-card' key={homework.id}>
            <div className="left-line"></div>
            <div className="card-content">
              <h2 className='homework-title'>{homework.title}</h2>
              <div className="user-prompt">
                "{homework.text}"
              </div>
             <div className="card-details">
               <span className='prompt-time'>{getRelativeTime(homework.timestamp)}</span>
              <span className='view-details'>
                <span>View Details </span>
                <MoveRight />
              </span>
             </div>
            </div>
          </div>
        ))}
        {visibleCards.length < recentHomework.length &&
          <div className="load-more">
            <button onClick={handleLoadMore}>
              Load More
            </button>
          </div>}
      </div>
    )
  })

