import { useState, useEffect, useRef } from "react";

/* ── Responsive hook ── */
const useBreakpoint = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: width < 640, isTablet: width < 900, width };
};

/* ── Scroll-reveal hook ── */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

/* ─────────────────────────────────────────────
   BUFFALO
───────────────────────────────────────────── */
const Buffalo = ({ x, y, scale = 1, delay = 0, range = 18 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <style>{`
      @keyframes walk_${delay} {
        0%,100%{ transform:translateX(0) }
        50%    { transform:translateX(${range}px) }
      }
      @keyframes tailSwish_${delay} {
        0%,100%{ transform: rotate(0deg); transform-origin: 0 0; }
        50%    { transform: rotate(12deg); transform-origin: 0 0; }
      }
      .buf_${delay}{ animation: walk_${delay} ${3.5 + delay * 0.7}s ease-in-out infinite; }
      .tail_${delay}{ animation: tailSwish_${delay} ${1.8 + delay * 0.3}s ease-in-out infinite; }
    `}</style>
    <g className={`buf_${delay}`}>
      <ellipse cx="45" cy="64" rx="46" ry="6" fill="rgba(0,0,0,0.18)" />
      <ellipse cx="42" cy="36" rx="44" ry="20" fill="#1A1A1A" />
      <ellipse cx="72" cy="26" rx="14" ry="16" fill="#1A1A1A" />
      <ellipse cx="86" cy="28" rx="20" ry="16" fill="#222" />
      <ellipse cx="104" cy="33" rx="10" ry="7" fill="#3A3A3A" />
      <ellipse cx="102" cy="31" rx="4" ry="3" fill="#555" />
      <ellipse cx="108" cy="31" rx="4" ry="3" fill="#555" />
      <circle cx="96" cy="23" r="3.5" fill="#4A2800" />
      <circle cx="97" cy="22" r="1.5" fill="white" opacity="0.7" />
      <path d="M80,15 Q65,-2 55,8"  stroke="#C8A050" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M88,14 Q94,-5 108,6" stroke="#C8A050" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="18" rx="6" ry="9" fill="#2A2A2A" transform="rotate(-20 78 18)" />
      <rect x="62" y="52" width="11" height="24" fill="#151515" rx="4" />
      <rect x="76" y="52" width="11" height="24" fill="#151515" rx="4" />
      <rect x="18" y="52" width="11" height="24" fill="#151515" rx="4" />
      <rect x="32" y="52" width="11" height="24" fill="#151515" rx="4" />
      <ellipse cx="68"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <ellipse cx="82"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <ellipse cx="24"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <ellipse cx="38"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <g className={`tail_${delay}`}>
        <path d="M2,34 Q-14,28 -10,46" stroke="#1A1A1A" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="-10" cy="48" rx="5" ry="7" fill="#1A1A1A" />
      </g>
    </g>
  </g>
);

/* ─────────────────────────────────────────────
   VILLAGE SCENE
───────────────────────────────────────────── */
const VillageScene = () => (
  <svg viewBox="0 0 1200 420" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#2E8BC0" />
        <stop offset="55%"  stopColor="#87CEEB" />
        <stop offset="100%" stopColor="#F5DFA0" />
      </linearGradient>
      <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#5BA038" />
        <stop offset="100%" stopColor="#3D7A20" />
      </linearGradient>
      <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#FFF176" />
        <stop offset="60%"  stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" stopOpacity="0.4" />
      </radialGradient>
      <filter id="sh"><feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.22" /></filter>
      <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <style>{`
        @keyframes floatCloud1 { 0%{transform:translateX(0)} 100%{transform:translateX(120px)} }
        @keyframes floatCloud2 { 0%{transform:translateX(0)} 100%{transform:translateX(-90px)} }
        @keyframes floatCloud3 { 0%{transform:translateX(0)} 100%{transform:translateX(60px)} }
        @keyframes swayGrass   { 0%,100%{transform:skewX(-5deg)} 50%{transform:skewX(5deg)} }
        @keyframes birdFlap    { 0%{transform:translateX(0) translateY(0)} 100%{transform:translateX(80px) translateY(-18px)} }
        @keyframes birdFlap2   { 0%{transform:translateX(0) translateY(0)} 100%{transform:translateX(-60px) translateY(-10px)} }
        @keyframes sunPulse    { 0%,100%{r:80} 50%{r:88} }
        @keyframes sunRayPulse { 0%,100%{opacity:0.15} 50%{opacity:0.28} }
        @keyframes smokePuff   { 0%{transform:translateY(0) scale(1); opacity:0.5} 100%{transform:translateY(-30px) scale(1.8); opacity:0} }
        .cl1 { animation: floatCloud1 24s ease-in-out infinite alternate; }
        .cl2 { animation: floatCloud2 30s ease-in-out infinite alternate; }
        .cl3 { animation: floatCloud3 38s ease-in-out infinite alternate-reverse; }
        .gs  { animation: swayGrass 1.9s ease-in-out infinite; transform-origin: 50% 100%; }
        .gs2 { animation: swayGrass 2.5s ease-in-out infinite reverse; transform-origin: 50% 100%; }
        .bd  { animation: birdFlap 8s ease-in-out infinite alternate; }
        .bd2 { animation: birdFlap2 11s ease-in-out infinite alternate; }
        .sunRay { animation: sunRayPulse 3s ease-in-out infinite; }
        .smoke1 { animation: smokePuff 4s ease-out infinite; }
        .smoke2 { animation: smokePuff 4s ease-out 1.3s infinite; }
        .smoke3 { animation: smokePuff 4s ease-out 2.6s infinite; }
      `}</style>
    </defs>

    {/* Sky */}
    <rect width="1200" height="420" fill="url(#sky)" />

    {/* Sun rays */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle,i) => (
      <line key={i} className="sunRay"
        x1={1065 + Math.cos(angle*Math.PI/180)*52}
        y1={72   + Math.sin(angle*Math.PI/180)*52}
        x2={1065 + Math.cos(angle*Math.PI/180)*95}
        y2={72   + Math.sin(angle*Math.PI/180)*95}
        stroke="#FFD700" strokeWidth="3" strokeLinecap="round" opacity="0.2"
      />
    ))}
    {/* Sun */}
    <circle cx="1065" cy="72" r="82" fill="#FFE580" opacity="0.18" />
    <circle cx="1065" cy="72" r="58" fill="#FFD700" opacity="0.45" />
    <circle cx="1065" cy="72" r="40" fill="url(#sunGrad)" />

    {/* Clouds */}
    <g className="cl1">
      <ellipse cx="175" cy="82" rx="68" ry="28" fill="white" opacity="0.9" />
      <ellipse cx="222" cy="68" rx="52" ry="36" fill="white" opacity="0.9" />
      <ellipse cx="138" cy="80" rx="40" ry="23" fill="white" opacity="0.9" />
      <ellipse cx="200" cy="90" rx="30" ry="14" fill="white" opacity="0.6" />
    </g>
    <g className="cl2">
      <ellipse cx="580" cy="62" rx="56" ry="24" fill="white" opacity="0.8" />
      <ellipse cx="622" cy="52" rx="44" ry="30" fill="white" opacity="0.8" />
      <ellipse cx="548" cy="66" rx="34" ry="19" fill="white" opacity="0.8" />
    </g>
    <g className="cl3">
      <ellipse cx="848" cy="88" rx="54" ry="22" fill="white" opacity="0.72" />
      <ellipse cx="892" cy="76" rx="42" ry="28" fill="white" opacity="0.72" />
      <ellipse cx="818" cy="94" rx="28" ry="16" fill="white" opacity="0.5" />
    </g>

    {/* Birds */}
    <g className="bd">
      <path d="M305,52 Q318,41 331,52" stroke="#1A2A10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M338,47 Q351,36 364,47" stroke="#1A2A10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M320,62 Q330,54 340,62" stroke="#1A2A10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
    <g className="bd2">
      <path d="M700,48 Q712,38 724,48" stroke="#1A2A10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M730,55 Q740,47 750,55" stroke="#1A2A10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
    <path d="M448,72 Q459,63 470,72" stroke="#1A2A10" strokeWidth="1.8" fill="none" strokeLinecap="round" />

    {/* Distant hills */}
    <ellipse cx="150"  cy="315" rx="230" ry="96" fill="#55A042" opacity="0.45" />
    <ellipse cx="1065" cy="315" rx="230" ry="100" fill="#55A042" opacity="0.45" />
    <ellipse cx="600"  cy="332" rx="350" ry="80"  fill="#4D9838" opacity="0.35" />
    <ellipse cx="380"  cy="325" rx="180" ry="70"  fill="#4A9235" opacity="0.3" />

    {/* Ground */}
    <rect x="0" y="292" width="1200" height="36" fill="#72C24A" />
    <rect x="0" y="318" width="1200" height="30" fill="#5CB038" />
    <rect x="0" y="340" width="1200" height="80" fill="url(#ground)" />

    {/* Crop rows */}
    {[...Array(24)].map((_,i)=>(
      <rect key={i} x={i*50+5} y="296" width="3" height="24" fill="#3D8820" opacity="0.5" />
    ))}

    {/* Dirt path */}
    <path d="M500,420 Q580,360 650,295" stroke="#C4A060" strokeWidth="18" fill="none" opacity="0.3" strokeLinecap="round" />

    {/* HUT 1 */}
    <g transform="translate(98,195)" filter="url(#sh)">
      <rect x="0" y="62" width="112" height="98" fill="#D4A57A" rx="2" />
      <polygon points="-24,64 56,-20 136,64" fill="#7A5810" />
      <polygon points="-17,64 56,-13 129,64" fill="#9A7018" opacity="0.85" />
      <line x1="56" y1="-20" x2="56" y2="64" stroke="#6A4808" strokeWidth="2" opacity="0.35" />
      {[-1,0,1].map(i=><line key={i} x1={56+i*20} y1="20" x2={56+i*20} y2="64" stroke="#6A4808" strokeWidth="1" opacity="0.22" />)}
      {/* Smoke */}
      <circle className="smoke1" cx="48" cy="0" r="6" fill="#aaa" />
      <circle className="smoke2" cx="52" cy="0" r="5" fill="#bbb" />
      <circle className="smoke3" cx="56" cy="0" r="4" fill="#ccc" />
      <rect x="39" y="108" width="34" height="52" fill="#5A3010" rx="6" />
      <circle cx="68" cy="136" r="3.2" fill="#C8A030" />
      <rect x="8"  y="80" width="26" height="22" fill="#ADE8F4" rx="4" />
      <rect x="78" y="80" width="26" height="22" fill="#ADE8F4" rx="4" />
      <line x1="21" y1="80" x2="21" y2="102" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="8"  y1="91" x2="34" y2="91"  stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="91" y1="80" x2="91" y2="102" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="78" y1="91" x2="104" y2="91" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <rect x="100" y="146" width="14" height="12" fill="#7A5020" rx="2" />
      <ellipse cx="107" cy="144" rx="10" ry="8" fill="#3D8828" />
    </g>

    {/* HUT 2 */}
    <g transform="translate(338,218)" filter="url(#sh)">
      <rect x="0" y="52" width="88" height="78" fill="#C8986A" rx="2" />
      <polygon points="-18,54 44,-16 106,54" fill="#6A4C0C" />
      <polygon points="-11,54 44,-9  99,54"  fill="#8A6418" opacity="0.85" />
      <rect x="29" y="92" width="30" height="38" fill="#5A3010" rx="5" />
      <circle cx="54" cy="113" r="2.5" fill="#C8A030" />
      <rect x="6"  y="67" width="22" height="18" fill="#ADE8F4" rx="3" />
      <line x1="17" y1="67" x2="17" y2="85" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="6"  y1="76" x2="28" y2="76" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
    </g>

    {/* WELL */}
    <g transform="translate(488,268)">
      <ellipse cx="28" cy="42" rx="28" ry="11" fill="#7A5810" />
      <rect x="5"  y="24" width="46" height="18" fill="#9A7018" />
      <ellipse cx="28" cy="24" rx="28" ry="11" fill="#B48C28" />
      <rect x="24" y="-8"  width="6" height="34" fill="#5A3010" rx="2" />
      <line x1="27" y1="-8"  x2="10" y2="-22" stroke="#5A3010" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="27" y1="-8"  x2="44" y2="-22" stroke="#5A3010" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="10" y1="-22" x2="44" y2="-22" stroke="#5A3010" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="27" y1="-22" x2="27" y2="6"   stroke="#6A4C0C" strokeWidth="2" strokeDasharray="3,2" />
      <rect x="21" y="6" width="12" height="10" fill="#5A3010" rx="2" />
    </g>

    {/* HUT 3 */}
    <g transform="translate(658,183)" filter="url(#sh)">
      <rect x="0" y="68" width="134" height="112" fill="#D8AA80" rx="2" />
      <polygon points="-28,70 67,-26 162,70" fill="#7A5810" />
      <polygon points="-20,70 67,-18 154,70" fill="#9A7018" opacity="0.85" />
      <line x1="67" y1="-26" x2="67" y2="70" stroke="#6A4808" strokeWidth="2" opacity="0.3" />
      {[-1,0,1,2].map(i=><line key={i} x1={67+i*24} y1="18" x2={67+i*24} y2="70" stroke="#6A4808" strokeWidth="1" opacity="0.2" />)}
      <rect x="49" y="122" width="36" height="58" fill="#5A3010" rx="7" />
      <circle cx="80" cy="153" r="3.8" fill="#C8A030" />
      <rect x="8"  y="84" width="30" height="26" fill="#ADE8F4" rx="4" />
      <rect x="96" y="84" width="30" height="26" fill="#ADE8F4" rx="4" />
      <line x1="23"  y1="84" x2="23"  y2="110" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="8"   y1="97" x2="38"  y2="97"  stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="111" y1="84" x2="111" y2="110" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="96"  y1="97" x2="126" y2="97"  stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
    </g>

    {/* TREES */}
    <g transform="translate(278,195)">
      <rect x="12" y="58" width="11" height="62" fill="#5A3010" />
      <ellipse cx="18" cy="42" rx="34" ry="44" fill="#2A7425" />
      <ellipse cx="6"  cy="29" rx="23" ry="30" fill="#3A8C35" />
      <ellipse cx="32" cy="26" rx="19" ry="25" fill="#3A8C35" />
    </g>
    <g transform="translate(608,208)">
      <rect x="10" y="52" width="11" height="58" fill="#5A3010" />
      <ellipse cx="16" cy="36" rx="32" ry="42" fill="#2A7425" />
      <ellipse cx="5"  cy="26" rx="21" ry="27" fill="#3A8C35" />
    </g>
    <g transform="translate(876,186)">
      <path d="M16,124 Q9,78 24,30" stroke="#5A3010" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="-14" cy="20" rx="42" ry="13" fill="#3D7A20" transform="rotate(-26 24 30)" />
      <ellipse cx="54"  cy="16" rx="40" ry="12" fill="#3D7A20" transform="rotate(23 24 30)" />
      <ellipse cx="20"  cy="6"  rx="36" ry="12" fill="#4A8C2A" />
      <ellipse cx="0"   cy="12" rx="30" ry="10" fill="#3D7A20" transform="rotate(-45 24 30)" />
    </g>
    <g transform="translate(1048,198)">
      <rect x="10" y="56" width="11" height="62" fill="#5A3010" />
      <ellipse cx="16" cy="41" rx="36" ry="46" fill="#2A7425" />
      <ellipse cx="26" cy="29" rx="23" ry="31" fill="#3A8C35" />
    </g>

    {/* BUFFALOS */}
    <Buffalo x={415}  y={264} scale={1}    delay={0} range={20} />
    <Buffalo x={770}  y={268} scale={0.8}  delay={1} range={-16} />
    <Buffalo x={1095} y={272} scale={0.58} delay={2} range={14} />

    {/* Foreground grass */}
    {[...Array(52)].map((_,i) => {
      const x = i * 23 + (i % 5) * 3;
      const cls = i % 3 === 0 ? "gs2" : "gs";
      return (
        <g key={i} transform={`translate(${x},362)`} className={cls}>
          <line x1="4" y1="24" x2="0"  y2="3"  stroke="#3D8C20" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="4" y1="24" x2="8"  y2="1"  stroke="#4DA030" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="4" y1="24" x2="4"  y2="-1" stroke="#358C18" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="4" y1="24" x2="12" y2="5"  stroke="#5AB038" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );
    })}
    <rect x="0" y="386" width="1200" height="34" fill="#3D7A20" opacity="0.55" />
  </svg>
);

/* ─────────────────────────────────────────────
   PROJECT HUT
───────────────────────────────────────────── */
const ProjectHut = ({ project, index, onClick }) => {
  const colors = [
    { wall:"#D4A57A", roof:"#7A5810", roofLight:"#9A7018" },
    { wall:"#C8986A", roof:"#6A4C0C", roofLight:"#8A6418" },
    { wall:"#D8AA80", roof:"#7A5810", roofLight:"#9A7018" },
  ];
  const c = colors[index % 3];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{
        cursor:"pointer", textAlign:"center",
        transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"10px",
        transform: hovered ? "translateY(-12px) scale(1.06)" : "translateY(0) scale(1)",
        filter: hovered ? "drop-shadow(0 16px 24px rgba(80,40,0,0.3))" : "drop-shadow(0 4px 8px rgba(80,40,0,0.15))",
      }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onTouchStart={()=>setHovered(true)}
      onTouchEnd={()=>setHovered(false)}
    >
      <svg viewBox="0 0 130 160" width="120" height="148" xmlns="http://www.w3.org/2000/svg">
        <filter id={`hs${index}`}><feDropShadow dx="2" dy="4" stdDeviation="5" floodOpacity="0.28"/></filter>
        <ellipse cx="65" cy="155" rx="48" ry="8" fill="rgba(0,0,0,0.14)" />
        <rect x="12" y="72" width="106" height="80" fill={c.wall} rx="3" filter={`url(#hs${index})`} />
        <polygon points="-4,74 65,8 134,74" fill={c.roof} />
        <polygon points="3,74 65,15 127,74" fill={c.roofLight} opacity="0.88" />
        {[0,1,2,3].map(i=>(
          <line key={i} x1={65-30+i*20} y1="30" x2={65-28+i*20} y2="74" stroke={c.roof} strokeWidth="1.5" opacity="0.3" />
        ))}
        <rect x="46" y="112" width="38" height="40" fill="#5A3010" rx="7" />
        <circle cx="79" cy="134" r="3.5" fill="#C8A030" />
        <rect x="14" y="82" width="26" height="22" fill="#ADE8F4" rx="4" />
        <rect x="90" y="82" width="26" height="22" fill="#ADE8F4" rx="4" />
        <line x1="27" y1="82" x2="27" y2="104" stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="14" y1="93" x2="40" y2="93"  stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="103" y1="82" x2="103" y2="104" stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="90"  y1="93" x2="116" y2="93"  stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="12" y1="96"  x2="118" y2="96"  stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        <line x1="12" y1="110" x2="118" y2="110" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        <text x="65" y="108" textAnchor="middle" fontSize="16">{project.emoji}</text>
      </svg>
      <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"15px", fontWeight:700, color:"#4A2800" }}>
        {project.title}
      </div>
      <div style={{ fontSize:"11px", color:"#8B6040", fontFamily:"Lora, serif" }}>Tap to explore</div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
const Modal = ({ project, onClose }) => {
  const { isMobile } = useBreakpoint();
  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return ()=>{ document.body.style.overflow = ""; };
  },[]);
  if (!project) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(30,15,5,0.75)",
      backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "12px" : "20px",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#FFFBF2",
        borderRadius:"24px",
        border:"2px solid #D9B985",
        maxWidth:"680px", width:"100%",
        maxHeight:"92vh", overflowY:"auto",
        boxShadow:"0 30px 80px rgba(93,58,26,0.35)",
        animation:"popModal 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
      }}>
        <style>{`@keyframes popModal { from{opacity:0;transform:scale(0.82) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
        <div style={{
          background:"linear-gradient(135deg, #8B4513, #D2691E)",
          borderRadius:"22px 22px 0 0",
          padding: isMobile ? "24px 20px 20px" : "36px 36px 28px",
          position:"relative",
        }}>
          <button onClick={onClose} style={{
            position:"absolute", top:"14px", right:"14px",
            background:"rgba(255,255,255,0.22)", border:"none",
            color:"white", width:"36px", height:"36px",
            borderRadius:"50%", cursor:"pointer", fontSize:"18px",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"background 0.2s",
          }}>✕</button>
          <div style={{ fontSize: isMobile ? "40px" : "52px", marginBottom:"10px" }}>{project.emoji}</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? "24px" : "32px", color:"white", margin:"0 0 6px" }}>
            {project.title}
          </h2>
          <p style={{ color:"rgba(255,248,240,0.85)", fontSize:"14px", margin:0 }}>{project.tagline}</p>
        </div>
        <div style={{ padding: isMobile ? "20px 18px" : "32px 36px" }}>
          <div style={{
            background:"linear-gradient(135deg, #F5E4C4, #EDD09A)",
            borderRadius:"14px", height:"140px",
            display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom:"20px", border:"2px solid #D9B985",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ fontSize:"64px", opacity:0.22, userSelect:"none" }}>{project.emoji}</div>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"6px" }}>
              <div style={{ fontFamily:"'Playfair Display', serif", color:"#6A3E1A", fontSize:"17px", fontWeight:700 }}>{project.title}</div>
              <div style={{ fontSize:"11px", color:"#8B6040", fontStyle:"italic" }}>Project Preview</div>
            </div>
          </div>
          <p style={{ color:"#5D3A1A", fontSize: isMobile ? "14px" : "16px", lineHeight:1.85, marginBottom:"20px" }}>{project.desc}</p>
          <div style={{ marginBottom:"20px" }}>
            <div style={{ fontFamily:"'Playfair Display', serif", color:"#4A2800", fontSize:"16px", fontWeight:700, marginBottom:"10px" }}>✨ Key Features</div>
            <ul style={{ margin:0, paddingLeft:"18px", color:"#6A4820", fontSize: isMobile ? "13px" : "15px", lineHeight:2 }}>
              {project.features.map((f,i)=><li key={i}>{f}</li>)}
            </ul>
          </div>
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontFamily:"'Playfair Display', serif", color:"#4A2800", fontSize:"16px", fontWeight:700, marginBottom:"10px" }}>🛠 Tech Stack</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {project.tech.map(t=>(
                <span key={t} style={{ background:"#F5E4C4", color:"#6A3E1A", padding:"4px 12px", borderRadius:"20px", fontSize:"12px", border:"1px solid #D9B985", fontFamily:"Lora, serif" }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            {project.links.map(l=>(
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                background: l.primary ? "linear-gradient(135deg,#8B4513,#D2691E)" : "transparent",
                color: l.primary ? "white" : "#5D3A1A",
                border: l.primary ? "none" : "2px solid #8B4513",
                padding: isMobile ? "10px 18px" : "12px 26px",
                borderRadius:"30px", fontFamily:"Lora, serif",
                fontSize: isMobile ? "13px" : "14px", fontWeight:600,
                textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"5px",
                boxShadow: l.primary ? "0 4px 18px rgba(139,69,19,0.3)" : "none",
                transition:"all 0.2s",
              }}>
                {l.icon} {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      ...style,
    }}>
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const skills = [
  // Core Languages
  { name:"Java", level:90, icon:"☕" },
  { name:"JavaScript", level:90, icon:"⚡" },
  { name:"Python", level:85, icon:"🐍" },
  { name:"C", level:75, icon:"💻" },

  // Frontend
  { name:"React", level:90, icon:"⚛️" },
  { name:"Tailwind CSS", level:85, icon:"🎨" },
  { name:"Web Design", level:80, icon:"🖌️" },

  // Backend & Full Stack
  { name:"Spring Boot", level:88, icon:"🌱" },
  { name:"Node.js", level:80, icon:"🌿" },
  { name:"Firebase", level:75, icon:"🔥" },

  // Databases & Cache
  { name:"SQL", level:85, icon:"🗄️" },
  { name:"PostgreSQL", level:85, icon:"🐘" },
  { name:"Redis", level:75, icon:"📦" },
  { name:"DBMS", level:80, icon:"🧩" },

  // DevOps & Cloud (adjusted to realistic ~70 where needed)
  { name:"Docker", level:80, icon:"🐳" },
  { name:"Kubernetes", level:70, icon:"☸️" },
  { name:"AWS", level:75, icon:"☁️" },
  { name:"EKS", level:70, icon:"🧩" },
  { name:"Jenkins", level:75, icon:"🔧" },
  { name:"CI/CD", level:80, icon:"🔄" },
  { name:"Terraform", level:70, icon:"🏗️" },

  // Machine Learning & MLOps
  { name:"Machine Learning", level:80, icon:"🤖" },
  { name:"TensorFlow", level:75, icon:"🧠" },
  { name:"Scikit-learn", level:75, icon:"📊" },
  { name:"CNN", level:70, icon:"🧬" },

  // CS Fundamentals
  { name:"Data Structures & Algorithms", level:85, icon:"📚" },
  { name:"System Design (Medium)", level:70, icon:"🏛️" },
  { name:"Computer Networks", level:75, icon:"🌐" },
  { name:"Software Development(SDLC/gile)", level:80, icon:"📈" },

  // Tools & Practices
  { name:"Git", level:90, icon:"🌿" },
  { name:"GitHub", level:90, icon:"🐙" },
  { name:"Debugging", level:85, icon:"🐞" },
  { name:"DevOps", level:80, icon:"⚙️" },
];

const projects = [
  {
    title:"Kisan Connect",
    emoji:"🌾",
    tagline:"Connecting farmers with buyers across India",
    desc:"A full-stack platform bridging the gap between farmers and buyers. Features include real-time market pricing, crop yield forecasting, direct negotiation tools, and a mobile-first design built for low-bandwidth connections in rural areas.",
    features:["Real-time crop market price dashboard","Farmer & buyer matching algorithm","Crop yield tracking with historical charts","SMS-based notifications for remote users","Multilingual support (Hindi, Haryanvi)"],
    tech:["React","Node.js","MongoDB","Socket.io","Twilio"],
    links:[{ label:"Live Demo", icon:"🚀", url:"#", primary:true },{ label:"GitHub", icon:"🐙", url:"#", primary:false },{ label:"Case Study", icon:"📄", url:"#", primary:false }],
  },
  {
    title:"Village Hub",
    emoji:"🏡",
    tagline:"Digital services for rural communities",
    desc:"A community portal bringing government and digital services to rural areas. Covers education, healthcare (telemedicine booking), local governance (complaint tracking), and public announcements — all accessible on a 2G connection.",
    features:["Progressive Web App works offline","Aadhaar-linked user authentication","Telemedicine scheduling system","Local government complaint tracker","Village noticeboard & announcements"],
    tech:["Next.js","PostgreSQL","Tailwind","PWA","Prisma"],
    links:[{ label:"Live Demo", icon:"🚀", url:"#", primary:true },{ label:"GitHub", icon:"🐙", url:"#", primary:false },{ label:"Docs", icon:"📚", url:"#", primary:false }],
  },
  {
    title:"GreenTrack",
    emoji:"🌱",
    tagline:"Environmental monitoring for sustainable farming",
    desc:"An environmental monitoring dashboard for agricultural zones. Collects live sensor data from IoT devices — soil moisture, air quality, temperature — then surfaces trends, anomalies, and actionable alerts.",
    features:["Live IoT sensor data ingestion (MQTT)","Interactive D3.js trend visualisations","Threshold-based SMS / email alerts","Historical weather correlation engine","Exportable PDF & CSV reports"],
    tech:["Python","FastAPI","D3.js","InfluxDB","MQTT","Docker"],
    links:[{ label:"Live Demo", icon:"🚀", url:"#", primary:true },{ label:"GitHub", icon:"🐙", url:"#", primary:false },{ label:"Research", icon:"🔬", url:"#", primary:false }],
  },
];

/* ─────────────────────────────────────────────
   MAIN PORTFOLIO
───────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <div style={{ fontFamily:"'Lora', Georgia, serif", background:"#FFFBF2", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes shimmer  { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes bounceIn { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes menuSlide{ from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

        .hero-name { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-role { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hero-desc { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.38s both; }
        .hero-btns { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.54s both; }

        .nav-pill {
          cursor:pointer; padding:7px 16px; border-radius:22px;
          border:none; background:transparent;
          font-family:'Lora',serif; font-size:14px; color:#6A3E1A;
          transition:background 0.22s, color 0.22s;
          white-space:nowrap;
        }
        .nav-pill:hover  { background:rgba(139,69,19,0.12); }
        .nav-pill.active { background:#8B4513; color:#FFF8F0; }

        .btn-primary {
          background:linear-gradient(135deg,#8B4513 0%,#D2691E 100%);
          color:#FFF8F0; border:none; padding:13px 32px; border-radius:30px;
          font-family:'Lora',serif; font-size:15px; font-weight:600; cursor:pointer;
          transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
          box-shadow:0 4px 18px rgba(139,69,19,0.32);
        }
        .btn-primary:hover  { transform:translateY(-4px) scale(1.03); box-shadow:0 10px 30px rgba(139,69,19,0.42); }
        .btn-primary:active { transform:scale(0.97); }

//         .skill-heading {
//   margin: 40px 0 15px;
//   font-size: 20px;
//   font-weight: 700;
//   color: #4A2800;
// }

// .skills-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//   gap: 16px;
// }
  /* Forces one card per row */
.skills-grid-single {
  display: grid;
  grid-template-columns: 1fr; /* This ensures only 1 column */
  gap: 16px;
  width: 100%;
}

/* Ensures the card takes full width and looks clean */
.skill-card-full {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  width: 100%; /* Full screen width of the container */
  transition: transform 0.3s ease;
}

.skill-card-full:hover {
  transform: translateY(-2px);
}

.skill-track {
  height: 8px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: #4A2800; /* Matching your theme color */
  border-radius: 10px;
  transition: width 1s ease-in-out;
}

        .btn-outline {
          background:transparent; color:#5D3A1A; border:2px solid #8B4513;
          padding:11px 30px; border-radius:30px;
          font-family:'Lora',serif; font-size:15px; font-weight:600; cursor:pointer;
          transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .btn-outline:hover  { background:#8B4513; color:#FFF8F0; transform:translateY(-4px) scale(1.03); }
        .btn-outline:active { transform:scale(0.97); }

        .skill-card {
          background:#FFF8F0; border:2px solid #E8C99A;
          border-radius:14px; padding:18px 20px;
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .skill-card:hover { transform:translateY(-6px) scale(1.02); box-shadow:0 14px 32px rgba(139,69,19,0.14); }
        .skill-track { height:9px; background:#EDD8B0; border-radius:9px; overflow:hidden; margin-top:10px; }
        .skill-fill  {
          height:100%; border-radius:9px;
          background:linear-gradient(90deg,#8B4513,#D2691E,#F4A050);
          background-size:200% 100%;
          animation: shimmer 3s linear infinite;
          transition:width 1.2s cubic-bezier(0.22,1,0.36,1);
        }

        .section-badge {
          display:inline-block; background:#F5E4C4; color:#8B4513;
          font-size:12px; letter-spacing:2px; text-transform:uppercase;
          padding:4px 16px; border-radius:20px; margin-bottom:10px;
          font-family:'Lora',serif; border:1px solid #D9B985;
          animation: bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .divider {
          width:60px; height:3px;
          background:linear-gradient(90deg,#8B4513,#D2691E);
          margin:0 auto 48px; border-radius:3px;
        }
        .contact-icon-btn {
          display:flex; align-items:center; gap:10px;
          background:#FFF8F0; border:2px solid #D9B985;
          padding:13px 24px; border-radius:50px;
          font-family:'Lora',serif; font-size:15px; color:#5D3A1A;
          cursor:pointer; transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1); white-space:nowrap;
        }
        .contact-icon-btn:hover  { background:#8B4513; color:#FFF8F0; border-color:#8B4513; transform:translateY(-3px) scale(1.04); }
        .contact-icon-btn:active { transform:scale(0.97); }

        .hamburger-line {
          width:22px; height:2px; background:#5D3A1A;
          border-radius:2px;
          transition:all 0.3s ease;
        }
        .mobile-menu {
          animation: menuSlide 0.25s ease both;
        }

        /* scrollbar */
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#FDF3E0; }
        ::-webkit-scrollbar-thumb { background:#C8986A; border-radius:3px; }

        @media (max-width: 640px) {
          .about-grid { grid-template-columns:1fr !important; gap:32px !important; }
          .skills-grid { grid-template-columns:1fr 1fr !important; }
          .stats-grid  { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .about-grid  { grid-template-columns:1fr !important; gap:32px !important; }
          .skills-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"sticky", top:0, zIndex:200,
        background:"rgba(255,251,242,0.94)", backdropFilter:"blur(14px)",
        borderBottom:"2px solid #E8C99A",
        padding: isMobile ? "12px 5%" : "10px 5%",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"19px", fontWeight:700, color:"#5D3A1A", display:"flex", alignItems:"center", gap:"8px" }}>
          🌾 <span>Portfolio</span>
        </div>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display:"flex", gap:"4px" }}>
            {["home","about","skills","projects","contact"].map(s=>(
              <button key={s} className={`nav-pill ${activeSection===s?"active":""}`} onClick={()=>scrollTo(s)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={e=>{ e.stopPropagation(); setMenuOpen(o=>!o); }}
            style={{ background:"none", border:"none", cursor:"pointer", padding:"6px", display:"flex", flexDirection:"column", gap:"5px" }}
          >
            <div className="hamburger-line" style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="hamburger-line" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        )}

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div className="mobile-menu" onClick={e=>e.stopPropagation()} style={{
            position:"absolute", top:"100%", left:0, right:0,
            background:"rgba(255,251,242,0.98)", backdropFilter:"blur(14px)",
            borderBottom:"2px solid #E8C99A",
            display:"flex", flexDirection:"column", padding:"8px 0",
            zIndex:300,
          }}>
            {["home","about","skills","projects","contact"].map(s=>(
              <button key={s} onClick={()=>scrollTo(s)} style={{
                background: activeSection===s ? "#8B4513" : "transparent",
                color: activeSection===s ? "#FFF8F0" : "#6A3E1A",
                border:"none", padding:"14px 24px", textAlign:"left",
                fontFamily:"'Lora',serif", fontSize:"16px", cursor:"pointer",
                transition:"background 0.2s",
              }}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position:"relative" }}>
        <VillageScene />
        <div style={{
          background:"linear-gradient(180deg, rgba(255,251,242,0) 0%, #FFFBF2 38%)",
          marginTop: isMobile ? "-60px" : "-90px",
          paddingTop:"16px",
          paddingBottom: isMobile ? "52px" : "72px",
          textAlign:"center",
          position:"relative", zIndex:10,
          padding: isMobile ? "16px 16px 52px" : "16px 5% 72px",
        }}>
          <div className="hero-name" style={{
            fontFamily:"'Playfair Display', serif",
            fontSize: isMobile ? "clamp(38px,10vw,56px)" : "clamp(44px,7vw,76px)",
            fontWeight:900, color:"#4A2800", lineHeight:1.0, marginBottom:"8px",
            textShadow:"0 2px 24px rgba(255,251,242,0.95)",
          }}>Naveen Banwala</div>
          <div className="hero-role" style={{ fontStyle:"italic", fontSize: isMobile ? "16px" : "clamp(16px,2.4vw,22px)", color:"#8B4513", marginBottom:"16px" }}>
            Java Full-Stack Developer &amp; Engineer, DevOps/MLOps,DeepLearning(CNN)
          </div>
          <p className="hero-desc" style={{
            color:"#6A3E1A", fontSize: isMobile ? "14px" : "16px",
            lineHeight:1.8, maxWidth:"440px", margin:"0 auto 28px",
          }}>
            Building purposeful software with the patience and rootedness of the fields I grew up beside.
          </p>
          <div className="hero-btns" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={()=>scrollTo("projects")}>See My Work 🌿</button>
            <button className="btn-outline"  onClick={()=>scrollTo("contact")}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: isMobile ? "60px 5%" : "80px 8%", background:"#FFFBF2" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"0" }}>
            <div className="section-badge">🌾 Who I Am</div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? "34px" : "44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>About Me</h2>
            <div className="divider" />
          </div>
        </Reveal>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isTablet ? "32px" : "56px", alignItems:"center", maxWidth:"1000px", margin:"0 auto" }}>
          <Reveal delay={0.1}>
            <p style={{ color:"#5D3A1A", fontSize: isMobile ? "15px" : "17px", lineHeight:1.95, marginBottom:"20px" }}>
  Namaste! 🙏 I'm Naveen, a B.Tech student from KIIT with a CGPA of 9.03, originally from Haryana. I’m passionate about solving real-world problems through technology and continuously work on turning ideas into practical, scalable solutions. My approach is hands-on — I learn by building, experimenting, and improving systems that can make a real impact.
</p>

<p style={{ color:"#5D3A1A", fontSize: isMobile ? "15px" : "17px", lineHeight:1.95 }}>
  My core focus is Java full-stack development, complemented by experience in DevOps and MLOps with design their SDLC/Agile Models. I have built projects involving full-stack systems as well as CNN-based machine learning models, and I enjoy integrating ML solutions into real applications. I value discipline, clean architecture, and precision in my work. Instead of rushing for deadlines, I prefer understanding problems deeply and delivering fast, reliable, and well-structured solutions. I’m always eager to learn new technologies quickly and apply them effectively.
</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background:"linear-gradient(135deg,#F5E4C4,#EDD09A)", borderRadius:"20px", padding: isMobile ? "24px" : "36px", border:"2px solid #D9B985", textAlign:"center" }}>
              <div style={{ fontSize: isMobile ? "44px" : "58px", marginBottom:"16px" }}>🏡</div>
              <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: isMobile ? "14px" : "20px" }}>
                {[["1.5+","Years Exp. in doing projects"],["8+","Quality Projects"],["15+","Technologies"],["100%","Dedication"]].map(([n,l])=>(
                  <div key={l} style={{ background:"rgba(255,255,255,0.55)", borderRadius:"12px", padding: isMobile ? "12px 6px" : "14px 8px" }}>
                    <div style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? "26px" : "34px", fontWeight:900, color:"#4A2800" }}>{n}</div>
                    <div style={{ color:"#8B4513", fontSize: isMobile ? "11px" : "13px", marginTop:"4px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

<section id="skills" style={{ padding: isMobile ? "60px 5%" : "80px 8%", background:"#FDF3E0" }}>
  <Reveal>
    <div style={{ textAlign:"center", marginBottom: "40px" }}>
      <div className="section-badge">⚡ What I Know</div>
      <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? "34px" : "44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>Skills</h2>
      <div className="divider" />
    </div>
  </Reveal>

  <div style={{ maxWidth:"800px", margin:"0 auto" }}>
    {[
      { 
        title: "📚 CS Fundamentals", 
        // FIX: Split these into individual strings that match your 'skills' array names exactly
        keys: ["Data Structures & Algorithms", "System Design (Medium)", "Computer Networks", "DBMS", "Software Development(SDLC/gile)"] 
      },
      { 
        title: "🗄️ Backend & Databases", 
        keys: ["Java", "Spring Boot", "SQL", "PostgreSQL", "Redis", "Firebase"] 
      },
      { 
        title: "🎨 Frontend", 
        keys: ["React", "Tailwind CSS", "Web Design"] 
      },
      { 
        title: "⚙️ DevOps & Cloud", 
        keys: ["Docker", "Kubernetes", "AWS", "EKS", "Jenkins", "CI/CD", "Terraform", "DevOps", "Git", "GitHub"] 
      },
      { 
        title: "🤖 Machine Learning", 
        keys: ["Machine Learning", "TensorFlow", "Scikit-learn", "CNN", "Python"] 
      }
    ].map((category) => (
      <div key={category.title} style={{ marginBottom: "50px" }}>
        <h3 className="skill-heading" style={{ fontSize: "22px", color: "#4A2800", marginBottom: "20px" }}>
          {category.title}
        </h3>
        <div className="skills-grid-single" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {skills
            .filter(s => category.keys.includes(s.name))
            .map(({ name, level, icon }, i) => (
              <Reveal key={name} delay={i * 0.05}>
                <div className="skill-card-full" style={{ 
                  background: "#fff", 
                  padding: "20px", 
                  borderRadius: "12px", 
                  boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
                  width: "100%" 
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ fontWeight: 700 }}>{icon} {name}</span>
                    <span style={{ fontWeight: 700 }}>{level}%</span>
                  </div>
                  <div className="skill-track" style={{ height: "10px", background: "#eee", borderRadius: "10px", overflow: "hidden" }}>
                    <div 
                      className="skill-fill" 
                      style={{ 
                        width: `${level}%`, 
                        height: "100%", 
                        background: "#4A2800", 
                        borderRadius: "10px",
                        transition: "width 1s ease-in-out" 
                      }} 
                    />
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    ))}
  </div>
</section>
      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: isMobile ? "60px 4%" : "80px 8%", background:"#FFFBF2" }}>
        <Reveal>
          <div style={{ textAlign:"center" }}>
            <div className="section-badge">🌱 What I've Built</div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? "34px" : "44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>Projects</h2>
            <p style={{ color:"#8B6040", fontStyle:"italic", marginBottom:"0", fontSize: isMobile ? "13px" : "15px" }}>Tap a hut to explore</p>
            <div className="divider" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{
            background:"linear-gradient(180deg, #7EC850 0%, #5BA038 40%, #3D7A20 100%)",
            borderRadius:"20px",
            padding: isMobile ? "32px 16px 24px" : "48px 40px 36px",
            maxWidth:"900px", margin:"0 auto",
            position:"relative", overflow:"hidden",
            border:"2px solid #4A9A30",
            boxShadow:"inset 0 -8px 20px rgba(0,0,0,0.12), 0 8px 32px rgba(60,120,30,0.2)",
          }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"18px", background:"linear-gradient(180deg, #A8D8EA 0%, #7EC850 45%)", zIndex:0 }} />
            <div style={{ position:"absolute", top:"12px", right: isMobile ? "20px" : "40px", width:"40px", height:"40px", borderRadius:"50%", background:"radial-gradient(circle, #FFD700, #FFB300)", boxShadow:"0 0 24px 8px rgba(255,210,0,0.35)", zIndex:1 }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"80px", zIndex:1, borderRadius:"0 0 18px 18px", overflow:"hidden" }}>
              {[...Array(24)].map((_,i)=>(<div key={i} style={{ position:"absolute", bottom:0, left:`${i*4.2}%`, width:"2px", height:"70px", background:"rgba(30,80,10,0.4)" }} />))}
            </div>
            <div style={{
              display:"flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: isMobile ? "center" : "space-evenly",
              alignItems: isMobile ? "center" : "flex-end",
              gap: isMobile ? "24px" : "0",
              position:"relative", zIndex:2,
              paddingBottom:"20px",
            }}>
              {projects.map((p,i)=>(
                <ProjectHut key={p.title} project={p} index={i} onClick={()=>setSelectedProject(p)} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: isMobile ? "60px 5%" : "80px 8%", background:"#FDF3E0", textAlign:"center" }}>
        <Reveal>
          <div className="section-badge">✉️ Say Hello</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile ? "34px" : "44px", fontWeight:900, color:"#4A2800", margin:"8px 0" }}>Get in Touch</h2>
          <div className="divider" />
          <p style={{ color:"#5D3A1A", fontSize: isMobile ? "15px" : "18px", maxWidth:"480px", margin:"0 auto 36px", lineHeight:1.85 }}>
            Have a project in mind or just want to say namaste? My door is always open. 🌿
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="contact-icon-btn" onClick={()=>window.open("mailto:nbanwala7@email.com")}>✉️ Email Me</button>
            <button className="contact-icon-btn" onClick={()=>window.open("https://github.com/NaveenBanwala")}>🐙 GitHub</button>
            <button className="contact-icon-btn" onClick={()=>window.open("https://www.linkedin.com/in/naveen-banwala-463831298/")}>💼 LinkedIn</button>
            <button className="contact-icon-btn" onClick={()=>window.open("https://careereye.44.192.45.193.nip.io/")}>💼 Website</button>
             <button className="contact-icon-btn" onClick={()=>window.open("https://drive.google.com/file/d/18kKRHfxSbNUQKEp_qHLM9ZnQ-rQMnhAV/view?usp=sharing")}>💼 Resume</button>
            
          </div>
        </Reveal>
        <div style={{ marginTop:"64px", paddingTop:"24px", borderTop:"2px solid #E8C99A", color:"#8B6040", fontSize:"13px", fontStyle:"italic" }}>
          Made with ❤️ and the spirit of the village &nbsp;🌾🏡🐃
        </div>
      </section>

      {selectedProject && (
        <Modal project={selectedProject} onClose={()=>setSelectedProject(null)} />
      )}
    </div>
  );
}