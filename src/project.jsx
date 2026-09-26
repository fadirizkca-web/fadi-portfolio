const projects = [
  {
    title: 'Database Development Project',
    image: {databaseProject},
    role: 'Database Developer',
    date: 'May 2026 – September 2026',
    description:
      'Designed and created related database tables using Oracle SQL and applied primary keys, foreign keys and other constraints.',
    outcome:
      'Developed and tested database structures and SQL queries using SQL Developer to retrieve, filter, group and organize information.'
  },

  {
    title: 'Linux/Unix Administration & Command-Line Project',
    image: {linuxProject},
    role: 'Linux/Unix Project Team Member',
    date: 'May 2026 – September 2026',
    description:
      'Used Linux and Unix command-line tools to create and manage files and directories, work with permissions, and process text and files.',
    outcome:
      'Applied chmod, grep, find, sed, awk, cat and vi/nano to complete command-line administration and troubleshooting tasks.'
  },

  {
    title: 'MatchMyHome Software Requirements Specification',
    image: {requirementsProject},
    role: 'Requirements Analyst / Team Member',
    date: 'May 2026 – September 2026',
    description:
      'Collaborated using Agile practices to develop a Software Requirements Specification for MatchMyHome.',
    outcome:
      'Created functional and non-functional requirements, UML diagrams and Gantt charts while working collaboratively with the team.'
  },

  {
    title: 'Web Design — HTML, CSS & JavaScript',
    image: {webProject},
    role: 'Web Developer',
    date: 'January 2026 – September 2026',
    description:
      'Designed a responsive, user-oriented website using HTML, CSS and JavaScript to highlight services.',
    outcome:
      'Implemented scrolling image galleries, contact forms and responsive layouts to improve the user experience.'
  }
];

function Project() {

  return (
    <main>

      <section className="page-banner">

        <div className="container">

          <p className="eyebrow">
            PORTFOLIO
          </p>

          <h1>
            My Projects
          </h1>

          <p>
            Academic and professional projects that demonstrate
            my technical and problem-solving skills.
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="project-grid">

            {projects.map((project) => (

              <article
                className="project-card"
                key={project.title}
              >

                <img
                  src={project.image}
                  alt={`${project.title} project`}
                />

                <div className="project-content">

                  <p className="eyebrow">
                    {project.date}
                  </p>

                  <h2>
                    {project.title}
                  </h2>

                  <p>
                    <strong>My Role:</strong>{' '}
                    {project.role}
                  </p>

                  <p>
                    <strong>Description:</strong>{' '}
                    {project.description}
                  </p>

                  <p>
                    <strong>Outcome:</strong>{' '}
                    {project.outcome}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Project;