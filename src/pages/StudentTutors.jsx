import "../styles.css";
import { useEffect } from "react";

function StudentTutors() {
  useEffect(() => {
    const subjectFilter = document.getElementById("subjectFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const cards = document.querySelectorAll(".tutor-card");

    const filterTutors = () => {
      const selectedSubject = subjectFilter.value;
      const selectedRating = ratingFilter.value;

      cards.forEach((card) => {
        const subjectMatch = selectedSubject === "all" || card.getAttribute("data-subject") === selectedSubject;
        const ratingValue = parseFloat(card.getAttribute("data-rating"));
        const ratingMatch = selectedRating === "all" || ratingValue >= parseFloat(selectedRating.replace(">= ", ""));

        card.style.display = subjectMatch && ratingMatch ? "block" : "none";
      });
    };

    subjectFilter.addEventListener("change", filterTutors);
    ratingFilter.addEventListener("change", filterTutors);

    return () => {
      subjectFilter.removeEventListener("change", filterTutors);
      ratingFilter.removeEventListener("change", filterTutors);
    };
  }, []);

  return (
    <div className="tutors-container">
      {/* Sidebar */}
      <div className="sidebar">
        <a href="/student-messages" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/topic.png" alt="Messages" />
          <span>Messages</span>
        </a>
        <a href="/student-tutors" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/classroom.png" alt="Tutors" />
          <span><strong>My Tutors</strong></span>
        </a>
        <a href="/student-subjects" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/book.png" alt="Subjects" />
          <span>Subjects</span>
        </a>
        <a href="/student-session-history" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/clock--v1.png" alt="History" />
          <span>Session History</span>
        </a>
        <a href="/student-schedule" className="sidebar-item">
          <img src="https://img.icons8.com/ios-filled/50/planner.png" alt="Schedule" />
          <span>My Schedule</span>
        </a>
      </div>

      {/* Main Content */}
      <div className="tutors-content">
        <div className="top-bar">
          <div>
            <a href="/student-dashboard" style={{ color: "black", textDecoration: "none" }}>
              ← Go back
            </a>{" "}
            | <span>Dashboard</span>
          </div>
        </div>

        <h2>My Tutors</h2>

        <div className="filter-bar">
          <label htmlFor="subjectFilter" style={{ fontWeight: "bold" }}>Filter by Subject:</label>
          <select id="subjectFilter">
            <option value="all">All</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English Literature">English Literature</option>
            <option value="Physics">Physics</option>
          </select>

          <label htmlFor="ratingFilter" style={{ fontWeight: "bold" }}>Rating:</label>
          <select id="ratingFilter">
            <option value="all">All</option>
            <option value="5.0">5.0</option>
            <option value="4.9">4.9+</option>
            <option value="4.8">4.8+</option>
          </select>
        </div>

        <div className="tutor-grid">
          <div className="tutor-card" data-subject="Mathematics" data-rating="4.9">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mr. David" />
            <h3>Mr. David</h3>
            <p>Mathematics</p>
            <p>⭐ 4.9</p>
            <button>Message</button>
          </div>
          <div className="tutor-card" data-subject="English Literature" data-rating="4.8">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ms. Clara" />
            <h3>Ms. Clara</h3>
            <p>English Literature</p>
            <p>⭐ 4.8</p>
            <button>Message</button>
          </div>
          <div className="tutor-card" data-subject="Physics" data-rating="5.0">
            <img src="https://randomuser.me/api/portraits/men/53.jpg" alt="Dr. Isaac" />
            <h3>Dr. Isaac</h3>
            <p>Physics</p>
            <p>⭐ 5.0</p>
            <button>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentTutors;
