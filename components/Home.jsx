import { Link, useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const messageSubmitted = location.state?.messageSubmitted;

  return (
    <main>

      {messageSubmitted && (
        <div className="success-message container">
          Thank you. Your message has been captured successfully.
        </div>
      )}

      <section className="hero-section">
        <div className="container hero-content">

          <p className="eyebrow">
            SOFTWARE ENGINEERING PORTFOLIO
          </p>

          <h1>
            Hello, I am Fadi Rizk.
          </h1>

          <p className="hero-text">
            I am a Software Engineering Technology student at
            Centennial College with a background in Computer Science
            and experience in technical engineering support,
            web development, Linux, databases, and automation.
          </p>

          <div className="button-group">

            <Link
              className="button primary-button"
              to="/about"
            >
              About Me
            </Link>

            <Link
              className="button secondary-button"
              to="/project"
            >
              View My Projects
            </Link>

          </div>

        </div>
      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              MY MISSION
            </p>

            <h2>
              Building practical technology solutions through
              continuous learning and problem solving.
            </h2>

          </div>

          <div className="cards three-columns">

            <article className="info-card">
              <h3>Software Development</h3>
              <p>
                Developing software and web-based projects while
                strengthening my programming and software engineering
                skills.
              </p>
            </article>

            <article className="info-card">
              <h3>Problem Solving</h3>
              <p>
                Using analytical and troubleshooting skills to
                investigate technical issues and develop practical
                solutions.
              </p>
            </article>

            <article className="info-card">
              <h3>Technology</h3>
              <p>
                Continuously learning technologies including Java,
                JavaScript, HTML, CSS, SQL, Linux and cloud concepts.
              </p>
            </article>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;