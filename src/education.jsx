const educationRecords = [
  {
    year: 'January 2026 – Present',
    qualification: 'Software Engineering Technology',
    institution: 'Centennial College — Toronto, Ontario',
    details:
      'Expected graduation July 2028. GPA: 4.0. Key courses include Software Engineering Requirements, Unix/Linux Operating Systems, Programming 1 (Python), Web Interface Design, Software Engineering Fundamentals and Introduction to Database Concepts.'
  },

  {
    year: 'July 2009 – July 2013',
    qualification: 'Bachelor of Computer Science',
    institution: 'Lebanese International University — Beirut, Lebanon',
    details:
      'Bachelor’s degree in Computer Science providing a strong foundation in programming, algorithms, databases and software development.'
  }
];

function Education() {

  return (
    <main>

      <section className="page-banner">

        <div className="container">

          <p className="eyebrow">
            EDUCATION
          </p>

          <h1>
            Education & Qualifications
          </h1>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="timeline">

            {educationRecords.map((record) => (

              <article
                className="timeline-item"
                key={`${record.year}-${record.qualification}`}
              >

                <div className="timeline-date">
                  {record.year}
                </div>

                <div className="timeline-content">

                  <h2>
                    {record.qualification}
                  </h2>

                  <h3>
                    {record.institution}
                  </h3>

                  <p>
                    {record.details}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              PROFESSIONAL DEVELOPMENT
            </p>

            <h2>
              Continuing Education
            </h2>

          </div>

          <article className="info-card">

            <h3>
              AWS Cloud Practitioner Essentials
            </h3>

            <p>
              AWS Skill Builder — In Progress
            </p>

          </article>

        </div>

      </section>

    </main>
  );
}

export default Education;