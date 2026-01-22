import "../../styles/Teacher-mode/teacherMode.css";
import { GraduationCap, BookOpen, ClipboardList } from "lucide-react";

const TeacherMode = () => {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>Teacher Mode</title>
      <div className="teacherMode">
        <div className="teacherCard">
          <header className="teacherHeader">
            <h1>Teacher Mode</h1>
            <p>
              Create structured assignments aligned with the Tunisian curriculum.
              Teacher tools are currently under development.
            </p>
          </header>

          <section className="teacherSteps">
            <div className="stepBox">
              <div className="stepHeader">
                <GraduationCap size={20} />
                <span>Step 1</span>
              </div>

              <label>Select Level</label>
              <select disabled>
                <option>Coming soon</option>
              </select>
            </div>

            <div className="stepBox">
              <div className="stepHeader">
                <BookOpen size={20} />
                <span>Step 2</span>
              </div>

              <label>Select Subject</label>
              <select disabled>
                <option>Coming soon</option>
              </select>
            </div>

            <div className="stepBox">
              <div className="stepHeader">
                <ClipboardList size={20} />
                <span>Step 3</span>
              </div>

              <label>Assignment Type</label>
              <select disabled>
                <option>Coming soon</option>
              </select>
            </div>
          </section>

          <div className="teacherCta">
            <p>Teacher accounts will be available after launch.</p>
            <button disabled>Get started free</button>
          </div>

          <footer className="teacherNote">
            Backend & authentication in progress.
          </footer>
        </div>
      </div>
    </>
  );
};

export default TeacherMode;