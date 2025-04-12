import { useEffect } from "react";
import "../styles.css";
import AOS from "aos";
import "aos/dist/aos.css";


function HomepageTutor() {
  useEffect(() => {
    import("aos").then((AOS) => {
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
          <a href="#">Tutor tools</a>
          <a href="/contact?from=tutor">Contact us</a>
          <a href="/tutor-dashboard">My dashboard</a>
          <button className="btn-orange" onClick={handleLogout}>log out</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="home">
        <div className="left" data-aos="fade-right">
          <h1>Welcome, Tutor!</h1>
          <h2>“Empower your students with the right support.”</h2>
          <p>
            This is your teaching center! View bookings, manage sessions, and help learners grow. Your guidance matters.
          </p>
          <ul>
            <li>Manage your live sessions</li>
            <li>Connect with students 1-on-1</li>
            <li>Track progress and engagement</li>
          </ul>
          <button onClick={() => (window.location.href = "/tutor-dashboard")}>
            Go to Dashboard
          </button>
        </div>
        <div className="right" data-aos="fade-left">
          <div className="circle-bg"></div>
          <img
            src="/images/attending-class.jpg"
            alt="Tutor working"
            className="student-img"
          />
          <div className="pink-star"><div className="cross">✕</div></div>
        </div>
      </main>

      {/* Tutor Tools */}
      <section data-aos="fade-up">
        <h2>Your Tools</h2>
        <div className="grid">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Sessions" />
            <h4>My Sessions</h4>
            <p>Manage your upcoming tutoring sessions.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Reports" />
            <h4>Student Reports</h4>
            <p>Access learning progress and notes.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/709/709496.png" alt="Messages" />
            <h4>Messages</h4>
            <p>Chat and follow up with students.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" alt="Profile" />
            <h4>Profile</h4>
            <p>Edit your bio, subjects, and schedule.</p>
          </div>
        </div>
      </section>

      {/* Why Tutoring Works */}
      <section data-aos="fade-up">
        <h2>Why Tutoring with Us Works</h2>
        <div className="grid">
          <div className="card"><h4>Flexible Scheduling</h4><p>Choose your hours. Teach when it suits you.</p></div>
          <div className="card"><h4>Fair Compensation</h4><p>Competitive pay and timely payouts for your sessions.</p></div>
          <div className="card"><h4>Impactful Teaching</h4><p>Work 1-on-1 to see direct student growth and feedback.</p></div>
          <div className="card"><h4>Supportive Platform</h4><p>We handle scheduling, payments, and student outreach—so you can focus on teaching.</p></div>
        </div>
      </section>

      {/* Tutor Tips */}
      <section data-aos="fade-up">
        <h2>Teaching Tips & Success Boosters</h2>
        <div className="grid">
          <div className="card"><h4>Student-Centered Approach</h4><p>Adapt to your student's pace and needs.</p></div>
          <div className="card"><h4>Ask More Questions</h4><p>Use questioning techniques to boost engagement.</p></div>
          <div className="card"><h4>Track & Review</h4><p>Give short recaps at the end of each session.</p></div>
          <div className="card"><h4>Use Visual Aids</h4><p>Incorporate diagrams, whiteboards, and tools.</p></div>
          <div className="card"><h4>Be Encouraging</h4><p>Celebrate effort as much as achievement.</p></div>
        </div>
      </section>

      {/* Help Section */}
      <section data-aos="fade-up">
        <h2>Need Help?</h2>
        <p>
          Have questions or need support?{" "}
          <a href="/contact?from=tutor" style={{ color: "#f57c00" }}>
            Contact the support team
          </a>.
        </p>
      </section>

      {/* Footer */}
      <footer>
        &copy; 2025 EzPremium Tutors. All rights reserved.
        <br />
        <a href="/tutor-dashboard">Dashboard</a> |
        <a href="/contact">Contact</a> |
        <a href="#">Terms</a> |
        <a href="#">FAQs</a>
      </footer>
    </div>
  );
}

export default HomepageTutor;
