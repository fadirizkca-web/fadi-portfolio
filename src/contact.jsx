import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: '',
    message: ''
  });

  function handleInputChange(event) {

    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));

  }

  function handleSubmit(event) {

    event.preventDefault();

    // The assignment does not require a backend.
    // Save the entered information locally for this demonstration.

    localStorage.setItem(
      'portfolioContactMessage',
      JSON.stringify(formData)
    );

    navigate('/', {
      state: {
        messageSubmitted: true
      }
    });

  }

  return (
    <main>

      <section className="page-banner">

        <div className="container">

          <p className="eyebrow">
            CONTACT
          </p>

          <h1>
            Contact Me
          </h1>

        </div>

      </section>

      <section className="section">

        <div className="container contact-grid">

          <div className="contact-panel">

            <h2>
              Contact Information
            </h2>

            <div className="contact-item">
              <strong>Email</strong>
              <p>
                fadi.rizk.ca@gmail.com
              </p>
            </div>

            <div className="contact-item">
              <strong>Phone</strong>
              <p>
                437-449-0090
              </p>
            </div>

            <div className="contact-item">
              <strong>Location</strong>
              <p>
                Scarborough, Ontario
              </p>
            </div>

            <div className="contact-item">
              <strong>LinkedIn</strong>
              <p>
                <a
                  href="https://www.linkedin.com/in/fadi-rizk-372328408/"
                  target="_blank"
                  rel="noreferrer"
                >
                  View LinkedIn
                </a>
              </p>
            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <h2>
              Send a Message
            </h2>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />

              </div>

            </div>

            <div className="form-group">

              <label htmlFor="contactNumber">
                Contact Number
              </label>

              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="emailAddress">
                Email Address
              </label>

              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleInputChange}
                required
              />

            </div>

            <button
              type="submit"
              className="button primary-button"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Contact;