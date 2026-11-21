
import { useEffect, useState } from "react";
import apiRequest from "./api";

function Education() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQualifications = async () => {
      try {
        const data = await apiRequest("/api/qualifications");

        if (!Array.isArray(data)) {
          throw new Error("The server returned an invalid qualifications response.");
        }

        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQualifications();
  }, []);

  const educationRecords = records.filter(
    (record) => record.category === "education"
  );

  const professionalRecords = records.filter(
    (record) => record.category === "professional-development"
  );

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow">EDUCATION</p>

          <h1>Education & Qualifications</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && <p>Loading education records...</p>}

          {error && (
            <p className="error-message" role="alert">
              Unable to load education records: {error}
            </p>
          )}

          {!loading && !error && (
            <>
              {educationRecords.length > 0 ? (
                <div className="timeline">
                  {educationRecords.map((record) => (
                    <article
                      className="timeline-item"
                      key={record._id}
                    >
                      <div className="timeline-date">
                        {record.period}
                      </div>

                      <div className="timeline-content">
                        <h2>{record.qualification}</h2>

                        <h3>{record.institution}</h3>

                        <p>{record.details}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p>No education records are currently available.</p>
              )}
            </>
          )}
        </div>
      </section>

      {professionalRecords.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">PROFESSIONAL DEVELOPMENT</p>

              <h2>Continuing Education</h2>
            </div>

            {professionalRecords.map((record) => (
              <article
                className="info-card"
                key={record._id}
              >
                <h3>{record.qualification}</h3>

                <p>{record.institution}</p>

                <p>{record.period}</p>

                <p>{record.details}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Education;
