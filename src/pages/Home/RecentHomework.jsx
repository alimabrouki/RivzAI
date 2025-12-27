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
        addHistory.slice(0,3).map((history, index) => (
          <Link ref={observe} key={index} to={'/history'} className='recent-prompt slide-in'><span className='slide-in' ref={observe} key={index} >{history}</span></Link>
        ))
      }
    </div>
  )
}