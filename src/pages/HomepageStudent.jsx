import { useEffect } from "react";
import "../styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
ed

function HomepageStudent() {
  useEffect(() => {
    // Initialize AOS animation
    import("aos").then(AOS => {
      AOS.init({ duration: 1000, once: true });
    });
  }, []);

  const handleLogout = () => {
    alert("You have been logged out.");
    window.location.href = "/";
  };

  return (
    <div className="home-bg dashboard">
      {/* Glowing Circles */}
      <div className="glow-circle" aria-hidden="true"></div>
      <div className="glow-circle delay-1" aria-hidden="true"></div>
      <div className="glow-circle delay-2" aria-hidden="true"></div>

      {/* Header */}
      <header>
        <h2 className="logo">EzPremium Tutors</h2>
        <nav>
          <a href="/student-tutors">Find a tutor</a>
          <a href="#">Become a tutor</a>
          <a href="/contact?from=student">Contact us</a>
          <a href="/student-dashboard">My dashboard</a>
          <button className="btn-orange" onClick={handleLogout}>log out</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="home">
        <div className="left" data-aos="fade-right">
          <h1>Welcome, Student!</h1>
          <h2>“Unlock your potential with the right guidance.”</h2>
          <p>This is your learning center! Browse tutors, join sessions, and track progress with ease.</p>
          <ul>
            <li>Connect with qualified tutors</li>
            <li>Schedule sessions easily</li>
            <li>Track your academic growth</li>
          </ul>
          <button onClick={() => (window.location.href = "/student-dashboard")}>
            Go to Dashboard
          </button>
        </div>
        <div className="right" data-aos="fade-left">
          <div className="circle-bg"></div>
          <img
            src="/images/attending-class.jpg"
            alt="Student studying"
            className="student-img"
          />
          <div className="pink-star"><div className="cross">✕</div></div>
        </div>
      </main>

      {/* Student Tools */}
      <section data-aos="fade-up">
        <h2>Your Tools</h2>
        <div className="grid">
          <div className="card"><img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" /><h4>My Sessions</h4><p>Join and review your upcoming sessions.</p></div>
          <div className="card"><img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" /><h4>Notes & Reports</h4><p>Access your learning reports and session notes.</p></div>
          <div className="card"><img src="https://cdn-icons-png.flaticon.com/512/709/709496.png" /><h4>Messages</h4><p>Chat with your tutors and ask follow-ups.</p></div>
          <div className="card"><img src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" /><h4>Profile</h4><p>Update your account and academic goals.</p></div>
        </div>
      </section>

      {/* Why Learning With Us Works */}
      <section data-aos="fade-up">
        <h2>Why Students Love Learning Here</h2>
        <div className="grid">
          <div className="card"><h4>Flexible Scheduling</h4><p>Book sessions when it fits your routine.</p></div>
          <div className="card"><h4>Expert Tutors</h4><p>Learn from highly qualified professionals.</p></div>
          <div className="card"><h4>Focused Progress</h4><p>Track your progress and areas of growth.</p></div>
          <div className="card"><h4>Stress-Free Learning</h4><p>We make it simple, fun, and engaging.</p></div>
        </div>
      </section>

      {/* Study Tips */}
      <section data-aos="fade-up">
        <h2>Study Tips & Boosters</h2>
        <div className="grid">
          <div className="card"><h4>Plan Ahead</h4><p>Keep a weekly planner and review deadlines.</p></div>
          <div className="card"><h4>Ask Questions</h4><p>Don’t hesitate to clarify your doubts early.</p></div>
          <div className="card"><h4>Use Visual Aids</h4><p>Mind maps and flashcards help retain info.</p></div>
          <div className="card"><h4>Stay Consistent</h4><p>Make learning a daily habit.</p></div>
          <div className="card"><h4>Take Breaks</h4><p>Short breaks boost focus and reduce burnout.</p></div>
        </div>
      </section>

      {/* Help Section */}
      <section data-aos="fade-up">
        <h2>Need Help?</h2>
        <p>
          Have questions or need support?{" "}
          <a href="/contact?from=student" style={{ color: "#f57c00" }}>
            Contact the support team
          </a>.
        </p>
      </section>

      {/* Footer */}
      <footer>
        &copy; 2025 EzPremium Tutors. All rights reserved.<br />
        <a href="/student-dashboard">Dashboard</a> |
        <a href="/contact">Contact</a> |
        <a href="#">Terms</a> |
        <a href="#">FAQs</a>
      </footer>
    </div>
  );
}

export default HomepageStudent;
