import { GraduationCap, School, TrendingUp } from 'lucide-react'
import { useIntersectionAnimation } from '../../hooks/useIntersectionAnimation'
import '../../styles/home-page/FeaturesBoxes.css'
import '../../styles/hooks-styles/useIntersectionAnimation.css'
export const FeaturesBoxes = () => {
 useIntersectionAnimation({threshold : 0.1})
  return (
    <div className="features-boxes slide-in">
        <div className="box slide-in">
          <div className="feature">
            <TrendingUp className='icon' size={30} />
            <h3 className="highlight-ft">AI-Powered</h3>
            <span>Grade Booster for Faster HomeWork Mastery</span>
          </div>
        </div>
        <div className="box slide-in">
          <div className="feature">
            <GraduationCap className='icon' size={30} />
            <h3 className="highlight-ft">Teacher Mode</h3>
            <span>Smart Homework Generator</span>
          </div>
        </div>
        <div className="box slide-in">
          <div className="feature">
          <School className='icon' size={30} />
          <h3 className="highlight-ft">100%</h3>
          <span>Aligned With The Tunisian School Curriculum</span>
          </div>
        </div>
    </div>
  )
}