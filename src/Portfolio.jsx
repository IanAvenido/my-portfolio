import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────── */
const ACCENT = "#F5C518";
const DARK   = "#111111";
const GRAY   = "#1A1A1A";
const CARD   = "#222222";
const MID    = "#2E2E2E";
const WHITE  = "#F0F0F0";
const MUTED  = "#888888";

/* ─── DATA ──────────────────────────────────────── */
const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];

const SKILLS = [
  { name: "Python",       level: 85 },
  { name: "C++",          level: 80 },
  { name: "Java",         level: 75 },
  { name: "MATLAB",       level: 78 },
  { name: "Computer Vision", level: 82 },
  { name: "Machine Learning", level: 80 },
];

const PROJECTS = [
  {
    title: "YOLOv11 Pineapple Detection & Sorting",
    desc:  "IEEE-published automated pineapple grading system using YOLOv11, Raspberry Pi 5, and Arduino Mega. Contributed to dataset preparation, model training, and system integration.",
    tags:  ["YOLOv11", "Raspberry Pi 5", "Arduino", "Computer Vision"],
    year:  "2026",
  },
  {
    title: "Predicting Student Performance",
    desc:  "Data-driven prediction model using Python and Pandas for data cleaning and EDA. Implemented Logistic Regression and Random Forest to identify key academic factors.",
    tags:  ["Python", "Pandas", "Machine Learning", "Random Forest"],
    year:  "2025",
  },
  {
    title: "Digital Ears: Emotion Detection",
    desc:  "MATLAB-based system detecting emotions (Happy, Sad, Angry) from speech using DSP techniques — normalization, framing, STE, and spectral analysis.",
    tags:  ["MATLAB", "DSP", "Signal Processing", "ML"],
    year:  "2025",
  },
  {
    title: "Computer Vision: Image Segmentation",
    desc:  "Image segmentation system using K-Means, Watershed, and edge detection methods with thresholding for accurate object outlines.",
    tags:  ["Python", "OpenCV", "K-Means", "Watershed"],
    year:  "2024",
  },
];

const CERTIFICATIONS = [
  { label: "COMPUTER SYSTEMS SERVICING", sub: "NCII — Technical Skills" },
  { label: "LEAN SIX SIGMA",             sub: "Yellow Belt — Process Optimization" },
  { label: "CERTIFIED SAFETY OFFICER",   sub: "SO2 — Workplace Safety" },
  { label: "INTERNSHIP CERTIFICATE",     sub: "Sercomm Philippines Inc." },
];

const WHY = [
  ["Hardware", "Hands-On Electronics", "Hands-on experience troubleshooting circuit boards, ICs, and shields in a live production environment."],
  ["Research", "IEEE Published Author",  "Co-authored a published conference paper on computer vision and embedded systems for agricultural automation."],
  ["Software", "ML & Signal Processing", "Built end-to-end ML pipelines and DSP systems — from raw data to working predictions."],
  ["Growth",   "Always Learning",        "OpenCV Bootcamp, Prompt Engineering, Data Science — continuously expanding my skill set."],
];

/* ─── HELPERS ───────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SkillBar({ level, visible }) {
  return (
    <div style={{ background: MID, height: 3, borderRadius: 2, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: visible ? `${level}%` : "0%",
        background: ACCENT,
        transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
      }} />
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

/* ─── MAIN COMPONENT ────────────────────────────── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [skillsRef,  skillsVisible]  = useInView();
  const [projRef,    projVisible]    = useInView();
  const [certRef,    certVisible]    = useInView();
  const [whyRef,     whyVisible]     = useInView();
  const [contactRef, contactVisible] = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
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

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 6vw",
        background: scrolled ? "rgba(17,17,17,0.96)" : "transparent",
        borderBottom: scrolled ? `1px solid ${MID}` : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "background 0.3s, border 0.3s",
      }}>
        <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: 2, color: ACCENT }}>
          &lt;KEIRK/&gt;
        </span>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: "none", border: "none", color: WHITE,
                cursor: "pointer", fontSize: 12, fontWeight: 600,
                letterSpacing: 2, textTransform: "uppercase", padding: 0,
              }}
              onMouseEnter={(e) => (e.target.style.color = ACCENT)}
              onMouseLeave={(e) => (e.target.style.color = WHITE)}>
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")}
            style={{
              background: ACCENT, color: DARK, border: "none",
              padding: "8px 22px", fontWeight: 800, fontSize: 11,
              letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}>
            Hire Me
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
          display: "flex", flexDirection: "column", gap: 24,
          borderBottom: `1px solid ${MID}`,
        }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: "none", border: "none", color: WHITE,
                fontSize: 18, fontWeight: 700, textAlign: "left", cursor: "pointer", padding: 0,
              }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 6vw 80px",
        position: "relative", overflow: "hidden",
      }}>
        <Stripes side="right" opacity={0.55} />
        <div style={{ position: "relative", maxWidth: 720 }}>
          <p style={eyebrow}>Computer Engineering · Portfolio</p>
          <h1 style={{
            fontSize: "clamp(2.4rem, 7vw, 5.5rem)", fontWeight: 900,
            lineHeight: 0.95, margin: "0 0 8px", letterSpacing: -2,
          }}>
            KEIRK IAN<br /><span style={{ color: ACCENT }}>AVENIDO</span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: MUTED,
            fontWeight: 400, marginTop: 16, marginBottom: 0, letterSpacing: 1,
          }}>
            Computer Engineer · ML & Embedded Systems
          </p>
          <p style={{ marginTop: 32, color: "#AAA", fontSize: 16, lineHeight: 1.85, maxWidth: 520 }}>
            BS Computer Engineering graduate from National University Laguna with hands-on experience
            in machine learning, computer vision, signal processing, and embedded systems.
            IEEE published co-author. Driven to build systems that solve real problems.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 44, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")}
              style={{
                background: ACCENT, color: DARK, border: "none",
                padding: "14px 36px", fontWeight: 900, fontSize: 12,
                letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
              View Projects
            </button>
            <button onClick={() => scrollTo("contact")}
              style={{
                background: "transparent", color: WHITE,
                border: `1px solid ${MID}`, padding: "14px 36px",
                fontWeight: 600, fontSize: 12, letterSpacing: 2,
                cursor: "pointer", textTransform: "uppercase", transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = MID)}>
              Get In Touch
            </button>
          </div>
          <div style={{ marginTop: 72, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: ACCENT }}>2022</span>
            <span style={{ color: "#444", fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>
              — Engineering since
            </span>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillsRef} style={{ padding: "90px 6vw", background: GRAY }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px 80px",
        }}>
          <div>
            <p style={eyebrow}>What I Know</p>
            <h2 style={sectionTitle}>Technical Skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              {SKILLS.map((s) => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: ACCENT, fontWeight: 700 }}>{s.level}%</span>
                  </div>
                  <SkillBar level={s.level} visible={skillsVisible} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={eyebrow}>About Me</p>
            <h2 style={sectionTitle}>Who I Am</h2>
            <p style={{ color: MUTED, lineHeight: 1.9, fontSize: 15, marginTop: 0 }}>
              Fresh Computer Engineering graduate with a passion for embedded systems, machine
              learning, and computer vision. I thrive at the intersection of hardware and software —
              from circuit-level troubleshooting to training neural networks.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 36 }}>
              {[["4+","Projects Built"],["1","IEEE Publication"],["4","Certifications"],["2026","Graduate"]].map(([n, l]) => (
                <div key={l} style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16 }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: ACCENT }}>{n}</div>
                  <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <p style={{ color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: 3, marginTop: 36, textTransform: "uppercase" }}>
              Languages — C++ · Python · Java
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" ref={projRef} style={{ padding: "90px 6vw", background: DARK }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={eyebrow}>Selected Work</p>
          <h2 style={sectionTitle}>My Projects</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 3,
          }}>
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = ACCENT;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = i === 0 ? ACCENT : "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 2 }}>{p.year}</span>
                  <span style={{ color: ACCENT, fontSize: 18 }}>→</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.25 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: "0 0 24px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
                      textTransform: "uppercase", background: DARK,
                      color: ACCENT, padding: "4px 10px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" ref={certRef} style={{ padding: "90px 6vw", background: ACCENT }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "48px 80px",
        }}>
          <div>
            <p style={{ color: DARK, fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>
              Credentials
            </p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: DARK, margin: "0 0 24px", lineHeight: 1.05 }}>
              Certifications<br />&amp; Training
            </h2>
            <p style={{ color: "#333", fontSize: 15, lineHeight: 1.85 }}>
              Formal recognition of skills across technical, process, and safety disciplines —
              backed by hands-on experience and continuous professional development.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            {CERTIFICATIONS.map((c, i) => (
              <div key={c.label} style={{
                display: "flex", alignItems: "center", gap: 16,
                opacity: certVisible ? 1 : 0,
                transform: certVisible ? "translateX(0)" : "translateX(24px)",
                transition: `opacity 0.5s ${i * 0.12}s, transform 0.5s ${i * 0.12}s`,
              }}>
                <div style={{ width: 7, height: 7, background: DARK, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 12, fontWeight: 900, color: DARK, letterSpacing: 2, textTransform: "uppercase" }}>
                    {c.label}
                  </span>
                  <span style={{ fontSize: 12, color: "#555", marginLeft: 12 }}>{c.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ME ── */}
      <section ref={whyRef} style={{ padding: "90px 6vw", background: GRAY, position: "relative", overflow: "hidden" }}>
        <Stripes side="left" opacity={0.4} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <p style={eyebrow}>The Case</p>
          <h2 style={sectionTitle}>Why Choose Me?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {WHY.map(([n, title, desc], i) => (
              <div key={n} style={{
                borderTop: `1px solid ${MID}`, paddingTop: 24,
                opacity: whyVisible ? 1 : 0,
                transform: whyVisible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
              }}>
                <div style={{ fontSize: 10, color: ACCENT, fontWeight: 900, letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>{n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={contactRef} style={{ padding: "90px 6vw 110px", background: DARK }}>
        <div style={{
          maxWidth: 600, margin: "0 auto", textAlign: "center",
          opacity: contactVisible ? 1 : 0,
          transform: contactVisible ? "none" : "translateY(24px)",
          transition: "opacity 0.65s, transform 0.65s",
        }}>
          <p style={eyebrow}>Get In Touch</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1 }}>
            Let's Build<br />Something Great
          </h2>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
            Open to full-time roles, internships, and research collaborations.
          </p>
          <div style={{ marginBottom: 40, display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ color: "#AAA", fontSize: 14, margin: 0 }}>📍 San Pablo City, Laguna</p>
            <p style={{ color: "#AAA", fontSize: 14, margin: 0 }}>📞 +63 9277306698</p>
            <p style={{ color: ACCENT, fontSize: 14, margin: 0 }}>✉️ keirkian09s@gmail.com</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            {[{ placeholder: "Your Name", type: "text" }, { placeholder: "Your Email", type: "email" }].map(({ placeholder, type }) => (
              <input key={placeholder} type={type} placeholder={placeholder}
                style={{
                  background: CARD, border: `1px solid ${MID}`, color: WHITE,
                  padding: "14px 18px", fontSize: 14, outline: "none",
                  fontFamily: "inherit", width: "100%", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e)  => (e.target.style.borderColor = MID)} />
            ))}
            <textarea placeholder="Tell me about your project or opportunity..." rows={5}
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
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}>
              Send Message
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 36, marginTop: 60, flexWrap: "wrap" }}>
            {["GitHub", "LinkedIn", "Email"].map((s) => (
              <button key={s} style={{
                background: "none", border: "none", color: "#555",
                cursor: "pointer", fontSize: 11, fontWeight: 700,
                letterSpacing: 2, textTransform: "uppercase",
              }}
                onMouseEnter={(e) => (e.target.style.color = ACCENT)}
                onMouseLeave={(e) => (e.target.style.color = "#555")}>
                {s}
              </button>
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
        <span style={{ color: ACCENT, fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>&lt;KEIRK/&gt;</span>
        <span style={{ color: "#444", fontSize: 12 }}>© {new Date().getFullYear()} Keirk Ian V. Avenido. All rights reserved.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: #555; }
        @media (max-width: 720px) {
          .nav-links  { display: none !important; }
          .hamburger  { display: block !important; }
        }
      `}</style>
    </div>
  );
}
