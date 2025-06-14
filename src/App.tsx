import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import { Button } from './Button';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Feedback } from './Feedback';
import './App.css';

export default function App() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error(error);
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Synkerr Careers</h1>
        {!user && (
          <Button
            onClick={signInWithGoogle}
            className="sign-in-button"
            label="Apply Now"
          />
        )}
      </header>

      <main className="app-main">
        {!user && (
          <div className="hero-text">
            <h1 className="hero-title">
              We are <span className="highlight">Recruiting</span>
            </h1>
            <p className="hero-description">
              At Synkerr, we are redefining teamwork and collaboration. Here's
              why your next career move should be with us:
            </p>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3 className="benefit-title">
                  Employee Stock Options (ESOPs)
                </h3>
                <p className="benefit-description">
                  Be a part of our journey and own a stake in the company's
                  success. Your growth is our growth.
                </p>
              </div>
              <div className="benefit-item">
                <h3 className="benefit-title">Your Future at Synkerr</h3>
                <p className="benefit-description">
                  As Synkerr grows, you'll have the chance to grow with the
                  team, earn salaries over time, and potentially take on
                  leadership roles within a few years.
                </p>
              </div>
              <div className="benefit-item">
                <h3 className="benefit-title">Certifications & Growth</h3>
                <p className="benefit-description">
                  Get recognized for your efforts with industry-standard
                  certifications and continuous learning opportunities.
                </p>
              </div>
              <div className="benefit-item">
                <h3 className="benefit-title">Work with IITians and NITians</h3>
                <p className="benefit-description">
                  We prioritize flexibility and mental well-being so you can
                  achieve your best work without compromising your personal
                  life.
                </p>
              </div>
            </div>
          </div>
        )}

        {user ? (
          <>
            <Button
              onClick={() => signOut(auth)}
              className="sign-out-button"
              label="Sign Out"
            />
            <Feedback user={user} />
          </>
        ) : (
          <div className="sign-in-container">
            <h1 className="roles-heading">
              <b>Roles Open</b>
            </h1>
            <div className="job-section">
              <img
                src="/video.png"
                alt="Video Editor"
                className="job-image-large"
              />
              <div className="job-description">
                <b>
                  <h2>Video Editor</h2>
                </b>
                <i>
                  <p>
                    Join our creative team to produce engaging video content
                    that tells our story and connects with our audience.
                  </p>
                </i>
              </div>
            </div>
            <div className="job-section">
              <img
                src="/web.png"
                alt="Web Developer"
                className="job-image-web"
              />
              <div className="job-description">
                <b>
                  <h2>Web Developer</h2>
                </b>
                <i>
                  <p>
                    Help us build and maintain our web presence, ensuring a
                    seamless experience for our users.
                  </p>
                </i>
              </div>
            </div>
            <Button
              onClick={signInWithGoogle}
              className="sign-in-button"
              label="Apply Now"
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            &copy; 2024 Synkerr Pvt Ltd; Empowering Collaborations and Team Up.
          </p>
          <div className="social-media-links">
            <a
              href="https://www.instagram.com/synk.err"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/@synkerr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/synkerr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:collab@synkerr.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
