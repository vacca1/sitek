// Konnecta — shared components (logo, icons, primitives)
const { useState, useEffect, useRef, useMemo } = React;

// === KONNECTA WORDMARK ===
// Renders the official wordmark image. The aspect ratio is ~7.6:1.
// `size` defines the height in px; width auto-scales.
// `color`: '#fff' (default), '#CBFF00' (lime), '#000' — picks the correct PNG variant.
function KonnectaWord({ size = 18, color = "#fff" }) {
  const c = (color || "").toString().toLowerCase();
  let src;
  if (c === "#cbff00" || c === "cbff00" || c === "lime" || c.includes("203,255")) {
    src = "assets/konnecta-wordmark-lime.png";
  } else if (c === "#000" || c === "#000000" || c === "black") {
    src = "assets/konnecta-wordmark-black.png";
  } else {
    src = "assets/konnecta-wordmark-white.png";
  }
  // The PNG is 829 x 137 (with 16px padding). Use height-based sizing.
  // Original wordmark height ≈ 105px; we scale to size * 1.6 for visual parity with text wordmarks.
  const h = size * 1.55;
  return (
    <img
      src={src}
      alt="Konnecta"
      draggable={false}
      style={{
        height: h,
        width: "auto",
        display: "inline-block",
        verticalAlign: "middle",
        userSelect: "none",
      }}
    />
  );
}

// short K mark — uses the official Konnecta K monogram (dots + chevron)
function KMark({ size = 24, color = "#CBFF00", bg }) {
  const c = (color || "").toString().toLowerCase();
  let src;
  if (c === "#fff" || c === "#ffffff" || c === "white") {
    src = "assets/konnecta-k-white.png";
  } else if (c === "#000" || c === "#000000" || c === "black") {
    src = "assets/konnecta-k-black.png";
  } else {
    src = "assets/konnecta-k-lime.png";
  }
  // The K asset is square-ish (~1.1:1). Use size as height.
  return (
    <img
      src={src}
      alt="K"
      draggable={false}
      style={{
        height: size,
        width: "auto",
        display: "inline-block",
        verticalAlign: "middle",
        userSelect: "none",
        ...(bg ? { background: bg, padding: size * 0.18, borderRadius: size * 0.25 } : {}),
      }}
    />
  );
}

// Konnecta arrow glyph (the brand arrow from kit)
function KArrow({ size = 14, color = "#CBFF00" }) {
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} className="arrow-i">
      <path d="M3 11 L11 3 M5 3 H11 V9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="square"/>
    </svg>
  );
}

// Generic icon set (geometric, monochrome, lime)
const Icon = {
  bot: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><rect x="4" y="7" width="16" height="13" rx="3"/><circle cx="9" cy="13" r="1.2" fill={p.c||"#fff"}/><circle cx="15" cy="13" r="1.2" fill={p.c||"#fff"}/><path d="M12 4 V7 M8 20 V22 M16 20 V22"/></svg>,
  whats: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><path d="M4 20 L5.5 15.5 A8 8 0 1 1 8.5 18.5 Z"/><path d="M9 11 q1 3 4 4 l1.5 -1.2 l2.5 1.2 v1 a1.5 1.5 0 0 1 -1.5 1.5 a8 8 0 0 1 -8 -8 a1.5 1.5 0 0 1 1.5 -1.5 h1 l1.2 2.5 z"/></svg>,
  crm: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10 H21 M8 5 V19 M14 14 H18 M14 16.5 H17"/></svg>,
  lead: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><path d="M3 17 L9 11 L13 14 L21 6"/><path d="M15 6 H21 V12"/></svg>,
  flow: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6 H17 M7 18 H17 M5 8 V16 M19 8 V16"/></svg>,
  voice: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><rect x="9" y="3" width="6" height="13" rx="3"/><path d="M5 11 a7 7 0 0 0 14 0 M12 18 V21 M9 21 H15"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><path d="M12 3 L20 6 V12 a9 9 0 0 1 -8 9 a9 9 0 0 1 -8 -9 V6 Z"/><path d="M9 12 L11 14 L15 10"/></svg>,
  chart: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><path d="M4 20 H20 M7 20 V12 M12 20 V6 M17 20 V14"/></svg>,
  zap: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><path d="M13 3 L5 14 H11 L10 21 L19 9 H13 Z"/></svg>,
  brain: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"#fff"} strokeWidth="1.6"><path d="M8 5 a3 3 0 0 0 -3 3 a3 3 0 0 0 -1 5 a3 3 0 0 0 1 4 a3 3 0 0 0 3 3 V5 z M16 5 a3 3 0 0 1 3 3 a3 3 0 0 1 1 5 a3 3 0 0 1 -1 4 a3 3 0 0 1 -3 3 V5 z"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14}><path d="M5 19 L19 5 M9 5 H19 V15" stroke={p.c||"#000"} strokeWidth="2" fill="none" strokeLinecap="square"/></svg>,
  arrowDown: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14}><path d="M12 4 V20 M5 13 L12 20 L19 13" stroke={p.c||"#fff"} strokeWidth="1.6" fill="none"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14}><path d="M4 12 L10 18 L20 6" stroke={p.c||"#CBFF00"} strokeWidth="2" fill="none"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14}><path d="M12 4 V20 M4 12 H20" stroke={p.c||"#fff"} strokeWidth="1.5"/></svg>,
  play: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14}><path d="M7 4 L20 12 L7 20 Z" fill={p.c||"#fff"}/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" width={p.s||14} height={p.s||14}><path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" fill={p.c||"#CBFF00"}/></svg>,
};

// Hook: animate counter on view
function useCountUp(target, duration = 1500, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

// Hook: in-view
function useInView(opts = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2, ...opts });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Reveal wrapper
function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  const [ref, inView] = useInView();
  return (
    <As ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </As>
  );
}

Object.assign(window, {
  KonnectaWord, KMark, KArrow, Icon, useCountUp, useInView, Reveal,
});
