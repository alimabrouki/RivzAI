import { memo } from 'react';
import { getRelativeTime } from '../../utils/getRelativeTime';
import { MoveRight } from 'lucide-react';
export const HomeworkCards = memo(
  ({ recentHomework,handleClickedCard }) => {
    
    return (
       
      <div className="homework-cards">
        {recentHomework.map((homework, index) => (
          
          <div onClick={() => handleClickedCard(homework)} className='homework-card' key={index}>
            <div style={
              {
                position: 'absolute',
                left: '0',
                top: '0',
                width: '4px',
                bottom: '0',
                backgroundColor: 'orange',
                borderRadius: '16px 0 0 16px'
              }
            } className="left-line"></div>
            <div className="card-content">
              <h2 className='homework-title'>Homework Title</h2>
              <div className="user-prompt">
                "{homework.text}"
              </div>
              <span className='prompt-time'>{getRelativeTime(homework.timestamp)}</span>
              <span className='view-details'>
                <span>View Details </span>
                <MoveRight />
              </span>
            </div>
          </div>  
      
         
        ))}
      
      </div>
        
          
    )
  }
)

