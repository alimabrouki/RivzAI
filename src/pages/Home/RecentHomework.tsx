import '../../styles/hooks-styles/useIntersectionAnimation.css'
import '../../styles/home-page/RecentHomework.css'
import { Link } from 'react-router-dom'
import { useIntersectionAnimation } from '../../hooks/useIntersectionAnimation'
import type { HomeworkCard } from '../../types/Chat'

export const RecentHomework = ({ recentHistory }: { recentHistory: HomeworkCard[] }) => {
  useIntersectionAnimation({ threshold: 0.1 })

  return (
    <div className="recent-homework slide-in">
      <h2 className="slide-in">Recent Homework</h2>

      {recentHistory.slice(0, 3).map((history) => (
        <Link
          key={history.id}
          to={`/history/${history.id}`}
          className="recent-prompt slide-in"
        >
          <span className="slide-in">"{history.text}"</span>
        </Link>
      ))}
    </div>
  )
}
