// ╔══════════════════════════════════════════════════════════════════╗
// ║         STUDENT DASHBOARD — NO BACKEND (Standalone Mock)        ║
// ║  All data is local mock data. No API calls are made.            ║
// ║  To connect backend later: see IndustryDashboard_WithBackend    ║
// ║  and follow the same API_BASE + useEffect pattern.              ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const mockUsers = [
  {
    id: 2, name: "Simmi kumari", username: "simmi456", photo: null,
    qualification: "MCA", email: "simmi@test.com", phone: "9876543210",
    address: "City A", tenth: "School A", twelfth: "School B", graduation: "College C",
    certificates: [{ url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=200&fit=crop", type: "image/png" }],
    personalPosts: [{ url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=200&fit=crop", type: "image/png" }],
    resumes: [], skills: ["Python", "Django", "SQL"], about: "MCA student passionate about backend development.",
  },
  {
    id: 3, name: "Ankit Verma", username: "ankit789", photo: null,
    qualification: "B.Tech", email: "ankit@test.com", phone: "8765432109",
    address: "City B", tenth: "School X", twelfth: "School Y", graduation: "College Z",
    certificates: [], personalPosts: [], resumes: [], skills: ["UI/UX", "Figma", "CSS"],
    about: "B.Tech student specializing in frontend and design.",
  },
];

const mockIndustries = [
  { id: 1, name: "TechNova Solutions", logo: "TN", domain: "Cloud Computing", location: "Bangalore", tagline: "Cloud Native Excellence" },
  { id: 2, name: "Quantum AI", logo: "QA", domain: "Artificial Intelligence", location: "Hyderabad", tagline: "Pioneering AI" },
  { id: 3, name: "Nexus Fintech", logo: "NF", domain: "Blockchain", location: "Mumbai", tagline: "Next-Gen Finance" },
  { id: 999, name: "Global Tech Corp", logo: "GT", domain: "IT Services", location: "New Delhi", tagline: "Innovating the Future" },
];

const mockCourses = [
  { id: 1, title: "React.js Complete Guide", provider: "Udemy", duration: "40 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop", rating: 4.8, students: "125K", field: "BCA" },
  { id: 2, title: "Data Structures & Algorithms", provider: "Coursera", duration: "60 hrs", level: "Advanced", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop", rating: 4.9, students: "200K", field: "BCA" },
  { id: 3, title: "Node.js Backend Development", provider: "Pluralsight", duration: "35 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop", rating: 4.7, students: "80K", field: "BCA" },
  { id: 4, title: "AWS Cloud Practitioner", provider: "AWS", duration: "20 hrs", level: "Beginner", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop", rating: 4.6, students: "300K", field: "BCA" },
  { id: 5, title: "Machine Learning A-Z", provider: "Udemy", duration: "55 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop", rating: 4.8, students: "310K", field: "MCA" },
  { id: 6, title: "Django REST Framework", provider: "Pluralsight", duration: "30 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop", rating: 4.6, students: "95K", field: "MCA" },
  { id: 7, title: "System Design Fundamentals", provider: "Coursera", duration: "45 hrs", level: "Advanced", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop", rating: 4.9, students: "180K", field: "B.Tech" },
];

const jobData = [
  { title: "Frontend Developer", company: "TechCorp India", companyId: 1, type: "Full-time", location: "Bangalore", salary: "6–10 LPA", skills: "React, CSS, TypeScript", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop" },
  { title: "Java Backend Engineer", company: "Infosys Ltd.", companyId: 2, type: "Hybrid", location: "Pune", salary: "5–9 LPA", skills: "Java, Spring Boot, AWS", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop" },
  { title: "Data Analyst", company: "Analytics Co.", companyId: 3, type: "Remote", location: "Mumbai", salary: "4–8 LPA", skills: "Python, SQL, Tableau", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop" },
];

const sharedVacancyFeed = [
  {
    id: 101, ownerId: 999, ownerName: "Global Tech Corp", ownerLogo: "GT",
    type: "Internship", title: "MERN Stack Intern",
    desc: "Seeking proactive students with React and Node.js expertise for our New Delhi office. You will work alongside senior engineers on live client projects.",
    skills: "React, Node.js, Express, MongoDB", duration: "6 Months",
    offerings: "Stipend of ₹20,000/month, Pre-placement offer, Mentorship",
    date: "2 hours ago", likes: 24,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: 102, ownerId: 2, ownerName: "Quantum AI", ownerLogo: "QA",
    type: "Job Vacancy", title: "AI Research Associate",
    desc: "Join our neural network research team in Hyderabad. PhD or Masters preferred. Remote work options available.",
    skills: "Python, PyTorch, Deep Learning, Mathematics", duration: "Full-Time",
    offerings: "Competitive Salary, Health Insurance, Research Grants",
    date: "3 days ago", likes: 89,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    id: 103, ownerId: 999, ownerName: "Global Tech Corp", ownerLogo: "GT",
    type: "Job Vacancy", title: "Senior Product Designer",
    desc: "Looking for an experienced designer to lead our enterprise software UI/UX revamps. Portfolio required.",
    skills: "Figma, User Research, Design Systems, Prototyping", duration: "Full-Time",
    offerings: "Equity Options, Remote work allowance, Annual Retreats",
    date: "1 week ago", likes: 65,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    id: 104, ownerId: 1, ownerName: "TechNova Solutions", ownerLogo: "TN",
    type: "Internship", title: "Cloud DevOps Intern",
    desc: "Help us build and maintain CI/CD pipelines on AWS and Azure. Great learning opportunity for cloud enthusiasts.",
    skills: "AWS, Docker, Kubernetes, Linux", duration: "3 Months",
    offerings: "Stipend ₹15,000/month, Certificate, PPO Possibility",
    date: "5 days ago", likes: 43,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
];

const levelStyle = {
  Beginner:     { bg: "#e6f9f0", color: "#1a7a4a", border: "#b3e8cc" },
  Intermediate: { bg: "#fff8e6", color: "#9a6400", border: "#ffd97a" },
  Advanced:     { bg: "#fdeef1", color: "#b5192d", border: "#f5b3bc" },
};

const typeStyle = {
  "Full-time": { bg: "#ede9fe", color: "#5b21b6" },
  "Hybrid":    { bg: "#dbeafe", color: "#1d4ed8" },
  "Remote":    { bg: "#e6faf5", color: "#0a7a58" },
};

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,700;0,800;1,700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink: #111318;
  --ink-2: #3d4250;
  --ink-3: #6b7280;
  --ink-4: #9ca3af;
  --line: #e9eaec;
  --line-soft: #f3f4f6;
  --surface: #ffffff;
  --bg: #f5f6f8;
  --accent: #2563eb;
  --accent-soft: #eff4ff;
  --accent-mid: #93c5fd;
  --green: #059669;
  --green-soft: #ecfdf5;
  --amber: #d97706;
  --amber-soft: #fffbeb;
  --rose: #e11d48;
  --violet: #7c3aed;
  --violet-soft: #f5f3ff;
  --r-xs: 8px;
  --r-sm: 12px;
  --r: 16px;
  --r-lg: 20px;
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow: 0 4px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06);
}

body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--line); border-radius: 99px; }

.nav {
  height: 56px; background: var(--surface);
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 1.5rem; position: sticky; top: 0; z-index: 200;
  box-shadow: var(--shadow-xs);
}
.brand { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 800; color: var(--accent); letter-spacing: -0.03em; }
.brand-sub { font-size: 0.6rem; font-weight: 600; color: var(--ink-4); letter-spacing: 0.12em; text-transform: uppercase; line-height: 1; }
.search-shell { position: relative; }
.search-box {
  width: 260px; padding: 0.48rem 0.9rem 0.48rem 2.2rem;
  border: 1px solid var(--line); border-radius: 99px;
  background: var(--bg); font-family: inherit; font-size: 0.82rem; color: var(--ink);
  outline: none; transition: 0.18s;
}
.search-box:focus { border-color: var(--accent); background: var(--surface); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.search-box::placeholder { color: var(--ink-4); }
.search-ico { position: absolute; left: 0.72rem; top: 50%; transform: translateY(-50%); color: var(--ink-4); font-size: 0.75rem; pointer-events: none; }
.search-drop {
  position: absolute; top: calc(100% + 6px); left: 0; width: 100%;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--r); overflow: hidden; box-shadow: var(--shadow-lg); z-index: 300;
}
.search-row { display: flex; align-items: center; gap: 0.65rem; padding: 0.6rem 0.9rem; cursor: pointer; transition: background 0.12s; }
.search-row:hover { background: var(--bg); }
.search-row-name { font-size: 0.82rem; font-weight: 600; }
.search-row-meta { font-size: 0.7rem; color: var(--ink-3); }
.nav-right { display: flex; align-items: center; gap: 0.55rem; }
.nav-pill {
  padding: 0.35rem 0.9rem; border-radius: 99px;
  background: transparent; border: 1px solid var(--line);
  font-size: 0.75rem; font-weight: 600; color: var(--ink-3); cursor: pointer;
  transition: 0.15s; font-family: inherit; white-space: nowrap;
}
.nav-pill:hover { background: var(--bg); color: var(--ink-2); border-color: var(--ink-4); }
.nav-pill.active { background: var(--accent); color: white; border-color: transparent; box-shadow: 0 2px 8px rgba(37,99,235,0.25); }
.nav-avatar {
  width: 34px; height: 34px; border-radius: var(--r-xs);
  background: var(--accent); color: white;
  font-family: 'Fraunces', serif; font-weight: 800; font-size: 0.88rem;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 2px 8px rgba(37,99,235,0.28); transition: transform 0.15s; overflow: hidden;
}
.nav-avatar:hover { transform: scale(1.06); }
.notif-btn {
  width: 34px; height: 34px; border-radius: var(--r-xs);
  background: var(--surface); border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.85rem; position: relative; transition: 0.15s;
}
.notif-btn:hover { background: var(--bg); }
.notif-dot { position: absolute; top: 5px; right: 5px; width: 6px; height: 6px; background: var(--rose); border-radius: 50%; border: 1.5px solid white; }

.layout { display: flex; min-height: calc(100vh - 56px); }

.sidebar-panel {
  width: 300px; min-width: 300px;
  background: var(--surface); border-right: 1px solid var(--line);
  height: calc(100vh - 56px); position: sticky; top: 56px;
  overflow-y: auto; flex-shrink: 0;
}
.sidebar-panel.right { border-right: none; border-left: 1px solid var(--line); }

.panel-top {
  padding: 1.25rem 1.25rem 1rem;
  background: var(--accent); position: relative; overflow: hidden;
}
.panel-top::after {
  content: ''; position: absolute;
  width: 120px; height: 120px; border-radius: 50%;
  background: rgba(255,255,255,0.06);
  bottom: -40px; right: -30px;
}
.panel-av {
  width: 44px; height: 44px; border-radius: 11px;
  background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.25);
  color: white; font-family: 'Fraunces', serif; font-weight: 800; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.panel-uname { font-family: 'Fraunces', serif; font-size: 0.95rem; font-weight: 800; color: white; line-height: 1.25; }
.panel-handle { font-size: 0.68rem; color: rgba(255,255,255,0.5); margin-top: 1px; }
.panel-qual-badge {
  display: inline-flex; align-items: center; margin-top: 0.6rem;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.16);
  border-radius: 99px; padding: 0.18rem 0.65rem;
  font-size: 0.68rem; color: rgba(255,255,255,0.85); font-weight: 600;
  position: relative; z-index: 1;
}
.edit-btn {
  padding: 0.28rem 0.75rem; border-radius: var(--r-xs);
  border: 1.5px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.88); font-size: 0.72rem; font-weight: 600;
  cursor: pointer; transition: 0.18s; flex-shrink: 0; font-family: inherit;
}
.edit-btn:hover { background: rgba(255,255,255,0.2); }
.close-x {
  padding: 0.26rem 0.68rem; border-radius: var(--r-xs);
  border: 1.5px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.78); font-size: 0.7rem; cursor: pointer;
  font-family: inherit; transition: 0.18s;
}
.close-x:hover { background: rgba(220,38,38,0.38); }

.form-section { padding: 0.9rem 1.1rem; border-bottom: 1px solid var(--line-soft); }
.form-section-title { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem; }
.form-field { display: flex; flex-direction: column; gap: 0.2rem; }
.form-label { font-size: 0.67rem; font-weight: 600; color: var(--ink-3); }
.form-input {
  padding: 0.46rem 0.8rem; border-radius: var(--r-sm);
  border: 1px solid var(--line); background: var(--bg);
  font-family: inherit; font-size: 0.8rem; color: var(--ink); outline: none; transition: 0.18s;
}
.form-input:focus { border-color: var(--accent); background: var(--surface); box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
.form-input::placeholder { color: var(--ink-4); }
.upload-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.4rem; width: 100%;
  padding: 0.55rem; border-radius: var(--r-sm);
  border: 1.5px dashed var(--line); background: var(--bg);
  color: var(--ink-3); font-size: 0.78rem; font-weight: 500; cursor: pointer;
  transition: 0.18s; font-family: inherit;
}
.upload-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }

.knowmore-section { padding: 0.9rem 1.1rem; border-bottom: 1px solid var(--line-soft); }
.knowmore-btn { display: flex; align-items: center; gap: 0.4rem; background: none; border: none; font-family: inherit; font-size: 0.8rem; font-weight: 600; color: var(--accent); cursor: pointer; transition: 0.15s; }
.knowmore-btn:hover { opacity: 0.65; }
.details-box { margin-top: 0.65rem; background: var(--bg); border: 1px solid var(--line); border-radius: var(--r-sm); overflow: hidden; }
.details-row { display: flex; align-items: center; gap: 0.55rem; padding: 0.5rem 0.85rem; border-bottom: 1px solid var(--line-soft); font-size: 0.78rem; color: var(--ink-2); font-weight: 500; }
.details-row:last-child { border-bottom: none; }
.details-section-head { padding: 0.35rem 0.85rem; background: var(--accent-soft); font-size: 0.63rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); border-bottom: 1px solid var(--line-soft); }

.feed-section { padding: 0.9rem 1.1rem; }
.feed-title { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.65rem; }
.posts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; }
.post-cell { aspect-ratio: 1; border-radius: var(--r-xs); overflow: hidden; position: relative; background: var(--line); border: 1px solid var(--line-soft); }
.post-cell img, .post-cell video { width: 100%; height: 100%; object-fit: cover; }
.post-del { position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; border-radius: 5px; background: rgba(255,255,255,0.9); border: none; color: var(--rose); font-size: 0.55rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.15s; }
.post-del:hover { background: var(--rose); color: white; }
.empty-feed { font-size: 0.76rem; color: var(--ink-4); padding: 0.2rem 0; }
.h-divider { border: none; border-top: 1px solid var(--line-soft); }

.resume-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.55rem 0.8rem; border-radius: var(--r-sm); background: var(--accent-soft); border: 1px solid rgba(37,99,235,0.1); margin-bottom: 0.45rem; }
.resume-icon { font-size: 1.1rem; flex-shrink: 0; }
.resume-name { font-size: 0.78rem; font-weight: 600; color: var(--ink); flex: 1; }
.resume-del { background: none; border: none; color: var(--rose); cursor: pointer; font-size: 0.72rem; font-weight: 700; font-family: inherit; }
.resume-del:hover { text-decoration: underline; }

.content { flex: 1; padding: 1.5rem 1.75rem; min-width: 0; overflow-y: auto; max-height: calc(100vh - 56px); }
.content:has(.feed-scroll-host) { overflow-y: hidden; }

.feed-layout { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }
.feed-scroll-host { overflow: hidden; max-height: calc(100vh - 56px - 3rem - 48px); }
.feed-left-col { overflow-y: auto; max-height: calc(100vh - 56px - 3rem - 48px); padding-right: 0.25rem; }
.feed-left-col::-webkit-scrollbar { width: 3px; }
.feed-left-col::-webkit-scrollbar-thumb { background: var(--line); border-radius: 99px; }
.feed-right-col { overflow-y: auto; max-height: calc(100vh - 56px - 3rem - 48px); padding-left: 0.1rem; }
.feed-right-col::-webkit-scrollbar { width: 3px; }
.feed-right-col::-webkit-scrollbar-thumb { background: var(--line); border-radius: 99px; }

.post-card {
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--r); padding: 1rem 1.1rem;
  margin-bottom: 0.85rem; transition: box-shadow 0.18s; position: relative;
}
.post-card:hover { box-shadow: var(--shadow); }
.post-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.7rem; }
.post-owner { display: flex; align-items: center; gap: 0.65rem; }
.owner-avatar {
  width: 36px; height: 36px; border-radius: 9px;
  background: var(--accent-soft); color: var(--accent);
  font-family: 'Fraunces', serif; font-weight: 800; font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  border: 1px solid rgba(37,99,235,0.12);
}
.owner-name { font-weight: 700; font-size: 0.86rem; color: var(--ink); line-height: 1.2; }
.owner-meta { font-size: 0.7rem; color: var(--ink-4); }
.type-chip { padding: 0.18rem 0.6rem; border-radius: 99px; font-size: 0.66rem; font-weight: 700; white-space: nowrap; }
.chip-internship { background: #ede9fe; color: #5b21b6; }
.chip-job { background: #e0f2fe; color: #0369a1; }
.chip-update { background: #dcfce7; color: #166534; }
.post-img { width: 100%; height: 165px; object-fit: cover; border-radius: 10px; margin-bottom: 0.7rem; display: block; }
.post-title { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 700; color: var(--ink); margin-bottom: 0.3rem; line-height: 1.3; }
.post-desc { font-size: 0.8rem; color: var(--ink-3); line-height: 1.58; margin-bottom: 0.65rem; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 0.65rem; }
.skill-tag { background: var(--bg); color: var(--ink-2); padding: 2px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 600; border: 1px solid var(--line); }
.post-actions { display: flex; align-items: center; gap: 0.65rem; padding-top: 0.6rem; border-top: 1px solid var(--line-soft); }
.act-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.76rem; font-weight: 600; color: var(--ink-3); display: flex; align-items: center; gap: 4px; padding: 3px 7px; border-radius: 6px; transition: 0.12s; }
.act-btn:hover { background: var(--bg); color: var(--ink); }
.act-btn.liked { color: var(--accent); }
.apply-pill {
  margin-left: auto; padding: 0.3rem 0.9rem; border-radius: 99px;
  background: var(--accent); color: white; border: none; cursor: pointer;
  font-family: inherit; font-size: 0.72rem; font-weight: 700;
  box-shadow: 0 2px 8px rgba(37,99,235,0.22); transition: 0.15s;
}
.apply-pill:hover { opacity: 0.88; transform: translateY(-1px); }
.applied-pill { margin-left: auto; padding: 0.3rem 0.9rem; border-radius: 99px; background: var(--green-soft); color: var(--green); font-size: 0.72rem; font-weight: 700; }

.right-col { display: flex; flex-direction: column; gap: 1rem; position: sticky; top: 1.5rem; }
.widget { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; }
.widget-head { padding: 0.8rem 1rem; border-bottom: 1px solid var(--line-soft); display: flex; align-items: center; justify-content: space-between; }
.widget-title { font-size: 0.78rem; font-weight: 700; color: var(--ink); }
.widget-link { font-size: 0.7rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; font-family: inherit; transition: 0.12s; }
.widget-link:hover { opacity: 0.65; }
.company-row { padding: 0.65rem 1rem; border-bottom: 1px solid var(--line-soft); display: flex; align-items: center; gap: 0.65rem; cursor: pointer; transition: background 0.12s; }
.company-row:last-child { border-bottom: none; }
.company-row:hover { background: var(--bg); }
.company-logo { width: 34px; height: 34px; border-radius: 8px; background: var(--accent); color: white; font-family: 'Fraunces', serif; font-weight: 800; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.company-name { font-weight: 600; font-size: 0.82rem; color: var(--ink); }
.company-domain { font-size: 0.68rem; color: var(--ink-4); }
.follow-btn { margin-left: auto; padding: 0.26rem 0.75rem; border-radius: 99px; border: 1.5px solid var(--accent); color: var(--accent); background: none; font-family: inherit; font-size: 0.68rem; font-weight: 700; cursor: pointer; transition: 0.15s; white-space: nowrap; }
.follow-btn:hover { background: var(--accent); color: white; }
.quick-stats { padding: 0.9rem 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.stat-box { background: var(--bg); border-radius: var(--r-sm); padding: 0.7rem 0.75rem; }
.stat-num { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 800; color: var(--ink); }
.stat-label { font-size: 0.66rem; font-weight: 600; color: var(--ink-4); margin-top: 1px; }

.page-section { margin-bottom: 2rem; }
.sec-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 1rem; }
.sec-title { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 800; color: var(--ink); }
.sec-sub { font-size: 0.74rem; color: var(--ink-3); margin-left: 0.45rem; }
.sec-link { font-size: 0.76rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; font-family: inherit; transition: 0.15s; }
.sec-link:hover { opacity: 0.65; }

.jobs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
.job-card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; cursor: pointer; box-shadow: var(--shadow-xs); transition: 0.22s; }
.job-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); border-color: rgba(37,99,235,0.2); }
.job-img { width: 100%; height: 110px; object-fit: cover; display: block; }
.job-body { padding: 0.9rem; }
.job-company { font-size: 0.65rem; font-weight: 700; color: var(--ink-4); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.25rem; }
.job-title-text { font-family: 'Fraunces', serif; font-size: 0.92rem; font-weight: 700; color: var(--ink); margin-bottom: 0.5rem; line-height: 1.3; }
.job-tags { display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; margin-bottom: 0.55rem; }
.badge { display: inline-flex; align-items: center; padding: 0.14rem 0.5rem; border-radius: 99px; font-size: 0.63rem; font-weight: 700; border: 1.5px solid; }
.job-salary { font-size: 0.74rem; color: var(--green); font-weight: 700; margin-bottom: 0.65rem; }
.apply-btn { width: 100%; padding: 0.48rem; border-radius: 99px; border: none; background: var(--accent); color: white; font-family: 'Fraunces', serif; font-size: 0.76rem; font-weight: 700; cursor: pointer; box-shadow: 0 3px 10px rgba(37,99,235,0.22); transition: 0.18s; }
.apply-btn:hover { opacity: 0.88; transform: translateY(-1px); }

.courses-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.9rem; }
.course-card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; cursor: pointer; box-shadow: var(--shadow-xs); transition: 0.22s; }
.course-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.course-img-wrap { position: relative; }
.course-img { width: 100%; height: 100px; object-fit: cover; display: block; }
.level-chip { position: absolute; top: 6px; right: 6px; padding: 0.13rem 0.46rem; border-radius: 99px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; border: 1.5px solid; }
.course-body { padding: 0.8rem; }
.course-prov { font-size: 0.64rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: var(--accent); margin-bottom: 0.25rem; }
.course-name { font-family: 'Fraunces', serif; font-size: 0.82rem; font-weight: 700; color: var(--ink); line-height: 1.3; margin-bottom: 0.45rem; }
.course-meta { display: flex; gap: 0.5rem; font-size: 0.68rem; color: var(--ink-4); margin-bottom: 0.65rem; }
.course-ft { display: flex; align-items: center; justify-content: space-between; }
.rating { display: flex; align-items: center; gap: 0.2rem; font-size: 0.75rem; font-weight: 700; color: var(--amber); }
.enroll-btn { padding: 0.32rem 0.78rem; border-radius: 99px; background: var(--accent); color: white; font-family: 'Fraunces', serif; font-size: 0.68rem; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 2px 6px rgba(37,99,235,0.22); transition: 0.15s; }
.enroll-btn:hover { opacity: 0.85; transform: scale(1.04); }
.no-courses { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 2.5rem; text-align: center; color: var(--ink-3); font-size: 0.85rem; }

.applications-list { display: flex; flex-direction: column; gap: 0.9rem; }
.app-card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 1.1rem; box-shadow: var(--shadow-xs); }
.app-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.65rem; }
.app-role { font-family: 'Fraunces', serif; font-size: 0.98rem; font-weight: 700; color: var(--ink); }
.app-company { font-size: 0.75rem; color: var(--ink-3); font-weight: 600; margin-top: 2px; }
.status-pill { padding: 0.22rem 0.7rem; border-radius: 99px; font-size: 0.7rem; font-weight: 700; }
.status-pending { background: #fef3c7; color: #b45309; }
.status-shortlisted { background: #e0e7ff; color: #3730a3; }
.status-selected { background: #dcfce7; color: #166534; }
.status-rejected { background: #fee2e2; color: #b91c1c; }
.app-meta { font-size: 0.76rem; color: var(--ink-3); line-height: 1.7; }

.dm-panel { width: 300px; min-width: 300px; background: var(--surface); border-left: 1px solid var(--line); height: calc(100vh - 56px); position: sticky; top: 56px; display: flex; flex-direction: column; flex-shrink: 0; }
.dm-head { padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; background: var(--accent); }
.dm-recipient { font-family: 'Fraunces', serif; font-size: 0.9rem; font-weight: 700; color: white; }
.dm-status { font-size: 0.68rem; color: rgba(255,255,255,0.5); margin-top: 1px; }
.online-dot { display: inline-block; width: 6px; height: 6px; background: #34d399; border-radius: 50%; margin-right: 4px; vertical-align: middle; }
.dm-body { flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.55rem; }
.bubble { max-width: 74%; padding: 0.58rem 0.85rem; border-radius: 14px; font-size: 0.8rem; line-height: 1.45; }
.bubble.sent { background: var(--accent); color: white; align-self: flex-end; border-bottom-right-radius: 3px; box-shadow: 0 3px 8px rgba(37,99,235,0.2); }
.bubble.recv { background: var(--bg); color: var(--ink); border: 1px solid var(--line); align-self: flex-start; border-bottom-left-radius: 3px; }
.bubble-time { font-size: 0.62rem; opacity: 0.5; margin-top: 2px; }
.dm-empty { flex: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0.4rem; color: var(--ink-4); font-size: 0.8rem; }
.dm-foot { padding: 0.8rem; border-top: 1px solid var(--line); display: flex; gap: 0.5rem; background: var(--bg); }
.dm-input { flex: 1; padding: 0.55rem 0.85rem; border-radius: 99px; border: 1px solid var(--line); background: var(--surface); font-family: inherit; font-size: 0.8rem; color: var(--ink); outline: none; transition: 0.18s; }
.dm-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.dm-input::placeholder { color: var(--ink-4); }
.send-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--accent); border: none; color: white; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 10px rgba(37,99,235,0.25); transition: 0.18s; }
.send-btn:hover { opacity: 0.85; transform: scale(1.06); }

.modal-overlay { position: fixed; inset: 0; background: rgba(17,19,24,0.55); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-box { background: white; border-radius: 20px; padding: 2rem; width: 100%; max-width: 540px; max-height: 88vh; overflow-y: auto; position: relative; box-shadow: var(--shadow-lg); }
.modal-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: none; cursor: pointer; font-weight: 700; color: var(--ink-3); display: flex; align-items: center; justify-content: center; transition: 0.12s; }
.modal-close:hover { background: var(--line); }
.modal-title { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 800; color: var(--ink); margin-bottom: 0.35rem; }
.modal-sub { font-size: 0.82rem; color: var(--ink-3); margin-bottom: 1.5rem; }
.field-label { font-size: 0.7rem; font-weight: 700; color: var(--ink-3); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.3rem; display: block; }
.field-input { width: 100%; padding: 0.7rem 0.95rem; border-radius: 10px; border: 1.5px solid var(--line); background: var(--bg); font-family: inherit; font-size: 0.85rem; color: var(--ink); outline: none; transition: 0.18s; margin-bottom: 0.9rem; }
.field-input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.field-input::placeholder { color: var(--ink-4); }
.field-textarea { min-height: 95px; resize: none; }
.btn-primary { width: 100%; padding: 0.85rem; border-radius: 12px; border: none; background: var(--accent); color: white; font-family: 'Fraunces', serif; font-size: 0.92rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 14px rgba(37,99,235,0.28); transition: 0.18s; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-secondary { width: 100%; padding: 0.7rem; border-radius: 12px; margin-top: 0.5rem; border: 1.5px solid var(--line); background: transparent; color: var(--ink-3); font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: 0.18s; }
.btn-secondary:hover { background: var(--bg); }

.inbox-banner { background: var(--accent-soft); border: 1px solid rgba(37,99,235,0.15); border-radius: var(--r); padding: 0.9rem 1.1rem; display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.2rem; }
.inbox-banner-icon { font-size: 1.3rem; flex-shrink: 0; }
.inbox-banner-text { font-size: 0.8rem; color: var(--ink-2); font-weight: 500; line-height: 1.5; }
.inbox-banner-text strong { color: var(--accent); }

.notif-toast { background: var(--ink); color: white; padding: 0.9rem 1.5rem; border-radius: 14px; box-shadow: 0 10px 28px rgba(0,0,0,0.22); font-size: 0.84rem; font-weight: 600; display: flex; align-items: center; gap: 9px; border: 1px solid rgba(255,255,255,0.07); }
.notif-dot2 { width: 7px; height: 7px; background: var(--accent-mid); border-radius: 50%; flex-shrink: 0; }
`;

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// NOTE FOR BACKEND INTEGRATION:
// All data is currently from mock constants above.
// When connecting backend, replace mock data with API calls using useEffect + fetch.
// See StudentDashboard_WithBackend.jsx for the connected version.

export default function StudentDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [activeUserProfile, setActiveUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [notifications, setNotifications] = useState([]);
  const [applyModal, setApplyModal] = useState(null);
  const [applyForm, setApplyForm] = useState({ coverLetter: "" });
  const [postDetailModal, setPostDetailModal] = useState(null);
  const [feedLikes, setFeedLikes] = useState({});
  const [inboxMessages, setInboxMessages] = useState([
    { id: 1, from: "Global Tech Corp", fromId: 999, fromLogo: "GT", text: "Hi! We noticed your profile and would love to discuss the MERN Stack Intern role with you.", time: "10:30 AM", read: false },
    { id: 2, from: "Quantum AI", fromId: 2, fromLogo: "QA", text: "Your skills in Python are impressive. We have an opening that might suit you.", time: "Yesterday", read: true },
  ]);

  const [profile, setProfile] = useState({
    id: 1, name: "Rajat Kumar", username: "rajat123", qualification: "BCA",
    email: "rajat@test.com", phone: "1234567890", address: "City X",
    tenth: "School X", twelfth: "School Y", graduation: "College Z",
    photo: null, certificates: [], personalPosts: [], resumes: [],
    chats: {
      999: [{ sender: "Global Tech Corp", message: "Hi! We noticed your profile and would love to discuss the MERN Stack Intern role with you.", time: "10:30 AM" }],
      2: [{ sender: "Quantum AI", message: "Your skills in Python are impressive. We have an opening that might suit you.", time: "Yesterday" }],
    },
  });

  const [myApplications, setMyApplications] = useState([
    { id: 1, postId: 101, role: "MERN Stack Intern", company: "Global Tech Corp", appliedOn: "2 days ago", status: "Shortlisted", coverLetter: "I have been working with MERN stack for personal projects." },
  ]);

  const pushNotify = (msg) => {
    const id = Date.now();
    setNotifications(prev => [{ id, msg }, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const deletePost = (type, idx) => {
    const key = type === "certificate" ? "certificates" : "personalPosts";
    const arr = [...profile[key]];
    arr.splice(idx, 1);
    setProfile({ ...profile, [key]: arr });
  };

  const deleteResume = (idx) => {
    const arr = [...profile.resumes];
    arr.splice(idx, 1);
    setProfile({ ...profile, resumes: arr });
    pushNotify("Resume removed.");
  };

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedCourses = mockCourses.filter(c => c.field === profile.qualification);

  const sendMessage = (toId, message) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const chats = { ...profile.chats };
    chats[toId] = [...(chats[toId] || []), { sender: profile.name, message, time }];
    setProfile({ ...profile, chats });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModal) return;
    setMyApplications(prev => [...prev, {
      id: Date.now(), postId: applyModal.id,
      role: applyModal.title, company: applyModal.ownerName,
      appliedOn: "Just now", status: "Pending", coverLetter: applyForm.coverLetter,
    }]);
    setApplyForm({ coverLetter: "" });
    setApplyModal(null);
    setPostDetailModal(null);
    pushNotify(`Applied to ${applyModal.title} at ${applyModal.ownerName}!`);
  };

  const alreadyApplied = (postId) => myApplications.some(a => a.postId === postId);
  const unreadCount = inboxMessages.filter(m => !m.read).length;

  const Av = ({ name, photo, size = 44, r = 11 }) => photo
    ? <img src={photo} style={{ width: size, height: size, borderRadius: r, objectFit: "cover", flexShrink: 0 }} alt="" />
    : <div className="panel-av" style={{ width: size, height: size, borderRadius: r, fontSize: size * 0.38, flexShrink: 0 }}>{name[0]}</div>;

  const logoColors = { 1: "#2563eb", 2: "#7c3aed", 3: "#059669", 999: "#d97706" };

  const renderPanel = (user, editable = false) => (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div className="panel-top">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Av name={user.name} photo={user.photo} size={44} r={11} />
            <div>
              <div className="panel-uname">{user.name}</div>
              <div className="panel-handle">@{user.username}</div>
            </div>
          </div>
          {editable
            ? <button className="edit-btn" onClick={() => setEditMode(!editMode)}>{editMode ? "✕ Close" : "✎ Edit"}</button>
            : <button className="close-x" onClick={() => setActiveUserProfile(null)}>✕ Close</button>
          }
        </div>
        <span className="panel-qual-badge">🎓 {user.qualification}</span>
      </div>

      {editable && editMode && (
        <>
          <div className="form-section">
            <div className="form-section-title">Profile Photo</div>
            <label className="upload-btn">
              📷 Change Photo
              <input type="file" style={{ display: "none" }} onChange={e => setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) })} />
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">Personal Information</div>
            <div className="form-grid">
              {[
                { name: "qualification", label: "Qualification", placeholder: "e.g. BCA" },
                { name: "email", label: "Email", placeholder: "you@example.com" },
                { name: "phone", label: "Phone", placeholder: "10-digit" },
                { name: "address", label: "City / Address", placeholder: "Your city" },
              ].map(f => (
                <div className="form-field" key={f.name}>
                  <label className="form-label">{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder} defaultValue={user[f.name]} onChange={handleChange} className="form-input" />
                </div>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-title">Academic Background</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                { name: "tenth", label: "10th School", placeholder: "School name" },
                { name: "twelfth", label: "12th School", placeholder: "School name" },
                { name: "graduation", label: "Graduation College", placeholder: "College name" },
              ].map(f => (
                <div className="form-field" key={f.name}>
                  <label className="form-label">{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder} defaultValue={user[f.name]} onChange={handleChange} className="form-input" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="knowmore-section">
        <button className="knowmore-btn" onClick={() => setShowDetails(!showDetails)}>
          <span style={{ fontSize: "0.6rem" }}>{showDetails ? "▲" : "▼"}</span>
          {showDetails ? "Hide Details" : "View Candidate Details"}
        </button>
        {showDetails && (
          <div className="details-box" style={{ marginTop: "0.65rem" }}>
            <div className="details-row">✉ {user.email}</div>
            <div className="details-row">☎ {user.phone}</div>
            <div className="details-row">📍 {user.address}</div>
            <div className="details-section-head">Academic Background</div>
            <div className="details-row">🏫 10th — {user.tenth}</div>
            <div className="details-row">🏫 12th — {user.twelfth}</div>
            <div className="details-row">🎓 {user.graduation}</div>
          </div>
        )}
      </div>

      {editable && (
        <>
          <div className="form-section">
            <div className="form-section-title">Upload Resume (PDF / JPEG)</div>
            <label className="upload-btn">
              📄 Add Resume / CV
              <input type="file" accept=".pdf,image/jpeg,image/jpg,image/png" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                setProfile(prev => ({ ...prev, resumes: [...prev.resumes, { url, name: file.name, type: file.type, size: (file.size / 1024).toFixed(0) + " KB" }] }));
                pushNotify("Resume uploaded successfully!");
              }} />
            </label>
            {profile.resumes.length > 0 && (
              <div style={{ marginTop: "0.55rem" }}>
                {profile.resumes.map((r, i) => (
                  <div key={i} className="resume-item">
                    <span className="resume-icon">{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
                    <span className="resume-name">{r.name} <span style={{ color: "var(--ink-4)", fontWeight: 400 }}>({r.size})</span></span>
                    <button className="resume-del" onClick={() => deleteResume(i)}>✕ Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-section">
            <div className="form-section-title">Upload Certificate</div>
            <label className="upload-btn">
              ＋ Add Certificate
              <input type="file" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                setProfile(prev => ({ ...prev, certificates: [...prev.certificates, { url, type: file.type }] }));
              }} />
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">Upload Event / Activity Post</div>
            <label className="upload-btn">
              ＋ Add Post
              <input type="file" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                setProfile(prev => ({ ...prev, personalPosts: [...prev.personalPosts, { url, type: file.type }] }));
              }} />
            </label>
          </div>
        </>
      )}

      <div className="feed-section">
        <div className="feed-title">Resumes on File</div>
        {!(user.resumes || []).length
          ? <div className="empty-feed">No resumes uploaded yet.</div>
          : (user.resumes || []).map((r, i) => (
            <div key={i} className="resume-item">
              <span className="resume-icon">{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
              <span className="resume-name">{r.name}</span>
              {editable && <button className="resume-del" onClick={() => deleteResume(i)}>✕</button>}
            </div>
          ))
        }
      </div>

      <div className="feed-section">
        <div className="feed-title">Certificate Feed</div>
        {!(user.certificates || []).length
          ? <div className="empty-feed">No certificates uploaded yet.</div>
          : <div className="posts-grid">{(user.certificates || []).map((p, i) => (
            <div key={i} className="post-cell">
              {editable && <button className="post-del" onClick={() => deletePost("certificate", i)}>✕</button>}
              {p.type.startsWith("video") ? <video src={p.url} /> : <img src={p.url} alt="" />}
            </div>
          ))}</div>
        }
      </div>

      <hr className="h-divider" />

      <div className="feed-section">
        <div className="feed-title">Event / Activity Feed</div>
        {!(user.personalPosts || []).length
          ? <div className="empty-feed">No activity posts yet.</div>
          : <div className="posts-grid">{(user.personalPosts || []).map((p, i) => (
            <div key={i} className="post-cell">
              {editable && <button className="post-del" onClick={() => deletePost("personal", i)}>✕</button>}
              {p.type.startsWith("video") ? <video src={p.url} /> : <img src={p.url} alt="" />}
            </div>
          ))}</div>
        }
      </div>

      {!editable && (
        <div style={{ padding: "0.65rem 1.1rem", paddingTop: 0 }}>
          <div style={{ background: "var(--accent-soft)", border: "1px solid rgba(37,99,235,0.14)", borderRadius: 10, padding: "0.65rem 0.9rem", fontSize: "0.75rem", color: "var(--ink-3)", textAlign: "center" }}>
            💬 Industry can message this student directly
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      <nav className="nav">
        <div>
          <div className="brand">Campus2Career</div>
          <div className="brand-sub">Student Portal</div>
        </div>

        <div className="search-shell">
          <span className="search-ico">🔍</span>
          <input className="search-box" placeholder="Search students..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && (
            <div className="search-drop">
              {filteredUsers.length > 0
                ? filteredUsers.map(u => (
                  <div key={u.id} className="search-row" onClick={() => { setActiveUserProfile(u.id); setSearchQuery(""); }}>
                    <Av name={u.name} photo={u.photo} size={30} r={7} />
                    <div>
                      <div className="search-row-name">{u.name}</div>
                      <div className="search-row-meta">@{u.username} · {u.qualification}</div>
                    </div>
                  </div>
                ))
                : <div style={{ padding: "0.75rem 1rem", fontSize: "0.78rem", color: "var(--ink-4)" }}>No students found.</div>
              }
            </div>
          )}
        </div>

        <div className="nav-right">
          {["feed", "jobs", "courses", "applications"].map(tab => (
            <button key={tab} className={`nav-pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => { setActiveTab(tab); setShowProfile(false); setActiveChat(null); }}>
              {{ feed: "🏭 Feed", jobs: "💼 Jobs", courses: "📚 Courses", applications: "📋 Applications" }[tab]}
            </button>
          ))}
          <div className="notif-btn" onClick={() => { setActiveTab("inbox"); setShowProfile(false); setActiveChat(null); }}>
            💬
            {unreadCount > 0 && <div className="notif-dot" />}
          </div>
          <div className="nav-avatar" onClick={() => { setShowProfile(!showProfile); setActiveChat(null); }} title={profile.name}>
            {profile.photo ? <img src={profile.photo} style={{ width: 34, height: 34, objectFit: "cover" }} alt="" /> : profile.name[0]}
          </div>
        </div>
      </nav>

      <div className="layout">
        <AnimatePresence>
          {activeUserProfile && (
            <motion.div className="sidebar-panel"
              initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              {renderPanel(mockUsers.find(u => u.id === activeUserProfile), false)}
            </motion.div>
          )}
        </AnimatePresence>

        <main className="content">
          {activeTab === "feed" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="sec-head" style={{ marginBottom: "1.1rem" }}>
                <div>
                  <span className="sec-title">Industry Feed</span>
                  <span className="sec-sub">Vacancies & updates from companies</span>
                </div>
              </div>

              <div className="feed-layout feed-scroll-host">
                <div className="feed-left-col">
                  {sharedVacancyFeed.map((post, idx) => (
                    <motion.div key={post.id} className="post-card"
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                      <div className="post-header">
                        <div className="post-owner">
                          <div className="owner-avatar" style={{ background: `${logoColors[post.ownerId] || "#2563eb"}18`, color: logoColors[post.ownerId] || "#2563eb", borderColor: `${logoColors[post.ownerId] || "#2563eb"}20` }}>
                            {post.ownerLogo}
                          </div>
                          <div>
                            <div className="owner-name">{post.ownerName}</div>
                            <div className="owner-meta">{post.date}</div>
                          </div>
                        </div>
                        <span className={`type-chip ${post.type === "Internship" ? "chip-internship" : post.type === "Job Vacancy" ? "chip-job" : "chip-update"}`}>
                          {post.type}
                        </span>
                      </div>

                      {post.image && <img src={post.image} className="post-img" alt="" />}
                      <div className="post-title">{post.title}</div>
                      <div className="post-desc">{post.desc.length > 100 ? post.desc.substring(0, 100) + "..." : post.desc}</div>

                      {post.skills && (
                        <div className="skill-tags">
                          {post.skills.split(", ").slice(0, 4).map(s => (
                            <span key={s} className="skill-tag">{s}</span>
                          ))}
                        </div>
                      )}

                      <div className="post-actions">
                        <button className={`act-btn ${feedLikes[post.id] ? "liked" : ""}`}
                          onClick={() => setFeedLikes(prev => ({ ...prev, [post.id]: !prev[post.id] }))}>
                          {feedLikes[post.id] ? "💙" : "🤍"} {post.likes + (feedLikes[post.id] ? 1 : 0)}
                        </button>
                        <button className="act-btn" onClick={() => setPostDetailModal(post)}>
                          👁 View
                        </button>
                        {post.type !== "Update" && (
                          alreadyApplied(post.id)
                            ? <span className="applied-pill">✓ Applied</span>
                            : <button className="apply-pill" onClick={() => { setApplyModal(post); setPostDetailModal(null); }}>
                                Apply Now →
                              </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="right-col feed-right-col">
                  <div className="widget">
                    <div className="widget-head">
                      <span className="widget-title">My Activity</span>
                    </div>
                    <div className="quick-stats">
                      <div className="stat-box">
                        <div className="stat-num">{myApplications.length}</div>
                        <div className="stat-label">Applications</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-num">{myApplications.filter(a => a.status === "Shortlisted" || a.status === "Selected").length}</div>
                        <div className="stat-label">Shortlisted</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-num">{recommendedCourses.length}</div>
                        <div className="stat-label">Courses</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-num">{unreadCount}</div>
                        <div className="stat-label">Unread msgs</div>
                      </div>
                    </div>
                  </div>

                  <div className="widget">
                    <div className="widget-head">
                      <span className="widget-title">🏆 Top Companies</span>
                      <button className="widget-link" onClick={() => setActiveTab("feed")}>Explore →</button>
                    </div>
                    {mockIndustries.map(ind => (
                      <div key={ind.id} className="company-row">
                        <div className="company-logo" style={{ background: logoColors[ind.id] || "#2563eb" }}>{ind.logo}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="company-name">{ind.name}</div>
                          <div className="company-domain">{ind.domain} · {ind.location}</div>
                        </div>
                        <button className="follow-btn" onClick={() => pushNotify(`Following ${ind.name}!`)}>Follow</button>
                      </div>
                    ))}
                  </div>

                  {recommendedCourses.length > 0 && (
                    <div className="widget">
                      <div className="widget-head">
                        <span className="widget-title">📚 Courses for You</span>
                        <button className="widget-link" onClick={() => setActiveTab("courses")}>See all →</button>
                      </div>
                      {recommendedCourses.slice(0, 3).map(c => {
                        const lv = levelStyle[c.level] || levelStyle.Beginner;
                        return (
                          <div key={c.id} style={{ padding: "0.65rem 1rem", borderBottom: "1px solid var(--line-soft)", display: "flex", gap: "0.7rem", alignItems: "center", cursor: "pointer" }}
                            className="company-row">
                            <img src={c.image} style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} alt="" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
                              <div style={{ fontSize: "0.68rem", color: "var(--ink-4)", marginTop: 1 }}>{c.provider} · {c.duration}</div>
                            </div>
                            <span style={{ background: lv.bg, color: lv.color, padding: "2px 7px", borderRadius: 99, fontSize: "0.6rem", fontWeight: 700, border: `1px solid ${lv.border}`, flexShrink: 0 }}>{c.level}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "jobs" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Recommended Jobs</span></div>
                  <button className="sec-link">View All →</button>
                </div>
                <div className="jobs-grid">
                  {jobData.map((job, i) => (
                    <motion.div key={i} className="job-card" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                      <img className="job-img" src={job.image} alt={job.title} />
                      <div className="job-body">
                        <div className="job-company">{job.company}</div>
                        <div className="job-title-text">{job.title}</div>
                        <div className="job-tags">
                          {typeStyle[job.type] && <span className="badge" style={{ background: typeStyle[job.type].bg, color: typeStyle[job.type].color, borderColor: typeStyle[job.type].bg }}>{job.type}</span>}
                          <span className="badge" style={{ background: "var(--bg)", color: "var(--ink-3)", borderColor: "var(--line)" }}>📍 {job.location}</span>
                        </div>
                        <div className="job-salary">₹ {job.salary}</div>
                        <button className="apply-btn">Apply Now</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Recommended Courses</span><span className="sec-sub">Tailored for {profile.qualification}</span></div>
                  <button className="sec-link">Explore All →</button>
                </div>
                {recommendedCourses.length > 0
                  ? <div className="courses-grid">
                    {recommendedCourses.map(course => {
                      const lv = levelStyle[course.level] || levelStyle.Beginner;
                      return (
                        <motion.div key={course.id} className="course-card" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                          <div className="course-img-wrap">
                            <img className="course-img" src={course.image} alt={course.title} />
                            <span className="level-chip" style={{ background: lv.bg, color: lv.color, borderColor: lv.border }}>{course.level}</span>
                          </div>
                          <div className="course-body">
                            <div className="course-prov">{course.provider}</div>
                            <div className="course-name">{course.title}</div>
                            <div className="course-meta"><span>⏱ {course.duration}</span><span>· 👥 {course.students}</span></div>
                            <div className="course-ft">
                              <div className="rating"><span>★</span>{course.rating}</div>
                              <button className="enroll-btn" onClick={() => pushNotify(`Enrolled in ${course.title}!`)}>Enroll</button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  : <div className="no-courses">No courses available for your field yet.</div>
                }
              </div>
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">My Applications</span><span className="sec-sub">{myApplications.length} total</span></div>
                </div>
                {myApplications.length === 0
                  ? <div className="no-courses">You haven't applied to anything yet. Browse the Industry Feed to get started!</div>
                  : <div className="applications-list">
                    {myApplications.map(app => (
                      <div key={app.id} className="app-card">
                        <div className="app-card-header">
                          <div>
                            <div className="app-role">{app.role}</div>
                            <div className="app-company">{app.company}</div>
                          </div>
                          <span className={`status-pill status-${app.status.toLowerCase()}`}>{app.status}</span>
                        </div>
                        <div className="app-meta">
                          <strong>Applied:</strong> {app.appliedOn}<br />
                          <strong>Cover Letter:</strong> {app.coverLetter}
                        </div>
                        {app.status === "Shortlisted" && (
                          <div style={{ marginTop: "0.65rem", background: "var(--accent-soft)", border: "1px solid rgba(37,99,235,0.14)", borderRadius: 9, padding: "0.65rem 0.85rem", fontSize: "0.78rem", color: "var(--accent)", fontWeight: 600 }}>
                            🎉 You've been shortlisted! The company may reach out to you via messages.
                          </div>
                        )}
                        {app.status === "Selected" && (
                          <div style={{ marginTop: "0.65rem", background: "var(--green-soft)", border: "1px solid rgba(5,150,105,0.18)", borderRadius: 9, padding: "0.65rem 0.85rem", fontSize: "0.78rem", color: "var(--green)", fontWeight: 600 }}>
                            ✅ Congratulations! You've been selected. Check messages for next steps.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                }
              </div>
            </motion.div>
          )}

          {activeTab === "inbox" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Messages from Companies</span><span className="sec-sub">{unreadCount} unread</span></div>
                </div>
                <div className="inbox-banner">
                  <span className="inbox-banner-icon">ℹ️</span>
                  <div className="inbox-banner-text">
                    <strong>Note:</strong> Only companies can initiate conversations. You can reply to messages from companies who contact you directly.
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {inboxMessages.map(msg => (
                    <div key={msg.id}
                      style={{ background: msg.read ? "var(--surface)" : "var(--accent-soft)", border: `1px solid ${msg.read ? "var(--line)" : "rgba(37,99,235,0.18)"}`, borderRadius: 14, padding: "1rem 1.2rem", cursor: "pointer", display: "flex", gap: "0.9rem", alignItems: "flex-start", transition: "0.15s" }}
                      onClick={() => { setActiveChat(msg.fromId); setInboxMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m)); }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: logoColors[msg.fromId] || "#2563eb", color: "white", fontFamily: "Fraunces, serif", fontWeight: 800, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{msg.fromLogo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.22rem" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.86rem", color: "var(--ink)" }}>{msg.from}</span>
                          <span style={{ fontSize: "0.7rem", color: "var(--ink-4)" }}>{msg.time}</span>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "var(--ink-3)", lineHeight: 1.5 }}>{msg.text}</p>
                      </div>
                      {!msg.read && <div style={{ width: 7, height: 7, background: "var(--accent)", borderRadius: "50%", flexShrink: 0, marginTop: 5 }} />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>

        <AnimatePresence>
          {showProfile && (
            <motion.div className="sidebar-panel right"
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              {renderPanel(profile, true)}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeChat && (
            <motion.div className="dm-panel"
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <div className="dm-head">
                <div>
                  <div className="dm-recipient">{mockIndustries.find(i => i.id === activeChat)?.name}</div>
                  <div className="dm-status"><span className="online-dot" />Company · Active</div>
                </div>
                <button className="close-x" onClick={() => setActiveChat(null)}>✕ Close</button>
              </div>
              <div className="dm-body">
                {!(profile.chats[activeChat] || []).length
                  ? <div className="dm-empty"><span style={{ fontSize: "1.7rem" }}>💬</span><span>No messages yet</span></div>
                  : (profile.chats[activeChat] || []).map((msg, i) => (
                    <div key={i} className={`bubble ${msg.sender === profile.name ? "sent" : "recv"}`}>
                      <div>{msg.message}</div>
                      <div className="bubble-time">{msg.time}</div>
                    </div>
                  ))
                }
              </div>
              <div className="dm-foot">
                <input id="chatInput2" className="dm-input" placeholder="Reply to company..."
                  onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { sendMessage(activeChat, e.target.value); e.target.value = ""; } }} />
                <button className="send-btn" onClick={() => {
                  const inp = document.getElementById("chatInput2");
                  if (!inp.value.trim()) return;
                  sendMessage(activeChat, inp.value); inp.value = "";
                }}>➤</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* POST DETAIL MODAL */}
      <AnimatePresence>
        {postDetailModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setPostDetailModal(null); }}>
            <motion.div className="modal-box" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
              <button className="modal-close" onClick={() => setPostDetailModal(null)}>✕</button>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.3rem" }}>
                <div style={{ width: 46, height: 46, borderRadius: 11, background: `${logoColors[postDetailModal.ownerId] || "#2563eb"}15`, color: logoColors[postDetailModal.ownerId] || "#2563eb", fontFamily: "Fraunces, serif", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{postDetailModal.ownerLogo}</div>
                <div>
                  <div className="modal-title" style={{ fontSize: "1.3rem" }}>{postDetailModal.title}</div>
                  <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem" }}>{postDetailModal.ownerName} · {postDetailModal.type}</div>
                </div>
              </div>
              {postDetailModal.image && <img src={postDetailModal.image} style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 12, marginBottom: "1.3rem" }} alt="" />}
              <p style={{ lineHeight: 1.72, color: "var(--ink-3)", marginBottom: "1.3rem", fontSize: "0.86rem" }}>{postDetailModal.desc}</p>
              {postDetailModal.skills && (
                <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: "1rem 1.1rem", marginBottom: "1.3rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                    <div><div style={{ fontSize: "0.66rem", fontWeight: 800, color: "var(--ink-4)", marginBottom: 4, textTransform: "uppercase" }}>Required Skills</div><div style={{ fontWeight: 700, fontSize: "0.83rem" }}>{postDetailModal.skills}</div></div>
                    <div><div style={{ fontSize: "0.66rem", fontWeight: 800, color: "var(--ink-4)", marginBottom: 4, textTransform: "uppercase" }}>Duration / Type</div><div style={{ fontWeight: 700, fontSize: "0.83rem" }}>{postDetailModal.duration}</div></div>
                    <div style={{ gridColumn: "span 2" }}><div style={{ fontSize: "0.66rem", fontWeight: 800, color: "var(--ink-4)", marginBottom: 4, textTransform: "uppercase" }}>What We Offer</div><div style={{ fontWeight: 700, fontSize: "0.83rem", color: "var(--green)" }}>{postDetailModal.offerings}</div></div>
                  </div>
                </div>
              )}
              {postDetailModal.type !== "Update" && (
                alreadyApplied(postDetailModal.id)
                  ? <div style={{ textAlign: "center", padding: "0.85rem", background: "var(--green-soft)", borderRadius: 11, color: "var(--green)", fontWeight: 700, fontSize: "0.85rem" }}>✓ You've already applied to this position</div>
                  : <button className="btn-primary" onClick={() => { setApplyModal(postDetailModal); setPostDetailModal(null); }}>Apply for this Role</button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {applyModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setApplyModal(null); }}>
            <motion.div className="modal-box" initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 35, opacity: 0 }}>
              <button className="modal-close" onClick={() => setApplyModal(null)}>✕</button>
              <div className="modal-title">Apply Now</div>
              <div className="modal-sub">Applying to <strong>{applyModal.ownerName}</strong> for <strong>{applyModal.title}</strong></div>
              <div>
                <label className="field-label">Your Name</label>
                <input className="field-input" value={profile.name} readOnly style={{ background: "var(--bg)", cursor: "not-allowed" }} />
                <label className="field-label">Email</label>
                <input className="field-input" value={profile.email} readOnly style={{ background: "var(--bg)", cursor: "not-allowed" }} />
                <label className="field-label">Resume to Attach</label>
                {profile.resumes.length > 0
                  ? <div style={{ marginBottom: "0.9rem" }}>
                    {profile.resumes.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--accent-soft)", border: "1px solid rgba(37,99,235,0.14)", borderRadius: 9, padding: "0.48rem 0.75rem", marginBottom: "0.35rem" }}>
                        <span>{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", flex: 1 }}>{r.name}</span>
                        <span style={{ fontSize: "0.68rem", background: "var(--green-soft)", color: "var(--green)", padding: "0.1rem 0.45rem", borderRadius: 99, fontWeight: 700 }}>Attached</span>
                      </div>
                    ))}
                  </div>
                  : <div style={{ marginBottom: "0.9rem", padding: "0.65rem", background: "var(--amber-soft)", border: "1px solid #fcd34d", borderRadius: 9, fontSize: "0.78rem", color: "var(--amber)", fontWeight: 600 }}>
                    ⚠️ No resume on file. Open your profile to upload one.
                  </div>
                }
                <label className="field-label">Cover Letter</label>
                <textarea className="field-input field-textarea" placeholder="Explain why you're a great fit for this role..."
                  value={applyForm.coverLetter} onChange={e => setApplyForm({ ...applyForm, coverLetter: e.target.value })} />
                <button type="button" className="btn-primary" onClick={() => {
                  if (!applyForm.coverLetter.trim()) { pushNotify("Please write a cover letter before submitting."); return; }
                  handleApplySubmit({ preventDefault: () => {} });
                }}>Submit Application</button>
                <button type="button" className="btn-secondary" onClick={() => setApplyModal(null)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTIFICATIONS */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 2000, display: "flex", flexDirection: "column", gap: "10px" }}>
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} className="notif-toast"
              initial={{ opacity: 0, x: 45, scale: 0.93 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="notif-dot2" />{n.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}