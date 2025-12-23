import { GraduationCap, School, TrendingUp, Waypoints } from "lucide-react"
import { useIntersectionAnimation } from "../../hooks/useIntersectionAnimation"
import '../../styles/hooks-styles/useInterSectionAnimation.css'
import '../../styles/PresentFeatures.css'

export const PresentFeatures = () => {
  const observe = useIntersectionAnimation({ threshold: 0.1 })
  return (
    <div ref={observe} className="present-features slide-in">
      <h2 className="features-title">
        Built For Students Trusted By Teachers
      </h2>
      <div className="features">
        <div ref={observe} className="f-box slide-in">
          <h3 className="box-title">Modes</h3>
          <div className="teacher-mode">
            <div className="ft-title">
              <GraduationCap className="i" />
              <span>Teacher Mode</span>
            </div>
            <ul>
              <li>Full Exam Generator</li>
              <li>Custom Difficulty</li>
              <li>Exam Correction</li>
              <li>Export To Pdf</li>
              <li>Save And Share Exams</li>
            </ul>
          </div>
          <div className="multi-step-mode-f">
            <div className="ft-title">
              <Waypoints className="i" />
              <span>Multi-Step Mode</span>
            </div>
            <ul>
              <li>Think Step By Step</li>
              <li>Explantion In Student Level-Language</li>
              <li>Detect Missing Info And Ask The Student</li>
              <li>Suggest Related Exercices</li>
            </ul>
          </div>
        </div>
        <div ref={observe} className="f-box slide-in">
          <h3 className="box-title">Made For Tunisia</h3>
          <div className="ft-title">
            <School className="i" />
            <span>Tunisian-Specific Curriculum</span>
          </div>
          <ul>
            <li>Bac Math Curriculum Fully Supported</li>
            <li>Bac Science Curriculum Fully Supported</li>
            <li>Exercices inspired by Local Textbooks</li>
            <li>Problems Written In Bac-exam Format</li>
            <li>French-based Math & Science Explanations</li>
            <li>Same Logic Used In Classrooms And Exams</li>
          </ul>
        </div>
        <div ref={observe} className="f-box slide-in">
          <h3 className="box-title">Smart Learning Engine</h3>
          <div className="ft-title">
            <TrendingUp className="i" />
            <span>Grade Boosters</span>
          </div>
          <ul>
            <li>You Can Choose Both Fast Or Thinker Version</li>
            <li>No Cheating Allowed We Give You Hints And Steps Instead</li>
            <li>Upload Your Hand Written Exercices And We Solve It Together</li>
            <li>Save Your Homework History And Find It Later</li>
            <li>Spot Mistakes In Questions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}