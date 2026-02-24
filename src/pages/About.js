import "./About.css";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Ruhen Rai</h1>
          <p className="tagline">Designer & Visual Storyteller</p>
          <p className="subtitle">
            Bringing ideas to life through bold design, unexpected aesthetics, and a love for pushing creative boundaries.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-content">
          <h2>Who I Am</h2>
          <p>
            I'm a designer obsessed with creating visuals that spark conversations. Whether it's a poster that stops you mid-scroll, 
            an album cover that makes you feel something, or a magazine layout that tells a story—I'm here to make it happen.
          </p>
          <p>
            My work blends retro sensibilities with modern production, mixing typography, photography, illustration, and color 
            in ways that are unexpected but purposeful. Every project gets my full attention and creative energy.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-section services">
        <div className="section-content">
          <h2>What I Do</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Posters & Print</h3>
              <p>Eye-catching designs for events, promotions, and personal projects.</p>
            </div>
            <div className="service-item">
              <h3>Album & Music Covers</h3>
              <p>Visual identities that capture the essence of your sound.</p>
            </div>
            <div className="service-item">
              <h3>Magazine & Editorial</h3>
              <p>Layouts and designs for publications with personality.</p>
            </div>
            <div className="service-item">
              <h3>Thumbnails & Web</h3>
              <p>Scroll-stopping visuals that drive clicks and engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="about-section approach">
        <div className="section-content">
          <h2>My Approach</h2>
          <p>
            I don't believe in one-size-fits-all design. Every project starts with understanding your vision, 
            then pushing it further. I combine clean aesthetics with bold choices, cultural references with contemporary feels, 
            and technical skill with creative intuition.
          </p>
          <p>
            The result? Work that stands out, feels authentic, and actually moves people.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Let's Work Together</h2>
          <p>Got a project in mind? Whether it's big or experimental, I'm always excited to collaborate.</p>
          <button 
            className="cta-button"
            onClick={() => navigate("/gallery")}
          >
            View My Work
          </button>
          <p className="contact-text">
            Or reach out at <span className="contact-email">syedraiyanali23544@gmail.com</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
