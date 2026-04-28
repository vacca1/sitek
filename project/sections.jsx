// Konnecta — sections
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// === NAVBAR ===
function Navbar() {
  const [scrolled, setScrolled] = useStateS(false);
  const { t, openForm, lang } = useI18n();
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { k: "nav.solutions", h: "#solucoes" },
    { k: "nav.cases", h: "#cases" },
    { k: "nav.tech", h: "#tecnologia" },
    { k: "nav.about", h: "#sobre" },
    { k: "nav.blog", h: "#blog" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: "16px 32px",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      background: scrolled ? "rgba(5,5,5,0.7)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <KonnectaWord size={20} color="#fff" />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hide-mobile">
          {links.map((l) => (
            <a key={l.k} href={l.h} style={{
              padding: "8px 14px", fontSize: 13, color: "rgba(255,255,255,0.75)",
              fontWeight: 400,
            }}>{t(l.k)}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LangToggle />
          <a href={waLink(lang)} target="_blank" rel="noopener" className="btn-primary hide-mobile" style={{ padding: "10px 18px", fontSize: 13 }}>
            {t("nav.cta")} <KArrow size={12} color="#000" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// === HERO ===
// === HERO ===
const HERO_ROTATE = {
  pt: [
    "que vai operar sua empresa.",
    "que pensa pelo seu time.",
    "que escala sem contratar.",
    "que vende enquanto você dorme.",
  ],
  es: [
    "que va a operar tu empresa.",
    "que piensa por tu equipo.",
    "que escala sin contratar.",
    "que vende mientras dormís.",
  ],
};

function Hero() {
  const { t, lang } = useI18n();
  return (
    <section id="top" style={{ position: "relative", paddingTop: 130, paddingBottom: 80, overflow: "hidden", minHeight: 760 }}>
      {/* Interactive dotfield bg */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0,
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 85%)",
      }}>
        <DotField dotRadius={1.5} dotSpacing={14} bulgeStrength={67} glowRadius={220} sparkle={false} waveAmplitude={0} />
      </div>
      {/* lime glow blob */}
      <div style={{
        position: "absolute", top: 100, right: -200, width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(203,255,0,0.12), transparent 60%)",
        filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
      }}></div>

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
        {/* Left */}
        <div>
          <Reveal delay={120}>
            <h1 className="display hero-title" style={{
              fontSize: "clamp(40px, 4.6vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: 28,
              maxWidth: 580,
            }}>
              <span style={{ display: "block", color: "#fff" }}>{t("hero.title.2")}</span>
              <span style={{
                display: "block",
                color: "var(--lime)",
                minHeight: "2.1em",     /* reserva 2 linhas para evitar jump */
                lineHeight: 1.05,
              }}>
                <TextType
                  text={HERO_ROTATE[lang]}
                  typingSpeed={48}
                  deletingSpeed={24}
                  pauseDuration={2400}
                  initialDelay={400}
                  cursorCharacter=""
                  showCursor={true}
                  loop={true}
                />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 460, lineHeight: 1.55, marginBottom: 28 }}>
              {t("hero.sub")}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div data-cta-row="true" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <FormButton className="btn-primary">{t("btn.diagnostic")} <KArrow size={12} color="#000" /></FormButton>
              <WaButton className="btn-secondary">{t("btn.whatsapp")}</WaButton>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div data-stats="true" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
              <Stat n="+50" l={lang === "pt" ? "Empresas atendidas" : "Empresas atendidas"} />
              <Stat n="+2.5M" l={lang === "pt" ? "Leads processados" : "Leads procesados"} />
              <Stat n="+35%" l={lang === "pt" ? "Aumento médio de ROI" : "Aumento medio de ROI"} />
              <Stat n="24/7" l={lang === "pt" ? "Automação ativa" : "Automatización activa"} />
            </div>
          </Reveal>
        </div>

        {/* Right - dashboard mock */}
        <Reveal delay={300}>
          <DashboardMock />
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(40px, 8vw, 64px) !important; }
        }
      `}</style>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 26, color: "#fff", marginBottom: 4 }}>{n}</div>
      <div className="mono" style={{ fontSize: 9.5, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
    </div>
  );
}

// === DASHBOARD MOCK ===
function DashboardMock() {
  const [ref, inView] = useInView();
  const leads = useCountUp(2548, 1800, inView);
  const conv = useCountUp(68, 1500, inView);
  const att = useCountUp(1842, 1700, inView);

  // tiny chart bars
  const bars = [40, 55, 38, 65, 50, 72, 60, 80, 68, 88, 75, 92];
  return (
    <div ref={ref} className="card halo" style={{ position: "relative", padding: 20, background: "linear-gradient(180deg, #0e0e0e, #060606)" }}>
      {/* top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <KMark size={20} color="#CBFF00" />
          <span className="mono" style={{ fontSize: 11, color: "var(--text-dim)" }}>dashboard.konnecta</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#222" }}></span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#222" }}></span>
          <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)" }}></span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <Kpi label="Leads Qualificados" value={Math.round(leads).toLocaleString("pt-BR")} delta="+24%" bars={bars.slice(0,8)} />
        <Kpi label="Conversão" value={`${Math.round(conv)}%`} delta="+12%" bars={bars.slice(2,10)} accent />
      </div>

      {/* big donut */}
      <div className="card" style={{ padding: 16, marginBottom: 14, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <DonutGauge value={conv} />
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Total de Conversões</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="display" style={{ fontSize: 28, color: "#fff" }}>{Math.round(conv)}%</span>
              <span style={{ fontSize: 11, color: "var(--lime)" }}>↑ +6.2pp</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 32, marginTop: 10 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ width: 6, height: `${h}%`, background: i > 7 ? "var(--lime)" : "rgba(255,255,255,0.25)", borderRadius: 1 }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* attendances */}
      <div className="card" style={{ padding: 14, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Atendimentos · 7d</div>
          <span className="tag lime">● ao vivo</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <span className="display" style={{ fontSize: 24, color: "#fff" }}>{Math.round(att).toLocaleString("pt-BR")}</span>
          <span style={{ fontSize: 11, color: "var(--lime)" }}>+22%</span>
        </div>
        <Sparkline data={[20,28,24,40,36,52,48,60,58,75,70,88,82,95]} />
      </div>
    </div>
  );
}

function Kpi({ label, value, delta, bars, accent }) {
  return (
    <div className="card" style={{ padding: 14, background: "rgba(255,255,255,0.02)" }}>
      <div className="mono" style={{ fontSize: 9, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        <span className="display" style={{ fontSize: 22, color: accent ? "var(--lime)" : "#fff" }}>{value}</span>
        <span style={{ fontSize: 10, color: "var(--lime)" }}>{delta}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 22 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: accent && i === bars.length - 1 ? "var(--lime)" : "rgba(255,255,255,0.2)", borderRadius: 1 }}></div>
        ))}
      </div>
    </div>
  );
}

function DonutGauge({ value = 68 }) {
  const r = 32, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width="86" height="86" viewBox="0 0 86 86">
      <circle cx="43" cy="43" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none"/>
      <circle cx="43" cy="43" r={r} stroke="#CBFF00" strokeWidth="6" fill="none"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 43 43)"
        style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.2,.7,.2,1)", filter: "drop-shadow(0 0 6px rgba(203,255,0,0.5))" }}/>
      <text x="43" y="48" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Space Grotesk" fontWeight="500">{Math.round(value)}%</text>
    </svg>
  );
}

function Sparkline({ data }) {
  const max = Math.max(...data);
  const w = 280, h = 40;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 40 }}>
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CBFF00" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#CBFF00" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#sg)" stroke="none"/>
      <polyline points={pts} fill="none" stroke="#CBFF00" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

// === LOGO STRIP ===
function LogoStrip() {
  const { lang } = useI18n();
  const companies = ["Clínica Vitalis", "Construtora Proja", "Boutique D'Luxo", "Grupo Innova", "OdontoPrime", "Studio Forma", "Banco Nexus", "AgroSul"];
  return (
    <section style={{ padding: "60px 32px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>
          {lang === "pt" ? "Empresas que confiam na Konnecta" : "Empresas que confían en Konnecta"}
        </div>
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)" }}>
          <div className="marquee-track" style={{ display: "flex", gap: 64, width: "max-content", alignItems: "center" }}>
            {[...companies, ...companies].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.5)", fontSize: 18, fontFamily: "Space Grotesk", fontWeight: 500, letterSpacing: "-0.02em" }}>
                <span style={{ width: 6, height: 6, background: "var(--lime)", borderRadius: "50%" }}></span>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === SOLUTIONS - Bento Grid ===
function Solutions() {
  const { lang, t } = useI18n();
  const items = lang === "pt" ? [
    { icon: <Icon.bot c="#CBFF00" s={26} />, title: "Agentes de IA", emph: "que pensam", desc: "Atendentes e vendedores inteligentes que trabalham 24/7 para sua empresa.", tag: "AGENTS", span: 7, bigVisual: "bot" },
    { icon: <Icon.whats c="#CBFF00" s={26} />, title: "Automação", emph: "WhatsApp", desc: "Fluxos que qualificam, atendem e convertem.", tag: "WPP", span: 5, bigVisual: "wpp" },
    { icon: <Icon.crm c="#CBFF00" s={26} />, title: "CRM", emph: "Inteligente", desc: "Gestão completa de leads, funis e relacionamento.", tag: "CRM", span: 5, bigVisual: "crm" },
    { icon: <Icon.lead c="#CBFF00" s={26} />, title: "Qualificação", emph: "de Leads", desc: "IA que pontua, prioriza e direciona os melhores leads para o time.", tag: "LEADS", span: 7, bigVisual: "leads" },
    { icon: <Icon.flow c="#CBFF00" s={26} />, title: "ERP &", emph: "Integrações", desc: "Conectamos suas ferramentas em um sistema único.", tag: "ERP", span: 6, bigVisual: "erp" },
    { icon: <Icon.chart c="#CBFF00" s={26} />, title: "Dashboards", emph: "& BI", desc: "Dados em tempo real para decisões mais rápidas.", tag: "BI", span: 6, bigVisual: "bi" },
  ] : [
    { icon: <Icon.bot c="#CBFF00" s={26} />, title: "Agentes de IA", emph: "que piensan", desc: "Atención y vendedores inteligentes que trabajan 24/7 para tu empresa.", tag: "AGENTS", span: 7, bigVisual: "bot" },
    { icon: <Icon.whats c="#CBFF00" s={26} />, title: "Automatización", emph: "WhatsApp", desc: "Flujos que califican, atienden y convierten.", tag: "WPP", span: 5, bigVisual: "wpp" },
    { icon: <Icon.crm c="#CBFF00" s={26} />, title: "CRM", emph: "Inteligente", desc: "Gestión completa de leads, embudos y relación con clientes.", tag: "CRM", span: 5, bigVisual: "crm" },
    { icon: <Icon.lead c="#CBFF00" s={26} />, title: "Calificación", emph: "de Leads", desc: "IA que puntúa, prioriza y dirige los mejores leads al equipo.", tag: "LEADS", span: 7, bigVisual: "leads" },
    { icon: <Icon.flow c="#CBFF00" s={26} />, title: "ERP &", emph: "Integraciones", desc: "Conectamos tus herramientas en un sistema único.", tag: "ERP", span: 6, bigVisual: "erp" },
    { icon: <Icon.chart c="#CBFF00" s={26} />, title: "Dashboards", emph: "& BI", desc: "Datos en tiempo real para decisiones más rápidas.", tag: "BI", span: 6, bigVisual: "bi" },
  ];
  return (
    <section id="soluções" style={{ padding: "120px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, gap: 32, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ width: 32, height: 1, background: "var(--line-strong)" }}></span>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.3em" }}>{lang === "pt" ? "Soluções que transformam" : "Soluciones que transforman"}</span>
              </div>
              <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", maxWidth: 700 }}>
                {lang === "pt" ? <>Sistemas de IA <span className="serif-it" style={{ color: "var(--lime)" }}>que escalam</span> com sua empresa.</> : <>Sistemas de IA <span className="serif-it" style={{ color: "var(--lime)" }}>que escalan</span> con tu empresa.</>}
              </h2>
            </div>
            <button className="btn-secondary">{t("sol.see.all")} <KArrow size={12} color="#fff" /></button>
          </div>
        </Reveal>
        <div data-bento="true" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }} className="bento-grid">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80} as="div" className="bento-cell" data-span={it.span}>
              <BentoCard {...it} lang={lang} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .bento-cell[data-span="7"] { grid-column: span 7; }
        .bento-cell[data-span="5"] { grid-column: span 5; }
        .bento-cell[data-span="6"] { grid-column: span 6; }
        @media (max-width: 900px) {
          .bento-cell[data-span] { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}

function BentoCard({ icon, title, emph, desc, tag, bigVisual, lang }) {
  const [hover, setHover] = useStateS(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="card"
      style={{
        padding: 32, height: "100%", minHeight: 280, position: "relative", overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s",
        borderColor: hover ? "rgba(203,255,0,0.4)" : "var(--line)",
        cursor: "pointer",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* halftone */}
      <div className="halftone" style={{ position: "absolute", inset: 0, opacity: hover ? 0.25 : 0.08, transition: "opacity 0.4s" }}></div>
      {/* big bg visual */}
      <BentoVisual kind={bigVisual} hover={hover} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(203,255,0,0.08)", border: "1px solid rgba(203,255,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.15em" }}>{tag}</span>
      </div>

      <div style={{ marginTop: "auto", position: "relative", zIndex: 2 }}>
        <h3 className="display" style={{ fontSize: 30, marginBottom: 12, color: "#fff" }}>
          {title} <span className="serif-it" style={{ color: "var(--lime)" }}>{emph}</span>
        </h3>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 20, maxWidth: 420 }}>{desc}</p>

        {/* hover liquid glass pill */}
        <div className="liquid-glass glass-pulse" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "10px 18px", borderRadius: 999,
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
          transition: "all 0.4s cubic-bezier(.2,.8,.2,1)",
          background: "rgba(15,15,15,0.55)",
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: "50%",
            background: "var(--lime)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 12px rgba(203,255,0,0.6)",
          }}>
            <KArrow size={11} color="#000" />
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#fff", letterSpacing: "-0.01em" }}>
            {lang === "es" ? "Conocer" : "Conhecer"}
          </span>
        </div>
      </div>
    </div>
  );
}

function BentoVisual({ kind, hover }) {
  // Geometric ambient visual per card type
  const common = { position: "absolute", top: 0, right: 0, width: "60%", height: "100%", opacity: hover ? 0.9 : 0.4, transition: "opacity 0.5s, transform 0.5s", transform: hover ? "scale(1.05)" : "scale(1)", zIndex: 1, pointerEvents: "none" };
  if (kind === "bot") return (
    <svg viewBox="0 0 200 200" style={common}>
      <circle cx="140" cy="100" r="60" fill="none" stroke="rgba(203,255,0,0.3)"/>
      <circle cx="140" cy="100" r="40" fill="none" stroke="rgba(203,255,0,0.4)"/>
      <circle cx="140" cy="100" r="20" fill="rgba(203,255,0,0.2)"/>
      {[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return <line key={i} x1={140} y1={100} x2={140 + Math.cos(a)*70} y2={100 + Math.sin(a)*70} stroke="rgba(203,255,0,0.15)"/>; })}
    </svg>
  );
  if (kind === "wpp") return (
    <svg viewBox="0 0 200 200" style={common}>
      {[20,50,80,110].map((y, i) => <rect key={i} x={i%2?80:130} y={y} width="50" height="22" rx="11" fill="none" stroke="rgba(203,255,0,0.3)"/>)}
    </svg>
  );
  if (kind === "crm") return (
    <svg viewBox="0 0 200 200" style={common}>
      <rect x="60" y="30" width="120" height="20" fill="rgba(203,255,0,0.2)"/>
      <rect x="60" y="60" width="100" height="10" fill="rgba(255,255,255,0.1)"/>
      <rect x="60" y="80" width="120" height="10" fill="rgba(255,255,255,0.1)"/>
      <rect x="60" y="100" width="80" height="10" fill="rgba(255,255,255,0.1)"/>
      <rect x="60" y="130" width="120" height="40" fill="none" stroke="rgba(203,255,0,0.3)"/>
    </svg>
  );
  if (kind === "leads") return (
    <svg viewBox="0 0 200 200" style={common}>
      <polyline points="20,150 60,120 100,130 140,80 180,40" fill="none" stroke="#CBFF00" strokeWidth="2"/>
      {[20,60,100,140,180].map((x,i) => <circle key={i} cx={x} cy={[150,120,130,80,40][i]} r="4" fill="#CBFF00"/>)}
    </svg>
  );
  if (kind === "erp") return (
    <svg viewBox="0 0 200 200" style={common}>
      {[[40,60],[160,60],[40,140],[160,140],[100,100]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="14" fill={i===4?"rgba(203,255,0,0.3)":"none"} stroke="rgba(203,255,0,0.4)"/>)}
      <line x1="50" y1="65" x2="90" y2="95" stroke="rgba(203,255,0,0.3)"/>
      <line x1="150" y1="65" x2="110" y2="95" stroke="rgba(203,255,0,0.3)"/>
      <line x1="50" y1="135" x2="90" y2="105" stroke="rgba(203,255,0,0.3)"/>
      <line x1="150" y1="135" x2="110" y2="105" stroke="rgba(203,255,0,0.3)"/>
    </svg>
  );
  if (kind === "bi") return (
    <svg viewBox="0 0 200 200" style={common}>
      {[40,70,55,90,75,110,95,130].map((h, i) => <rect key={i} x={30 + i*18} y={170 - h} width="12" height={h} fill={i>5?"#CBFF00":"rgba(255,255,255,0.2)"}/>)}
    </svg>
  );
  return null;
}

// === PROCESS ===
function Process() {
  const { lang } = useI18n();
  const steps = lang === "pt" ? [
    { n: "01", title: "Diagnóstico", desc: "Analisamos seus processos atuais para identificar oportunidades.", icon: <Icon.brain c="#CBFF00" s={20}/> },
    { n: "02", title: "Estratégia", desc: "Desenhamos um plano personalizado para sua operação.", icon: <Icon.spark c="#CBFF00" s={20}/> },
    { n: "03", title: "Desenvolvimento", desc: "Criamos e implementamos os sistemas de IA sob medida.", icon: <Icon.flow c="#CBFF00" s={20}/> },
    { n: "04", title: "Implementação", desc: "Testamos, validamos e colocamos tudo em produção.", icon: <Icon.zap c="#CBFF00" s={20}/> },
    { n: "05", title: "Otimização", desc: "Monitoramos e melhoramos continuamente os resultados.", icon: <Icon.chart c="#CBFF00" s={20}/> },
  ] : [
    { n: "01", title: "Diagnóstico", desc: "Analizamos tus procesos actuales para identificar oportunidades.", icon: <Icon.brain c="#CBFF00" s={20}/> },
    { n: "02", title: "Estrategia", desc: "Diseñamos un plan personalizado para tu operación.", icon: <Icon.spark c="#CBFF00" s={20}/> },
    { n: "03", title: "Desarrollo", desc: "Creamos e implementamos los sistemas de IA a medida.", icon: <Icon.flow c="#CBFF00" s={20}/> },
    { n: "04", title: "Implementación", desc: "Probamos, validamos y ponemos todo en producción.", icon: <Icon.zap c="#CBFF00" s={20}/> },
    { n: "05", title: "Optimización", desc: "Monitoreamos y mejoramos los resultados continuamente.", icon: <Icon.chart c="#CBFF00" s={20}/> },
  ];
  return (
    <section style={{ padding: "120px 32px", borderTop: "1px solid var(--line)", background: "linear-gradient(180deg, transparent, rgba(203,255,0,0.02), transparent)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span className="eyebrow">{lang === "pt" ? "Como trabalhamos" : "Cómo trabajamos"}</span>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
              {lang === "pt" ? <>Um processo simples,<br/>resultados <span style={{ color: "var(--lime)" }}>extraordinários</span></> : <>Un proceso simple,<br/>resultados <span style={{ color: "var(--lime)" }}>extraordinarios</span></>}
            </h2>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          {/* connector line */}
          <svg style={{ position: "absolute", top: 32, left: "8%", right: "8%", width: "84%", height: 2, zIndex: 0 }} preserveAspectRatio="none" viewBox="0 0 1000 2">
            <line x1="0" y1="1" x2="1000" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="0" y1="1" x2="1000" y2="1" stroke="var(--lime)" strokeWidth="1" className="flow" strokeOpacity="0.7"/>
          </svg>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, position: "relative", zIndex: 1 }} className="grid-5">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 64, height: 64, margin: "0 auto 24px", borderRadius: "50%",
                    background: "#0a0a0a", border: "1px solid var(--lime-line)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 0 6px #050505",
                  }}>
                    {s.icon}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--lime)", marginBottom: 8, letterSpacing: "0.15em" }}>{s.n}</div>
                  <h3 className="display" style={{ fontSize: 20, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === PLATFORM ===
const PLATFORM_TABS = {
  pt: [
    { id: "overview", label: "Visão Geral" },
    { id: "service", label: "Atendimento" },
    { id: "conversion", label: "Conversão" },
    { id: "leads", label: "Leads" },
    { id: "ai", label: "Inteligência" },
  ],
  es: [
    { id: "overview", label: "Visión General" },
    { id: "service", label: "Atención" },
    { id: "conversion", label: "Conversión" },
    { id: "leads", label: "Leads" },
    { id: "ai", label: "Inteligencia" },
  ],
};

const PLATFORM_NAV = {
  pt: ["Dashboard", "Atendimentos", "Leads", "Automações", "Integrações", "Analytics", "Configurações"],
  es: ["Dashboard", "Atenciones", "Leads", "Automatizaciones", "Integraciones", "Analytics", "Ajustes"],
};

function Platform() {
  const { lang, t } = useI18n();
  const tabs = PLATFORM_TABS[lang];
  const navItems = PLATFORM_NAV[lang];
  const [active, setActive] = useStateS(0);
  const [now, setNow] = useStateS(Date.now());

  // tick for live feel
  useEffectS(() => {
    const id = setInterval(() => setNow(Date.now()), 3000);
    return () => clearInterval(id);
  }, []);

  // sidebar item that maps to tab
  const navActiveIdx = [0, 1, 0, 2, 0][active] !== undefined ? active : 0;

  return (
    <section id="plataforma" style={{ padding: "120px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="eyebrow">{t("plat.eyebrow")}</span>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
              {t("plat.title.a")}<br/>
              <span style={{ color: "var(--lime)" }}>{t("plat.title.b")}</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 580, margin: "20px auto 0", lineHeight: 1.6 }}>
              {t("plat.sub")}
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="card" style={{ padding: 24, background: "linear-gradient(180deg, #0c0c0c, #050505)" }}>
            {/* top header */}
            <div className="platform-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--line)", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <KMark size={22} />
                <KonnectaWord size={14} color="#fff" />
              </div>
              <div className="platform-tabs" style={{ display: "flex", gap: 4, background: "#0a0a0a", border: "1px solid var(--line)", padding: 4, borderRadius: 999, overflowX: "auto" }}>
                {tabs.map((tab, i) => (
                  <button key={tab.id} className="tab-btn" data-active={active === i} onClick={() => setActive(i)}
                    style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, color: active === i ? "#000" : "var(--text-dim)", background: active === i ? "var(--lime)" : "transparent", border: "none", cursor: "pointer", fontWeight: active === i ? 600 : 400, whiteSpace: "nowrap", transition: "all 0.2s" }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)" }}></span>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-dim)" }}>SINCRONIZADO</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 260px", gap: 20 }} className="platform-grid">
              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {navItems.map((s, i) => {
                  const map = { 0: 0, 1: 1, 2: 3, 3: 1, 4: 4, 5: 2, 6: 6 };
                  const isActive = map[i] === active || (active === 0 && i === 0) || (active === 4 && i === 4) || (active === 1 && i === 1) || (active === 3 && i === 2) || (active === 2 && i === 5);
                  return (
                    <div key={s} onClick={() => {
                      if (i === 0) setActive(0);
                      else if (i === 1) setActive(1);
                      else if (i === 2) setActive(3);
                      else if (i === 5) setActive(2);
                      else if (i === 4) setActive(4);
                    }} style={{
                      padding: "10px 14px", borderRadius: 8, fontSize: 13,
                      background: isActive ? "rgba(203,255,0,0.08)" : "transparent",
                      color: isActive ? "var(--lime)" : "var(--text-dim)",
                      border: isActive ? "1px solid rgba(203,255,0,0.2)" : "1px solid transparent",
                      display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                      transition: "all 0.2s",
                    }}>
                      <span style={{ width: 4, height: 4, background: isActive ? "var(--lime)" : "rgba(255,255,255,0.2)", borderRadius: "50%" }}></span>
                      {s}
                    </div>
                  );
                })}
              </div>

              {/* Center + Right - dynamic per tab */}
              <PlatformContent active={active} now={now} lang={lang} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlatformContent({ active, now, lang }) {
  if (active === 0) return <PlatformOverview now={now} lang={lang} />;
  if (active === 1) return <PlatformService now={now} lang={lang} />;
  if (active === 2) return <PlatformConversion lang={lang} />;
  if (active === 3) return <PlatformLeads lang={lang} />;
  if (active === 4) return <PlatformAI now={now} lang={lang} />;
  return null;
}

// --- Tab 1: Overview (original kpis + funnel + activity) ---
function PlatformOverview({ now, lang }) {
  const labels = lang === "pt"
    ? { l1: "Leads / mês", l2: "Conversão", l3: "Receita", funnel: "Crescimento · 30d", daily: "Diário", activity: "Atividade Recente", live: "● ao vivo", events: [
      { who: "M. Silva", act: "Lead qualificado", t: "agora" },
      { who: "Bot WPP", act: "Atendimento iniciado", t: "1m" },
      { who: "J. Costa", act: "Contrato fechado", t: "4m" },
      { who: "Bot CRM", act: "Pontuação atualizada", t: "8m" },
      { who: "A. Souza", act: "Reunião agendada", t: "12m" },
    ]}
    : { l1: "Leads / mes", l2: "Conversión", l3: "Ingresos", funnel: "Crecimiento · 30d", daily: "Diario", activity: "Actividad Reciente", live: "● en vivo", events: [
      { who: "M. Silva", act: "Lead calificado", t: "ahora" },
      { who: "Bot WPP", act: "Atención iniciada", t: "1m" },
      { who: "J. Costa", act: "Contrato cerrado", t: "4m" },
      { who: "Bot CRM", act: "Puntuación actualizada", t: "8m" },
      { who: "A. Souza", act: "Reunión agendada", t: "12m" },
    ]};
  return (
    <>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          <BigStat label={labels.l1} value="2.548" delta="+24%" />
          <BigStat label={labels.l2} value="68%" delta="+12%" accent />
          <BigStat label={labels.l3} value={lang === "pt" ? "R$ 125,6k" : "$ 125,6k"} delta="+38%" />
        </div>
        <div className="card" style={{ padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{labels.funnel}</div>
            <span className="tag">{labels.daily}</span>
          </div>
          <FunnelChart />
        </div>
      </div>
      <div className="card" style={{ padding: 16, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{labels.activity}</div>
          <span className="tag lime">{labels.live}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {labels.events.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i % 2 ? "rgba(203,255,0,0.12)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: i % 2 ? "var(--lime)" : "#fff", flexShrink: 0 }}>
                {a.who[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.who}</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{a.act}</div>
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>{a.t}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// --- Tab 2: Service (live chats + response time) ---
function PlatformService({ now, lang }) {
  const L = lang === "pt"
    ? { active: "Conversas ativas", avg: "Tempo médio", csat: "CSAT", chats: "Conversas em andamento", agent: "Agente IA", human: "Time humano", st_active: "Atendendo", st_wait: "Aguardando", st_qual: "Qualificando", recent: "Últimas mensagens", channel: "WhatsApp · Web · Telegram" }
    : { active: "Conversaciones activas", avg: "Tiempo medio", csat: "CSAT", chats: "Conversaciones en curso", agent: "Agente IA", human: "Equipo humano", st_active: "Atendiendo", st_wait: "Esperando", st_qual: "Calificando", recent: "Últimos mensajes", channel: "WhatsApp · Web · Telegram" };

  const chats = lang === "pt" ? [
    { name: "Marina Costa", msg: "Quero agendar uma demo pro time", agent: "Bot WPP", st: "active", time: "agora", c: "lime" },
    { name: "Pedro Henrique", msg: "Qual o prazo de implementação?", agent: "Bot WPP", st: "qual", time: "1m", c: "white" },
    { name: "Luiza Andrade", msg: "Vocês integram com Bling?", agent: "Bot WPP", st: "active", time: "2m", c: "lime" },
    { name: "Roberto Silva", msg: "Pode mandar o orçamento?", agent: "Bot WPP", st: "qual", time: "3m", c: "white" },
    { name: "Camila Reis", msg: "Recebi sim, obrigada!", agent: "Time humano", st: "wait", time: "5m", c: "white" },
    { name: "Diego Martins", msg: "Excelente, vamos fechar.", agent: "Time humano", st: "active", time: "7m", c: "lime" },
  ] : [
    { name: "Marina Costa", msg: "Quiero agendar una demo para el equipo", agent: "Bot WPP", st: "active", time: "ahora", c: "lime" },
    { name: "Pedro Henrique", msg: "¿Cuál es el plazo de implementación?", agent: "Bot WPP", st: "qual", time: "1m", c: "white" },
    { name: "Luiza Andrade", msg: "¿Integran con Tiendanube?", agent: "Bot WPP", st: "active", time: "2m", c: "lime" },
    { name: "Roberto Silva", msg: "¿Puedes mandar la cotización?", agent: "Bot WPP", st: "qual", time: "3m", c: "white" },
    { name: "Camila Reis", msg: "Recibido, gracias!", agent: "Equipo", st: "wait", time: "5m", c: "white" },
    { name: "Diego Martins", msg: "Excelente, cerramos.", agent: "Equipo", st: "active", time: "7m", c: "lime" },
  ];

  // load distribution bars (animate based on now)
  const load = [78, 65, 42, 88, 56, 72, 45, 60, 80, 92, 70, 55];

  return (
    <>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          <BigStat label={L.active} value="247" delta="+18%" accent />
          <BigStat label={L.avg} value="32s" delta="-44%" />
          <BigStat label={L.csat} value="4.9" delta="+0.3" />
        </div>
        <div className="card" style={{ padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.chats}</div>
            <span className="tag lime">● live</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {chats.map((c, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr auto auto", gap: 12, alignItems: "center",
                padding: "10px 12px", borderRadius: 10,
                background: c.c === "lime" ? "rgba(203,255,0,0.04)" : "rgba(255,255,255,0.02)",
                border: c.c === "lime" ? "1px solid rgba(203,255,0,0.18)" : "1px solid var(--line)",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 500 }}>
                  {c.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#fff", marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.msg}</div>
                </div>
                <span className="tag" style={{ fontSize: 9 }}>{c.agent}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: c.st === "active" ? "var(--lime)" : c.st === "qual" ? "#fff" : "rgba(255,255,255,0.3)",
                    boxShadow: c.st === "active" ? "0 0 8px var(--lime)" : "none",
                  }}></span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 16, background: "rgba(255,255,255,0.02)" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>{L.channel}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 110, marginBottom: 16 }}>
          {load.map((v, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${v}%`,
              background: i === 9 ? "var(--lime)" : `rgba(203,255,0,${0.15 + (v / 100) * 0.5})`,
              borderRadius: "2px 2px 0 0",
              transition: "all 0.3s",
            }}></div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <span className="mono" style={{ fontSize: 9, color: "var(--text-faint)" }}>00h</span>
          <span className="mono" style={{ fontSize: 9, color: "var(--text-faint)" }}>12h</span>
          <span className="mono" style={{ fontSize: 9, color: "var(--text-faint)" }}>24h</span>
        </div>
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <DistRow label={L.agent} value={87} c="lime" />
          <DistRow label={L.human} value={13} c="white" />
        </div>
      </div>
    </>
  );
}

function DistRow({ label, value, c }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{label}</span>
        <span className="mono" style={{ fontSize: 11, color: c === "lime" ? "var(--lime)" : "#fff" }}>{value}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: c === "lime" ? "var(--lime)" : "#fff", transition: "width 0.5s" }}></div>
      </div>
    </div>
  );
}

// --- Tab 3: Conversion (funnel pyramid) ---
function PlatformConversion({ lang }) {
  const L = lang === "pt"
    ? { vis: "Visitantes", lead: "Leads", qual: "Qualificados", reun: "Reuniões", pago: "Clientes", title: "Funil completo · 30d", rev: "Receita gerada", chan: "Por canal" }
    : { vis: "Visitantes", lead: "Leads", qual: "Calificados", reun: "Reuniones", pago: "Clientes", title: "Funnel completo · 30d", rev: "Ingresos generados", chan: "Por canal" };

  const stages = [
    { label: L.vis, n: "12.480", w: 100, c: "rgba(255,255,255,0.08)" },
    { label: L.lead, n: "3.842", w: 78, c: "rgba(203,255,0,0.18)" },
    { label: L.qual, n: "2.548", w: 58, c: "rgba(203,255,0,0.32)" },
    { label: L.reun, n: "892", w: 32, c: "rgba(203,255,0,0.55)" },
    { label: L.pago, n: "287", w: 18, c: "var(--lime)" },
  ];
  const channels = [
    { n: lang === "pt" ? "Tráfego pago" : "Tráfico pago", v: 42 },
    { n: lang === "pt" ? "Orgânico" : "Orgánico", v: 28 },
    { n: "WhatsApp", v: 18 },
    { n: "Indicação", v: 8 },
    { n: lang === "pt" ? "Outros" : "Otros", v: 4 },
  ];

  return (
    <>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          <BigStat label={lang === "pt" ? "Conversão geral" : "Conversión total"} value="2.3%" delta="+0.8%" accent />
          <BigStat label={lang === "pt" ? "CPL médio" : "CPL medio"} value={lang === "pt" ? "R$ 12,43" : "$ 12,43"} delta="-62%" />
          <BigStat label={L.rev} value={lang === "pt" ? "R$ 412k" : "$ 412k"} delta="+38%" />
        </div>
        <div className="card" style={{ padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.title}</div>
            <span className="tag lime">+22% MoM</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {stages.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 100, fontSize: 12, color: "var(--text-dim)" }}>{s.label}</div>
                <div style={{ flex: 1, height: 36, background: "rgba(255,255,255,0.02)", borderRadius: 6, position: "relative", overflow: "hidden" }}>
                  <div style={{
                    width: `${s.w}%`, height: "100%",
                    background: s.c,
                    borderRadius: 6,
                    transition: "width 0.6s ease",
                    display: "flex", alignItems: "center", paddingLeft: 14,
                  }}>
                    <span className="mono" style={{ fontSize: 12, color: i >= 3 ? "#000" : "#fff", fontWeight: 600 }}>{s.n}</span>
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)", width: 50, textAlign: "right" }}>
                  {i === 0 ? "—" : `${Math.round((parseFloat(s.n.replace(/\./g,"")) / parseFloat(stages[i-1].n.replace(/\./g,""))) * 100)}%`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 16, background: "rgba(255,255,255,0.02)" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>{L.chan}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {channels.map((ch, i) => (
            <DistRow key={ch.n} label={ch.n} value={ch.v} c={i === 0 ? "lime" : "white"} />
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{lang === "pt" ? "Top canal" : "Top canal"}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="display" style={{ fontSize: 26, color: "var(--lime)" }}>3.2x</span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{lang === "pt" ? "ROAS · pago" : "ROAS · pago"}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// --- Tab 4: Leads (table with scoring) ---
function PlatformLeads({ lang }) {
  const L = lang === "pt"
    ? { title: "Leads quentes", score: "Score", source: "Origem", stage: "Etapa", value: "Ticket", quality: "Qualidade média" }
    : { title: "Leads calientes", score: "Score", source: "Origen", stage: "Etapa", value: "Ticket", quality: "Calidad media" };

  const leads = [
    { name: "Empresa Helix", source: "WhatsApp", stage: lang === "pt" ? "Proposta" : "Propuesta", score: 94, value: "R$ 48k" },
    { name: "Vitalis Saúde", source: lang === "pt" ? "Orgânico" : "Orgánico", stage: lang === "pt" ? "Reunião" : "Reunión", score: 89, value: "R$ 32k" },
    { name: "Arcline Tech", source: "Ads", stage: lang === "pt" ? "Negociação" : "Negociación", score: 87, value: "R$ 76k" },
    { name: "Luminary Co.", source: "WhatsApp", stage: lang === "pt" ? "Qualificado" : "Calificado", score: 78, value: "R$ 24k" },
    { name: "Northwind Imp.", source: lang === "pt" ? "Indicação" : "Referido", stage: lang === "pt" ? "Reunião" : "Reunión", score: 72, value: "R$ 58k" },
    { name: "Costa & Mar Ltda", source: "Ads", stage: lang === "pt" ? "Qualificado" : "Calificado", score: 65, value: "R$ 18k" },
  ];
  const scoreColor = (s) => s >= 85 ? "var(--lime)" : s >= 70 ? "#fff" : "var(--text-dim)";

  return (
    <>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          <BigStat label={lang === "pt" ? "Leads quentes" : "Leads calientes"} value="287" delta="+44%" accent />
          <BigStat label={L.quality} value="78/100" delta="+12" />
          <BigStat label={lang === "pt" ? "Pipeline" : "Pipeline"} value={lang === "pt" ? "R$ 1.2M" : "$ 1.2M"} delta="+28%" />
        </div>
        <div className="card" style={{ padding: 0, background: "rgba(255,255,255,0.02)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 1fr 0.7fr 0.7fr", gap: 0, padding: "12px 16px", borderBottom: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{lang === "pt" ? "Empresa" : "Empresa"}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.source}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.stage}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.score}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", textAlign: "right" }}>{L.value}</span>
          </div>
          {leads.map((ld, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1.4fr 0.8fr 1fr 0.7fr 0.7fr", gap: 0,
              padding: "14px 16px", borderBottom: i < leads.length - 1 ? "1px solid var(--line)" : "none",
              alignItems: "center", transition: "background 0.2s",
            }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(203,255,0,0.03)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <div style={{ fontSize: 13, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--text-dim)" }}>{ld.name[0]}</span>
                {ld.name}
              </div>
              <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{ld.source}</span>
              <span className="tag" style={{ fontSize: 10, width: "fit-content" }}>{ld.stage}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 32, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${ld.score}%`, height: "100%", background: scoreColor(ld.score) }}></div>
                </div>
                <span className="mono" style={{ fontSize: 11, color: scoreColor(ld.score), fontWeight: 600 }}>{ld.score}</span>
              </div>
              <span className="mono" style={{ fontSize: 12, color: "#fff", textAlign: "right" }}>{ld.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 16, background: "rgba(255,255,255,0.02)" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>{lang === "pt" ? "Distribuição por score" : "Distribución por score"}</div>
        <ScoreRing label={lang === "pt" ? "Quentes (≥85)" : "Calientes (≥85)"} value={42} c="var(--lime)" />
        <ScoreRing label={lang === "pt" ? "Mornos (70-84)" : "Tibios (70-84)"} value={31} c="#fff" />
        <ScoreRing label={lang === "pt" ? "Frios (<70)" : "Fríos (<70)"} value={27} c="rgba(255,255,255,0.3)" />
        <div style={{ borderTop: "1px solid var(--line)", marginTop: 16, paddingTop: 14 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{lang === "pt" ? "Próximo follow-up" : "Próximo follow-up"}</div>
          <div style={{ fontSize: 13, color: "#fff", marginBottom: 4 }}>Empresa Helix</div>
          <div style={{ fontSize: 11, color: "var(--lime)" }}>{lang === "pt" ? "em 12 minutos" : "en 12 minutos"}</div>
        </div>
      </div>
    </>
  );
}

function ScoreRing({ label, value, c }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ position: "relative", width: 36, height: 36 }}>
        <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
          <circle cx="18" cy="18" r="15" fill="none" stroke={c} strokeWidth="3" strokeDasharray={`${(value / 100) * 94.2} 94.2`} strokeLinecap="round"/>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: c, fontWeight: 600 }} className="mono">{value}%</div>
      </div>
      <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{label}</span>
    </div>
  );
}

// --- Tab 5: AI / Inteligência (agents + model usage) ---
function PlatformAI({ now, lang }) {
  const L = lang === "pt"
    ? { agents: "Agentes ativos", calls: "Chamadas / min", tokens: "Tokens · mês", models: "Uso por modelo", running: "Rodando", agentsList: "Agentes em produção" }
    : { agents: "Agentes activos", calls: "Llamadas / min", tokens: "Tokens · mes", models: "Uso por modelo", running: "Corriendo", agentsList: "Agentes en producción" };

  const agents = lang === "pt" ? [
    { name: "Closer SDR", model: "Claude Sonnet 4.5", calls: "1.2k/h", st: "running", load: 78 },
    { name: "Atendimento WPP", model: "GPT-4 Turbo", calls: "3.4k/h", st: "running", load: 92 },
    { name: "Qualificador Leads", model: "Claude Sonnet 4.5", calls: "842/h", st: "running", load: 64 },
    { name: "Auditor CRM", model: "GPT-4 Turbo", calls: "120/h", st: "running", load: 28 },
    { name: "Analista Dados", model: "Claude Opus 4", calls: "60/h", st: "running", load: 18 },
  ] : [
    { name: "Closer SDR", model: "Claude Sonnet 4.5", calls: "1.2k/h", st: "running", load: 78 },
    { name: "Atención WPP", model: "GPT-4 Turbo", calls: "3.4k/h", st: "running", load: 92 },
    { name: "Calificador Leads", model: "Claude Sonnet 4.5", calls: "842/h", st: "running", load: 64 },
    { name: "Auditor CRM", model: "GPT-4 Turbo", calls: "120/h", st: "running", load: 28 },
    { name: "Analista Datos", model: "Claude Opus 4", calls: "60/h", st: "running", load: 18 },
  ];

  return (
    <>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
          <BigStat label={L.agents} value="12" delta="+3" accent />
          <BigStat label={L.calls} value="847" delta="+18%" />
          <BigStat label={L.tokens} value="48.2M" delta="+24%" />
        </div>
        <div className="card" style={{ padding: 18, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.agentsList}</div>
            <span className="tag lime">● {L.running}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {agents.map((a, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 0.6fr 1fr", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(203,255,0,0.1)", border: "1px solid rgba(203,255,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon.bot c="#CBFF00" s={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#fff" }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text-faint)" }} className="mono">v2.4.1</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{a.model}</span>
                <span className="mono" style={{ fontSize: 11, color: "#fff" }}>{a.calls}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${a.load}%`, height: "100%", background: a.load > 80 ? "var(--lime)" : "rgba(203,255,0,0.5)" }}></div>
                  </div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)", width: 28, textAlign: "right" }}>{a.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 16, background: "rgba(255,255,255,0.02)" }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>{L.models}</div>
        <DistRow label="Claude Sonnet 4.5" value={48} c="lime" />
        <div style={{ height: 10 }}></div>
        <DistRow label="GPT-4 Turbo" value={32} c="white" />
        <div style={{ height: 10 }}></div>
        <DistRow label="Claude Opus 4" value={14} c="white" />
        <div style={{ height: 10 }}></div>
        <DistRow label="Llama 3.1" value={6} c="white" />
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{lang === "pt" ? "Latência média" : "Latencia media"}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="display" style={{ fontSize: 24, color: "var(--lime)" }}>240</span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }} className="mono">ms · p95</span>
          </div>
          <div style={{ marginTop: 10, height: 24 }}>
            <svg viewBox="0 0 100 24" style={{ width: "100%", height: "100%" }}>
              <polyline points="0,18 10,14 20,16 30,10 40,12 50,8 60,11 70,6 80,9 90,5 100,7"
                fill="none" stroke="var(--lime)" strokeWidth="1.2"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

// === ROI CALCULATOR ===
const ROI_COPY = {
  pt: {
    eyebrow: "Calculadora de ROI",
    title_a: "Quanto sua operação",
    title_b: "está perdendo",
    title_c: "sem agentes de IA?",
    sub: "Mexa nos sliders abaixo. Em tempo real, mostramos quanto você economiza, quantos leads recupera e em quanto tempo o investimento se paga.",
    inputs: "Sua operação hoje",
    leads: "Leads / mês",
    response_h: "Tempo de resposta (horas)",
    response_help: "Tempo médio entre o lead chegar e alguém responder",
    conv: "Conversão atual (%)",
    conv_help: "Taxa de fechamento dos leads que respondem",
    ticket: "Ticket médio (R$)",
    ticket_es: "Ticket medio ($)",
    agents_n: "Atendentes humanos",
    salary: "Salário médio mensal (R$)",
    salary_es: "Salario medio mensual ($)",
    hours: "Horas / dia em tarefas repetitivas",
    results: "Com Konnecta",
    metric_recovered: "Leads recuperados / mês",
    metric_recovered_help: "Leads que hoje você perde por demora ou má qualificação",
    metric_revenue: "Receita adicional / mês",
    metric_savings: "Economia operacional / mês",
    metric_savings_help: "Horas humanas devolvidas + redução de retrabalho",
    metric_roi: "ROI no 1º ano",
    metric_payback: "Payback estimado",
    investment: "Investimento Konnecta",
    invest_setup: "Setup único",
    invest_monthly: "Mensalidade",
    cta_title: "Quer validar esses números na sua operação?",
    cta_sub: "Em 30 minutos o Wagner roda esse mesmo cálculo com os dados reais do seu negócio.",
    cta_btn: "Quero meu diagnóstico",
    months: "meses",
    after_total: "Ganho líquido no 1º ano",
    speed_label: "Velocidade de resposta",
    speed_now: "agora",
    qual_label: "Qualificação automática",
    qual_after: "100%",
    breakdown: "Como chegamos nesse número",
    bd_l1: "Aumento de conversão pela resposta em <30s",
    bd_l2: "Recuperação de leads fora de horário comercial",
    bd_l3: "Qualificação automática evita lead ruim",
    bd_l4: "Horas humanas devolvidas para fechamento",
    assumptions: "Premissas conservadoras: +35% conversão com resposta <1min · 30% dos leads chegam fora do horário · agentes liberam 60% do tempo da equipe.",
  },
  es: {
    eyebrow: "Calculadora de ROI",
    title_a: "¿Cuánto tu operación",
    title_b: "está perdiendo",
    title_c: "sin agentes de IA?",
    sub: "Mové los sliders. En tiempo real mostramos cuánto ahorrás, cuántos leads recuperás y en cuánto se paga la inversión.",
    inputs: "Tu operación hoy",
    leads: "Leads / mes",
    response_h: "Tiempo de respuesta (horas)",
    response_help: "Tiempo promedio entre que llega el lead y alguien responde",
    conv: "Conversión actual (%)",
    conv_help: "Tasa de cierre de los leads que responden",
    ticket: "Ticket medio ($)",
    ticket_es: "Ticket medio ($)",
    agents_n: "Atención humana (personas)",
    salary: "Sueldo medio mensual ($)",
    salary_es: "Sueldo medio mensual ($)",
    hours: "Horas / día en tareas repetitivas",
    results: "Con Konnecta",
    metric_recovered: "Leads recuperados / mes",
    metric_recovered_help: "Leads que hoy se pierden por demora o mala calificación",
    metric_revenue: "Ingresos adicionales / mes",
    metric_savings: "Ahorro operativo / mes",
    metric_savings_help: "Horas humanas devueltas + reducción de retrabajo",
    metric_roi: "ROI en el 1º año",
    metric_payback: "Payback estimado",
    investment: "Inversión Konnecta",
    invest_setup: "Setup único",
    invest_monthly: "Mensualidad",
    cta_title: "¿Querés validar estos números con tu operación?",
    cta_sub: "En 30 minutos Wagner corre este mismo cálculo con los datos reales de tu negocio.",
    cta_btn: "Quiero mi diagnóstico",
    months: "meses",
    after_total: "Ganancia neta en el 1º año",
    speed_label: "Velocidad de respuesta",
    speed_now: "ahora",
    qual_label: "Calificación automática",
    qual_after: "100%",
    breakdown: "Cómo llegamos a ese número",
    bd_l1: "Aumento de conversión por respuesta en <30s",
    bd_l2: "Recuperación de leads fuera de horario comercial",
    bd_l3: "Calificación automática evita leads malos",
    bd_l4: "Horas humanas devueltas para cerrar ventas",
    assumptions: "Supuestos conservadores: +35% conversión con respuesta <1min · 30% de los leads llegan fuera de horario · agentes liberan 60% del tiempo del equipo.",
  },
};

function ROICalculator() {
  const { lang, t } = useI18n();
  const C = ROI_COPY[lang];
  const symbol = lang === "pt" ? "R$" : "$";

  const [leads, setLeads] = useStateS(800);
  const [responseH, setResponseH] = useStateS(4);
  const [conv, setConv] = useStateS(12);
  const [ticket, setTicket] = useStateS(2500);
  const [agentsN, setAgentsN] = useStateS(3);
  const [salary, setSalary] = useStateS(4000);
  const [hours, setHours] = useStateS(4);

  // model
  const calc = useMemoCalc({ leads, responseH, conv, ticket, agentsN, salary, hours });

  return (
    <section id="calculadora" style={{ padding: "120px 32px", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      {/* ambient */}
      <div style={{ position: "absolute", top: "20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(203,255,0,0.06), transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }}></div>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="eyebrow">{C.eyebrow}</span>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
              {C.title_a} <span style={{ color: "var(--lime)" }}>{C.title_b}</span><br/>
              {C.title_c}
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 640, margin: "20px auto 0", lineHeight: 1.6 }}>
              {C.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="roi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 24, alignItems: "stretch" }}>
            {/* LEFT — inputs */}
            <div className="card" style={{ padding: 32, background: "linear-gradient(180deg, #0c0c0c, #050505)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>01 / {C.inputs}</span>
                <button onClick={() => { setLeads(800); setResponseH(4); setConv(12); setTicket(2500); setAgentsN(3); setSalary(4000); setHours(4); }} style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--text-dim)", padding: "4px 10px", borderRadius: 999, fontSize: 10, cursor: "pointer" }} className="mono">RESET</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <Slider label={C.leads} value={leads} setValue={setLeads} min={50} max={5000} step={50} format={(v) => v.toLocaleString(lang === "pt" ? "pt-BR" : "es-AR")} />
                <Slider label={C.response_h} sub={C.response_help} value={responseH} setValue={setResponseH} min={0.5} max={48} step={0.5} format={(v) => `${v}h`} />
                <Slider label={C.conv} sub={C.conv_help} value={conv} setValue={setConv} min={1} max={40} step={1} format={(v) => `${v}%`} />
                <Slider label={lang === "pt" ? C.ticket : C.ticket_es} value={ticket} setValue={setTicket} min={200} max={50000} step={100} format={(v) => `${symbol} ${v.toLocaleString(lang === "pt" ? "pt-BR" : "es-AR")}`} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Slider compact label={C.agents_n} value={agentsN} setValue={setAgentsN} min={0} max={20} step={1} format={(v) => v} />
                  <Slider compact label={C.hours} value={hours} setValue={setHours} min={0} max={8} step={0.5} format={(v) => `${v}h`} />
                </div>
                <Slider label={lang === "pt" ? C.salary : C.salary_es} value={salary} setValue={setSalary} min={1500} max={15000} step={100} format={(v) => `${symbol} ${v.toLocaleString(lang === "pt" ? "pt-BR" : "es-AR")}`} />
              </div>
            </div>

            {/* RIGHT — results */}
            <div className="card" style={{ padding: 32, background: "linear-gradient(180deg, rgba(203,255,0,0.04), rgba(0,0,0,0.6))", border: "1px solid rgba(203,255,0,0.15)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--lime)", textTransform: "uppercase", letterSpacing: "0.15em" }}>02 / {C.results}</span>
                <span className="tag lime">● live</span>
              </div>

              {/* hero metric */}
              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>{C.metric_revenue}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                  <span className="display" style={{ fontSize: "clamp(48px, 6vw, 80px)", color: "var(--lime)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    +{symbol} {Math.round(calc.extraRevenue / 1000).toLocaleString(lang === "pt" ? "pt-BR" : "es-AR")}k
                  </span>
                  <span style={{ fontSize: 14, color: "var(--text-dim)" }} className="mono">/ {lang === "pt" ? "mês" : "mes"}</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <ResultCard label={C.metric_recovered} value={`+${calc.recoveredLeads}`} sub={C.metric_recovered_help} />
                <ResultCard label={C.metric_savings} value={`${symbol} ${Math.round(calc.opSavings).toLocaleString(lang === "pt" ? "pt-BR" : "es-AR")}`} sub={C.metric_savings_help} />
                <ResultCard label={C.metric_roi} value={`${calc.roiPct}%`} accent />
                <ResultCard label={C.metric_payback} value={`${calc.payback} ${C.months}`} accent />
              </div>

              {/* compact comparison */}
              <div style={{ marginBottom: 24, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--line)" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>{C.speed_label}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 16px 1fr", alignItems: "center", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-faint)" }} className="mono">{C.speed_now}</div>
                    <div style={{ fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }} className="display">{responseH}h</div>
                  </div>
                  <div style={{ color: "var(--lime)", fontSize: 14 }}>→</div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--lime)" }} className="mono">Konnecta</div>
                    <div style={{ fontSize: 22, color: "var(--lime)", letterSpacing: "-0.02em" }} className="display">30s</div>
                  </div>
                </div>
              </div>

              {/* breakdown */}
              <div style={{ marginBottom: 24 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>{C.breakdown}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <BreakdownRow label={C.bd_l1} value={`+${symbol} ${Math.round(calc.b_speed / 1000)}k`} />
                  <BreakdownRow label={C.bd_l2} value={`+${symbol} ${Math.round(calc.b_offhours / 1000)}k`} />
                  <BreakdownRow label={C.bd_l3} value={`+${symbol} ${Math.round(calc.b_qual / 1000)}k`} />
                  <BreakdownRow label={C.bd_l4} value={`+${symbol} ${Math.round(calc.opSavings / 1000)}k`} />
                </div>
              </div>

              {/* annual */}
              <div style={{ padding: 18, background: "rgba(203,255,0,0.06)", borderRadius: 12, border: "1px solid rgba(203,255,0,0.25)", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--lime)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{C.after_total}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span className="display" style={{ fontSize: 36, color: "#fff", letterSpacing: "-0.02em" }}>
                        {symbol} {Math.round(calc.netAnnual / 1000).toLocaleString(lang === "pt" ? "pt-BR" : "es-AR")}k
                      </span>
                    </div>
                  </div>
                  <ROISpark />
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: "auto" }}>
                <FormButton className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
                  {C.cta_btn} <KArrow size={12} color="#000" />
                </FormButton>
                <p style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 12, lineHeight: 1.5, textAlign: "center" }} className="mono">
                  {C.assumptions}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .roi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function useMemoCalc({ leads, responseH, conv, ticket, agentsN, salary, hours }) {
  return React.useMemo(() => {
    // current
    const currentClients = leads * (conv / 100);
    const currentRevenue = currentClients * ticket;

    // assumptions
    // - response <30s gives +35% relative conversion lift
    // - off-hours leads recovery: 30% of monthly leads were lost to off-hours
    // - qualification: 15% relative lift from filtering bad leads
    const speedLift = 0.35;       // +35% on conversion of leads that already responded
    const offHoursShare = 0.30;   // 30% leads come off-hours and get lost partially
    const offHoursRecovered = 0.7; // we recover 70% of those
    const qualLift = 0.15;
    const responseEffect = Math.min(1, responseH / 4); // diminishing return — at 4h+ full effect

    const newConv = (conv / 100) * (1 + speedLift * responseEffect) * (1 + qualLift);
    const newClients_baseLeads = leads * Math.min(newConv, 0.6);
    const recoveredOffHours = leads * offHoursShare * offHoursRecovered * Math.min(newConv, 0.6);
    const newClients = newClients_baseLeads + recoveredOffHours;

    const recoveredLeads = Math.round(newClients - currentClients);
    const newRevenue = newClients * ticket;
    const extraRevenue = Math.max(0, newRevenue - currentRevenue);

    // breakdown
    const b_speed = leads * (conv / 100) * speedLift * responseEffect * ticket;
    const b_offhours = recoveredOffHours * ticket;
    const b_qual = leads * (conv / 100) * qualLift * ticket;

    // savings: hours/day * 22 work-days * hourly rate * agents * 60% liberation
    const hourlyRate = salary / 176; // monthly hours
    const opSavings = hours * 22 * hourlyRate * agentsN * 0.6;

    // investment
    const setup = 18000;
    const monthly = 4500;
    const yearCost = setup + monthly * 12;
    const yearGain = (extraRevenue + opSavings) * 12;
    const netAnnual = yearGain - yearCost;
    const roiPct = Math.round((netAnnual / yearCost) * 100);
    const monthlyGain = extraRevenue + opSavings;
    const payback = monthlyGain > 0 ? Math.max(1, Math.ceil(setup / monthlyGain)) : 99;

    return { recoveredLeads, extraRevenue, opSavings, roiPct, payback, netAnnual, b_speed, b_offhours, b_qual };
  }, [leads, responseH, conv, ticket, agentsN, salary, hours]);
}

function Slider({ label, sub, value, setValue, min, max, step, format, compact }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
        <label style={{ fontSize: compact ? 11 : 12, color: "var(--text-dim)", flex: 1 }}>{label}</label>
        <span className="mono" style={{ fontSize: compact ? 13 : 15, color: "var(--lime)", fontWeight: 600 }}>{format(value)}</span>
      </div>
      <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: sub ? 6 : 0 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: "var(--lime)", borderRadius: 3, transition: "width 0.1s", boxShadow: "0 0 12px rgba(203,255,0,0.4)" }}></div>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
        <div style={{ position: "absolute", left: `calc(${pct}% - 8px)`, top: -5, width: 16, height: 16, borderRadius: "50%", background: "var(--lime)", border: "3px solid #000", boxShadow: "0 0 0 2px rgba(203,255,0,0.4), 0 0 16px rgba(203,255,0,0.6)", transition: "left 0.1s", pointerEvents: "none" }}></div>
      </div>
      {sub && <div style={{ fontSize: 10, color: "var(--text-faint)" }} className="mono">{sub}</div>}
    </div>
  );
}

function ResultCard({ label, value, sub, accent }) {
  return (
    <div style={{ padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 12 }}>
      <div className="mono" style={{ fontSize: 9, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{label}</div>
      <div className="display" style={{ fontSize: 26, color: accent ? "var(--lime)" : "#fff", letterSpacing: "-0.01em", marginBottom: sub ? 4 : 0 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "var(--text-faint)", lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

function BreakdownRow({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
      <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{label}</span>
      <span className="mono" style={{ fontSize: 12, color: "var(--lime)", fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function ROISpark() {
  const pts = "0,28 8,24 16,26 24,18 32,20 40,12 48,14 56,8 64,10 72,4 80,6";
  return (
    <svg viewBox="0 0 80 32" style={{ width: 100, height: 32 }}>
      <defs>
        <linearGradient id="spk" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CBFF00" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#CBFF00" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={`0,32 ${pts} 80,32`} fill="url(#spk)"/>
      <polyline points={pts} fill="none" stroke="#CBFF00" strokeWidth="1.5"/>
    </svg>
  );
}

function BigStat({ label, value, delta, accent }) {
  return (
    <div className="card" style={{ padding: 14, background: "rgba(255,255,255,0.02)" }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span className="display" style={{ fontSize: 24, color: accent ? "var(--lime)" : "#fff" }}>{value}</span>
        <span style={{ fontSize: 11, color: "var(--lime)" }}>{delta}</span>
      </div>
    </div>
  );
}

function FunnelChart() {
  const data = [22,28,24,40,36,52,48,60,58,75,70,88,82,95,90,102,98,115];
  const max = Math.max(...data);
  const w = 600, h = 140;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 10)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 140 }}>
      <defs>
        <linearGradient id="fg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CBFF00" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#CBFF00" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* grid */}
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1="0" y1={h * p} x2={w} y2={h * p} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4"/>
      ))}
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#fg)" />
      <polyline points={pts} fill="none" stroke="#CBFF00" strokeWidth="1.8" strokeLinejoin="round"/>
      {data.map((v, i) => i % 4 === 0 ? (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - (v / max) * (h - 10)} r="2.5" fill="#CBFF00"/>
      ) : null)}
    </svg>
  );
}

// === CASE STUDY ===
function CaseStudy() {
  const { lang } = useI18n();
  const L = lang === "pt" ? {
    eyebrow: "Case de sucesso",
    title_a: "Resultados que",
    title_b: "falam por nós",
    client: "Cliente",
    body: "Implementamos um sistema completo de automação e IA que revolucionou o atendimento e o aumento dos resultados em 90 dias.",
    s1: "Aumento de leads",
    s2: "Custo por lead",
    s3: "Taxa de conversão",
    cta: "Ver case completo",
    days: "Resultados em 90 dias",
    m1: "Leads Captados",
    m2: "Conversões",
    cpl: "R$ 12,43",
  } : {
    eyebrow: "Caso de éxito",
    title_a: "Resultados que",
    title_b: "hablan por nosotros",
    client: "Cliente",
    body: "Implementamos un sistema completo de automatización e IA que revolucionó la atención y aumentó los resultados en 90 días.",
    s1: "Aumento de leads",
    s2: "Costo por lead",
    s3: "Tasa de conversión",
    cta: "Ver caso completo",
    days: "Resultados en 90 días",
    m1: "Leads Captados",
    m2: "Conversiones",
    cpl: "$ 12,43",
  };
  return (
    <section style={{ padding: "120px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, alignItems: "center" }} className="grid-2-stack">
          <Reveal>
            <div>
              <span className="eyebrow" style={{ marginBottom: 24 }}>{L.eyebrow}</span>
              <h2 className="display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginTop: 16, marginBottom: 24 }}>
                {L.title_a} <span style={{ color: "var(--lime)" }}>{L.title_b}</span>
              </h2>
              <div style={{ marginBottom: 32 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{L.client}</div>
                <div className="display" style={{ fontSize: 22, marginBottom: 16 }}>Clínica Vitalis</div>
                <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.6 }}>
                  {L.body}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <CaseStat n="+127%" l={L.s1} trend="up" />
                <CaseStat n="-62%" l={L.s2} trend="down" />
                <CaseStat n="+35%" l={L.s3} trend="up" />
              </div>
              <button className="btn-secondary">{L.cta} <KArrow size={12} color="#fff" /></button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="card" style={{ padding: 28, background: "linear-gradient(180deg, #0c0c0c, #050505)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{L.days}</div>
                <span className="tag lime">+22% MoM</span>
              </div>
              <BigChart />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 20 }}>
                <MiniMetric label={L.m1} value="3.842" delta="+127%" />
                <MiniMetric label={L.m2} value="68%" delta="+35%" accent />
                <MiniMetric label="CPL" value={L.cpl} delta="-62%" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CaseStat({ n, l, trend }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 32, color: "var(--lime)", marginBottom: 6 }}>{n}</div>
      <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{l}</div>
    </div>
  );
}

function MiniMetric({ label, value, delta, accent }) {
  return (
    <div style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}>
      <div className="mono" style={{ fontSize: 9, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{label}</div>
      <div className="display" style={{ fontSize: 20, color: accent ? "var(--lime)" : "#fff", marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 10, color: delta.startsWith("-") ? "var(--lime)" : "var(--lime)" }}>{delta}</div>
    </div>
  );
}

function BigChart() {
  const data1 = [30, 35, 32, 45, 50, 58, 62, 70, 75, 82, 88, 95];
  const data2 = [28, 30, 28, 35, 38, 40, 45, 48, 52, 56, 60, 65];
  const max = 100;
  const w = 600, h = 200;
  const toPts = (d) => d.map((v, i) => `${(i / (d.length - 1)) * w},${h - (v / max) * (h - 10)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 220 }}>
      <defs>
        <linearGradient id="bcg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CBFF00" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#CBFF00" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1="0" y1={h * p} x2={w} y2={h * p} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4"/>
      ))}
      <polyline points={`0,${h} ${toPts(data1)} ${w},${h}`} fill="url(#bcg)" />
      <polyline points={toPts(data2)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3 3"/>
      <polyline points={toPts(data1)} fill="none" stroke="#CBFF00" strokeWidth="2" strokeLinejoin="round"/>
      {data1.map((v, i) => (
        <circle key={i} cx={(i / (data1.length - 1)) * w} cy={h - (v / max) * (h - 10)} r="3" fill="#000" stroke="#CBFF00" strokeWidth="1.5"/>
      ))}
    </svg>
  );
}

// === STACK ===
function StackIcon({ kind }) {
  // Original geometric interpretations (not official trademarks)
  const c = "#fff";
  const lime = "#CBFF00";
  switch(kind) {
    case "openai":
      return <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.4">
        <path d="M16 6 L24 10 V20 L16 24 L8 20 V10 Z"/>
        <path d="M16 6 V16 L24 20" opacity="0.6"/>
        <path d="M16 24 V16 L8 12" opacity="0.6"/>
      </svg>;
    case "anthropic":
      return <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M11 24 L16 8 L21 24 H17.5 L16.5 21 H15.5 L14.5 24 Z M15.8 18.5 H16.2 L16 17.5 Z" fill={c}/>
        <rect x="22" y="8" width="3.5" height="16" fill={c}/>
      </svg>;
    case "eleven":
      return <svg viewBox="0 0 32 32" width="28" height="28">
        <rect x="10" y="8" width="3" height="16" fill={c}/>
        <rect x="19" y="8" width="3" height="16" fill={c}/>
      </svg>;
    case "meta":
      return <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
        <path d="M5 20 Q9 8 14 14 Q18 20 22 14 Q26 8 27 20"/>
      </svg>;
    case "railway":
      return <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
        <circle cx="16" cy="16" r="9"/>
        <path d="M11 11 L21 21 M21 11 L11 21" strokeWidth="1"/>
        <circle cx="16" cy="16" r="2.5" fill={c}/>
      </svg>;
    case "n8n":
      return <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.5">
        <circle cx="9" cy="16" r="3"/>
        <circle cx="23" cy="10" r="3"/>
        <circle cx="23" cy="22" r="3"/>
        <line x1="12" y1="15" x2="20" y2="11"/>
        <line x1="12" y1="17" x2="20" y2="21"/>
      </svg>;
    case "supabase":
      return <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M16 4 L28 18 H18 V28 L6 14 H16 Z" fill={c}/>
      </svg>;
    case "claude":
      return <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M8 22 L13 10 L18 22 H15.5 L14.5 19 H11.5 L10.5 22 Z M12.5 16.5 H13.5 L13 15 Z" fill={c}/>
        <path d="M19 22 L24 10 L29 22 H26.5 L25.5 19 H22.5 L21.5 22 Z M23.5 16.5 H24.5 L24 15 Z" fill={c}/>
      </svg>;
    default: return null;
  }
}

function Stack() {
  const { lang } = useI18n();
  const tools = lang === "pt" ? [
    { name: "OpenAI", desc: "GPT-4 e modelos de raciocínio", kind: "openai" },
    { name: "Anthropic", desc: "Claude para análise profunda", kind: "anthropic" },
    { name: "ElevenLabs", desc: "Voz natural e clonagem em IA", kind: "eleven" },
    { name: "Meta API", desc: "WhatsApp Business e Instagram", kind: "meta" },
    { name: "Railway", desc: "Deploy e infra escalável", kind: "railway" },
    { name: "n8n", desc: "Orquestração de automações", kind: "n8n" },
    { name: "Supabase", desc: "Banco de dados em tempo real", kind: "supabase" },
    { name: "+Integrações", desc: "Stack completo e flexível", kind: "claude" },
  ] : [
    { name: "OpenAI", desc: "GPT-4 y modelos de razonamiento", kind: "openai" },
    { name: "Anthropic", desc: "Claude para análisis profundo", kind: "anthropic" },
    { name: "ElevenLabs", desc: "Voz natural y clonación con IA", kind: "eleven" },
    { name: "Meta API", desc: "WhatsApp Business e Instagram", kind: "meta" },
    { name: "Railway", desc: "Deploy e infra escalable", kind: "railway" },
    { name: "n8n", desc: "Orquestación de automatizaciones", kind: "n8n" },
    { name: "Supabase", desc: "Base de datos en tiempo real", kind: "supabase" },
    { name: "+Integraciones", desc: "Stack completo y flexible", kind: "claude" },
  ];
  return (
    <section id="tecnologia" style={{ padding: "120px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="eyebrow">{lang === "pt" ? "Tecnologia de ponta" : "Tecnología de punta"}</span>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
              {lang === "pt" ? <>IA Agêntica, <span className="serif-it" style={{ color: "var(--lime)" }}>OpenClaw</span> e o melhor do mercado</> : <>IA Agéntica, <span className="serif-it" style={{ color: "var(--lime)" }}>OpenClaw</span> y lo mejor del mercado</>}
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 640, margin: "20px auto 0", lineHeight: 1.6 }}>
              {lang === "pt" ? "Construímos sistemas com agentes autônomos, multi-modelo e orquestração avançada. Trabalhamos com as principais plataformas de IA do mundo." : "Construimos sistemas con agentes autónomos, multi-modelo y orquestación avanzada. Trabajamos con las principales plataformas de IA del mundo."}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 56 }}>
            {(lang === "pt" ? ["IA Agêntica", "OpenClaw", "Multi-Agent Systems", "RAG", "Function Calling", "Vector DBs", "MCP", "Tool Use", "LLM Orchestration"] : ["IA Agéntica", "OpenClaw", "Multi-Agent Systems", "RAG", "Function Calling", "Vector DBs", "MCP", "Tool Use", "LLM Orchestration"]).map((c) => (
              <span key={c} className="tag lime" style={{ fontSize: 11, padding: "6px 14px" }}>{c}</span>
            ))}
          </div>
        </Reveal>

        <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 28 }}>
          {lang === "pt" ? "Empresas com as quais trabalhamos" : "Empresas con las que trabajamos"}
        </div>
        <div data-grid="4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="grid-stack">
          {tools.map((t, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="card" style={{
                padding: "24px 20px", height: "100%",
                display: "flex", alignItems: "center", gap: 16,
                background: "#000",
                transition: "border-color 0.3s, transform 0.3s, background 0.3s",
              }}
                onMouseEnter={(e)=>{e.currentTarget.style.borderColor='rgba(203,255,0,0.4)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.background='#0a0a0a';}}
                onMouseLeave={(e)=>{e.currentTarget.style.borderColor='';e.currentTarget.style.transform='';e.currentTarget.style.background='#000';}}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: "linear-gradient(180deg, #161616, #0a0a0a)",
                  border: "1px solid var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <StackIcon kind={t.kind} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="display" style={{ fontSize: 16, marginBottom: 3, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)", lineHeight: 1.4 }}>{t.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .grid-stack { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .grid-stack { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// === TESTIMONIALS ===
function Testimonials() {
  const { lang } = useI18n();
  const items = lang === "pt" ? [
    { q: "A Konnecta transformou completamente nossos processos. O retorno do investimento veio em menos de 3 meses. Trabalho 24h por dia gerando resultados reais.", who: "Dr. Roberto Silva", role: "Clínica Vitalis" },
    { q: "Profissionalismo, tecnologia e resultados. Nossa empresa nunca esteve tão preparada para escalar com previsibilidade.", who: "Mariana Santos", role: "Boutique D'Luxo" },
    { q: "Implementação rápida, integração perfeita. Hoje temos uma máquina de vendas funcionando sem precisar de intervenção manual constante.", who: "Carlos Mendes", role: "Construtora Proja" },
  ] : [
    { q: "Konnecta transformó completamente nuestros procesos. El retorno de la inversión llegó en menos de 3 meses. Trabajo 24h al día generando resultados reales.", who: "Dr. Roberto Silva", role: "Clínica Vitalis" },
    { q: "Profesionalismo, tecnología y resultados. Nuestra empresa nunca estuvo tan preparada para escalar con previsibilidad.", who: "Mariana Santos", role: "Boutique D'Luxo" },
    { q: "Implementación rápida, integración perfecta. Hoy tenemos una máquina de ventas funcionando sin necesidad de intervención manual constante.", who: "Carlos Mendes", role: "Construtora Proja" },
  ];
  return (
    <section id="sobre" style={{ padding: "120px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="eyebrow">{lang === "pt" ? "Depoimentos" : "Testimonios"}</span>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
              {lang === "pt" ? <>O que nossos <span style={{ color: "var(--lime)" }}>clientes</span> dizem</> : <>Lo que dicen nuestros <span style={{ color: "var(--lime)" }}>clientes</span></>}
            </h2>
          </div>
        </Reveal>
        <div data-grid="3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 20, color: "var(--lime)" }}>
                  {[...Array(5)].map((_, k) => <span key={k} style={{ fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 24, flex: 1 }}>
                  "{t.q}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #CBFF00, #888)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 600, fontSize: 14 }}>
                    {t.who.split(" ")[1][0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{t.who}</div>
                    <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// === FINAL CTA ===
function FinalCTA() {
  return (
    <>
    <section style={{ padding: "120px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }} className="grid-2-stack">
          <Reveal>
            <div>
              <span className="eyebrow" style={{ marginBottom: 24 }}>Pronto para transformar?</span>
              <h2 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", marginTop: 16, marginBottom: 24 }}>
                Vamos construir o futuro<br/>
                da sua empresa <span style={{ color: "var(--lime)" }}>juntos?</span>
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
                Agende um diagnóstico gratuito e descubra como a IA pode revolucionar seus resultados.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <FormButton className="btn-primary">{useI18n().t("btn.book.free")} <KArrow size={12} color="#000" /></FormButton>
                <WaButton className="btn-secondary">{useI18n().t("btn.whatsapp")} <Icon.whats c="#fff" s={14} /></WaButton>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <PortraitCard />
          </Reveal>
        </div>

        {/* Lime banner */}
        <Reveal delay={300}>
          <div style={{
            marginTop: 80, padding: "32px 40px", borderRadius: 24,
            background: "var(--lime)", color: "#000",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, opacity: 0.15 }}>
              <KMark size={220} color="#000" />
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon.spark c="#CBFF00" s={26} />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>Diagnóstico gratuito</div>
                <div className="display" style={{ fontSize: 22, color: "#000" }}>Descubra o potencial da IA na sua empresa</div>
                <div style={{ fontSize: 13, marginTop: 4, color: "rgba(0,0,0,0.6)" }}>Em uma consultoria personalizada de 30 minutos</div>
              </div>
            </div>
            <a href={waLink(useI18n().lang)} target="_blank" rel="noopener" style={{ background: "#000", color: "#CBFF00", padding: "14px 28px", borderRadius: 999, fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1, textDecoration: "none" }}>
              {useI18n().t("btn.book.now")} <KArrow size={12} color="#CBFF00" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}

function PortraitCard() {
  return (
    <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/5", background: "#050505", border: "1px solid var(--line)" }}>
      <img src="assets/founder.png" alt="Fundador Konnecta" style={{
        width: "100%", height: "100%", objectFit: "cover", display: "block",
        filter: "contrast(1.05) brightness(0.95)",
      }}/>
      {/* lime tint overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 70% 30%, rgba(203,255,0,0.12), transparent 55%)",
        mixBlendMode: "screen", pointerEvents: "none",
      }}></div>
      {/* bottom gradient for legibility */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: 140,
        background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", pointerEvents: "none",
      }}></div>
      {/* corner mark */}
      <div style={{ position: "absolute", top: 18, left: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <KMark size={22} color="#CBFF00" />
        <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Wagner Verçosa · Fundador</span>
      </div>
      <div style={{ position: "absolute", top: 18, right: 18 }}>
        <span className="pulse-dot" style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--lime)" }}></span>
      </div>
      {/* bottom info */}
      <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 2 }}>
        <div>
          <div className="display" style={{ fontSize: 18, color: "#fff", marginBottom: 2 }}>{useI18n().t("founder.title")}</div>
          <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Konnecta · Foz do Iguaçu / CDE</div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <KArrow size={12} color="#000" />
        </div>
      </div>
    </div>
  );
}

// === FOOTER ===
function Footer() {
  const cols = [
    { title: "Soluções", links: ["Agentes de IA", "Automação WhatsApp", "CRM Inteligente", "Qualificação de Leads", "ERP & Integrações", "Dashboards & BI"] },
    { title: "Empresa", links: ["Sobre Nós", "Cases", "Carreiras", "Contato"] },
    { title: "Recursos", links: ["Blog", "Materiais Gratuitos", "Webinars", "Documentação", "API", "Suporte"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "80px 32px 32px", background: "linear-gradient(180deg, transparent, rgba(203,255,0,0.02))" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }} className="footer-grid">
          <div>
            <KonnectaWord size={26} color="#fff" />
            <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, marginTop: 20, marginBottom: 24, maxWidth: 320 }}>
              {useI18n().t("footer.about")}
            </p>
            <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--lime)" }}>BR</span> Foz do Iguaçu — PR
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--lime)" }}>PY</span> Ciudad del Este
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <a href={waLink(useI18n().lang)} target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "none" }}>+55 45 99963-7457</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <a href="mailto:wagnergv8@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>wagnergv8@gmail.com</a>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["in", "ig", "yt", "wa"].map((s) => (
                <a key={s} style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-dim)", fontSize: 11, fontWeight: 500, textTransform: "uppercase",
                }}>{s}</a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="mono" style={{ fontSize: 11, color: "var(--lime)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>{c.title}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {c.links.map((l) => (
                  <li key={l}><a style={{ fontSize: 13, color: "var(--text-dim)" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>
            {useI18n().t("footer.rights")}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>{useI18n().t("footer.privacy")}</a>
            <a className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>{useI18n().t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Navbar, Hero, LogoStrip, Solutions, Process, Platform, CaseStudy, Stack, Testimonials, FinalCTA, Footer,
});
