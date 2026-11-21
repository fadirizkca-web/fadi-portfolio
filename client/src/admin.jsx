
import { useEffect, useState } from "react";
import apiRequest from "./api";
import { useAuth } from "./AuthContext";

// Default project form values.
const emptyProject = {
  title: "",
  role: "",
  period: "",
  description: "",
  outcome: "",
  imageKey: "",
};

// Default qualification form values.
const emptyQualification = {
  qualification: "",
  institution: "",
  period: "",
  details: "",
  category: "education",
};

// Default contact form values.
const emptyContact = {
  firstname: "",
  lastname: "",
  email: "",
  contactNumber: "",
  message: "",
};

// Default user form values.
const emptyUser = {
  name: "",
  email: "",
  role: "user",
  password: "",
};

function Admin() {
  const { user: currentUser } = useAuth();

  const [section, setSection] = useState("projects");

  // Database records.
  const [projects, setProjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);

  // Form data.
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [qualificationForm, setQualificationForm] =
    useState(emptyQualification);
  const [contactForm, setContactForm] = useState(emptyContact);
  const [userForm, setUserForm] = useState(emptyUser);

  // Record currently being edited.
  const [editingProject, setEditingProject] = useState(null);
  const [editingQualification, setEditingQualification] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Loading and notification states.
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ========================================
  // LOAD DASHBOARD DATA
  // ========================================

  // Retrieve all dashboard records from MongoDB.
  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [
        projectData,
        qualificationData,
        contactData,
        userData,
      ] = await Promise.all([
        apiRequest("/api/projects"),
        apiRequest("/api/qualifications"),
        apiRequest("/api/contacts"),
        apiRequest("/api/users"),
      ]);

      setProjects(projectData);
      setQualifications(qualificationData);
      setContacts(contactData);
      setUsers(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load dashboard information when the component opens.
  useEffect(() => {
    loadData();
  }, []);

  // ========================================
  // PROJECT MANAGEMENT
  // ========================================

  const handleProjectChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Create or update a project.
  const saveProject = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const isEditing = Boolean(editingProject);

      const endpoint = isEditing
        ? `/api/projects/${editingProject}`
        : "/api/projects";

      await apiRequest(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(projectForm),
      });

      setProjectForm(emptyProject);
      setEditingProject(null);

      setMessage(
        isEditing
          ? "Project updated successfully."
          : "Project created successfully."
      );

      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Load a project into the form for editing.
  const editProject = (project) => {
    setEditingProject(project._id);

    setProjectForm({
      title: project.title || "",
      role: project.role || "",
      period: project.period || "",
      description: project.description || "",
      outcome: project.outcome || "",
      imageKey: project.imageKey || "",
    });

    setSection("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete a project.
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiRequest(`/api/projects/${id}`, {
        method: "DELETE",
      });

      setMessage("Project deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelProjectEdit = () => {
    setEditingProject(null);
    setProjectForm(emptyProject);
    setError("");
  };

  // ========================================
  // QUALIFICATION MANAGEMENT
  // ========================================

  const handleQualificationChange = (event) => {
    const { name, value } = event.target;

    setQualificationForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Create or update a qualification.
  const saveQualification = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const isEditing = Boolean(editingQualification);

      const endpoint = isEditing
        ? `/api/qualifications/${editingQualification}`
        : "/api/qualifications";

      await apiRequest(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(qualificationForm),
      });

      setQualificationForm(emptyQualification);
      setEditingQualification(null);

      setMessage(
        isEditing
          ? "Qualification updated successfully."
          : "Qualification created successfully."
      );

      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Load a qualification into the form for editing.
  const editQualification = (record) => {
    setEditingQualification(record._id);

    setQualificationForm({
      qualification: record.qualification || "",
      institution: record.institution || "",
      period: record.period || "",
      details: record.details || "",
      category: record.category || "education",
    });

    setSection("qualifications");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete a qualification.
  const deleteQualification = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this qualification?"
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiRequest(`/api/qualifications/${id}`, {
        method: "DELETE",
      });

      setMessage("Qualification deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelQualificationEdit = () => {
    setEditingQualification(null);
    setQualificationForm(emptyQualification);
    setError("");
  };

  // ========================================
  // CONTACT MANAGEMENT
  // ========================================

  const handleContactChange = (event) => {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update an existing contact submission.
  const saveContact = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      await apiRequest(`/api/contacts/${editingContact}`, {
        method: "PUT",
        body: JSON.stringify(contactForm),
      });

      setContactForm(emptyContact);
      setEditingContact(null);

      setMessage("Contact submission updated successfully.");

      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Load a contact submission into the editing form.
  const editContact = (contact) => {
    setEditingContact(contact._id);

    setContactForm({
      firstname: contact.firstname || "",
      lastname: contact.lastname || "",
      email: contact.email || "",
      contactNumber: contact.contactNumber || "",
      message: contact.message || "",
    });

    setSection("contacts");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete one contact submission.
  const deleteContact = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this contact submission?"
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiRequest(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      setMessage("Contact submission deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete all contact submissions.
  const deleteAllContacts = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete ALL contact submissions? This cannot be undone."
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiRequest("/api/contacts", {
        method: "DELETE",
      });

      setMessage("All contact submissions deleted successfully.");

      setContactForm(emptyContact);
      setEditingContact(null);

      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelContactEdit = () => {
    setEditingContact(null);
    setContactForm(emptyContact);
    setError("");
  };

  // ========================================
  // USER MANAGEMENT
  // ========================================

  const handleUserChange = (event) => {
    const { name, value } = event.target;

    setUserForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update an existing user.
  const saveUser = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const updateData = {
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
      };

      // Only send a password when a new one was entered.
      if (userForm.password) {
        updateData.password = userForm.password;
      }

      await apiRequest(`/api/users/${editingUser}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      setUserForm(emptyUser);
      setEditingUser(null);

      setMessage("User updated successfully.");

      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Load a user into the editing form.
  const editUser = (record) => {
    // Do not allow editing the currently signed-in Admin.
    if (String(record._id) === String(currentUser?._id)) {
      setError("You cannot edit your own Admin account here.");
      return;
    }

    setEditingUser(record._id);

    setUserForm({
      name: record.name || "",
      email: record.email || "",
      role: record.role || "user",
      password: "",
    });

    setSection("users");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete a user account.
  const deleteUser = async (id) => {
    if (String(id) === String(currentUser?._id)) {
      setError("You cannot delete your own account.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this user account?"
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiRequest(`/api/users/${id}`, {
        method: "DELETE",
      });

      setMessage("User deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelUserEdit = () => {
    setEditingUser(null);
    setUserForm(emptyUser);
    setError("");
  };

  // ========================================
  // DASHBOARD DISPLAY
  // ========================================

  return (
    <main className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">ADMINISTRATION</p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage portfolio projects, education records,
            contact submissions and registered users.
          </p>
        </div>

        {/* Dashboard navigation tabs. */}
        <div className="admin-tabs">
          <button
            type="button"
            className={
              section === "projects"
                ? "button primary-button"
                : "button secondary-button"
            }
            onClick={() => {
              setSection("projects");
              setError("");
              setMessage("");
            }}
          >
            Manage Projects
          </button>

          <button
            type="button"
            className={
              section === "qualifications"
                ? "button primary-button"
                : "button secondary-button"
            }
            onClick={() => {
              setSection("qualifications");
              setError("");
              setMessage("");
            }}
          >
            Manage Education
          </button>

          <button
            type="button"
            className={
              section === "contacts"
                ? "button primary-button"
                : "button secondary-button"
            }
            onClick={() => {
              setSection("contacts");
              setError("");
              setMessage("");
              setEditingContact(null);
              setContactForm(emptyContact);
            }}
          >
            Manage Contacts
          </button>

          <button
            type="button"
            className={
              section === "users"
                ? "button primary-button"
                : "button secondary-button"
            }
            onClick={() => {
              setSection("users");
              setError("");
              setMessage("");
              setEditingUser(null);
              setUserForm(emptyUser);
            }}
          >
            Manage Users
          </button>
        </div>

        {/* Error notification. */}
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {/* Success notification. */}
        {message && (
          <p className="success-message" role="status">
            {message}
          </p>
        )}

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* =================================
                PROJECTS SECTION
            ================================== */}
            {section === "projects" && (
              <section className="admin-section">
                <h2>
                  {editingProject
                    ? "Edit Project"
                    : "Add New Project"}
                </h2>

                <form className="admin-form" onSubmit={saveProject}>
                  <label htmlFor="project-title">
                    Project Title
                  </label>

                  <input
                    id="project-title"
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectChange}
                    required
                  />

                  <label htmlFor="project-role">
                    Your Role
                  </label>

                  <input
                    id="project-role"
                    name="role"
                    value={projectForm.role}
                    onChange={handleProjectChange}
                  />

                  <label htmlFor="project-period">
                    Project Period
                  </label>

                  <input
                    id="project-period"
                    name="period"
                    value={projectForm.period}
                    onChange={handleProjectChange}
                    placeholder="January 2026 - June 2026"
                  />

                  <label htmlFor="project-description">
                    Description
                  </label>

                  <textarea
                    id="project-description"
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectChange}
                    required
                  />

                  <label htmlFor="project-outcome">
                    Outcome
                  </label>

                  <textarea
                    id="project-outcome"
                    name="outcome"
                    value={projectForm.outcome}
                    onChange={handleProjectChange}
                  />

                  <label htmlFor="project-image">
                    Project Image
                  </label>

                  <select
                    id="project-image"
                    name="imageKey"
                    value={projectForm.imageKey}
                    onChange={handleProjectChange}
                  >
                    <option value="">No image</option>
                    <option value="database">Database</option>
                    <option value="linux">Linux</option>
                    <option value="requirements">Requirements</option>
                    <option value="web">Web Design</option>
                  </select>

                  <button
                    type="submit"
                    className="button primary-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingProject
                        ? "Update Project"
                        : "Add Project"}
                  </button>

                  {editingProject && (
                    <button
                      type="button"
                      className="button secondary-button"
                      onClick={cancelProjectEdit}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>

                <h2>Existing Projects ({projects.length})</h2>

                <div className="admin-record-list">
                  {projects.map((project) => (
                    <article
                      className="admin-record"
                      key={project._id}
                    >
                      <div>
                        <h3>{project.title}</h3>

                        <p>
                          {project.role || "No role specified"}
                        </p>
                      </div>

                      <div className="admin-actions">
                        <button
                          type="button"
                          className="button secondary-button"
                          onClick={() => editProject(project)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="button danger-button"
                          onClick={() => deleteProject(project._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* =================================
                QUALIFICATIONS SECTION
            ================================== */}
            {section === "qualifications" && (
              <section className="admin-section">
                <h2>
                  {editingQualification
                    ? "Edit Qualification"
                    : "Add New Qualification"}
                </h2>

                <form
                  className="admin-form"
                  onSubmit={saveQualification}
                >
                  <label htmlFor="qualification-title">
                    Qualification
                  </label>

                  <input
                    id="qualification-title"
                    name="qualification"
                    value={qualificationForm.qualification}
                    onChange={handleQualificationChange}
                    required
                  />

                  <label htmlFor="qualification-institution">
                    Institution
                  </label>

                  <input
                    id="qualification-institution"
                    name="institution"
                    value={qualificationForm.institution}
                    onChange={handleQualificationChange}
                    required
                  />

                  <label htmlFor="qualification-period">
                    Period
                  </label>

                  <input
                    id="qualification-period"
                    name="period"
                    value={qualificationForm.period}
                    onChange={handleQualificationChange}
                    required
                    placeholder="January 2026 - Present"
                  />

                  <label htmlFor="qualification-details">
                    Details
                  </label>

                  <textarea
                    id="qualification-details"
                    name="details"
                    value={qualificationForm.details}
                    onChange={handleQualificationChange}
                    required
                  />

                  <label htmlFor="qualification-category">
                    Category
                  </label>

                  <select
                    id="qualification-category"
                    name="category"
                    value={qualificationForm.category}
                    onChange={handleQualificationChange}
                  >
                    <option value="education">Education</option>
                    <option value="professional-development">
                      Professional Development
                    </option>
                  </select>

                  <button
                    type="submit"
                    className="button primary-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingQualification
                        ? "Update Qualification"
                        : "Add Qualification"}
                  </button>

                  {editingQualification && (
                    <button
                      type="button"
                      className="button secondary-button"
                      onClick={cancelQualificationEdit}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>

                <h2>
                  Existing Qualifications ({qualifications.length})
                </h2>

                <div className="admin-record-list">
                  {qualifications.map((record) => (
                    <article
                      className="admin-record"
                      key={record._id}
                    >
                      <div>
                        <h3>{record.qualification}</h3>

                        <p>{record.institution}</p>

                        <p>{record.category}</p>
                      </div>

                      <div className="admin-actions">
                        <button
                          type="button"
                          className="button secondary-button"
                          onClick={() => editQualification(record)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="button danger-button"
                          onClick={() =>
                            deleteQualification(record._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* =================================
                CONTACTS SECTION
            ================================== */}
            {section === "contacts" && (
              <section className="admin-section">
                <h2>
                  {editingContact
                    ? "Edit Contact Submission"
                    : "Contact Submissions"}
                </h2>

                {editingContact && (
                  <form
                    className="admin-form"
                    onSubmit={saveContact}
                  >
                    <label htmlFor="contact-firstname">
                      First Name
                    </label>

                    <input
                      id="contact-firstname"
                      name="firstname"
                      value={contactForm.firstname}
                      onChange={handleContactChange}
                      required
                    />

                    <label htmlFor="contact-lastname">
                      Last Name
                    </label>

                    <input
                      id="contact-lastname"
                      name="lastname"
                      value={contactForm.lastname}
                      onChange={handleContactChange}
                      required
                    />

                    <label htmlFor="contact-email">
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                    />

                    <label htmlFor="contact-phone">
                      Contact Number
                    </label>

                    <input
                      id="contact-phone"
                      name="contactNumber"
                      value={contactForm.contactNumber}
                      onChange={handleContactChange}
                    />

                    <label htmlFor="contact-message">
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows="6"
                      value={contactForm.message}
                      onChange={handleContactChange}
                    />

                    <button
                      type="submit"
                      className="button primary-button"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : "Update Contact"}
                    </button>

                    <button
                      type="button"
                      className="button secondary-button"
                      onClick={cancelContactEdit}
                    >
                      Cancel Edit
                    </button>
                  </form>
                )}

                <div className="admin-contact-heading">
                  <h2>
                    All Submissions ({contacts.length})
                  </h2>

                  {contacts.length > 0 && (
                    <button
                      type="button"
                      className="button danger-button"
                      onClick={deleteAllContacts}
                    >
                      Delete All Contacts
                    </button>
                  )}
                </div>

                <div className="admin-record-list">
                  {contacts.length === 0 ? (
                    <p>No contact submissions found.</p>
                  ) : (
                    contacts.map((contact) => (
                      <article
                        className="admin-record"
                        key={contact._id}
                      >
                        <div>
                          <h3>
                            {contact.firstname} {contact.lastname}
                          </h3>

                          <p>
                            <strong>Email:</strong> {contact.email}
                          </p>

                          <p>
                            <strong>Phone:</strong>{" "}
                            {contact.contactNumber || "Not provided"}
                          </p>

                          <p>
                            <strong>Message:</strong>
                          </p>

                          <p>
                            {contact.message || "No message recorded."}
                          </p>

                          {contact.created && (
                            <p>
                              <small>
                                Submitted:{" "}
                                {new Date(
                                  contact.created
                                ).toLocaleString()}
                              </small>
                            </p>
                          )}
                        </div>

                        <div className="admin-actions">
                          <button
                            type="button"
                            className="button secondary-button"
                            onClick={() => editContact(contact)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="button danger-button"
                            onClick={() => deleteContact(contact._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* =================================
                USERS SECTION
            ================================== */}
            {section === "users" && (
              <section className="admin-section">
                <h2>
                  {editingUser ? "Edit User" : "Registered Users"}
                </h2>

                {editingUser && (
                  <form
                    className="admin-form"
                    onSubmit={saveUser}
                  >
                    <label htmlFor="user-name">
                      Name
                    </label>

                    <input
                      id="user-name"
                      name="name"
                      value={userForm.name}
                      onChange={handleUserChange}
                      required
                    />

                    <label htmlFor="user-email">
                      Email
                    </label>

                    <input
                      id="user-email"
                      name="email"
                      type="email"
                      value={userForm.email}
                      onChange={handleUserChange}
                      required
                    />

                    <label htmlFor="user-role">
                      Account Role
                    </label>

                    <select
                      id="user-role"
                      name="role"
                      value={userForm.role}
                      onChange={handleUserChange}
                    >
                      <option value="user">Regular User</option>
                      <option value="admin">Admin</option>
                    </select>

                    <label htmlFor="user-password">
                      New Password (optional)
                    </label>

                    <input
                      id="user-password"
                      name="password"
                      type="password"
                      value={userForm.password}
                      onChange={handleUserChange}
                      minLength="6"
                      placeholder="Leave empty to keep current password"
                    />

                    <button
                      type="submit"
                      className="button primary-button"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Update User"}
                    </button>

                    <button
                      type="button"
                      className="button secondary-button"
                      onClick={cancelUserEdit}
                    >
                      Cancel Edit
                    </button>
                  </form>
                )}

                <h2>
                  All Registered Users ({users.length})
                </h2>

                <div className="admin-record-list">
                  {users.length === 0 ? (
                    <p>No registered users found.</p>
                  ) : (
                    users.map((record) => {
                      const isCurrentUser =
                        String(record._id) ===
                        String(currentUser?._id);

                      return (
                        <article
                          className="admin-record"
                          key={record._id}
                        >
                          <div>
                            <h3>{record.name}</h3>

                            <p>{record.email}</p>

                            <p>
                              <strong>Role:</strong>{" "}
                              {record.role === "admin"
                                ? "Admin"
                                : "Regular User"}
                            </p>

                            {record.created && (
                              <p>
                                <small>
                                  Registered:{" "}
                                  {new Date(
                                    record.created
                                  ).toLocaleDateString()}
                                </small>
                              </p>
                            )}

                            {isCurrentUser && (
                              <p>
                                <strong>Your account</strong>
                              </p>
                            )}
                          </div>

                          <div className="admin-actions">
                            <button
                              type="button"
                              className="button secondary-button"
                              onClick={() => editUser(record)}
                              disabled={isCurrentUser}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="button danger-button"
                              onClick={() => deleteUser(record._id)}
                              disabled={isCurrentUser}
                            >
                              Delete
                            </button>
                          </div>
                        </article>
                      );
                    })
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Admin;
