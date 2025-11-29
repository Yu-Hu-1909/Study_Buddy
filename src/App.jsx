import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";

const navItems = [
  { id: "dashboard", label: "Dashboard", tagline: "Today at a glance", icon: "DB" },
  { id: "subjects", label: "Subjects", tagline: "Deep dives & plans", icon: "SB" },
  { id: "analytics", label: "Analytics & Report", tagline: "Progress pulse", icon: "AR" },
  { id: "profile", label: "Profile", tagline: "Personal preferences", icon: "PR" },
];

const sectionCopy = {
  dashboard: {
    eyebrow: "Vedam Dashboard",
    heading: "Contest Performance Overview",
    description: "Track your progress in monthly Java and Maths contests, identify weak points, and get AI-powered study recommendations.",
  },
  subjects: {
    eyebrow: "Contest Subjects",
    heading: "Maths, Java & Web",
    description: "Analyze your performance, review codes and solutions, and discover areas that need more practice.",
  },
  analytics: {
    eyebrow: "Performance Insights",
    heading: "Analytics & Report",
    description: "Deep dive into contest results, weak point analysis, and personalized improvement recommendations.",
  },
  profile: {
    eyebrow: "Student Profile",
    heading: "Profile & Settings",
    description: "Manage your Vedam student profile and customize your study preferences.",
  },
};

const dashboardCards = [
  {
    title: "Contest Score",
    value: "78%",
    helper: "Last month: Java Contest",
  },
  {
    title: "Weak Areas",
    value: "3 topics",
    helper: "Needs attention",
  },
  {
    title: "Practice Streak",
    value: "12 days",
    helper: "Keep it up!",
  },
  {
    title: "Helpful Questions",
    value: "8 ready",
    helper: "AI-generated for you",
  },
];

const subjectsData = [
  { 
    name: "Maths", 
    mentor: "Contest Analysis", 
    progress: 75, 
    nextFocus: "Linear Algebra",
    weakPoints: ["Matrix Operations", "Differential Equations"],
    helpfulQuestions: 5
  },
  { 
    name: "Java", 
    mentor: "Code Review", 
    progress: 68, 
    nextFocus: "Data Structures",
    weakPoints: ["Recursion", "Dynamic Programming"],
    helpfulQuestions: 8
  },
  { 
    name: "Web", 
    mentor: "Project Feedback", 
    progress: 82, 
    nextFocus: "React Hooks",
    weakPoints: ["State Management"],
    helpfulQuestions: 3
  },
];

const analyticsStats = [
  { label: "Contests Completed", value: "4", trendLabel: "This month" },
  { label: "Code Submissions", value: "23", trendLabel: "Reviewed by AI" },
  { label: "Improvement Rate", value: "15%", trendLabel: "Up from last month" },
];

const profilePreferences = [
  { label: "Vedam ID", value: "VED-2024-001" },
  { label: "Contest Participation", value: "Monthly" },
  { label: "Primary Focus", value: "Java & Maths" },
  { label: "AI Analysis", value: "Enabled" },
];

const App = () => {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    const syncSidebar = () => setSidebarOpen(media.matches);
    syncSidebar();
    media.addEventListener("change", syncSidebar);
    return () => media.removeEventListener("change", syncSidebar);
  }, []);

  const copy = useMemo(() => sectionCopy[activeSection], [activeSection]);

  const handleNavSelect = (sectionId) => {
    setActiveSection(sectionId);
    if (typeof window !== "undefined") {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) setSidebarOpen(false);
    }
  };

  const renderDashboard = () => (
    <>
      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Contest Performance</p>
            <h2>Key Metrics</h2>
          </div>
          <button className="ghost-btn" type="button">
            Export Report
          </button>
        </div>
        <div className="card-grid">
          {dashboardCards.map((card) => (
            <article key={card.title} className="stat-card">
              <p className="stat-card__label">{card.title}</p>
              <p className="stat-card__value">{card.value}</p>
              <p className="stat-card__helper">{card.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel two-column">
        <div>
          <h3>Weak Points Identified</h3>
          <p className="panel__description">
            AI analysis of your contest codes and solutions has highlighted these areas for improvement.
          </p>
          <ul className="timeline">
            <li>
              <span>Java</span>
              <div>
                Recursion Patterns
                <p>Struggled with recursive solutions in last contest</p>
              </div>
            </li>
            <li>
              <span>Maths</span>
              <div>
                Matrix Operations
                <p>Multiple errors in matrix multiplication problems</p>
              </div>
            </li>
            <li>
              <span>Web</span>
              <div>
                State Management
                <p>Need better understanding of React state flow</p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h3>Helpful Questions</h3>
          <p className="panel__description">AI-generated practice questions tailored to your weak points.</p>
          <div className="energy-widget">
            <div className="energy-widget__score">
              <span>Available</span>
              <strong>16 questions</strong>
            </div>
            <div className="energy-widget__bars">
              {[5, 8, 6, 7, 4].map((score, idx) => (
                <span key={idx} style={{ height: `${score * 8}px` }} />
              ))}
            </div>
            <div className="energy-widget__summary">
              <p>5 questions on Recursion (Java)</p>
              <p>8 questions on Matrix Ops (Maths)</p>
              <p>3 questions on State (Web)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderSubjects = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Contest Subjects</p>
          <h2>Maths, Java & Web</h2>
        </div>
        <button className="ghost-btn" type="button">
          Upload Contest Code
        </button>
      </div>
      <div className="subject-grid">
        {subjectsData.map((subject) => (
          <article key={subject.name} className="subject-card">
            <header>
              <h3>{subject.name}</h3>
              <p>{subject.mentor}</p>
            </header>
            <div className="progress-track">
              <div style={{ width: `${subject.progress}%` }} />
            </div>
            <div className="subject-card__footer">
              <span>{subject.progress}% performance</span>
              <button type="button">View Analysis</button>
            </div>
            <p className="subject-card__next">
              Next focus: <strong>{subject.nextFocus}</strong>
            </p>
            {subject.weakPoints && subject.weakPoints.length > 0 && (
              <div style={{ marginTop: "0.8rem", paddingTop: "0.8rem", borderTop: "1px solid rgba(15, 26, 47, 0.08)" }}>
                <p style={{ fontSize: "0.85rem", color: "#7a7f9f", marginBottom: "0.4rem" }}>Weak Points:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {subject.weakPoints.map((point, idx) => (
                    <span key={idx} className="chip" style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}>
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {subject.helpfulQuestions && (
              <div style={{ marginTop: "0.6rem", fontSize: "0.85rem", color: "#4f46e5" }}>
                <strong>{subject.helpfulQuestions}</strong> helpful questions ready
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );

  const renderAnalytics = () => (
    <>
      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Performance Metrics</p>
            <h2>Contest Analytics</h2>
          </div>
          <button className="ghost-btn" type="button">
            Generate PDF
          </button>
        </div>
        <div className="card-grid">
          {analyticsStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__helper">{stat.trendLabel}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="panel two-column">
        <div>
          <h3>Contest Performance Trend</h3>
          <p className="panel__description">
            Track your monthly contest scores across Maths, Java, and Web subjects.
          </p>
          <div className="heat-chart">
            {[
              { name: "Maths", scores: [72, 75, 78, 73, 76] },
              { name: "Java", scores: [65, 68, 70, 67, 69] },
              { name: "Web", scores: [80, 82, 85, 81, 83] }
            ].map((subject) => (
              <div key={subject.name} className="heat-chart__row">
                <span>{subject.name}</span>
                {subject.scores.map((score, blockIndex) => (
                  <i key={`${subject.name}-${blockIndex}`} style={{ opacity: score / 100, height: `${score / 5}px` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>AI Analysis Reports</h3>
          <p className="panel__description">Generated reports from your contest code analysis.</p>
          <ul className="report-list">
            <li>
              <div>
                <p>Java Contest Analysis</p>
                <small>Generated 2 days ago</small>
              </div>
              <button type="button">View</button>
            </li>
            <li>
              <div>
                <p>Maths Weak Points Report</p>
                <small>Ready for review</small>
              </div>
              <button type="button">Share</button>
            </li>
            <li>
              <div>
                <p>Web Project Feedback</p>
                <small>AI review completed</small>
              </div>
              <button type="button">Download</button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );

  const renderProfile = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Student Profile</p>
          <h2>Vedam Student Settings</h2>
        </div>
        <button className="ghost-btn" type="button">
          Edit profile
        </button>
      </div>
      <div className="profile-card">
        <div className="profile-card__hero">
          <div className="avatar">SJ</div>
          <div>
            <h3>Sidhant Joshi</h3>
            <p>Vedam Student · Contest Participant</p>
          </div>
          <span className="chip chip--pulse">Streak: 12 days</span>
        </div>
        <div className="profile-card__grid">
          {profilePreferences.map((pref) => (
            <article key={pref.label}>
              <p className="stat-card__label">{pref.label}</p>
              <p className="stat-card__value">{pref.value}</p>
            </article>
          ))}
        </div>
        <div className="profile-card__footer">
          <div>
            <p className="stat-card__label">Contest Notifications</p>
            <p className="stat-card__helper">Monthly Java & Maths contests · AI analysis alerts</p>
          </div>
          <button type="button">Manage</button>
        </div>
      </div>
    </section>
  );

  const renderActiveSection = () => {
    if (activeSection === "dashboard") return renderDashboard();
    if (activeSection === "subjects") return renderSubjects();
    if (activeSection === "analytics") return renderAnalytics();
    return renderProfile();
  };

  return (
    <div className="app-layout">
      <Sidebar
        items={navItems}
        activeSection={activeSection}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={handleNavSelect}
      />
      <main className="content-region">
        <header className="top-bar">
          <button
            type="button"
            className="hamburger"
            aria-label="Toggle navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="top-bar__titles">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.heading}</h1>
            <p className="panel__description">{copy.description}</p>
          </div>
          <div className="user-pill">
            <div className="avatar avatar--mini">SJ</div>
            <div>
              <p>Sidhant</p>
              <small>Focus mode · On</small>
            </div>
          </div>
        </header>
        <div className="section-wrapper">{renderActiveSection()}</div>
      </main>
    </div>
  );
};

export default App;

