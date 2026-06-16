import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────── */
const ACCENT = "#F5C518";
const DARK   = "#111111";
const GRAY   = "#1A1A1A";
const CARD   = "#222222";
const MID    = "#2E2E2E";
const WHITE  = "#F0F0F0";
const MUTED  = "#888888";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Certificates", "Contact"];

const SKILLS = [
  { name: "C++",              stars: 4, category: "Programming" },
  { name: "Python",           stars: 4, category: "Programming" },
  { name: "Java",             stars: 3, category: "Programming" },
  { name: "MATLAB",           stars: 4, category: "Tools" },
  { name: "Google Colab",     stars: 4, category: "Tools" },
  { name: "Computer Vision",  stars: 3, category: "Specialization" },
  { name: "Machine Learning", stars: 3, category: "Specialization" },
  { name: "Canva",            stars: 4, category: "Tools" },
];

const PROJECTS = [
  {
    title: "YOLOv11 Pineapple Detection & Sorting",
    desc:  "IEEE-published automated pineapple grading and sorting system using YOLOv11, Raspberry Pi 5, and Arduino Mega for agricultural automation.",
    tags:  ["YOLOv11", "Raspberry Pi 5", "Arduino", "Computer Vision"],
    year:  "2026",
    badge: "IEEE Published",
  },
  {
    title: "Student Performance Prediction",
    desc:  "Data-driven ML model using Python and Pandas for data cleaning, preprocessing, and exploratory analysis. Implemented Logistic Regression and Random Forest algorithms.",
    tags:  ["Python", "Pandas", "Machine Learning", "Random Forest"],
    year:  "2025",
    badge: null,
  },
  {
    title: "Digital Ears: Emotion Detection",
    desc:  "MATLAB-based system detecting emotions (Happy, Sad, Angry) from speech using digital signal processing — normalization, framing, short-time energy, and spectral analysis.",
    tags:  ["MATLAB", "DSP", "Machine Learning", "Speech Analysis"],
    year:  "2025",
    badge: null,
  },
  {
    title: "Computer Vision: Image Segmentation",
    desc:  "Image segmentation system using K-Means, Watershed, and edge detection methods with thresholding to achieve clear and accurate object outlines.",
    tags:  ["Python", "OpenCV", "K-Means", "Watershed"],
    year:  "2024",
    badge: null,
  },
];

const CERTS = [
  { name: "Computer Systems Servicing (NCII)", type: "Certification" },
  { name: "Lean Six Sigma (Yellow Belt)", type: "Certification" },
  { name: "Certified Safety Officer (SO2)", type: "Certification" },
  { name: "Basic Occupational Safety & Health (BOSH)", type: "Completion" },
  { name: "Internship Completion — Sercomm Philippines Inc.", type: "Completion" },
  { name: "AI for Oceans — Hour of Code (Code.org)", type: "Completion" },
  { name: "The Hour of A.I. (Code.org)", type: "Completion" },
  { name: "AI Ready ASEAN — Hour of Code (ASEAN Foundation)", type: "Completion" },
  { name: "Prompt Engineering — Cognizant / Johnson & Johnson", type: "Participation" },
  { name: "Open CV Bootcamp", type: "Training" },
  { name: "The Alpha of Data Science", type: "Completion" },
  { name: "Cyber 101 — DICT Region IV-A (Apr 2025)", type: "Attendance" },
  { name: "Cyber Tools for ICpEP — DICT Region IV-A (May 2025)", type: "Attendance" },
  { name: "National Cybersecurity Plan 2023–2028 — DICT (Jun 2025)", type: "Attendance" },
  { name: "Practical Application of Cybersecurity Framework — ICpEP Qatar Chapter", type: "Attendance" },
  { name: "Basic Network Security and Fundamentals — Ethel Programming", type: "Participation" },
  { name: "Installing & Managing Antivirus Software — Ethel Programming", type: "Participation" },
  { name: "Embedded Systems for IoT Applications — Ethel Programming", type: "Participation" },
  { name: "Cloud and DevOps Basics — DICT CAR (Dec 2025)", type: "Participation" },
  { name: "Access, Awareness, Innovation and Security — DICT CAR (Jan 2026)", type: "Participation" },
  { name: "BISTECH S2 E1: Intro to Additive Manufacturing — DOST CALABARZON", type: "Participation" },
  { name: "Global Semiconductor Chains & PH IC Design — Xinyx Design / Xpert Insights", type: "Participation" },
  { name: "AI Workflows Made Easy (Low-Code Tools) — Eskwelabs", type: "Attendance" },
  { name: "Learning as a Survival Skill (AI-Driven World) — Ask Lex PH Academy", type: "Participation" },
  { name: "AI-Supported Student Engagement with Quizalize — EdTech", type: "Participation" },
  { name: "Intro to Canva & Scam Awareness — DICT South Cotabato (Feb 2026)", type: "Participation" },
  { name: "Philippines Manufacturing & Automation Expo 2025 (PMAX/EMAX)", type: "Participation" },
];

/* ─── HELPERS ───────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── STAR RATING ───────────────────────────────── */
function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= count ? ACCENT : MID}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function Stripes({ side = "right", opacity = 0.5 }) {
  return (
    <div style={{
      position: "absolute", [side]: 0, top: 0, bottom: 0, width: "35vw",
      background: "repeating-linear-gradient(168deg,#1e1e1e 0px,#1e1e1e 5px,transparent 5px,transparent 16px)",
      opacity, pointerEvents: "none",
    }} />
  );
}

/* ─── CERT TYPE BADGE COLOR ─────────────────────── */
const certColor = { Certification: "#F5C518", Completion: "#4CAF50", Attendance: "#2196F3", Participation: "#9C27B0", Training: "#FF5722" };

/* ─── LOADING SCREEN ────────────────────────────── */
function LoadingScreen({ onDone }) {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 2200);
    const t2 = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: DARK,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fade ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: fade ? "none" : "all",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(168deg,#1a1a1a 0px,#1a1a1a 4px,transparent 4px,transparent 18px)",
        opacity: 0.45,
      }} />
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ width: 0, height: 3, background: ACCENT, margin: "0 auto 28px", animation: "ldLine 0.7s ease 0.2s forwards" }} />
        <p style={{ color: ACCENT, fontSize: 10, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase", marginBottom: 20, opacity: 0, animation: "ldUp 0.5s ease 0.4s forwards" }}>
          Portfolio
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", fontWeight: 900, margin: 0, lineHeight: 1, letterSpacing: -2, opacity: 0, animation: "ldUp 0.6s ease 0.6s forwards" }}>
          KEIRK IAN<br /><span style={{ color: ACCENT }}>V. AVENIDO</span>
        </h1>
        <p style={{ color: MUTED, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginTop: 18, opacity: 0, animation: "ldUp 0.5s ease 0.9s forwards" }}>
          Computer Engineer
        </p>
        <div style={{ width: 0, height: 3, background: ACCENT, margin: "28px auto 0", animation: "ldLine 0.7s ease 0.2s forwards" }} />
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 40, opacity: 0, animation: "ldUp 0.5s ease 1.1s forwards" }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 7, height: 7, background: ACCENT, borderRadius: "50%", animation: `ldPulse 1s ease ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ldLine  { from { width: 0 } to { width: 60px } }
        @keyframes ldUp    { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes ldPulse { 0%,100% { opacity:.3; transform:scale(.8) } 50% { opacity:1; transform:scale(1.2) } }
      `}</style>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────── */
export default function Portfolio() {
  const [loading, setLoading]             = useState(true);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const [skillsRef,  skillsVisible]  = useInView();
  const [projRef,    projVisible]    = useInView();
  const [expRef,     expVisible]     = useInView();
  const [certRef,    certVisible]    = useInView();
  const [contactRef, contactVisible] = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (showCertModal || loading) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showCertModal, loading]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Keirk_Ian_Avenido_Resume.pdf";
    a.click();
  };

  const eyebrow = {
    color: ACCENT, fontSize: 10, fontWeight: 700,
    letterSpacing: 4, textTransform: "uppercase", marginBottom: 8,
  };
  const sectionTitle = {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900,
    marginTop: 0, marginBottom: 40, lineHeight: 1.1,
  };

  return (
    <div style={{
      background: DARK, color: WHITE,
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      minHeight: "100vh", overflowX: "hidden",
    }}>

      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* ── CERTIFICATE MODAL ── */}
      {showCertModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", flexDirection: "column",
        }}>
          {/* Modal Header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 24px", borderBottom: `1px solid ${MID}`,
            background: GRAY, flexShrink: 0,
          }}>
            <div>
              <span style={{ color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
                Certificates
              </span>
              <h3 style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 900 }}>Keirk Ian V. Avenido</h3>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="/certificates.pdf" download="Keirk_Ian_Avenido_Certificates.pdf"
                style={{
                  background: ACCENT, color: DARK, border: "none",
                  padding: "8px 18px", fontWeight: 800, fontSize: 11,
                  letterSpacing: 1.5, cursor: "pointer", textTransform: "uppercase",
                  textDecoration: "none", display: "inline-block",
                }}>
                ↓ Download PDF
              </a>
              <button onClick={() => setShowCertModal(false)}
                style={{
                  background: MID, border: "none", color: WHITE,
                  width: 36, height: 36, fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                ✕
              </button>
            </div>
          </div>
          {/* PDF Embed */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <iframe
              src="/certificates.pdf"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Certificates"
            />
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 5vw",
        background: scrolled ? "rgba(17,17,17,0.97)" : "transparent",
        borderBottom: scrolled ? `1px solid ${MID}` : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "background 0.3s, border 0.3s",
      }}>
        <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: 2, color: ACCENT }}>&lt;IAN/&gt;</span>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="nav-links">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => l === "Certificates" ? setShowCertModal(true) : scrollTo(l.toLowerCase())}
              style={{
                background: "none", border: "none", color: WHITE, cursor: "pointer",
                fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", padding: 0,
              }}
              onMouseEnter={(e) => (e.target.style.color = ACCENT)}
              onMouseLeave={(e) => (e.target.style.color = WHITE)}>
              {l}
            </button>
          ))}
          <button onClick={downloadResume}
            style={{
              background: ACCENT, color: DARK, border: "none",
              padding: "8px 20px", fontWeight: 800, fontSize: 11,
              letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
            }}>
            ↓ Resume
          </button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display: "none", background: "none", border: "none", color: WHITE, fontSize: 22, cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 199,
          background: "#141414", padding: "28px 6vw",
          display: "flex", flexDirection: "column", gap: 20,
          borderBottom: `1px solid ${MID}`,
        }}>
          {NAV_LINKS.map((l) => (
            <button key={l}
              onClick={() => { l === "Certificates" ? setShowCertModal(true) : scrollTo(l.toLowerCase()); setMenuOpen(false); }}
              style={{
                background: "none", border: "none", color: WHITE,
                fontSize: 18, fontWeight: 700, textAlign: "left", cursor: "pointer", padding: 0,
              }}>{l}</button>
          ))}
          <button onClick={() => { downloadResume(); setMenuOpen(false); }}
            style={{
              background: ACCENT, color: DARK, border: "none",
              padding: "12px", fontWeight: 800, fontSize: 13,
              letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
            }}>
            ↓ Download Resume
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 6vw 80px",
        position: "relative", overflow: "hidden",
      }}>
        <Stripes side="right" opacity={0.55} />

        {/* Decorative element beside the name */}
        <div style={{
          position: "absolute", right: "6vw", top: "50%", transform: "translateY(-50%)",
          width: 220, display: "flex", flexDirection: "column", alignItems: "center",
          gap: 16, opacity: 0.15,
        }} className="hero-deco">
          {["< />", "{ }", "[ ]", "//", "&&"].map((s, i) => (
            <div key={i} style={{
              fontSize: `${28 - i * 3}px`, fontWeight: 900, color: ACCENT,
              letterSpacing: 4, fontFamily: "monospace",
            }}>{s}</div>
          ))}
        </div>

        <div style={{ position: "relative", maxWidth: 760 }}>
          <p style={eyebrow}>Computer Engineer · San Pablo City, Laguna</p>

          {/* Name with decorative side accent */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <h1 style={{
              fontSize: "clamp(2.5rem, 7.5vw, 5.5rem)", fontWeight: 900,
              lineHeight: 0.95, margin: "0 0 8px", letterSpacing: -2,
            }}>
              KEIRK<br />
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{ color: ACCENT }}>IAN</span>
                {/* Small decorative bar beside IAN */}
                <span style={{
                  position: "absolute", right: -24, top: "50%", transform: "translateY(-50%)",
                  width: 16, height: 4, background: ACCENT, display: "inline-block",
                }} />
              </span>
              <br />
              <span style={{ fontSize: "0.7em", letterSpacing: -1 }}>V. AVENIDO</span>
            </h1>
          </div>

          <p style={{
            fontSize: "clamp(1rem, 2.2vw, 1.3rem)", color: MUTED,
            fontWeight: 400, marginTop: 20, letterSpacing: 1,
          }}>
            BS Computer Engineering · National University Manila
          </p>

          <p style={{ marginTop: 24, color: "#AAA", fontSize: 15, lineHeight: 1.9, maxWidth: 540 }}>
            Passionate Computer Engineering graduate with hands-on experience in machine learning,
            computer vision, embedded systems, and signal processing. IEEE-published researcher
            and active participant in tech communities across the Philippines.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {["📍 San Pablo City, Laguna", "📞 +63 9277306698", "✉️ keirkian09s@gmail.com"].map(item => (
              <span key={item} style={{
                background: CARD, border: `1px solid ${MID}`,
                padding: "5px 12px", fontSize: 11, color: MUTED, letterSpacing: 0.5,
              }}>{item}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")}
              style={{
                background: ACCENT, color: DARK, border: "none",
                padding: "14px 32px", fontWeight: 900, fontSize: 12,
                letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
              View Projects
            </button>
            <button onClick={downloadResume}
              style={{
                background: "transparent", color: ACCENT,
                border: `2px solid ${ACCENT}`, padding: "14px 32px",
                fontWeight: 800, fontSize: 12, letterSpacing: 2,
                cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = DARK; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ACCENT; }}>
              ↓ Download Resume
            </button>
            <button onClick={() => scrollTo("contact")}
              style={{
                background: "transparent", color: WHITE,
                border: `1px solid ${MID}`, padding: "14px 32px",
                fontWeight: 600, fontSize: 12, letterSpacing: 2,
                cursor: "pointer", textTransform: "uppercase",
              }}>
              Get In Touch
            </button>
          </div>

          {/* IEEE badge */}
          <div style={{ marginTop: 52, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ background: ACCENT, padding: "6px 14px" }}>
              <span style={{ color: DARK, fontSize: 10, fontWeight: 900, letterSpacing: 2 }}>IEEE PUBLISHED</span>
            </div>
            <span style={{ color: "#444", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
              Conference Paper · 2026
            </span>
            <div style={{ width: 1, height: 20, background: MID }} />
            <span style={{ color: "#444", fontSize: 11, letterSpacing: 1 }}>27+ Certificates & Trainings</span>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillsRef} style={{ padding: "90px 6vw", background: GRAY }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={eyebrow}>Technical Proficiency</p>
          <h2 style={sectionTitle}>Skills & Tools</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "60px 80px",
          }}>
            {/* Skill Stars */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {SKILLS.map((s, i) => (
                  <div key={s.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 18px", background: CARD,
                    borderLeft: `3px solid ${i < 2 ? ACCENT : "transparent"}`,
                    opacity: skillsVisible ? 1 : 0,
                    transform: skillsVisible ? "none" : "translateX(-16px)",
                    transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s`,
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>{s.category}</div>
                    </div>
                    <Stars count={s.stars} />
                  </div>
                ))}
              </div>
            </div>

            {/* About stats */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={eyebrow}>About Me</p>
              <h2 style={{ ...sectionTitle, fontSize: "clamp(1.5rem,3.5vw,2.2rem)" }}>Who I Am</h2>
              <p style={{ color: MUTED, lineHeight: 1.9, fontSize: 15, marginTop: 0 }}>
                A Computer Engineering graduate from National University Manila, driven by a deep
                interest in AI, embedded systems, and real-world problem solving. IEEE-published
                co-author with internship experience in electronics troubleshooting at Sercomm Philippines.
                Active in tech communities with 27+ certificates across cybersecurity, AI, and engineering.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 36 }}>
                {[["4","Projects Built"],["1","IEEE Publication"],["27+","Certificates"],["2026","Graduate"]].map(([n, l]) => (
                  <div key={l} style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16 }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: ACCENT }}>{n}</div>
                    <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["C++","Python","Java","MATLAB"].map(t => (
                  <span key={t} style={{ background: MID, color: ACCENT, fontSize: 10, fontWeight: 800, padding: "4px 10px", letterSpacing: 1.5 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" ref={projRef} style={{ padding: "90px 6vw", background: DARK }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={eyebrow}>Selected Work</p>
          <h2 style={sectionTitle}>My Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 3 }}>
            {PROJECTS.map((p, i) => (
              <div key={p.title}
                style={{
                  background: i % 2 === 0 ? CARD : "#282828",
                  padding: "36px 30px",
                  borderTop: `3px solid ${i === 0 ? ACCENT : "transparent"}`,
                  opacity: projVisible ? 1 : 0,
                  transform: projVisible ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.55s ${i * 0.12}s, transform 0.55s ${i * 0.12}s, border-color 0.2s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = ACCENT; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = i === 0 ? ACCENT : "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 2 }}>{p.year}</span>
                  {p.badge && <span style={{ fontSize: 8, fontWeight: 900, background: ACCENT, color: DARK, padding: "3px 8px", letterSpacing: 1 }}>{p.badge}</span>}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75, margin: "0 0 24px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", background: DARK, color: ACCENT, padding: "4px 10px" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE + EDUCATION ── */}
      <section id="experience" ref={expRef} style={{ padding: "90px 6vw", background: GRAY }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={eyebrow}>Work History</p>
          <h2 style={sectionTitle}>Experience</h2>

          <div style={{
            borderLeft: `3px solid ${ACCENT}`, paddingLeft: 32,
            opacity: expVisible ? 1 : 0,
            transform: expVisible ? "none" : "translateX(-20px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 4 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>Troubleshooting Engineer Intern</h3>
              <span style={{ background: ACCENT, color: DARK, fontSize: 9, fontWeight: 900, padding: "3px 10px", letterSpacing: 1 }}>INTERN</span>
            </div>
            <p style={{ color: ACCENT, fontSize: 13, fontWeight: 700, margin: "4px 0 2px" }}>Sercomm Philippines Inc. — Calamba City, Laguna</p>
            <p style={{ color: "#555", fontSize: 12, letterSpacing: 1, margin: "0 0 20px" }}>April 6, 2026 – May 7, 2026</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Assisted in troubleshooting defective circuit boards and electronic devices.",
                "Performed rework and replacement of components such as ICs and shields.",
                "Supported technicians in testing and repair operations.",
                "Applied basic electronics, troubleshooting, and documentation skills in a production environment.",
              ].map(pt => (
                <div key={pt} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: ACCENT, fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</span>
                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginTop: 70 }}>
            <p style={eyebrow}>Education</p>
            <h2 style={{ ...sectionTitle, fontSize: "clamp(1.4rem,3vw,2rem)" }}>Academic Background</h2>
            {[
              ["2022 – 2026", "BS Computer Engineering", "National University Manila"],
              ["2016 – 2022", "Junior & Senior High School", "Laguna College"],
              ["2010 – 2016", "Elementary School", "Angel's Kiddie Learning Center, Inc."],
            ].map(([period, degree, school], i) => (
              <div key={degree} style={{
                display: "flex", gap: 24, padding: "20px 0", borderBottom: `1px solid ${MID}`,
                opacity: expVisible ? 1 : 0,
                transform: expVisible ? "none" : "translateY(14px)",
                transition: `opacity 0.5s ${0.4 + i * 0.12}s, transform 0.5s ${0.4 + i * 0.12}s`,
              }}>
                <span style={{ fontSize: 11, color: "#555", fontWeight: 700, minWidth: 95, paddingTop: 2 }}>{period}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{degree}</div>
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 3 }}>{school}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Publication */}
          <div style={{ marginTop: 70 }}>
            <p style={eyebrow}>Research</p>
            <h2 style={{ ...sectionTitle, fontSize: "clamp(1.4rem,3vw,2rem)" }}>Publication</h2>
            <div style={{
              background: CARD, padding: "28px 30px", borderLeft: `4px solid ${ACCENT}`,
              opacity: expVisible ? 1 : 0, transition: "opacity 0.6s 0.6s",
            }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: ACCENT, color: DARK, fontSize: 9, fontWeight: 900, padding: "4px 10px", letterSpacing: 1 }}>IEEE PUBLISHED</span>
                <span style={{ border: `1px solid ${MID}`, color: MUTED, fontSize: 9, padding: "4px 10px", letterSpacing: 1 }}>CO-AUTHOR · 2026</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.4 }}>
                YOLOv11-Based Pineapple Detection and Sorting System for Agricultural Automation
              </h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75, margin: 0 }}>
                Developed an automated pineapple grading and sorting system using YOLOv11, Raspberry Pi 5,
                and Arduino Mega. Contributed to image dataset preparation, model training, and system
                integration for agricultural automation. Published in IEEE conference proceedings for
                research in computer vision and embedded systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES LIST ── */}
      <section id="certificates" ref={certRef} style={{ padding: "90px 6vw", background: DARK }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={eyebrow}>Credentials</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <h2 style={{ ...sectionTitle, marginBottom: 0 }}>Certifications & Trainings</h2>
            <button onClick={() => setShowCertModal(true)}
              style={{
                background: ACCENT, color: DARK, border: "none",
                padding: "12px 28px", fontWeight: 900, fontSize: 12,
                letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
              📄 View All Certificates
            </button>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
            {Object.entries(certColor).map(([type, color]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, background: color, borderRadius: "50%" }} />
                <span style={{ fontSize: 11, color: MUTED, letterSpacing: 1 }}>{type}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
            {CERTS.map((c, i) => (
              <div key={c.name} style={{
                background: CARD, padding: "14px 18px",
                display: "flex", alignItems: "flex-start", gap: 12,
                borderLeft: `3px solid ${certColor[c.type] || ACCENT}`,
                opacity: certVisible ? 1 : 0,
                transform: certVisible ? "none" : "translateY(12px)",
                transition: `opacity 0.4s ${i * 0.035}s, transform 0.4s ${i * 0.035}s`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, color: WHITE }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: certColor[c.type], fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{c.type}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => setShowCertModal(true)}
              style={{
                background: "transparent", color: ACCENT,
                border: `2px solid ${ACCENT}`, padding: "14px 40px",
                fontWeight: 900, fontSize: 13, letterSpacing: 2,
                cursor: "pointer", textTransform: "uppercase",
              }}>
              📄 Open Full Certificates PDF
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={contactRef} style={{ padding: "90px 6vw 110px", background: GRAY }}>
        <div style={{
          maxWidth: 600, margin: "0 auto", textAlign: "center",
          opacity: contactVisible ? 1 : 0,
          transform: contactVisible ? "none" : "translateY(24px)",
          transition: "opacity 0.65s, transform 0.65s",
        }}>
          <p style={eyebrow}>Get In Touch</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1 }}>
            Let's Work<br />Together
          </h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.85, marginBottom: 48 }}>
            Open to entry-level roles, internships, freelance projects, and research collaborations.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            {[{ placeholder: "Your Name", type: "text" }, { placeholder: "Your Email", type: "email" }].map(({ placeholder, type }) => (
              <input key={placeholder} type={type} placeholder={placeholder}
                style={{
                  background: CARD, border: `1px solid ${MID}`, color: WHITE,
                  padding: "14px 18px", fontSize: 14, outline: "none",
                  fontFamily: "inherit", width: "100%",
                }}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e)  => (e.target.style.borderColor = MID)} />
            ))}
            <textarea placeholder="Tell me about the opportunity..." rows={5}
              style={{
                background: CARD, border: `1px solid ${MID}`, color: WHITE,
                padding: "14px 18px", fontSize: 14, outline: "none",
                resize: "vertical", fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = ACCENT)}
              onBlur={(e)  => (e.target.style.borderColor = MID)} />
            <button style={{
              background: ACCENT, color: DARK, border: "none",
              padding: "16px", fontWeight: 900, fontSize: 12,
              letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
            }}>
              Send Message
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 56, flexWrap: "wrap" }}>
            {[["📞","+63 9277306698"],["✉️","keirkian09s@gmail.com"],["📍","San Pablo City, Laguna"]].map(([icon, val]) => (
              <div key={val} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${MID}`, padding: "22px 6vw",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ color: ACCENT, fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>&lt;IAN/&gt;</span>
        <span style={{ color: "#444", fontSize: 12 }}>© {new Date().getFullYear()} Keirk Ian V. Avenido. All rights reserved.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: #555; }
        @keyframes ldLine  { from { width: 0 } to { width: 60px } }
        @keyframes ldUp    { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes ldPulse { 0%,100% { opacity:.3; transform:scale(.8) } 50% { opacity:1; transform:scale(1.2) } }
        @media (max-width: 720px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
          .hero-deco { display: none !important; }
        }
      `}</style>
    </div>
  );
}
