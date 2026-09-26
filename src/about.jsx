import profileImage from './assets/profile.jpg';

function About() {

  return (
    <main>

      <section className="page-banner">

        <div className="container">

          <p className="eyebrow">
            ABOUT ME
          </p>

          <h1>
            About Fadi Rizk
          </h1>

          <p>
            Software Engineering Technology student and
            technology professional.
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container about-grid">

          <div>

            <img
              className="profile-image"
              src={profileImage}
              alt="Portrait of Fadi Rizk"
            />

          </div>

          <div>

            <p className="eyebrow">
              WHO I AM
            </p>

            <h2>
              Fadi Rizk
            </h2>

            <p>
              I am currently studying Software Engineering
              Technology at Centennial College. I also hold a
              Bachelor's degree in Computer Science, giving me a
              strong academic foundation in programming, algorithms,
              databases and software development.
            </p>

            <p>
              My technical background includes Java, JavaScript,
              HTML, CSS, SQL, Linux/Unix and web development.
              My professional experience includes technical
              engineering support, log analysis, Bash and Python
              automation, data extraction, WordPress development,
              troubleshooting and technical collaboration.
            </p>

            <div className="skills-list">

              <span>Java</span>
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>SQL</span>
              <span>Linux/Unix</span>
              <span>Python</span>
              <span>WordPress</span>

            </div>

            <a
              className="button primary-button"
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              View My Resume
            </a>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              PROFESSIONAL EXPERIENCE
            </p>

            <h2>
              My Background
            </h2>

          </div>

          <div className="cards">

            <article className="info-card">

              <h3>
                Technical Engineering Support
              </h3>

              <p>
                <strong>
                  Mobileum Inc. — Lisbon, Portugal
                </strong>
              </p>

              <p>
                October 2022 – December 2025
              </p>

              <p>
                Analyzed application and system logs using Linux
                command-line tools, investigated technical issues,
                developed Bash and Python automation scripts,
                extracted technical information into Excel and CSV
                formats, and worked with GitHub, JIRA and Atlassian.
              </p>

            </article>

            <article className="info-card">

              <h3>
                Web Developer
              </h3>

              <p>
                <strong>
                  Points Information Technology — Riyadh, Saudi Arabia
                </strong>
              </p>

              <p>
                July 2020 – September 2022
              </p>

              <p>
                Developed and maintained WordPress websites,
                customized HTML and CSS layouts, troubleshot
                website issues, updated content, and collaborated
                with team members to implement project requirements.
              </p>

            </article>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;