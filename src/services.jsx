const services = [
  {
    title: 'Web Development',
    description:
      'Development and maintenance of responsive websites using HTML, CSS, JavaScript and WordPress.',
    image: '/src/assets/project-web.png'
  },

  {
    title: 'Linux & Technical Support',
    description:
      'Technical troubleshooting, log analysis, Linux command-line processing and technical support.',
    image: '/src/assets/project-linux.png'
  },

  {
    title: 'Data & Automation',
    description:
      'Automation of repetitive technical tasks using Bash and Python and extraction of information into structured formats.',
    image: '/src/assets/project-database.png'
  },

  {
    title: 'Oracle SQL & Database Development',
    description:
      'Database table design, constraints and SQL queries for retrieving, filtering, grouping and organizing data.',
    image: '/src/assets/project-database.png'
  },

  {
    title: 'Software Requirements Analysis',
    description:
      'Requirements gathering and documentation, including functional requirements, non-functional requirements and UML diagrams.',
    image: '/src/assets/project-requirements.png'
  },

  {
    title: 'Website Maintenance',
    description:
      'Website troubleshooting, content updates, layout improvements and usability-focused changes.',
    image: '/src/assets/project-web.png'
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