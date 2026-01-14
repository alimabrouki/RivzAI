import '../../styles/hooks-styles/useIntersectionAnimation.css'
import '../../styles/home-page/RecentHomework.css'
import { Link } from 'react-router-dom'
import { useIntersectionAnimation } from '../../hooks/useIntersectionAnimation'

export const RecentHomework = ({ addHistory }) => {

  const observe = useIntersectionAnimation({ threshold: 0.1 });
  return (
    <div ref={observe} className="recent-homework slide-in">
      <h2 ref={observe} className='slide-in'>Recent Homework</h2>
      {
        addHistory.slice(0,3).map((history) => (
          <Link ref={observe} key={history.id}  to={`/history/${history.id}`} className='recent-prompt slide-in'><span className='slide-in' ref={observe} key={history.id} >"{history.text || history}"</span></Link>
        ))
      }
    </div>
  )
}