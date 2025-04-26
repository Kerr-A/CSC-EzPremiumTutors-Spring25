import { useEffect } from "react";
import "../styles.css";
import AOS from "aos";
import "aos/dist/aos.css";


function Index() {
  useEffect(() => {
    import("aos").then((AOS) => AOS.init({ duration: 1000, once: true }));
  }, []);

  return (
    <div className="home-bg">
      {/* Glowing Background */}
      <div className="glow-circle"></div>
      <div className="glow-circle delay-1"></div>
      <div className="glow-circle delay-2"></div>

      {/* Header */}
      <header>
        <h2 className="logo">EzPremium Tutors</h2>
        <nav>
          <a href="/login">Student Login</a>
          <a href="/login-tutor">Tutor Login</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="home">
        <div className="left" data-aos="fade-right">
          <h1>Welcome to EzPremium Tutors</h1>
          <h2>“Empowering education through personalized tutoring.”</h2>
          <p>
            Whether you're a student seeking support or a tutor ready to inspire,
            EzPremium Tutors is your gateway to growth. Connect, learn, and thrive!
          </p>
          <ul>
            <li>Expert tutors in Math, Science, English, and more</li>
            <li>Flexible scheduling that fits your lifestyle</li>
            <li>One-on-one sessions with progress tracking</li>
          </ul>
          <div style={{ marginTop: "1.5rem" }}>
            <a href="/signup">
              <button className="btn-orange">Join as Student</button>
            </a>
            <a href="/signup-tutor" style={{ marginLeft: "1rem" }}>
              <button className="btn-green">Become a Tutor</button>
            </a>
          </div>
        </div>

        <div className="right" data-aos="fade-left">
          <div className="circle-bg"></div>
          <img
            src="/images/attending-class.jpg"
            alt="Learning"
            className="student-img"
          />
          <div className="pink-star"><div className="cross">✕</div></div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 EzPremium Tutors. All rights reserved.
        <br />
        <a href="/login">Student Login</a> |
        <a href="/login-tutor">Tutor Login</a> |
        <a href="/contact">Contact</a> |
        <a href="#">FAQs</a>
      </footer>
    </div>
  );
}

export default Index;
