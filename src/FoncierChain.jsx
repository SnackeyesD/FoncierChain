import { useState, useEffect, useRef, useCallback } from "react";
import { Shield, Globe, Clock, Lock, CheckCircle, AlertTriangle, TrendingUp, Users, FileText, Building, ChevronRight, Zap, Eye, Database } from "lucide-react";

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #22c55e;
    --green-dark: #16a34a;
    --green-glow: rgba(34, 197, 94, 0.3);
    --yellow: #eab308;
    --yellow-glow: rgba(234, 179, 8, 0.3);
    --red: #ef4444;
    --red-glow: rgba(239, 68, 68, 0.3);
    --dark: #060a0f;
    --dark2: #0d1117;
    --dark3: #111827;
    --glass: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.08);
    --text: #f8fafc;
    --text-muted: #94a3b8;
  }

  body { background: var(--dark); font-family: 'DM Sans', sans-serif; color: var(--text); overflow-x: hidden; }

  .font-display { font-family: 'Syne', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse-red {
    0%, 100% { box-shadow: 0 0 0 0 var(--red-glow); }
    50%       { box-shadow: 0 0 40px 20px var(--red-glow); }
  }
  @keyframes pulse-green {
    0%, 100% { box-shadow: 0 0 0 0 var(--green-glow); }
    50%       { box-shadow: 0 0 60px 30px var(--green-glow); }
  }
  @keyframes glow-border {
    0%, 100% { border-color: rgba(34,197,94,0.3); }
    50%       { border-color: rgba(34,197,94,0.8); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); } to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes ripple {
    0%   { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes scan {
    0%   { top: 0%; } 100% { top: 100%; }
  }
  @keyframes grid-move {
    0%   { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }

  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .card-glass {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    transition: all 0.35s ease;
  }
  .card-glass:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(34,197,94,0.4);
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 0 40px rgba(34,197,94,0.1);
  }

  .btn-primary {
    position: relative;
    background: linear-gradient(135deg, var(--green) 0%, #16a34a 100%);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.02em;
    padding: 16px 40px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 0 30px rgba(34,197,94,0.4);
  }
  .btn-primary:hover {
    transform: scale(1.04);
    box-shadow: 0 0 60px rgba(34,197,94,0.6), 0 8px 32px rgba(0,0,0,0.3);
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 0; height: 0;
    background: rgba(255,255,255,0.25);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
  }
  .btn-primary:active::after { width: 300px; height: 300px; opacity: 0; }

  .btn-outline {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 15px;
    padding: 14px 32px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50px;
    background: transparent;
    color: var(--text);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-outline:hover { border-color: var(--green); color: var(--green); }

  .nav-link { color: var(--text-muted); font-size: 14px; cursor: pointer; transition: color 0.2s; text-decoration: none; }
  .nav-link:hover { color: var(--text); }

  .stat-number {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(56px, 10vw, 120px);
    line-height: 1;
    background: linear-gradient(135deg, var(--red) 0%, #ff6b6b 50%, var(--yellow) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .grid-bg {
    background-image: linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: grid-move 8s linear infinite;
  }

  .tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.3);
    color: var(--green);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 50px;
  }

  .shimmer-text {
    background: linear-gradient(90deg, #fff 20%, var(--green) 40%, var(--yellow) 60%, #fff 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .scroll-bar { scrollbar-width: thin; scrollbar-color: #22c55e transparent; }

  .step-connector {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--green), transparent);
    opacity: 0.3;
    margin: 0 8px;
  }
`;

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? "#eab308" : "#22c55e"
    }));
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,197,94,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function RevealSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color = "#22c55e", delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <RevealSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? color + "55" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: "32px 28px",
          cursor: "default",
          transition: "all 0.35s ease",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered ? `0 24px 64px rgba(0,0,0,0.4), 0 0 40px ${color}18` : "none",
          height: "100%"
        }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: color + "18",
          border: `1px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 0 20px ${color}44` : "none",
          animation: hovered ? "float 3s ease-in-out infinite" : "none"
        }}>
          <Icon size={22} color={color} />
        </div>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#f8fafc" }}>{title}</div>
        <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{desc}</div>
      </div>
    </RevealSection>
  );
}

function StatBadge({ value, label, color }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const count = useCounter(parseInt(value), 1800, visible);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 48, color, lineHeight: 1 }}>
        {count}{value.includes("%") ? "%" : value.includes("+") ? "+" : ""}
      </div>
      <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 6, maxWidth: 140, margin: "6px auto 0" }}>{label}</div>
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,10,15,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: "18px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Database size={16} color="#fff" />
        </div>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          Foncier<span style={{ color: "#22c55e" }}>Chain</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Problème", "Solution", "Impact", "Contact"].map(l => (
          <a key={l} className="nav-link" href={`#${l.toLowerCase()}`}>{l}</a>
        ))}
      </div>
      <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
        Démo Live →
      </button>
    </nav>
  );
}

export default function FoncierChain() {
  const stat60Ref = useRef(null);
  const stat60Visible = useIntersection(stat60Ref);
  const count60 = useCounter(60, 2400, stat60Visible);

  return (
    <>
      <style>{STYLES}</style>

      <div style={{ background: "#060a0f", color: "#f8fafc", fontFamily: "DM Sans, sans-serif" }}>
        <NavBar />

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "120px 24px 80px" }}>
          {/* Grid bg */}
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
          {/* Particle canvas */}
          <ParticleCanvas />
          {/* Green orb */}
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "10%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", textAlign: "center", maxWidth: 860, zIndex: 2 }}>
            <div style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.1s" }}>
              <span className="tag" style={{ marginBottom: 28, display: "inline-flex" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse-green 2s ease-in-out infinite" }} />
                MiaBe Hackathon 2026 · PROJET CG-01
              </span>
            </div>

            <h1 className="font-display" style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.25s", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 28 }}>
              Le cadastre foncier{" "}
              <span className="shimmer-text">immuable</span>{" "}
              <br />du Congo
            </h1>

            <p style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.4s", fontSize: 18, lineHeight: 1.8, color: "#94a3b8", maxWidth: 600, margin: "0 auto 48px" }}>
              FoncierChain utilise la blockchain pour rendre la double attribution foncière techniquement impossible — chaque parcelle existe une seule fois, pour toujours.
            </p>

            <div style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.55s", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary">
                Voir la démo live &nbsp;→
              </button>
              <button className="btn-outline">
                Vérifier une parcelle
              </button>
            </div>

            {/* Hero badges */}
            <div style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.7s", display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 64 }}>
              {[
                { icon: Shield, label: "Double attribution impossible" },
                { icon: Eye, label: "Vérification publique" },
                { icon: Lock, label: "Registre immuable" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13 }}>
                  <Icon size={14} color="#22c55e" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 2s ease-in-out infinite" }}>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(34,197,94,0.5))" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
          </div>
        </section>

        {/* ── 60% SHOCK SECTION ────────────────────────────────── */}
        <section id="problème" style={{ background: "#080c10", padding: "120px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(239,68,68,0.06) 0%, transparent 70%)" }} />

          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <RevealSection>
              <div style={{ textAlign: "center", marginBottom: 80 }}>
                <span className="tag" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#ef4444", background: "rgba(239,68,68,0.1)", marginBottom: 24, display: "inline-flex" }}>
                  <AlertTriangle size={12} /> Crise foncière
                </span>
                <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  La réalité du terrain
                </h2>
              </div>
            </RevealSection>

            {/* Big 60% */}
            <div ref={stat60Ref} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 800,
                  fontSize: "clamp(120px, 22vw, 240px)",
                  lineHeight: 0.9,
                  background: "linear-gradient(135deg, #ef4444 0%, #ff6b6b 40%, #eab308 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  animation: stat60Visible ? "pulse-red 3s ease-in-out infinite" : "none",
                }}>
                  {count60}%
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 600, color: "#94a3b8", marginTop: 16 }}>
                  des terrains urbains à Brazzaville
                  <br />
                  <span style={{ color: "#ef4444" }}>font l'objet d'une contestation de propriété</span>
                </div>
              </div>
            </div>

            {/* Stat grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
              {[
                { icon: FileText, stat: "45%", label: "des affaires civiles sont des litiges fonciers", color: "#ef4444" },
                { icon: Users, stat: "5x", label: "le même terrain vendu à des propriétaires différents", color: "#eab308" },
                { icon: Clock, stat: "7 ans", label: "durée moyenne pour résoudre un litige", color: "#ef4444" },
                { icon: TrendingUp, stat: "3M FCFA", label: "coût moyen d'un litige pour un ménage", color: "#eab308" },
              ].map(({ icon: Icon, stat, label, color }, i) => (
                <RevealSection key={stat} delay={i * 0.1}>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px 24px" }}>
                    <Icon size={18} color={color} style={{ marginBottom: 16 }} />
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 36, color, marginBottom: 8 }}>{stat}</div>
                    <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{label}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTION ─────────────────────────────────────────── */}
        <section id="solution" style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <RevealSection>
              <div style={{ textAlign: "center", marginBottom: 72 }}>
                <span className="tag" style={{ marginBottom: 24, display: "inline-flex" }}>
                  <Zap size={12} /> La solution blockchain
                </span>
                <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
                  FoncierChain résout<br />
                  <span style={{ color: "#22c55e" }}>chaque problème à la racine</span>
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
                  Un registre cryptographiquement sécurisé où chaque parcelle n'existe qu'une seule fois — techniquement, la fraude est impossible.
                </p>
              </div>
            </RevealSection>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              <FeatureCard
                icon={Shield}
                title="Enregistrement unique"
                desc="Chaque parcelle est cryptographiquement scellée au moment de l'enregistrement. Toute tentative de double attribution est automatiquement rejetée par le smart contract."
                color="#22c55e"
                delay={0}
              />
              <FeatureCard
                icon={Lock}
                title="Transfert sécurisé"
                desc="Tout changement de propriétaire requiert la validation cryptographique du propriétaire actuel. Sans sa clé, aucun transfert n'est possible."
                color="#eab308"
                delay={0.1}
              />
              <FeatureCard
                icon={Eye}
                title="Vérification publique"
                desc="N'importe quel citoyen peut rechercher instantanément un terrain par ID ou adresse et consulter le propriétaire légal actuel ainsi que tout l'historique."
                color="#22c55e"
                delay={0.2}
              />
              <FeatureCard
                icon={Database}
                title="Historique immuable"
                desc="L'intégralité de la chaîne de propriété est conservée en permanence sur la blockchain — impossible à modifier, effacer ou falsifier."
                color="#eab308"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section style={{ background: "#080c10", padding: "100px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <RevealSection>
              <div style={{ textAlign: "center", marginBottom: 72 }}>
                <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
                  Comment ça fonctionne
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 16 }}>Trois étapes, zéro fraude possible</p>
              </div>
            </RevealSection>

            <div style={{ display: "flex", gap: 0, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { n: "01", icon: FileText, title: "Enregistrement", desc: "L'agent foncier enregistre la parcelle avec ses coordonnées GPS, superficie et documents. Le smart contract vérifie l'unicité.", color: "#22c55e" },
                { n: "02", icon: Shield, title: "Validation crypto", desc: "La transaction est signée cryptographiquement et inscrite de manière permanente sur la blockchain. Aucune modification possible.", color: "#eab308" },
                { n: "03", icon: Eye, title: "Vérification publique", desc: "Tout citoyen, notaire ou banque peut vérifier la propriété en temps réel depuis le portail web ou l'application mobile.", color: "#22c55e" },
              ].map(({ n, icon: Icon, title, desc, color }, i) => (
                <RevealSection key={n} delay={i * 0.15} style={{ flex: "1 1 260px", maxWidth: 320, padding: "0 16px" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ position: "relative", marginBottom: 28 }}>
                      <div style={{ width: 72, height: 72, borderRadius: "50%", background: color + "15", border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", position: "relative" }}>
                        <Icon size={26} color={color} />
                        <div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: "#060a0f", border: `1px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne,sans-serif", fontSize: 10, fontWeight: 700, color }}>
                          {n}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{title}</div>
                    <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{desc}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT METRICS ───────────────────────────────────── */}
        <section id="impact" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,0.05) 0%, transparent 70%)" }} />
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <RevealSection>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
                  Impact attendu
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 16 }}>Quand la confiance est restaurée, tout change</p>
              </div>
            </RevealSection>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
              <RevealSection delay={0}><StatBadge value="0%" label="Taux de double attribution possible" color="#22c55e" /></RevealSection>
              <RevealSection delay={0.1}><StatBadge value="100%" label="Vérification publique instantanée" color="#22c55e" /></RevealSection>
              <RevealSection delay={0.2}><StatBadge value="45%" label="Affaires civiles éliminées progressivement" color="#eab308" /></RevealSection>
              <RevealSection delay={0.3}><StatBadge value="60%" label="Terrains litigieux sécurisés à terme" color="#22c55e" /></RevealSection>
            </div>

            {/* ODD badges */}
            <RevealSection delay={0.2} style={{ marginTop: 72, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                Objectifs de Développement Durable
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { n: "ODD 1", label: "Fin de la pauvreté" },
                  { n: "ODD 11", label: "Villes durables" },
                  { n: "ODD 16", label: "Institutions efficaces" },
                ].map(({ n, label }) => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 50, padding: "10px 20px" }}>
                    <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 13, color: "#22c55e" }}>{n}</span>
                    <span style={{ fontSize: 13, color: "#64748b" }}>{label}</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── USERS ─────────────────────────────────────────────── */}
        <section style={{ background: "#080c10", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <RevealSection>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Conçu pour tous les acteurs du foncier
                </h2>
              </div>
            </RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { icon: Users, title: "Propriétaires", sub: "Brazzaville & Pointe-Noire" },
                { icon: FileText, title: "Notaires & Agents", sub: "Enregistrement sécurisé" },
                { icon: Building, title: "Tribunaux civils", sub: "Résolution de litiges" },
                { icon: TrendingUp, title: "Banques", sub: "Garanties sur propriété" },
                { icon: Globe, title: "Ministère", sub: "Affaires Foncières" },
              ].map(({ icon: Icon, title, sub }, i) => (
                <RevealSection key={title} delay={i * 0.08}>
                  <div style={{ textAlign: "center", padding: "24px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                      <Icon size={18} color="#22c55e" />
                    </div>
                    <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>{sub}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 65%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <RevealSection>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 40px", boxShadow: "0 0 60px rgba(34,197,94,0.4)", animation: "float 3s ease-in-out infinite" }}>
                <Database size={32} color="#fff" />
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24 }}>
                Prêt à sécuriser
                <br />
                <span style={{ color: "#22c55e" }}>le foncier congolais ?</span>
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.8, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
                FoncierChain est en développement actif pour le MiaBe Hackathon 2026. Rejoignez-nous pour transformer le cadastre du Congo avec la blockchain.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                <button className="btn-primary" style={{ fontSize: 16, padding: "18px 48px" }}>
                  Voir la démo &nbsp;→
                </button>
                <button className="btn-outline">
                  Vérifier une parcelle
                </button>
              </div>
              <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
                {["100% open source", "Données sur blockchain", "Accès public gratuit"].map(txt => (
                  <div key={txt} style={{ display: "flex", alignItems: "center", gap: 7, color: "#64748b", fontSize: 13 }}>
                    <CheckCircle size={13} color="#22c55e" />
                    {txt}
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Database size={14} color="#fff" />
            </div>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16 }}>
              Foncier<span style={{ color: "#22c55e" }}>Chain</span>
            </span>
          </div>
          <div style={{ color: "#334155", fontSize: 13 }}>
            © 2026 · MiaBe Hackathon · PROJET CG-01 · NEXT CODELITE TEAM
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["ODD 1", "ODD 11", "ODD 16"].map(o => (
              <span key={o} style={{ fontSize: 11, color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 50, padding: "4px 10px" }}>{o}</span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}