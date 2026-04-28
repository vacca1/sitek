// Konnecta — Agentic AI animation + Consulting section
const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

function AgenticFlow() {
  const [tick, setTick] = useS2(0);
  useE2(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  // Nodes: input -> [planner, researcher, executor, validator] -> output
  const nodes = [
  { id: "in", x: 60, y: 180, label: "Entrada", sub: "Lead / Pedido", kind: "io" },
  { id: "plan", x: 240, y: 80, label: "Planner", sub: "Decompõe tarefa", kind: "agent" },
  { id: "rag", x: 240, y: 180, label: "RAG", sub: "Contexto + dados", kind: "agent" },
  { id: "tool", x: 240, y: 280, label: "Tools", sub: "APIs + execução", kind: "agent" },
  { id: "orch", x: 460, y: 180, label: "Orquestrador", sub: "OpenClaw", kind: "core" },
  { id: "val", x: 660, y: 100, label: "Validador", sub: "Quality gate", kind: "agent" },
  { id: "exec", x: 660, y: 260, label: "Executor", sub: "Ação no negócio", kind: "agent" },
  { id: "out", x: 840, y: 180, label: "Resultado", sub: "CRM / WhatsApp", kind: "io" }];

  const edges = [
  ["in", "plan"], ["in", "rag"], ["in", "tool"],
  ["plan", "orch"], ["rag", "orch"], ["tool", "orch"],
  ["orch", "val"], ["orch", "exec"],
  ["val", "out"], ["exec", "out"]];


  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/8", background: "linear-gradient(180deg, #050505, #000)", borderRadius: 20, border: "1px solid var(--line)", overflow: "hidden" }}>
      {/* grid bg */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }}></div>
      {/* lime ambient */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(203,255,0,0.12), transparent 60%)", filter: "blur(30px)" }}></div>

      <svg viewBox="0 0 900 360" style={{ position: "relative", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(203,255,0,0)" />
            <stop offset="50%" stopColor="rgba(203,255,0,0.7)" />
            <stop offset="100%" stopColor="rgba(203,255,0,0)" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="rgba(203,255,0,0.4)" />
            <stop offset="100%" stopColor="rgba(203,255,0,0)" />
          </radialGradient>
        </defs>

        {/* edges */}
        {edges.map(([a, b], i) => {
          const A = nodes.find((n) => n.id === a);
          const B = nodes.find((n) => n.id === b);
          const dash = 200;
          const offset = -tick * 4 % dash;
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="url(#edgeGrad)" strokeWidth="1.5"
              strokeDasharray="50 150" strokeDashoffset={offset} />
            </g>);

        })}

        {/* particles flowing along edges */}
        {edges.map(([a, b], i) => {
          const A = nodes.find((n) => n.id === a);
          const B = nodes.find((n) => n.id === b);
          const phase = (tick + i * 25) % 100 / 100;
          const x = A.x + (B.x - A.x) * phase;
          const y = A.y + (B.y - A.y) * phase;
          return <circle key={i} cx={x} cy={y} r="2.5" fill="#CBFF00" opacity={Math.sin(phase * Math.PI)} />;
        })}

        {/* nodes */}
        {nodes.map((n, i) => {
          const active = Math.floor(tick / 8) % nodes.length === i;
          const isCore = n.kind === "core";
          const isIO = n.kind === "io";
          const r = isCore ? 38 : isIO ? 28 : 30;
          return (
            <g key={n.id}>
              {active && <circle cx={n.x} cy={n.y} r={r + 14} fill="url(#nodeGlow)" />}
              <circle cx={n.x} cy={n.y} r={r} fill={isCore ? "#CBFF00" : "#0a0a0a"} stroke={active || isCore ? "#CBFF00" : "rgba(255,255,255,0.18)"} strokeWidth={isCore ? 0 : 1.5} />
              {/* inner symbol */}
              {isCore ?
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontFamily="Space Grotesk" fontWeight="600" fill="#000">K</text> :
              isIO ?
              <circle cx={n.x} cy={n.y} r="5" fill="#CBFF00" /> :

              <g>
                  <rect x={n.x - 7} y={n.y - 5} width="14" height="10" rx="2" fill="none" stroke={active ? "#CBFF00" : "rgba(255,255,255,0.5)"} />
                  <circle cx={n.x - 3} cy={n.y - 1} r="1" fill={active ? "#CBFF00" : "rgba(255,255,255,0.5)"} />
                  <circle cx={n.x + 3} cy={n.y - 1} r="1" fill={active ? "#CBFF00" : "rgba(255,255,255,0.5)"} />
                </g>
              }
              {/* label */}
              <text x={n.x} y={n.y + r + 18} textAnchor="middle" fontSize="11" fontFamily="Space Grotesk" fontWeight="500" fill="#fff">{n.label}</text>
              <text x={n.x} y={n.y + r + 32} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="rgba(255,255,255,0.45)">{n.sub}</text>
            </g>);

        })}
      </svg>

      {/* status bar */}
      <div style={{ position: "absolute", left: 16, bottom: 14, right: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)" }}></span>
          <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Sistema agêntico ativo</span>
        </div>
        <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          {(1240 + tick % 80).toString()} req/min · 99.8% uptime
        </div>
      </div>
    </div>);

}

function ConsultingSection() {
  const pillars = [
  { n: "01", t: "Diagnóstico Estratégico", d: "Mapeamos seus processos, gargalos e pontos de alavancagem para IA.", k: "DIAG" },
  { n: "02", t: "Arquitetura de IA Vertical", d: "Desenhamos a infraestrutura sob medida para seu setor e escala.", k: "ARCH" },
  { n: "03", t: "Implementação Sênior", d: "Time dedicado constrói, integra e valida cada sistema crítico.", k: "BUILD" },
  { n: "04", t: "Acompanhamento Contínuo", d: "Otimização mensal, novos agentes e expansão da operação inteligente.", k: "OPS" }];

  return (
    <section style={{ padding: "120px 32px", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(203,255,0,0.08), transparent 60%)", filter: "blur(60px)" }}></div>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap", marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ width: 32, height: 1, background: "var(--line-strong)" }}></span>
                <span className="mono" style={{ fontSize: 11, color: "var(--lime)", textTransform: "uppercase", letterSpacing: "0.3em" }}>
                  {window.useI18n ? window.useI18n().t("cons.eyebrow") : "★ Especialidade"}
                </span>
              </div>
              <h2 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", maxWidth: 800 }}>
                Consultoria em <span className="serif-it" style={{ color: "var(--lime)" }}>IA Agêntica</span> para empresas que pensam grande.
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-dim)", maxWidth: 620, marginTop: 24, lineHeight: 1.6 }}>
                Não entregamos só ferramentas. Sentamos com sua liderança, mapeamos a operação e construímos
                uma infraestrutura de IA <em style={{ color: "#fff", fontStyle: "normal" }}>vertical</em> — feita sob medida
                para o seu setor, suas regras e seus dados.
              </p>
            </div>
            <FormButton className="btn-primary">{window.useI18n ? window.useI18n().t("btn.book.consulting") : "Agendar consultoria"} <KArrow size={12} color="#000" /></FormButton>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <AgenticFlow />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }} className="cons-grid">
          {pillars.map((p, i) => <Reveal key={i} delay={i * 80}>
              <div className="card" style={{ padding: 24, height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                  <span className="display" style={{ fontSize: 28, color: "var(--lime)" }}>{p.n}</span>
                  <span className="mono" style={{ fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.15em" }}>{p.k}</span>
                </div>
                <h3 className="display" style={{ fontSize: 18, marginBottom: 8, color: "#fff" }}>{p.t}</h3>
                <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.55 }}>{p.d}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .cons-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .cons-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>);

}

window.ConsultingSection = ConsultingSection;