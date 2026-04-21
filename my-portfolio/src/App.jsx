import { useState, useEffect } from "react";
 
/* ─────────────────────────────────────────────
   BUFFALO  – fully grounded, walks left↔right
───────────────────────────────────────────── */
const Buffalo = ({ x, y, scale = 1, delay = 0, range = 18 }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <style>{`
      @keyframes walk_${delay} {
        0%,100%{ transform:translateX(0) }
        50%    { transform:translateX(${range}px) }
      }
      @keyframes leg_${delay} {
        0%,100%{ transform:translateY(0) }
        25%    { transform:translateY(-4px) }
        75%    { transform:translateY(4px) }
      }
      .buf_${delay}{ animation: walk_${delay} ${3.5 + delay * 0.7}s ease-in-out infinite; }
    `}</style>
    <g className={`buf_${delay}`}>
      {/* Shadow on ground */}
      <ellipse cx="45" cy="64" rx="46" ry="6" fill="rgba(0,0,0,0.18)" />
      {/* Body */}
      <ellipse cx="42" cy="36" rx="44" ry="20" fill="#1A1A1A" />
      {/* Neck hump */}
      <ellipse cx="72" cy="26" rx="14" ry="16" fill="#1A1A1A" />
      {/* Head */}
      <ellipse cx="86" cy="28" rx="20" ry="16" fill="#222" />
      {/* Snout */}
      <ellipse cx="104" cy="33" rx="10" ry="7" fill="#3A3A3A" />
      <ellipse cx="102" cy="31" rx="4" ry="3" fill="#555" />
      <ellipse cx="108" cy="31" rx="4" ry="3" fill="#555" />
      {/* Eye */}
      <circle cx="96" cy="23" r="3.5" fill="#4A2800" />
      <circle cx="97" cy="22" r="1.5" fill="white" opacity="0.7" />
      {/* Horns */}
      <path d="M80,15 Q65,-2 55,8"  stroke="#C8A050" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M88,14 Q94,-5 108,6" stroke="#C8A050" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* Ear */}
      <ellipse cx="78" cy="18" rx="6" ry="9" fill="#2A2A2A" transform="rotate(-20 78 18)" />
      {/* Legs – front pair */}
      <rect x="62" y="52" width="11" height="24" fill="#151515" rx="4" />
      <rect x="76" y="52" width="11" height="24" fill="#151515" rx="4" />
      {/* Legs – rear pair */}
      <rect x="18" y="52" width="11" height="24" fill="#151515" rx="4" />
      <rect x="32" y="52" width="11" height="24" fill="#151515" rx="4" />
      {/* Hooves */}
      <ellipse cx="68"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <ellipse cx="82"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <ellipse cx="24"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      <ellipse cx="38"  cy="76" rx="7" ry="4" fill="#0A0A0A" />
      {/* Tail */}
      <path d="M2,34 Q-14,28 -10,46" stroke="#1A1A1A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="-10" cy="48" rx="5" ry="7" fill="#1A1A1A" />
    </g>
  </g>
);
 
/* ─────────────────────────────────────────────
   MAIN SCENE
───────────────────────────────────────────── */
const VillageScene = () => (
  <svg viewBox="0 0 1200 420" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
    <defs>
      <linearGradient id="sky"    x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#3AA0D8" />
        <stop offset="65%"  stopColor="#93CDE4" />
        <stop offset="100%" stopColor="#F5DFA0" />
      </linearGradient>
      <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#5BA038" />
        <stop offset="100%" stopColor="#3D7A20" />
      </linearGradient>
      <filter id="sh"><feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.22" /></filter>
      <style>{`
        @keyframes floatCloud1 { 0%{transform:translateX(0)} 100%{transform:translateX(110px)} }
        @keyframes floatCloud2 { 0%{transform:translateX(0)} 100%{transform:translateX(-80px)} }
        @keyframes swayGrass   { 0%,100%{transform:skewX(-5deg)} 50%{transform:skewX(5deg)} }
        @keyframes birdFlap    { 0%,100%{transform:translateX(0) translateY(0)} 100%{transform:translateX(70px) translateY(-14px)} }
        @keyframes sunGlow     { 0%,100%{opacity:0.18} 50%{opacity:0.28} }
        .cl1 { animation: floatCloud1 22s ease-in-out infinite alternate; }
        .cl2 { animation: floatCloud2 28s ease-in-out infinite alternate; }
        .cl3 { animation: floatCloud1 34s ease-in-out infinite alternate-reverse; }
        .gs  { animation: swayGrass 1.9s ease-in-out infinite; transform-origin: 50% 100%; }
        .gs2 { animation: swayGrass 2.5s ease-in-out infinite reverse; transform-origin: 50% 100%; }
        .bd  { animation: birdFlap 7s ease-in-out infinite alternate; }
        .sg  { animation: sunGlow 3s ease-in-out infinite; }
      `}</style>
    </defs>
 
    {/* Sky */}
    <rect width="1200" height="420" fill="url(#sky)" />
 
    {/* Sun */}
    <circle className="sg" cx="1065" cy="72" r="80" fill="#FFE580" />
    <circle cx="1065" cy="72" r="55" fill="#FFD700" opacity="0.5" />
    <circle cx="1065" cy="72" r="38" fill="#FFD700" />
 
    {/* Clouds */}
    <g className="cl1">
      <ellipse cx="175" cy="82" rx="68" ry="28" fill="white" opacity="0.88" />
      <ellipse cx="222" cy="68" rx="52" ry="36" fill="white" opacity="0.88" />
      <ellipse cx="138" cy="80" rx="40" ry="23" fill="white" opacity="0.88" />
    </g>
    <g className="cl2">
      <ellipse cx="580" cy="62" rx="56" ry="24" fill="white" opacity="0.78" />
      <ellipse cx="622" cy="52" rx="44" ry="30" fill="white" opacity="0.78" />
      <ellipse cx="548" cy="66" rx="34" ry="19" fill="white" opacity="0.78" />
    </g>
    <g className="cl3">
      <ellipse cx="848" cy="88" rx="50" ry="21" fill="white" opacity="0.7" />
      <ellipse cx="888" cy="77" rx="40" ry="27" fill="white" opacity="0.7" />
    </g>
 
    {/* Birds */}
    <g className="bd">
      <path d="M305,52 Q318,41 331,52" stroke="#1A2A10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M338,47 Q351,36 364,47" stroke="#1A2A10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
    <path d="M448,72 Q459,63 470,72" stroke="#1A2A10" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M700,58 Q710,50 720,58" stroke="#1A2A10" strokeWidth="2" fill="none" strokeLinecap="round" />
 
    {/* Distant hills */}
    <ellipse cx="150"  cy="315" rx="225" ry="92"  fill="#55A042" opacity="0.5" />
    <ellipse cx="1065" cy="315" rx="225" ry="96"  fill="#55A042" opacity="0.5" />
    <ellipse cx="600"  cy="332" rx="345" ry="78"  fill="#4D9838" opacity="0.38" />
 
    {/* Ground layers */}
    <rect x="0" y="292" width="1200" height="36" fill="#72C24A" />
    <rect x="0" y="318" width="1200" height="30" fill="#5CB038" />
    <rect x="0" y="340" width="1200" height="80" fill="url(#ground)" />
 
    {/* Crop rows */}
    {[...Array(22)].map((_,i)=>(
      <rect key={i} x={i*54+5} y="296" width="3" height="24" fill="#3D8820" opacity="0.5" />
    ))}
 
    {/* ─── HUT 1 ─── */}
    <g transform="translate(98,195)" filter="url(#sh)">
      <rect x="0" y="62" width="112" height="98" fill="#D4A57A" rx="2" />
      <polygon points="-24,64 56,-20 136,64" fill="#7A5810" />
      <polygon points="-17,64 56,-13 129,64" fill="#9A7018" opacity="0.85" />
      <line x1="56" y1="-20" x2="56" y2="64" stroke="#6A4808" strokeWidth="2" opacity="0.35" />
      {/* thatch detail */}
      {[-1,0,1].map(i=><line key={i} x1={56+i*20} y1="20" x2={56+i*20} y2="64" stroke="#6A4808" strokeWidth="1" opacity="0.22" />)}
      <rect x="39" y="108" width="34" height="52" fill="#5A3010" rx="6" />
      <circle cx="68" cy="136" r="3.2" fill="#C8A030" />
      <rect x="8"  y="80" width="26" height="22" fill="#ADE8F4" rx="4" />
      <rect x="78" y="80" width="26" height="22" fill="#ADE8F4" rx="4" />
      {/* cross panes */}
      <line x1="21" y1="80" x2="21" y2="102" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="8"  y1="91" x2="34" y2="91"  stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="91" y1="80" x2="91" y2="102" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="78" y1="91" x2="104" y2="91" stroke="rgba(100,150,200,0.5)" strokeWidth="1" />
      <line x1="0"  y1="88"  x2="112" y2="88"  stroke="#C49068" strokeWidth="1" opacity="0.35" />
      <line x1="0"  y1="112" x2="112" y2="112" stroke="#C49068" strokeWidth="1" opacity="0.35" />
      {/* potted plant */}
      <rect x="100" y="146" width="14" height="12" fill="#7A5020" rx="2" />
      <ellipse cx="107" cy="144" rx="10" ry="8" fill="#3D8828" />
    </g>
 
    {/* ─── HUT 2 (small back) ─── */}
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
 
    {/* ─── WELL ─── */}
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
 
    {/* ─── HUT 3 (main) ─── */}
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
      <line x1="0"   y1="96"  x2="134" y2="96"  stroke="#C49068" strokeWidth="1" opacity="0.3" />
      <line x1="0"   y1="122" x2="134" y2="122" stroke="#C49068" strokeWidth="1" opacity="0.3" />
    </g>
 
    {/* ─── TREES ─── */}
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
    {/* Palm */}
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
 
    {/* ─── BUFFALOS (properly grounded) ─── */}
    {/* ground level is ~y=340, so buffalo bottom (hooves) = y + hooveOffset */}
    {/* Buffalo bottom of hooves = y+76, so y = 340-76 = 264 */}
    <Buffalo x={415}  y={264} scale={1}    delay={0} range={20} />
    <Buffalo x={770}  y={268} scale={0.8}  delay={1} range={-16} />
    <Buffalo x={1095} y={272} scale={0.58} delay={2} range={14} />
 
    {/* Foreground grass */}
    {[...Array(50)].map((_,i) => {
      const x = i * 24 + (i % 5) * 3;
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
   CLICKABLE HUT for Projects
───────────────────────────────────────────── */
const ProjectHut = ({ project, index, onClick }) => {
  const colors = [
    { wall:"#D4A57A", roof:"#7A5810", roofLight:"#9A7018" },
    { wall:"#C8986A", roof:"#6A4C0C", roofLight:"#8A6418" },
    { wall:"#D8AA80", roof:"#7A5810", roofLight:"#9A7018" },
  ];
  const c = colors[index % 3];
  return (
    <div
      onClick={onClick}
      style={{
        cursor:"pointer", textAlign:"center",
        transition:"transform 0.25s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"10px",
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px) scale(1.04)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)"}}
    >
      <svg viewBox="0 0 130 160" width="130" height="160" xmlns="http://www.w3.org/2000/svg">
        <filter id={`hs${index}`}><feDropShadow dx="2" dy="4" stdDeviation="5" floodOpacity="0.28"/></filter>
        {/* Ground shadow */}
        <ellipse cx="65" cy="155" rx="48" ry="8" fill="rgba(0,0,0,0.14)" />
        {/* Wall */}
        <rect x="12" y="72" width="106" height="80" fill={c.wall} rx="3" filter={`url(#hs${index})`} />
        {/* Roof */}
        <polygon points="-4,74 65,8 134,74" fill={c.roof} />
        <polygon points="3,74 65,15 127,74" fill={c.roofLight} opacity="0.88" />
        {/* Thatch stripes */}
        {[0,1,2,3].map(i=>(
          <line key={i} x1={65-30+i*20} y1="30" x2={65-28+i*20} y2="74" stroke={c.roof} strokeWidth="1.5" opacity="0.3" />
        ))}
        {/* Door */}
        <rect x="46" y="112" width="38" height="40" fill="#5A3010" rx="7" />
        <circle cx="79" cy="134" r="3.5" fill="#C8A030" />
        {/* Windows */}
        <rect x="14" y="82" width="26" height="22" fill="#ADE8F4" rx="4" />
        <rect x="90" y="82" width="26" height="22" fill="#ADE8F4" rx="4" />
        <line x1="27" y1="82" x2="27" y2="104" stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="14" y1="93" x2="40" y2="93"  stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="103" y1="82" x2="103" y2="104" stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        <line x1="90"  y1="93" x2="116" y2="93"  stroke="rgba(100,160,210,0.6)" strokeWidth="1.2" />
        {/* Mud lines */}
        <line x1="12" y1="96"  x2="118" y2="96"  stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        <line x1="12" y1="110" x2="118" y2="110" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        {/* Emoji on door top */}
        <text x="65" y="108" textAnchor="middle" fontSize="16">{project.emoji}</text>
      </svg>
 
      <div style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:"16px", fontWeight:700,
        color:"#4A2800",
      }}>{project.title}</div>
      <div style={{ fontSize:"12px", color:"#8B6040", fontFamily:"Lora, serif" }}>
        Click to explore
      </div>
    </div>
  );
};
 
/* ─────────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────────── */
const Modal = ({ project, onClose }) => {
  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return ()=>{ document.body.style.overflow = ""; };
  },[]);
 
  if (!project) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:1000,
        background:"rgba(30,15,5,0.72)",
        backdropFilter:"blur(5px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"20px",
      }}
    >
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          background:"#FFFBF2",
          borderRadius:"24px",
          border:"2px solid #D9B985",
          maxWidth:"680px", width:"100%",
          maxHeight:"88vh", overflowY:"auto",
          boxShadow:"0 30px 80px rgba(93,58,26,0.35)",
          animation:"popModal 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <style>{`
          @keyframes popModal { from{opacity:0;transform:scale(0.85) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        `}</style>
 
        {/* Header banner */}
        <div style={{
          background:`linear-gradient(135deg, #8B4513, #D2691E)`,
          borderRadius:"22px 22px 0 0",
          padding:"36px 36px 28px",
          position:"relative",
        }}>
          <button
            onClick={onClose}
            style={{
              position:"absolute", top:"16px", right:"16px",
              background:"rgba(255,255,255,0.22)", border:"none",
              color:"white", width:"36px", height:"36px",
              borderRadius:"50%", cursor:"pointer", fontSize:"18px",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}
          >✕</button>
          <div style={{ fontSize:"52px", marginBottom:"12px" }}>{project.emoji}</div>
          <h2 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:"32px", color:"white",
            margin:"0 0 6px",
          }}>{project.title}</h2>
          <p style={{ color:"rgba(255,248,240,0.85)", fontSize:"15px", margin:0 }}>
            {project.tagline}
          </p>
        </div>
 
        {/* Body */}
        <div style={{ padding:"32px 36px" }}>
          {/* Mock screenshot */}
          <div style={{
            background:"linear-gradient(135deg, #F5E4C4, #EDD09A)",
            borderRadius:"14px",
            height:"180px",
            display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom:"24px",
            border:"2px solid #D9B985",
            position:"relative",
            overflow:"hidden",
          }}>
            <div style={{ fontSize:"72px", opacity:0.25, userSelect:"none" }}>{project.emoji}</div>
            <div style={{
              position:"absolute", inset:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              flexDirection:"column", gap:"8px",
            }}>
              <div style={{ fontFamily:"'Playfair Display', serif", color:"#6A3E1A", fontSize:"18px", fontWeight:700 }}>
                {project.title}
              </div>
              <div style={{ fontSize:"12px", color:"#8B6040", fontStyle:"italic" }}>
                Project Preview
              </div>
            </div>
          </div>
 
          {/* Description */}
          <p style={{ color:"#5D3A1A", fontSize:"16px", lineHeight:1.85, marginBottom:"24px" }}>
            {project.desc}
          </p>
 
          {/* Features */}
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontFamily:"'Playfair Display', serif", color:"#4A2800", fontSize:"17px", fontWeight:700, marginBottom:"12px" }}>
              ✨ Key Features
            </div>
            <ul style={{ margin:0, paddingLeft:"20px", color:"#6A4820", fontSize:"15px", lineHeight:2 }}>
              {project.features.map((f,i)=><li key={i}>{f}</li>)}
            </ul>
          </div>
 
          {/* Tech stack */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontFamily:"'Playfair Display', serif", color:"#4A2800", fontSize:"17px", fontWeight:700, marginBottom:"12px" }}>
              🛠 Tech Stack
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {project.tech.map(t=>(
                <span key={t} style={{
                  background:"#F5E4C4", color:"#6A3E1A",
                  padding:"5px 14px", borderRadius:"20px",
                  fontSize:"13px", border:"1px solid #D9B985",
                  fontFamily:"Lora, serif",
                }}>{t}</span>
              ))}
            </div>
          </div>
 
          {/* Links */}
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            {project.links.map(l=>(
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: l.primary
                    ? "linear-gradient(135deg,#8B4513,#D2691E)"
                    : "transparent",
                  color: l.primary ? "white" : "#5D3A1A",
                  border: l.primary ? "none" : "2px solid #8B4513",
                  padding:"12px 28px", borderRadius:"30px",
                  fontFamily:"Lora, serif", fontSize:"14px", fontWeight:600,
                  textDecoration:"none", cursor:"pointer",
                  transition:"all 0.2s",
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  boxShadow: l.primary ? "0 4px 18px rgba(139,69,19,0.3)" : "none",
                }}
                onMouseEnter={e=>{
                  if(!l.primary){ e.currentTarget.style.background="#8B4513"; e.currentTarget.style.color="white"; }
                  else { e.currentTarget.style.transform="translateY(-2px)"; }
                }}
                onMouseLeave={e=>{
                  if(!l.primary){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#5D3A1A"; }
                  else { e.currentTarget.style.transform="translateY(0)"; }
                }}
              >
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
   DATA
───────────────────────────────────────────── */
const skills = [
  { name:"JavaScript", level:90, icon:"⚡" },
  { name:"React",      level:85, icon:"⚛️"  },
  { name:"Node.js",    level:80, icon:"🌿"  },
  { name:"Python",     level:75, icon:"🐍"  },
  { name:"SQL",        level:70, icon:"🗄️"  },
  { name:"Git",        level:85, icon:"🌾"  },
];
 
const projects = [
  {
    title:"Kisan Connect",
    emoji:"🌾",
    tagline:"Connecting farmers with buyers across India",
    desc:"A full-stack platform bridging the gap between farmers and buyers. Features include real-time market pricing, crop yield forecasting, direct negotiation tools, and a mobile-first design built for low-bandwidth connections in rural areas.",
    features:[
      "Real-time crop market price dashboard",
      "Farmer & buyer matching algorithm",
      "Crop yield tracking with historical charts",
      "SMS-based notifications for remote users",
      "Multilingual support (Hindi, Haryanvi)",
    ],
    tech:["React","Node.js","MongoDB","Socket.io","Twilio"],
    links:[
      { label:"Live Demo", icon:"🚀", url:"#", primary:true },
      { label:"GitHub",    icon:"🐙", url:"#", primary:false },
      { label:"Case Study",icon:"📄", url:"#", primary:false },
    ],
  },
  {
    title:"Village Hub",
    emoji:"🏡",
    tagline:"Digital services for rural communities",
    desc:"A community portal bringing government and digital services to rural areas. Covers education (online classes), healthcare (telemedicine booking), local governance (complaint tracking), and public announcements — all accessible on a 2G connection.",
    features:[
      "Progressive Web App works offline",
      "Aadhaar-linked user authentication",
      "Telemedicine scheduling system",
      "Local government complaint tracker",
      "Village noticeboard & announcements",
    ],
    tech:["Next.js","PostgreSQL","Tailwind","PWA","Prisma"],
    links:[
      { label:"Live Demo", icon:"🚀", url:"#", primary:true },
      { label:"GitHub",    icon:"🐙", url:"#", primary:false },
      { label:"Docs",      icon:"📚", url:"#", primary:false },
    ],
  },
  {
    title:"GreenTrack",
    emoji:"🌱",
    tagline:"Environmental monitoring for sustainable farming",
    desc:"An environmental monitoring dashboard built for agricultural zones. Collects live sensor data from IoT devices deployed across fields — soil moisture, air quality, temperature — then surfaces trends, anomalies, and actionable alerts for farmers and researchers.",
    features:[
      "Live IoT sensor data ingestion (MQTT)",
      "Interactive D3.js trend visualisations",
      "Threshold-based SMS / email alerts",
      "Historical weather correlation engine",
      "Exportable PDF & CSV reports",
    ],
    tech:["Python","FastAPI","D3.js","InfluxDB","MQTT","Docker"],
    links:[
      { label:"Live Demo", icon:"🚀", url:"#", primary:true },
      { label:"GitHub",    icon:"🐙", url:"#", primary:false },
      { label:"Research",  icon:"🔬", url:"#", primary:false },
    ],
  },
];
 
/* ─────────────────────────────────────────────
   MAIN PORTFOLIO
───────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
 
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setActiveSection(id);
  };
 
  return (
    <div style={{ fontFamily:"'Lora', Georgia, serif", background:"#FFFBF2", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
 
        @keyframes fadeUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
 
        .hero-name { animation: fadeUp 0.9s ease-out both; }
        .hero-role { animation: fadeUp 0.9s ease-out 0.22s both; }
        .hero-desc { animation: fadeUp 0.9s ease-out 0.42s both; }
        .hero-btns { animation: fadeUp 0.9s ease-out 0.60s both; }
 
        .nav-pill {
          cursor:pointer; padding:7px 18px; border-radius:22px;
          border:none; background:transparent;
          font-family:'Lora',serif; font-size:14px; color:#6A3E1A;
          transition:background 0.22s, color 0.22s;
        }
        .nav-pill:hover  { background:rgba(139,69,19,0.12); }
        .nav-pill.active { background:#8B4513; color:#FFF8F0; }
 
        .btn-primary {
          background:linear-gradient(135deg,#8B4513 0%,#D2691E 100%);
          color:#FFF8F0; border:none; padding:13px 34px; border-radius:30px;
          font-family:'Lora',serif; font-size:15px; font-weight:600; cursor:pointer;
          transition:transform 0.2s, box-shadow 0.2s;
          box-shadow:0 4px 18px rgba(139,69,19,0.32);
        }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(139,69,19,0.42); }
 
        .btn-outline {
          background:transparent; color:#5D3A1A; border:2px solid #8B4513;
          padding:11px 32px; border-radius:30px;
          font-family:'Lora',serif; font-size:15px; font-weight:600; cursor:pointer;
          transition:all 0.2s;
        }
        .btn-outline:hover { background:#8B4513; color:#FFF8F0; transform:translateY(-3px); }
 
        .skill-card {
          background:#FFF8F0; border:2px solid #E8C99A;
          border-radius:14px; padding:20px 24px;
          transition:transform 0.25s, box-shadow 0.25s;
        }
        .skill-card:hover { transform:translateY(-4px); box-shadow:0 10px 28px rgba(139,69,19,0.13); }
        .skill-track { height:9px; background:#EDD8B0; border-radius:9px; overflow:hidden; margin-top:10px; }
        .skill-fill  { height:100%; border-radius:9px; background:linear-gradient(90deg,#8B4513,#D2691E); transition:width 1s ease; }
 
        .section-badge {
          display:inline-block; background:#F5E4C4; color:#8B4513;
          font-size:13px; letter-spacing:2px; text-transform:uppercase;
          padding:4px 18px; border-radius:20px; margin-bottom:12px;
          font-family:'Lora',serif; border:1px solid #D9B985;
        }
        .divider {
          width:60px; height:3px;
          background:linear-gradient(90deg,#8B4513,#D2691E);
          margin:0 auto 52px; border-radius:3px;
        }
        .contact-icon-btn {
          display:flex; align-items:center; gap:10px;
          background:#FFF8F0; border:2px solid #D9B985;
          padding:14px 28px; border-radius:50px;
          font-family:'Lora',serif; font-size:15px; color:#5D3A1A;
          cursor:pointer; transition:all 0.22s; white-space:nowrap;
        }
        .contact-icon-btn:hover { background:#8B4513; color:#FFF8F0; border-color:#8B4513; transform:translateY(-2px); }
      `}</style>
 
      {/* ── NAVBAR ── */}
      <nav style={{
        position:"sticky", top:0, zIndex:200,
        background:"rgba(255,251,242,0.92)", backdropFilter:"blur(12px)",
        borderBottom:"2px solid #E8C99A",
        padding:"10px 5%",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"20px", fontWeight:700, color:"#5D3A1A", display:"flex", alignItems:"center", gap:"8px" }}>
          🌾 <span>MyPortfolio</span>
        </div>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
          {["home","about","skills","projects","contact"].map(s=>(
            <button key={s} className={`nav-pill ${activeSection===s?"active":""}`} onClick={()=>scrollTo(s)}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </nav>
 
      {/* ── HERO (no overlay – text floats below scene) ── */}
      <section id="home" style={{ position:"relative" }}>
        <VillageScene />
        {/* Name strip sits right under the scene, fully visible */}
        <div style={{
          background:"linear-gradient(180deg, rgba(255,251,242,0) 0%, #FFFBF2 40%)",
          marginTop:"-90px",
          paddingTop:"20px",
          paddingBottom:"70px",
          textAlign:"center",
          position:"relative", zIndex:10,
        }}>
          <div className="hero-name" style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:"clamp(44px,7vw,76px)", fontWeight:900,
            color:"#4A2800", lineHeight:1.0, marginBottom:"8px",
            textShadow:"0 2px 24px rgba(255,251,242,0.9)",
          }}>Your Name</div>
          <div className="hero-role" style={{ fontStyle:"italic", fontSize:"clamp(16px,2.4vw,22px)", color:"#8B4513", marginBottom:"16px" }}>
            Full-Stack Developer &amp; Engineer
          </div>
          <p className="hero-desc" style={{ color:"#6A3E1A", fontSize:"16px", marginBottom:"28px", lineHeight:1.75, maxWidth:"440px", margin:"0 auto 28px" }}>
            Building purposeful software with the patience and rootedness of the fields I grew up beside.
          </p>
          <div className="hero-btns" style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={()=>scrollTo("projects")}>See My Work 🌿</button>
            <button className="btn-outline"  onClick={()=>scrollTo("contact")}>Contact Me</button>
          </div>
        </div>
      </section>
 
      {/* ── ABOUT ── */}
      <section id="about" style={{ padding:"80px 8%", background:"#FFFBF2" }}>
        <div style={{ textAlign:"center", marginBottom:"0" }}>
          <div className="section-badge">🌾 Who I Am</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>About Me</h2>
          <div className="divider" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"center", maxWidth:"1000px", margin:"0 auto" }}>
          <div>
            <p style={{ color:"#5D3A1A", fontSize:"17px", lineHeight:1.95, marginBottom:"20px" }}>
              Namaste! 🙏 I'm a developer with deep roots in the heartland of Haryana. Growing up surrounded by open fields, mud-walled houses, and the steady rhythms of village life gave me something that no CS curriculum could: <em>patience, groundedness, and the ability to solve real problems for real people.</em>
            </p>
            <p style={{ color:"#5D3A1A", fontSize:"17px", lineHeight:1.95 }}>
              Just as a farmer tends to every corner of their field, I tend to every corner of my codebase — with care, consistency, and pride in a job done well.
            </p>
          </div>
          <div style={{ background:"linear-gradient(135deg,#F5E4C4,#EDD09A)", borderRadius:"20px", padding:"36px", border:"2px solid #D9B985", textAlign:"center" }}>
            <div style={{ fontSize:"58px", marginBottom:"20px" }}>🏡</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
              {[["3+","Years Exp."],["15+","Projects"],["6+","Technologies"],["100%","Dedication"]].map(([n,l])=>(
                <div key={l} style={{ background:"rgba(255,255,255,0.5)", borderRadius:"12px", padding:"14px 8px" }}>
                  <div style={{ fontFamily:"'Playfair Display', serif", fontSize:"34px", fontWeight:900, color:"#4A2800" }}>{n}</div>
                  <div style={{ color:"#8B4513", fontSize:"13px", marginTop:"4px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"80px 8%", background:"#FDF3E0" }}>
        <div style={{ textAlign:"center" }}>
          <div className="section-badge">⚡ What I Know</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>Skills</h2>
          <div className="divider" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", maxWidth:"900px", margin:"0 auto" }}>
          {skills.map(({ name, level, icon })=>(
            <div key={name} className="skill-card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontWeight:600, color:"#4A2800", fontSize:"15px" }}>{icon} {name}</span>
                <span style={{ color:"#8B4513", fontSize:"13px", fontWeight:600 }}>{level}%</span>
              </div>
              <div className="skill-track"><div className="skill-fill" style={{ width:`${level}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── PROJECTS (huts) ── */}
      <section id="projects" style={{ padding:"80px 8%", background:"#FFFBF2" }}>
        <div style={{ textAlign:"center" }}>
          <div className="section-badge">🌱 What I've Built</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>Projects</h2>
          <p style={{ color:"#8B6040", fontStyle:"italic", marginBottom:"0" }}>Click a hut to explore the project</p>
          <div className="divider" />
        </div>
 
        {/* Village ground strip */}
        <div style={{
          background:"linear-gradient(180deg, #7EC850 0%, #5BA038 40%, #3D7A20 100%)",
          borderRadius:"20px",
          padding:"48px 40px 36px",
          maxWidth:"900px", margin:"0 auto",
          position:"relative",
          overflow:"hidden",
          border:"2px solid #4A9A30",
          boxShadow:"inset 0 -8px 20px rgba(0,0,0,0.12), 0 8px 32px rgba(60,120,30,0.2)",
        }}>
          {/* Sky backdrop */}
          <div style={{
            position:"absolute", inset:0, borderRadius:"18px",
            background:"linear-gradient(180deg, #A8D8EA 0%, #7EC850 45%)",
            zIndex:0,
          }} />
          {/* Sun */}
          <div style={{
            position:"absolute", top:"12px", right:"40px",
            width:"44px", height:"44px", borderRadius:"50%",
            background:"radial-gradient(circle, #FFD700, #FFB300)",
            boxShadow:"0 0 24px 8px rgba(255,210,0,0.35)",
            zIndex:1,
          }} />
          {/* Crop rows on ground */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"80px", zIndex:1, borderRadius:"0 0 18px 18px", overflow:"hidden" }}>
            {[...Array(24)].map((_,i)=>(
              <div key={i} style={{
                position:"absolute", bottom:0,
                left:`${i*4.2}%`, width:"2px", height:"70px",
                background:"rgba(30,80,10,0.4)",
              }} />
            ))}
          </div>
 
          {/* Huts row */}
          <div style={{
            display:"flex", justifyContent:"space-evenly", alignItems:"flex-end",
            position:"relative", zIndex:2,
            paddingBottom:"20px",
          }}>
            {projects.map((p,i)=>(
              <ProjectHut key={p.title} project={p} index={i} onClick={()=>setSelectedProject(p)} />
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"80px 8%", background:"#FDF3E0", textAlign:"center" }}>
        <div className="section-badge">✉️ Say Hello</div>
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"44px", fontWeight:900, color:"#4A2800", margin:"0 0 8px" }}>Get in Touch</h2>
        <div className="divider" />
        <p style={{ color:"#5D3A1A", fontSize:"18px", maxWidth:"480px", margin:"0 auto 40px", lineHeight:1.85 }}>
          Have a project in mind or just want to say namaste? My door is always open. 🌿
        </p>
        <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
          <button className="contact-icon-btn" onClick={()=>window.open("mailto:your@email.com")}>✉️ Email Me</button>
          <button className="contact-icon-btn" onClick={()=>window.open("https://github.com")}>🐙 GitHub</button>
          <button className="contact-icon-btn" onClick={()=>window.open("https://linkedin.com")}>💼 LinkedIn</button>
          <button className="contact-icon-btn" onClick={()=>window.open("https://twitter.com")}>🐦 Twitter</button>
        </div>
        <div style={{ marginTop:"72px", paddingTop:"28px", borderTop:"2px solid #E8C99A", color:"#8B6040", fontSize:"14px", fontStyle:"italic" }}>
          Made with ❤️ and the spirit of the village &nbsp;🌾🏡🐃
        </div>
      </section>
 
      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <Modal project={selectedProject} onClose={()=>setSelectedProject(null)} />
      )}
    </div>
  );
}