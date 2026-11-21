
import { useEffect, useState } from "react";
import apiRequest from "./api";

import databaseProject from "./assets/project-database.png";
import linuxProject from "./assets/project-linux.png";
import requirementsProject from "./assets/project-requirements.png";
import webProject from "./assets/project-web.png";

// Match database image keys to existing local images.
const projectImages = {
  database: databaseProject,
  linux: linuxProject,
  requirements: requirementsProject,
  web: webProject,
};

function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest("/api/projects");

        if (!Array.isArray(data)) {
          throw new Error("The server returned an invalid projects response.");
        }

        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Display the new period field or the legacy completion date.
  const getProjectPeriod = (project) => {
    if (project.period) {
      return project.period;
    }

    if (project.completion) {
      return new Date(project.completion).toLocaleDateString();
    }

    return "";
  };

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <p className="eyebrow">PORTFOLIO</p>

          <h1>My Projects</h1>

          <p>
            Academic and professional projects that demonstrate
            my technical and problem-solving skills.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && <p>Loading projects...</p>}

          {error && (
            <p className="error-message" role="alert">
              Unable to load projects: {error}
            </p>
          )}

          {!loading && !error && projects.length === 0 && (
            <p>No projects are currently available.</p>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="project-grid">
              {projects.map((project) => {
                const image = projectImages[project.imageKey];

                return (
                  <article
                    className="project-card"
                    key={project._id}
                  >
                    {image && (
                      <img
                        src={image}
                        alt={`${project.title} project`}
                      />
                    )}

                    <div className="project-content">
                      {getProjectPeriod(project) && (
                        <p className="eyebrow">
                          {getProjectPeriod(project)}
                        </p>
                      )}

                      <h2>{project.title}</h2>

                      {project.role && (
                        <p>
                          <strong>My Role:</strong>{" "}
                          {project.role}
                        </p>
                      )}

                      <p>
                        <strong>Description:</strong>{" "}
                        {project.description}
                      </p>

                      {project.outcome && (
                        <p>
                          <strong>Outcome:</strong>{" "}
                          {project.outcome}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Project;
