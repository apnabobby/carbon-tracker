import { useState, useEffect } from "react";

// ── Multi-language data ──────────────────────────────────────────────────────
const LANG = {
  hi: {
    appName: "कार्बन ट्रैकर",
    subtitle: "अपने पर्यावरणीय प्रभाव को समझें और कम करें",
    nav: ["डैशबोर्ड", "गतिविधियाँ", "सुझाव", "लीडरबोर्ड", "सेटिंग्स"],
    badge: "🌱 हरित योद्धा",
    streak: "दिनों की streak",
    today: "आज", week: "इस सप्ताह",
    weeklyTrend: "📊 साप्ताहिक रुझान",
    savedToday: "आज बचाया", thisMonth: "इस माह",
    treeEquiv: "पेड़ के बराबर", belowAvg: "औसत से कम",
    addActivity: "गतिविधि जोड़ें",
    categories: ["यातायात", "ऊर्जा", "भोजन", "खरीदारी"],
    items: {
      यातायात: [{ n:"कार (10 km)",co2:2.3,icon:"🚗"},{n:"बस (10 km)",co2:0.8,icon:"🚌"},{n:"साइकिल (10 km)",co2:0,icon:"🚲"},{n:"हवाई जहाज (100 km)",co2:18.5,icon:"✈️"},{n:"मेट्रो (10 km)",co2:0.4,icon:"🚇"}],
      ऊर्जा:  [{n:"AC (1 घंटा)",co2:0.7,icon:"❄️"},{n:"हीटर (1 घंटा)",co2:0.9,icon:"🔥"},{n:"LED बल्ब (8 घंटे)",co2:0.05,icon:"💡"},{n:"वाशिंग मशीन",co2:0.6,icon:"🌀"},{n:"सोलर पैनल",co2:-1.2,icon:"☀️"}],
      भोजन:  [{n:"बीफ (100g)",co2:2.7,icon:"🥩"},{n:"चिकन (100g)",co2:0.7,icon:"🍗"},{n:"सब्ज़ियाँ (100g)",co2:0.1,icon:"🥦"},{n:"डेयरी उत्पाद",co2:0.9,icon:"🥛"},{n:"फल (100g)",co2:0.08,icon:"🍎"}],
      खरीदारी:[{n:"नया कपड़ा",co2:3.5,icon:"👕"},{n:"इलेक्ट्रॉनिक्स",co2:12,icon:"📱"},{n:"पुनर्चक्रण",co2:-0.5,icon:"♻️"},{n:"ऑनलाइन शॉपिंग",co2:0.4,icon:"📦"},{n:"स्थानीय बाज़ार",co2:0.1,icon:"🛒"}],
    },
    added: "जोड़ा गया!",
    tipsHead: "व्यक्तिगत सुझाव", tipsSub: "आपकी गतिविधियों के आधार पर सुझाव",
    tips:[{icon:"🌿",t:"सार्वजनिक परिवहन का उपयोग करें — प्रतिदिन 2.1 kg CO₂ बचाएं"},{icon:"💧",t:"नहाने का समय 5 मिनट कम करें — प्रतिदिन 0.3 kg बचाएं"},{icon:"🥗",t:"सप्ताह में एक दिन शाकाहारी रहें — प्रति सप्ताह 2.5 kg बचाएं"},{icon:"🔌",t:"उपकरणों को standby से बंद करें — प्रतिमाह 1 kg बचाएं"},{icon:"🌳",t:"एक पेड़ लगाएं — प्रतिवर्ष 21 kg CO₂ अवशोषित करता है"},{icon:"🛍️",t:"कपड़े की थैली उपयोग करें — प्रतिमाह 0.5 kg प्लास्टिक बचाएं"}],
    allTips: "सभी सुझाव मानने पर", dailySave: "प्रतिदिन की बचत",
    lbHead: "सामुदायिक लीडरबोर्ड", lbSub: "इस माह सबसे अधिक CO₂ बचाने वाले",
    lbUsers:[{name:"अर्जुन शर्मा",saved:45.2,badge:"🥇"},{name:"प्रिया वर्मा",saved:38.7,badge:"🥈"},{name:"राहुल गुप्ता",saved:32.1,badge:"🥉"},{name:"अनीता सिंह",saved:28.4,badge:"🌟"},{name:"विकास पटेल",saved:24.9,badge:"🌟"},{name:"आप",saved:19.3,badge:"🌱",isUser:true}],
    comSaved:"समुदाय ने मिलकर बचाया", monthSave:"इस माह कुल CO₂ की बचत 🌱",
    youLabel:"(आप)", savedLabel:"kg CO₂ बचाया",
    settingsHead:"⚙️ सेटिंग्स", settingsSub:"अपने अनुभव को अनुकूलित करें",
    langLabel:"🌐 भाषा", themeLabel:"🎨 थीम", accentLabel:"🌈 रंग",
    unitLabel:"📏 इकाई", notifLabel:"🔔 सूचनाएँ", animLabel:"✨ एनिमेशन",
    saveBtn:"सेटिंग्स सहेजें", savedMsg:"✅ सेटिंग्स सहेजी गईं!",
    weekDays:["सोम","मंगल","बुध","गुरु","शुक्र","शनि","रवि"],
    trees:"पेड़",
  },
  en: {
    appName: "Carbon Tracker",
    subtitle: "Understand, track & reduce your environmental impact",
    nav: ["Dashboard", "Activities", "Tips", "Leaderboard", "Settings"],
    badge: "🌱 Green Warrior",
    streak: "day streak",
    today: "Today", week: "This Week",
    weeklyTrend: "📊 Weekly Trend",
    savedToday: "Saved Today", thisMonth: "This Month",
    treeEquiv: "Tree Equivalent", belowAvg: "Below Average",
    addActivity: "Add Activity",
    categories: ["Transport", "Energy", "Food", "Shopping"],
    items: {
      Transport:[{n:"Car (10 km)",co2:2.3,icon:"🚗"},{n:"Bus (10 km)",co2:0.8,icon:"🚌"},{n:"Bicycle (10 km)",co2:0,icon:"🚲"},{n:"Airplane (100 km)",co2:18.5,icon:"✈️"},{n:"Metro (10 km)",co2:0.4,icon:"🚇"}],
      Energy:  [{n:"AC (1 hr)",co2:0.7,icon:"❄️"},{n:"Heater (1 hr)",co2:0.9,icon:"🔥"},{n:"LED Bulb (8 hrs)",co2:0.05,icon:"💡"},{n:"Washing Machine",co2:0.6,icon:"🌀"},{n:"Solar Panel",co2:-1.2,icon:"☀️"}],
      Food:    [{n:"Beef (100g)",co2:2.7,icon:"🥩"},{n:"Chicken (100g)",co2:0.7,icon:"🍗"},{n:"Vegetables (100g)",co2:0.1,icon:"🥦"},{n:"Dairy",co2:0.9,icon:"🥛"},{n:"Fruit (100g)",co2:0.08,icon:"🍎"}],
      Shopping:[{n:"New Clothes",co2:3.5,icon:"👕"},{n:"Electronics",co2:12,icon:"📱"},{n:"Recycling",co2:-0.5,icon:"♻️"},{n:"Online Shopping",co2:0.4,icon:"📦"},{n:"Local Market",co2:0.1,icon:"🛒"}],
    },
    added: "Added!",
    tipsHead: "Personalised Tips", tipsSub: "Based on your activity patterns",
    tips:[{icon:"🌿",t:"Use public transport — save 2.1 kg CO₂ daily"},{icon:"💧",t:"Cut shower time by 5 min — save 0.3 kg daily"},{icon:"🥗",t:"Go vegetarian one day/week — save 2.5 kg/week"},{icon:"🔌",t:"Switch off standby devices — save 1 kg/month"},{icon:"🌳",t:"Plant a tree — absorbs 21 kg CO₂ per year"},{icon:"🛍️",t:"Use cloth bags — save 0.5 kg plastic/month"}],
    allTips:"If you follow all tips", dailySave:"daily savings",
    lbHead:"Community Leaderboard", lbSub:"Top CO₂ savers this month",
    lbUsers:[{name:"Arjun Sharma",saved:45.2,badge:"🥇"},{name:"Priya Verma",saved:38.7,badge:"🥈"},{name:"Rahul Gupta",saved:32.1,badge:"🥉"},{name:"Anita Singh",saved:28.4,badge:"🌟"},{name:"Vikas Patel",saved:24.9,badge:"🌟"},{name:"You",saved:19.3,badge:"🌱",isUser:true}],
    comSaved:"Community saved together", monthSave:"Total CO₂ saved this month 🌱",
    youLabel:"(You)", savedLabel:"kg CO₂ saved",
    settingsHead:"⚙️ Settings", settingsSub:"Personalise your experience",
    langLabel:"🌐 Language", themeLabel:"🎨 Theme", accentLabel:"🌈 Accent Color",
    unitLabel:"📏 Unit", notifLabel:"🔔 Notifications", animLabel:"✨ Animations",
    saveBtn:"Save Settings", savedMsg:"✅ Settings Saved!",
    weekDays:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    trees:"trees",
  },
  mr: {
    appName: "कार्बन ट्रॅकर",
    subtitle: "आपला पर्यावरणीय प्रभाव समजून घ्या आणि कमी करा",
    nav: ["डॅशबोर्ड", "क्रियाकलाप", "सूचना", "लीडरबोर्ड", "सेटिंग्ज"],
    badge: "🌱 हरित योद्धा",
    streak: "दिवसांची streak",
    today: "आज", week: "या आठवड्यात",
    weeklyTrend: "📊 साप्ताहिक कल",
    savedToday: "आज वाचवले", thisMonth: "या महिन्यात",
    treeEquiv: "झाडांच्या बरोबर", belowAvg: "सरासरीपेक्षा कमी",
    addActivity: "क्रियाकलाप जोडा",
    categories: ["वाहतूक", "ऊर्जा", "अन्न", "खरेदी"],
    items: {
      वाहतूक:[{n:"कार (10 km)",co2:2.3,icon:"🚗"},{n:"बस (10 km)",co2:0.8,icon:"🚌"},{n:"सायकल (10 km)",co2:0,icon:"🚲"},{n:"विमान (100 km)",co2:18.5,icon:"✈️"},{n:"मेट्रो (10 km)",co2:0.4,icon:"🚇"}],
      ऊर्जा:  [{n:"AC (1 तास)",co2:0.7,icon:"❄️"},{n:"हीटर (1 तास)",co2:0.9,icon:"🔥"},{n:"LED बल्ब (8 तास)",co2:0.05,icon:"💡"},{n:"वॉशिंग मशीन",co2:0.6,icon:"🌀"},{n:"सोलर पॅनल",co2:-1.2,icon:"☀️"}],
      अन्न:   [{n:"बीफ (100g)",co2:2.7,icon:"🥩"},{n:"चिकन (100g)",co2:0.7,icon:"🍗"},{n:"भाज्या (100g)",co2:0.1,icon:"🥦"},{n:"दुग्धजन्य पदार्थ",co2:0.9,icon:"🥛"},{n:"फळे (100g)",co2:0.08,icon:"🍎"}],
      खरेदी: [{n:"नवीन कपडे",co2:3.5,icon:"👕"},{n:"इलेक्ट्रॉनिक्स",co2:12,icon:"📱"},{n:"पुनर्वापर",co2:-0.5,icon:"♻️"},{n:"ऑनलाइन खरेदी",co2:0.4,icon:"📦"},{n:"स्थानिक बाजार",co2:0.1,icon:"🛒"}],
    },
    added: "जोडले!",
    tipsHead: "वैयक्तिक सूचना", tipsSub: "आपल्या क्रियाकलापांवर आधारित",
    tips:[{icon:"🌿",t:"सार्वजनिक वाहतूक वापरा — दररोज 2.1 kg CO₂ वाचवा"},{icon:"💧",t:"आंघोळीचा वेळ 5 मिनिटे कमी करा — दररोज 0.3 kg वाचवा"},{icon:"🥗",t:"आठवड्यातून एक दिवस शाकाहारी रहा — प्रति आठवडा 2.5 kg वाचवा"},{icon:"🔌",t:"उपकरणे standby वरून बंद करा — दरमहा 1 kg वाचवा"},{icon:"🌳",t:"एक झाड लावा — दरवर्षी 21 kg CO₂ शोषून घेते"},{icon:"🛍️",t:"कापडी पिशवी वापरा — दरमहा 0.5 kg प्लास्टिक वाचवा"}],
    allTips:"सर्व सूचना पाळल्यास", dailySave:"दैनंदिन बचत",
    lbHead:"सामुदायिक लीडरबोर्ड", lbSub:"या महिन्यात सर्वाधिक CO₂ वाचवणारे",
    lbUsers:[{name:"अर्जुन शर्मा",saved:45.2,badge:"🥇"},{name:"प्रिया वर्मा",saved:38.7,badge:"🥈"},{name:"राहुल गुप्ता",saved:32.1,badge:"🥉"},{name:"अनिता सिंह",saved:28.4,badge:"🌟"},{name:"विकास पटेल",saved:24.9,badge:"🌟"},{name:"तुम्ही",saved:19.3,badge:"🌱",isUser:true}],
    comSaved:"समुदायाने एकत्र वाचवले", monthSave:"या महिन्यातील एकूण CO₂ बचत 🌱",
    youLabel:"(तुम्ही)", savedLabel:"kg CO₂ वाचवले",
    settingsHead:"⚙️ सेटिंग्ज", settingsSub:"आपला अनुभव सानुकूलित करा",
    langLabel:"🌐 भाषा", themeLabel:"🎨 थीम", accentLabel:"🌈 रंग",
    unitLabel:"📏 एकक", notifLabel:"🔔 सूचना", animLabel:"✨ अॅनिमेशन",
    saveBtn:"सेटिंग्ज जतन करा", savedMsg:"✅ सेटिंग्ज जतन केल्या!",
    weekDays:["सोम","मंगळ","बुध","गुरु","शुक्र","शनि","रवि"],
    trees:"झाडे",
  },
};

// ── Themes ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark:  { bg:"#0a0f1e", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#e2e8f0", sub:"#64748b", headerBg:"rgba(10,15,30,0.92)" },
  light: { bg:"#f0fdf4", card:"rgba(0,0,0,0.04)",       border:"rgba(0,0,0,0.08)",       text:"#1e293b", sub:"#64748b", headerBg:"rgba(240,253,244,0.95)" },
  amoled:{ bg:"#000000", card:"rgba(255,255,255,0.03)", border:"rgba(255,255,255,0.06)", text:"#f1f5f9", sub:"#475569", headerBg:"rgba(0,0,0,0.97)" },
  nature:{ bg:"#0d1f0e", card:"rgba(74,222,128,0.05)",  border:"rgba(74,222,128,0.12)", text:"#d1fae5", sub:"#6b7280", headerBg:"rgba(13,31,14,0.95)" },
};

// ── Accent palettes ──────────────────────────────────────────────────────────
const ACCENTS = {
  green:  { primary:"#4ade80", glow:"rgba(74,222,128,0.25)", dark:"#16a34a" },
  blue:   { primary:"#60a5fa", glow:"rgba(96,165,250,0.25)", dark:"#2563eb" },
  purple: { primary:"#a78bfa", glow:"rgba(167,139,250,0.25)", dark:"#7c3aed" },
  orange: { primary:"#fb923c", glow:"rgba(251,146,60,0.25)",  dark:"#ea580c" },
  pink:   { primary:"#f472b6", glow:"rgba(244,114,182,0.25)", dark:"#db2777" },
  cyan:   { primary:"#22d3ee", glow:"rgba(34,211,238,0.25)",  dark:"#0891b2" },
};

const weekData = [12.4, 8.7, 15.2, 6.3, 9.8, 11.5, 7.2];

// ── Sub-components ────────────────────────────────────────────────────────────
function MiniChart({ data, labels, accent, theme }) {
  const max = Math.max(...data);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80, padding:"8px 0" }}>
      {data.map((v,i) => (
        <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1, gap:4 }}>
          <div style={{
            width:"100%", height:`${(v/max)*60}px`,
            background: v===Math.min(...data)
              ? `linear-gradient(180deg,${accent.primary},${accent.dark})`
              : "linear-gradient(180deg,#fb923c,#ea580c)",
            borderRadius:"4px 4px 0 0",
            transition:"height 0.6s cubic-bezier(.34,1.56,.64,1)",
            boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
          }}/>
          <span style={{ fontSize:10, color:theme.sub }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function CircleGauge({ value, max=25, label, accent, theme }) {
  const pct = Math.min(value/max,1);
  const r=52, circ=2*Math.PI*r, dash=pct*circ;
  const color = pct<0.4 ? accent.primary : pct<0.7 ? "#fb923c" : "#f87171";
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <svg width={130} height={130} viewBox="0 0 130 130">
        <circle cx={65} cy={65} r={r} fill="none" stroke={theme.border} strokeWidth={10}/>
        <circle cx={65} cy={65} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 65 65)"
          style={{ filter:`drop-shadow(0 0 8px ${color})`, transition:"stroke-dasharray 1s ease" }}/>
        <text x="50%" y="46%" textAnchor="middle" fill={theme.text} fontSize={20} fontWeight="bold" fontFamily="sans-serif">{value.toFixed(1)}</text>
        <text x="50%" y="62%" textAnchor="middle" fill={theme.sub} fontSize={10} fontFamily="sans-serif">kg CO₂</text>
      </svg>
      <span style={{ fontSize:13, color:theme.sub }}>{label}</span>
    </div>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ value, onChange, accent }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width:48, height:26, borderRadius:13, cursor:"pointer",
      background: value ? accent.primary : "#334155",
      position:"relative", transition:"background 0.3s", flexShrink:0,
    }}>
      <div style={{
        position:"absolute", top:3, left: value ? 25 : 3,
        width:20, height:20, borderRadius:"50%", background:"white",
        transition:"left 0.3s", boxShadow:"0 1px 4px rgba(0,0,0,0.3)",
      }}/>
    </div>
  );
}

// ── Settings Row ──────────────────────────────────────────────────────────────
function SettingRow({ label, children, theme }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"14px 16px",
      background: theme.card,
      border:`1px solid ${theme.border}`,
      borderRadius:14, gap:12,
    }}>
      <span style={{ fontSize:14, color:theme.text, fontWeight:500 }}>{label}</span>
      {children}
    </div>
  );
}

// ── Swatch picker ─────────────────────────────────────────────────────────────
function SwatchPicker({ options, value, onChange }) {
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      {options.map(o => (
        <div key={o.key} onClick={() => onChange(o.key)} style={{
          width:28, height:28, borderRadius:"50%", cursor:"pointer",
          background:o.color,
          border: value===o.key ? "3px solid white" : "3px solid transparent",
          boxShadow: value===o.key ? `0 0 0 2px ${o.color}` : "none",
          transition:"all 0.2s",
        }}/>
      ))}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav]       = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [totalToday, setTotalToday]     = useState(7.2);
  const [totalWeek, setTotalWeek]       = useState(71.1);
  const [addedItem, setAddedItem]       = useState(null);
  const [particles, setParticles]       = useState([]);

  // Settings state
  const [lang, setLang]         = useState("hi");
  const [themeName, setThemeName] = useState("dark");
  const [accentName, setAccentName] = useState("green");
  const [unitKg, setUnitKg]     = useState(true);
  const [notif, setNotif]       = useState(true);
  const [anim, setAnim]         = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const t = LANG[lang];
  const theme = THEMES[themeName];
  const accent = ACCENTS[accentName];

  // Sync active category when language changes
  useEffect(() => {
    setActiveCategory(t.categories[0]);
  }, [lang]);

  useEffect(() => {
    setParticles(Array.from({length:16},(_,i)=>({
      id:i, x:Math.random()*100, size:Math.random()*4+2,
      speed:Math.random()*20+15, delay:Math.random()*5,
    })));
  }, []);

  const handleAdd = (item) => {
    const v = unitKg ? item.co2 : +(item.co2*2.205).toFixed(2);
    setTotalToday(p => Math.max(0, +(p + item.co2).toFixed(1)));
    setTotalWeek(p  => Math.max(0, +(p + item.co2).toFixed(1)));
    setAddedItem(item.n);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const saveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const displayVal = (kg) => unitKg ? `${kg.toFixed(1)} kg` : `${(kg*2.205).toFixed(1)} lb`;

  const isLight = themeName === "light";
  const textColor = theme.text;

  return (
    <div style={{
      minHeight:"100vh",
      background: theme.bg,
      fontFamily:"'Noto Sans Devanagari','Segoe UI',sans-serif",
      color: textColor,
      position:"relative", overflow:"hidden",
      transition:"background 0.4s, color 0.4s",
    }}>
      {/* Ambient glow */}
      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        background:`radial-gradient(ellipse at 20% 20%, ${accent.glow} 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(251,146,60,0.06) 0%, transparent 50%)`,
        transition:"background 0.4s",
      }}/>

      {/* Particles */}
      {anim && particles.map(p=>(
        <div key={p.id} style={{
          position:"fixed", left:`${p.x}%`, bottom:"-10px",
          width:p.size, height:p.size, borderRadius:"50%",
          background:`${accent.primary}55`,
          animation:`floatUp ${p.speed}s ${p.delay}s linear infinite`,
          zIndex:0, pointerEvents:"none",
        }}/>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');
        @keyframes floatUp { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:.4} 100%{transform:translateY(-100vh);opacity:0} }
        @keyframes slideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn   { 0%{transform:scale(.5) translateX(-50%);opacity:0} 60%{transform:scale(1.15) translateX(-50%)} 100%{transform:scale(1) translateX(-50%);opacity:1} }
        .nav-btn{transition:all .2s;border:none;cursor:pointer;background:transparent;}
        .nav-btn:hover{opacity:.8}
        .act-card{transition:all .2s;cursor:default;}
        .act-card:hover{transform:translateY(-2px);}
        .tip-card{transition:all .2s;}
        .tip-card:hover{transform:translateX(4px);}
        .add-btn{transition:all .2s;cursor:pointer;border:none;}
        .add-btn:hover{transform:scale(1.12);}
        .swatch:hover{transform:scale(1.15);}
      `}</style>

      {/* ── Header ── */}
      <div style={{
        position:"sticky", top:0, zIndex:20,
        background: theme.headerBg,
        backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${accent.primary}33`,
        padding:"14px 16px 0",
        transition:"background 0.4s",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:26 }}>🌍</span>
              <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:accent.primary, letterSpacing:-0.5 }}>{t.appName}</h1>
            </div>
            <p style={{ margin:0, fontSize:11, color:theme.sub, marginTop:1 }}>{t.subtitle}</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{
              background:`linear-gradient(135deg,${accent.glow},transparent)`,
              border:`1px solid ${accent.primary}55`,
              borderRadius:20, padding:"5px 12px",
              fontSize:12, color:accent.primary, fontWeight:600,
            }}>{t.badge}</div>
            <div style={{ fontSize:11, color:theme.sub, marginTop:3 }}>🔥 12 {t.streak}</div>
          </div>
        </div>

        {/* Nav tabs */}
        <div style={{ display:"flex", gap:2, overflowX:"auto" }}>
          {t.nav.map((n,i)=>(
            <button key={i} className="nav-btn"
              onClick={()=>setActiveNav(i)}
              style={{
                flex:"0 0 auto", padding:"9px 10px",
                color: activeNav===i ? accent.primary : theme.sub,
                fontSize:12, fontWeight: activeNav===i ? 700 : 400,
                borderBottom: activeNav===i ? `2px solid ${accent.primary}` : "2px solid transparent",
                fontFamily:"Noto Sans Devanagari,sans-serif",
                whiteSpace:"nowrap",
              }}
            >{n}</button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ position:"relative", zIndex:5, padding:"18px 14px", maxWidth:480, margin:"0 auto", animation: anim ? "slideIn 0.35s ease" : "none" }}>

        {/* DASHBOARD */}
        {activeNav===0 && (
          <div>
            <div style={{ background:theme.card, border:`1px solid ${theme.border}`, borderRadius:20, padding:"18px 14px", marginBottom:14, display:"flex", justifyContent:"space-around" }}>
              <CircleGauge value={totalToday} max={25} label={t.today} accent={accent} theme={theme}/>
              <div style={{ width:1, background:theme.border, margin:"8px 0" }}/>
              <CircleGauge value={totalWeek}  max={150} label={t.week}  accent={accent} theme={theme}/>
            </div>
            <div style={{ background:theme.card, border:`1px solid ${theme.border}`, borderRadius:20, padding:"18px 14px", marginBottom:14 }}>
              <h3 style={{ margin:"0 0 6px", fontSize:14, color:textColor, fontWeight:600 }}>{t.weeklyTrend}</h3>
              <MiniChart data={weekData} labels={t.weekDays} accent={accent} theme={theme}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { label:t.savedToday, value:"2.3 kg", icon:"💚", color:accent.primary },
                { label:t.thisMonth,  value:"284 kg",  icon:"📅", color:"#fb923c" },
                { label:t.treeEquiv, value:`13 ${t.trees}`, icon:"🌳", color:"#34d399" },
                { label:t.belowAvg,  value:"18%",      icon:"📉", color:"#60a5fa" },
              ].map((s,i)=>(
                <div key={i} style={{
                  background:theme.card, border:`1px solid ${s.color}33`,
                  borderRadius:16, padding:"14px 12px",
                  animation: anim ? `slideIn 0.4s ${i*0.08}s both` : "none",
                }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                  <div style={{ fontSize:18, fontWeight:700, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:11, color:theme.sub, marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITIES */}
        {activeNav===1 && (
          <div>
            {addedItem && (
              <div style={{
                position:"fixed", top:78, left:"50%",
                background:`linear-gradient(135deg,${accent.dark},${accent.primary})`,
                color:"white", padding:"10px 22px", borderRadius:50,
                fontWeight:600, fontSize:13, zIndex:100,
                animation:"popIn 0.3s ease",
                boxShadow:`0 4px 20px ${accent.glow}`,
                whiteSpace:"nowrap",
              }}>✅ {addedItem} — {t.added}</div>
            )}
            <h2 style={{ margin:"0 0 14px", fontSize:17, color:textColor }}>{t.addActivity}</h2>
            <div style={{ display:"flex", gap:8, marginBottom:14, overflowX:"auto", paddingBottom:4 }}>
              {t.categories.map(cat=>(
                <button key={cat} onClick={()=>setActiveCategory(cat)} style={{
                  padding:"7px 14px", borderRadius:50, border:"none", cursor:"pointer",
                  background: activeCategory===cat ? accent.primary : theme.card,
                  color: activeCategory===cat ? (isLight?"white":"#0a0f1e") : theme.sub,
                  fontWeight: activeCategory===cat ? 700 : 400,
                  fontSize:13, whiteSpace:"nowrap",
                  fontFamily:"Noto Sans Devanagari,sans-serif",
                  border:`1px solid ${activeCategory===cat ? "transparent" : theme.border}`,
                  transition:"all 0.2s",
                }}>{cat}</button>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {activeCategory && (t.items[activeCategory]||[]).map((item,i)=>(
                <div key={i} className="act-card" style={{
                  background:theme.card, border:`1px solid ${theme.border}`,
                  borderRadius:14, padding:"13px 14px",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  animation: anim ? `slideIn 0.3s ${i*0.04}s both` : "none",
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:24 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:textColor }}>{item.n}</div>
                      <div style={{ fontSize:12, fontWeight:700, marginTop:2,
                        color: item.co2<=0 ? accent.primary : item.co2<1 ? "#fb923c" : "#f87171" }}>
                        {item.co2>0?"+":""}{unitKg ? `${item.co2} kg` : `${(item.co2*2.205).toFixed(2)} lb`} CO₂
                      </div>
                    </div>
                  </div>
                  <button className="add-btn" onClick={()=>handleAdd(item)} style={{
                    background:accent.primary, borderRadius:10,
                    color: isLight?"white":"#0a0f1e", fontWeight:700, fontSize:20,
                    width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center",
                  }}>+</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIPS */}
        {activeNav===2 && (
          <div>
            <h2 style={{ margin:"0 0 4px", fontSize:17, color:textColor }}>{t.tipsHead}</h2>
            <p style={{ margin:"0 0 16px", fontSize:12, color:theme.sub }}>{t.tipsSub}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {t.tips.map((tip,i)=>(
                <div key={i} className="tip-card" style={{
                  background:theme.card,
                  border:`1px solid ${accent.primary}22`,
                  borderLeft:`3px solid ${accent.primary}`,
                  borderRadius:"0 14px 14px 0", padding:"14px 14px",
                  display:"flex", alignItems:"center", gap:12,
                  animation: anim ? `slideIn 0.4s ${i*0.07}s both` : "none",
                }}>
                  <span style={{ fontSize:26, flexShrink:0 }}>{tip.icon}</span>
                  <p style={{ margin:0, fontSize:13, color:textColor, lineHeight:1.6 }}>{tip.t}</p>
                </div>
              ))}
            </div>
            <div style={{
              marginTop:18,
              background:`linear-gradient(135deg,${accent.glow},transparent)`,
              border:`1px solid ${accent.primary}44`,
              borderRadius:20, padding:"18px", textAlign:"center",
            }}>
              <div style={{ fontSize:32, marginBottom:6 }}>🌍</div>
              <p style={{ margin:0, fontSize:15, fontWeight:700, color:accent.primary }}>{t.allTips}</p>
              <p style={{ margin:"5px 0 0", fontSize:26, fontWeight:700, color:textColor }}>~7 kg CO₂</p>
              <p style={{ margin:"3px 0 0", fontSize:12, color:theme.sub }}>{t.dailySave}</p>
            </div>
          </div>
        )}

        {/* LEADERBOARD */}
        {activeNav===3 && (
          <div>
            <h2 style={{ margin:"0 0 4px", fontSize:17, color:textColor }}>{t.lbHead}</h2>
            <p style={{ margin:"0 0 16px", fontSize:12, color:theme.sub }}>{t.lbSub}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {t.lbUsers.map((user,i)=>(
                <div key={i} style={{
                  background: user.isUser ? `linear-gradient(135deg,${accent.glow},transparent)` : theme.card,
                  border: user.isUser ? `1px solid ${accent.primary}55` : `1px solid ${theme.border}`,
                  borderRadius:16, padding:"13px 14px",
                  display:"flex", alignItems:"center", gap:12,
                  animation: anim ? `slideIn 0.4s ${i*0.06}s both` : "none",
                }}>
                  <div style={{
                    width:34, height:34, borderRadius:"50%",
                    background: i<3 ? "linear-gradient(135deg,#fb923c,#ea580c)" : theme.card,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:17, flexShrink:0,
                  }}>{user.badge}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight: user.isUser?700:500, color: user.isUser?accent.primary:textColor }}>
                      {user.name} {user.isUser && t.youLabel}
                    </div>
                    <div style={{ fontSize:12, color:theme.sub, marginTop:2 }}>{user.saved} {t.savedLabel}</div>
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color: i===0?"#fbbf24":i===1?"#94a3b8":i===2?"#b45309":theme.sub }}>#{i+1}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:18, background:theme.card, border:`1px solid ${theme.border}`, borderRadius:20, padding:"18px", textAlign:"center" }}>
              <p style={{ margin:"0 0 3px", fontSize:12, color:theme.sub }}>{t.comSaved}</p>
              <p style={{ margin:0, fontSize:30, fontWeight:700, color:accent.primary }}>188.6 kg</p>
              <p style={{ margin:"3px 0 0", fontSize:12, color:theme.sub }}>{t.monthSave}</p>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeNav===4 && (
          <div style={{ animation: anim ? "slideIn 0.35s ease" : "none" }}>
            <h2 style={{ margin:"0 0 4px", fontSize:17, color:textColor }}>{t.settingsHead}</h2>
            <p style={{ margin:"0 0 20px", fontSize:12, color:theme.sub }}>{t.settingsSub}</p>

            {/* Section: Appearance */}
            <div style={{ marginBottom:20 }}>
              <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:accent.primary, textTransform:"uppercase", letterSpacing:1 }}>Appearance</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>

                {/* Language */}
                <SettingRow label={t.langLabel} theme={theme}>
                  <div style={{ display:"flex", gap:6 }}>
                    {[["hi","हि"],["en","EN"],["mr","म"]].map(([k,label])=>(
                      <button key={k} onClick={()=>setLang(k)} style={{
                        padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer",
                        background: lang===k ? accent.primary : theme.card,
                        color: lang===k ? (isLight?"white":"#0a0f1e") : theme.sub,
                        fontWeight: lang===k ? 700 : 400,
                        fontSize:13, fontFamily:"Noto Sans Devanagari,sans-serif",
                        border:`1px solid ${lang===k ? "transparent" : theme.border}`,
                        transition:"all 0.2s",
                      }}>{label}</button>
                    ))}
                  </div>
                </SettingRow>

                {/* Theme */}
                <SettingRow label={t.themeLabel} theme={theme}>
                  <div style={{ display:"flex", gap:6 }}>
                    {[["dark","🌙"],["light","☀️"],["amoled","⬛"],["nature","🌿"]].map(([k,icon])=>(
                      <button key={k} onClick={()=>setThemeName(k)} style={{
                        padding:"5px 10px", borderRadius:12, border:"none", cursor:"pointer",
                        background: themeName===k ? accent.primary : theme.card,
                        color: themeName===k ? (isLight?"white":"#0a0f1e") : theme.sub,
                        fontSize:16,
                        border:`1px solid ${themeName===k ? "transparent" : theme.border}`,
                        transition:"all 0.2s",
                      }}>{icon}</button>
                    ))}
                  </div>
                </SettingRow>

                {/* Accent */}
                <SettingRow label={t.accentLabel} theme={theme}>
                  <SwatchPicker
                    value={accentName}
                    onChange={setAccentName}
                    options={Object.entries(ACCENTS).map(([k,v])=>({ key:k, color:v.primary }))}
                  />
                </SettingRow>
              </div>
            </div>

            {/* Section: Preferences */}
            <div style={{ marginBottom:20 }}>
              <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:accent.primary, textTransform:"uppercase", letterSpacing:1 }}>Preferences</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>

                {/* Unit */}
                <SettingRow label={t.unitLabel} theme={theme}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:13, color: unitKg ? accent.primary : theme.sub, fontWeight: unitKg?700:400 }}>kg</span>
                    <Toggle value={!unitKg} onChange={v=>setUnitKg(!v)} accent={accent}/>
                    <span style={{ fontSize:13, color: !unitKg ? accent.primary : theme.sub, fontWeight: !unitKg?700:400 }}>lb</span>
                  </div>
                </SettingRow>

                {/* Notifications */}
                <SettingRow label={t.notifLabel} theme={theme}>
                  <Toggle value={notif} onChange={setNotif} accent={accent}/>
                </SettingRow>

                {/* Animations */}
                <SettingRow label={t.animLabel} theme={theme}>
                  <Toggle value={anim} onChange={setAnim} accent={accent}/>
                </SettingRow>
              </div>
            </div>

            {/* Preview Card */}
            <div style={{
              background:`linear-gradient(135deg,${accent.glow},transparent)`,
              border:`1px solid ${accent.primary}44`,
              borderRadius:20, padding:"18px", marginBottom:20,
            }}>
              <p style={{ margin:"0 0 12px", fontSize:13, fontWeight:700, color:accent.primary }}>🎨 Live Preview</p>
              <div style={{ display:"flex", gap:10 }}>
                {["green","blue","purple","orange","pink","cyan"].map(k=>(
                  <div key={k} onClick={()=>setAccentName(k)} style={{
                    flex:1, height:28, borderRadius:8, cursor:"pointer",
                    background:ACCENTS[k].primary,
                    border: accentName===k ? "3px solid white" : "3px solid transparent",
                    boxShadow: accentName===k ? `0 0 0 2px ${ACCENTS[k].primary}` : "none",
                    transition:"all 0.2s",
                  }}/>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button onClick={saveSettings} style={{
              width:"100%", padding:"14px",
              background:`linear-gradient(135deg,${accent.primary},${accent.dark})`,
              border:"none", borderRadius:16, cursor:"pointer",
              color: isLight?"white":"#0a0f1e", fontWeight:700, fontSize:15,
              fontFamily:"Noto Sans Devanagari,sans-serif",
              boxShadow:`0 4px 20px ${accent.glow}`,
              transition:"all 0.2s",
            }}>
              {settingsSaved ? t.savedMsg : t.saveBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
