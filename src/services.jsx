import databaseProject from './assets/project-database.png';
import linuxProject from './assets/project-linux.png';
import requirementsProject from './assets/project-requirements.png';
import webProject from './assets/project-web.png';

const services = [
  {
    title: 'Web Development',
    description:
      'Development and maintenance of responsive websites using HTML, CSS, JavaScript and WordPress.',
    image: webProject
  },

  {
    title: 'Linux & Technical Support',
    description:
      'Technical troubleshooting, log analysis, Linux command-line processing and technical support.',
    image: linuxProject
  },

  {
    title: 'Data & Automation',
    description:
      'Automation of repetitive technical tasks using Bash and Python and extraction of information into structured formats.',
    image: databaseProject
  },

  {
    title: 'Oracle SQL & Database Development',
    description:
      'Database table design, constraints and SQL queries for retrieving, filtering, grouping and organizing data.',
    image: databaseProject
  },

  {
    title: 'Software Requirements Analysis',
    description:
      'Requirements gathering and documentation, including functional requirements, non-functional requirements and UML diagrams.',
    image: requirementsProject
  },

  {
    title: 'Website Maintenance',
    description:
      'Website troubleshooting, content updates, layout improvements and usability-focused changes.',
    image: webProject
  }
];

function Services() {

  return (
    <main>

      <section className="page-banner">

        <div className="container">

          <p className="eyebrow">
            SERVICES
          </p>

          <h1>
            Services
          </h1>

          <p>
            Technical services based on my academic and
            professional experience.
          </p>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="service-grid">

            {services.map((service) => (

              <article
                className="service-card"
                key={service.title}
              >

                <img
                  src={service.image}
                  alt=""
                />

                <h2>
                  {service.title}
                </h2>

                <p>
                  {service.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Services;