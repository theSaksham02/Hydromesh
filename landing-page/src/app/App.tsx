import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import {
  ArrowUpRight,
  ArrowRight,
  Radio,
  Map,
  Route,
  Check,
  Building2,
  Users,
  Siren,
  HeartHandshake,
  Mail,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

/* -------------------------- Animated Counter -------------------------- */
function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* -------------------------- Reveal wrapper -------------------------- */
function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------- Hero map visual -------------------------- */
function HeroMap() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const yFast = useTransform(scrollY, [0, 600], [0, 140]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base wash */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#E9EEF5_0%,#F7F9FB_60%)]"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* parallax SVG map */}
      <motion.svg
        style={{ y }}
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#1B2A41" strokeOpacity="0.05" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="#3BA6A6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3BA6A6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3BA6A6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />

        {/* faint coastline / river */}
        <path
          d="M-20 520 C 220 470, 380 600, 600 540 S 980 460, 1240 520"
          fill="none"
          stroke="#2D3E50"
          strokeOpacity="0.10"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <path
          d="M-20 520 C 220 470, 380 600, 600 540 S 980 460, 1240 520"
          fill="none"
          stroke="#3BA6A6"
          strokeOpacity="0.18"
          strokeWidth="1.2"
        />

        {/* thin route lines */}
        {[
          "M120 660 L 360 540 L 540 580 L 760 420 L 1020 360",
          "M80 200 L 280 280 L 460 240 L 700 320 L 980 260",
          "M180 740 L 420 700 L 620 660 L 880 700",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#route)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, delay: 0.3 + i * 0.3, ease: "easeOut" }}
          />
        ))}

        {/* pulsing nodes */}
        {[
          [360, 540],
          [760, 420],
          [460, 240],
          [880, 700],
          [1020, 360],
          [180, 380],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <motion.circle
              cx={cx}
              cy={cy}
              r="6"
              fill="#3BA6A6"
              fillOpacity="0.18"
              animate={{ r: [6, 22, 6], fillOpacity: [0.22, 0, 0.22] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
            <circle cx={cx} cy={cy} r="2.2" fill="#3BA6A6" />
          </g>
        ))}
      </motion.svg>

      {/* rainfall particles */}
      <motion.svg
        style={{ y: yFast }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 97) % 1200;
          const delay = (i % 12) * 0.18;
          const len = 14 + ((i * 7) % 18);
          return (
            <motion.line
              key={i}
              x1={x}
              y1={-20}
              x2={x - 6}
              y2={-20 + len}
              stroke="#2D3E50"
              strokeOpacity="0.10"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: [0, 0.5, 0], y: [0, 820] }}
              transition={{ duration: 3 + (i % 5) * 0.4, repeat: Infinity, delay, ease: "linear" }}
            />
          );
        })}
      </motion.svg>

      {/* edge fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#F7F9FB]" />
    </div>
  );
}

/* -------------------------- Section heading -------------------------- */
function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <span>{index}</span>
      <span className="h-px w-8 bg-border" />
      <span>{children}</span>
    </div>
  );
}

/* -------------------------- Main -------------------------- */
export default function App() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative inline-flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[#3BA6A6]" />
              <span className="absolute inset-1.5 rounded-full bg-[#3BA6A6]" />
            </span>
            <span className="font-display text-[18px] tracking-tight">HydroMesh</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
            <a href="#solution" className="hover:text-foreground transition-colors">Solution</a>
            <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#pilot" className="hover:text-foreground transition-colors">Pilot</a>
          </nav>
          <a
            href="#engage"
            className="group inline-flex items-center gap-2 text-sm bg-[#2D3E50] text-white px-4 py-2 rounded-sm hover:bg-[#1B2A41] transition-colors"
          >
            Request a Pilot
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* 1. HERO */}
      <section id="top" className="relative min-h-screen pt-16 flex items-center">
        <HeroMap />
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 py-24 grid grid-cols-12 gap-6 w-full">
          <div className="col-span-12 lg:col-span-9">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 backdrop-blur px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3BA6A6] animate-pulse" />
                Climate Resilience &nbsp;•&nbsp; Community Intelligence &nbsp;•&nbsp; Early Action
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display mt-8 text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[1.02] tracking-[-0.03em] text-[#1B2A41] max-w-5xl">
                Real-time flood intelligence
                <br />
                for <em className="italic font-light text-[#2D3E50]">safer cities.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-[17px] leading-[1.6] text-muted-foreground">
                HydroMesh turns community reports and climate data into actionable, street-level guidance—helping people move safely and responders act faster during flood events.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#engage"
                  className="group inline-flex items-center gap-2 bg-[#2D3E50] text-white px-5 py-3 rounded-sm hover:bg-[#1B2A41] transition-colors"
                >
                  Request a Pilot
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#impact"
                  className="group inline-flex items-center gap-2 border border-[#1B2A41]/20 text-[#1B2A41] px-5 py-3 rounded-sm hover:bg-white transition-colors"
                >
                  View Impact Model
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* hero meta strip */}
          <div className="col-span-12 mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              ["Live nodes", "1,284"],
              ["Cities modeled", "37"],
              ["Latency", "< 90s"],
              ["Uptime", "99.97%"],
            ].map(([k, v]) => (
              <div key={k} className="bg-background px-5 py-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                <div className="font-display text-2xl mt-1 text-[#1B2A41]">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-border bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Built for public-interest
                <br />deployment & multi-stakeholder collaboration
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {["Universities", "NGOs", "Municipal Agencies", "Climate Networks"].map((p) => (
                <div key={p} className="bg-white px-6 py-6 flex items-center justify-center text-[#2D3E50] font-display text-lg tracking-tight">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <section id="problem" className="relative">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            <div className="col-span-12 lg:col-span-4">
              <Reveal><SectionLabel index="01">The Problem</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[#1B2A41]">
                  Floods are growing.
                  <br />
                  <em className="italic font-light text-muted-foreground">Local decision-making is not.</em>
                </h2>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Reveal delay={0.15}>
                <p className="text-[18px] leading-[1.65] text-[#2D3E50] max-w-2xl">
                  Floods are the most frequent natural disaster worldwide. Yet community members and responders still lack real-time, street-level information. Alerts are broad, delayed, or hard to act on—leading to unsafe travel, slow response, and avoidable harm.
                </p>
              </Reveal>
            </div>
          </div>

          {/* metrics */}
          <div className="mt-20 grid grid-cols-12 gap-px border border-border bg-border">
            {[
              { k: "#1", suffix: "", label: "Most common natural disaster globally", note: "Floods outpace every other category." },
              { k: 21, suffix: "M+", label: "People displaced annually by flood events", note: "Internal Displacement Monitoring Centre, recent year." },
              { k: 33, suffix: "%", label: "Increase in extreme urban rainfall", note: "Driven by accelerating climate change." },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.1} className="col-span-12 md:col-span-4 bg-background p-8 lg:p-10">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Metric / 0{i + 1}
                </div>
                <div className="font-display text-[64px] leading-none tracking-[-0.04em] mt-6 text-[#1B2A41]">
                  {typeof m.k === "number" ? <Counter to={m.k} suffix={m.suffix} /> : <>{m.k}{m.suffix}</>}
                </div>
                <div className="mt-6 text-[15px] leading-snug text-[#2D3E50] max-w-xs">{m.label}</div>
                <div className="mt-3 text-xs text-muted-foreground max-w-xs">{m.note}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section id="solution" className="relative bg-[#E9EEF5]/40 border-y border-border">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <Reveal><SectionLabel index="02">The Solution</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[#1B2A41]">
                  Last-mile flood intelligence —
                  <br />
                  <em className="italic font-light text-[#2D3E50]">delivered in minutes.</em>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-6">
            {[
              {
                icon: Radio,
                title: "Community Reporting",
                copy: "Residents report local flooding instantly — verified, timestamped, and geolocated.",
              },
              {
                icon: Map,
                title: "Live Risk Mapping",
                copy: "Dynamic maps show street-level hazard zones fused with weather and terrain data.",
              },
              {
                icon: Route,
                title: "Safe-Route Guidance",
                copy: "Clear directions reduce exposure and confusion during fast-moving events.",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.12} className="col-span-12 md:col-span-4">
                  <div className="group h-full bg-white border border-border p-8 lg:p-10 transition-colors hover:border-[#3BA6A6]/60">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        / 0{i + 1}
                      </div>
                      <motion.div
                        whileHover={{ rotate: 6, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 250, damping: 18 }}
                        className="h-11 w-11 rounded-full bg-[#3BA6A6]/10 text-[#2D7A7A] flex items-center justify-center"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </motion.div>
                    </div>
                    <h3 className="font-display text-[26px] mt-10 tracking-[-0.01em] text-[#1B2A41]">{f.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.copy}</p>
                    <div className="mt-10 h-px w-full bg-border group-hover:bg-[#3BA6A6]/40 transition-colors" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="relative">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <Reveal><SectionLabel index="03">How It Works</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[#1B2A41]">
                  A three-stage pipeline,
                  <br />
                  <em className="italic font-light text-[#2D3E50]">from signal to action.</em>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute left-0 right-0 top-[44px] h-px bg-border hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
              {[
                {
                  k: "Signal Intake",
                  copy: "Community reports merge with weather feeds, sensor telemetry, and elevation data.",
                  tags: ["Reports", "Weather", "Sensors"],
                },
                {
                  k: "Risk Fusion Engine",
                  copy: "Geospatial processing classifies hazard zones, validates reports, and projects spread.",
                  tags: ["GIS", "ML", "Validation"],
                },
                {
                  k: "Action Layer",
                  copy: "Routing, push alerts, and emergency requests reach residents and responders in minutes.",
                  tags: ["Routing", "Alerts", "Dispatch"],
                },
              ].map((s, i) => (
                <Reveal key={s.k} delay={i * 0.15}>
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 h-[88px] w-[88px] rounded-full bg-background border border-border flex items-center justify-center">
                        <div className="h-[68px] w-[68px] rounded-full border border-[#3BA6A6]/40 flex items-center justify-center font-display text-[22px] text-[#1B2A41]">
                          0{i + 1}
                        </div>
                      </div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Stage / 0{i + 1}
                      </div>
                    </div>
                    <h3 className="font-display text-[24px] mt-8 text-[#1B2A41] tracking-[-0.01em]">{s.k}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-sm">{s.copy}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 border border-border text-[#2D3E50]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT MODEL */}
      <section id="impact" className="relative bg-[#1B2A41] text-[#E9EEF5]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#A9C0D6]">
                  <span>04</span>
                  <span className="h-px w-8 bg-white/20" />
                  <span>Theory of Change</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
                  From information
                  <br />
                  <em className="italic font-light text-[#A9C0D6]">to safer outcomes.</em>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-12 gap-px bg-white/10 border border-white/10">
            {[
              { k: "Inputs", copy: "Community reports, weather signals, and local map layers feed a continuous pipeline." },
              { k: "Outputs", copy: "Verified incident maps, safe routing, and prioritized response alerts." },
              { k: "Outcomes", copy: "Faster response, safer travel, reduced exposure for at-risk residents." },
              { k: "Impact", copy: "Climate resilience, reduced disruption, durable community safety." },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.1} className="group col-span-12 md:col-span-6 lg:col-span-3 bg-[#1B2A41] p-8 hover:bg-[#1B2A41]/80 transition-colors duration-300">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#3BA6A6]">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{c.k}</span>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-[#E9EEF5]/85">{c.copy}</p>
                <div className="mt-10 flex items-center text-[#3BA6A6] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                    {i < 3 ? "flows to" : "endpoint"}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PILOT READINESS */}
      <section id="pilot" className="relative">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-5">
              <Reveal><SectionLabel index="05">Pilot Readiness</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[#1B2A41]">
                  Pilot-ready.
                  <br />
                  <em className="italic font-light text-[#2D3E50]">Built for scalable deployment.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href="#engage"
                  className="group inline-flex items-center gap-2 mt-10 bg-[#2D3E50] text-white px-5 py-3 rounded-sm hover:bg-[#1B2A41] transition-colors"
                >
                  Schedule a technical walkthrough
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <ul className="divide-y divide-border border-y border-border">
                {[
                  ["Full prototype completed", "Mobile app, backend services, and GIS engine, integrated end-to-end."],
                  ["Core workflows validated", "Reporting, fusion, and routing tested across simulated event scenarios."],
                  ["Modular for new cities & datasets", "City onboarding via configurable map layers and feed adapters."],
                  ["Public-interest governance & privacy", "Designed for data minimization, transparency, and local control."],
                ].map(([t, d], i) => (
                  <Reveal key={t} delay={i * 0.08}>
                    <li className="grid grid-cols-12 gap-4 py-6 items-start">
                      <div className="col-span-1">
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#3BA6A6]/10 text-[#2D7A7A]"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </motion.span>
                      </div>
                      <div className="col-span-11 md:col-span-5 font-display text-[20px] tracking-[-0.01em] text-[#1B2A41]">{t}</div>
                      <div className="col-span-12 md:col-span-6 text-[15px] leading-relaxed text-muted-foreground">{d}</div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY NOW */}
      <section className="relative bg-[#E9EEF5]/40 border-y border-border">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <Reveal><SectionLabel index="06">Why Now</SectionLabel></Reveal>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Reveal delay={0.1}>
                <h2 className="font-display text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[#1B2A41]">
                  Urban flooding is intensifying, but early action systems remain centralized and slow.
                  <em className="italic font-light text-[#2D3E50]"> HydroMesh enables localized, community-driven early action—bridging the gap between alerts and real-world decisions.</em>
                </h2>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHO WE SERVE */}
      <section className="relative">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <Reveal><SectionLabel index="07">Who We Serve</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-[#1B2A41]">
                  Built for the people
                  <br />
                  <em className="italic font-light text-[#2D3E50]">most exposed.</em>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-px border border-border bg-border">
            {[
              { icon: Building2, t: "Residents", d: "Households in flood-prone neighborhoods who need timely, local guidance." },
              { icon: Users, t: "Commuters & Workers", d: "Daily travelers navigating disrupted streets, transit, and access routes." },
              { icon: Siren, t: "Responders & Agencies", d: "Emergency teams and city offices coordinating live response." },
              { icon: HeartHandshake, t: "NGO Partners", d: "Organizations delivering climate adaptation and community support." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.t} delay={i * 0.08} className="col-span-12 md:col-span-6 lg:col-span-3 bg-background p-8">
                  <Icon className="h-6 w-6 text-[#2D7A7A]" strokeWidth={1.4} />
                  <h3 className="font-display text-[22px] mt-8 text-[#1B2A41] tracking-[-0.01em]">{s.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. ENGAGEMENT */}
      <section id="engage" className="relative bg-[#1B2A41] text-[#E9EEF5] overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-[0.07]"
          animate={{ x: ["0%", "-50%"], y: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          style={{ width: "200%", height: "200%" }}
        >
          <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <pattern id="dotgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#E9EEF5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotgrid)" />
          </svg>
        </motion.div>
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 py-28 lg:py-36">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#A9C0D6]">
                  <span>08</span>
                  <span className="h-px w-8 bg-white/20" />
                  <span>Engagement & Partnership</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">
                  Let&rsquo;s deploy
                  <br />
                  <em className="italic font-light text-[#A9C0D6]">together.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-[17px] leading-[1.65] text-[#E9EEF5]/85 max-w-2xl">
                  We partner with governments, NGOs, and institutions to localize data, onboard communities, and measure impact. We are seeking pilot partners and mission-aligned investors.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="group inline-flex items-center gap-2 bg-[#3BA6A6] text-[#0F1620] px-5 py-3 rounded-sm hover:bg-white transition-colors cursor-pointer"
                      >
                        Become a Pilot Partner
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#1B2A41] border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl">Partner with HydroMesh</DialogTitle>
                        <DialogDescription className="text-[#A9C0D6]">
                          Help us deploy street-level flood intelligence to your community.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="grid gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-2">
                          <Label htmlFor="org-name" className="text-xs uppercase tracking-widest text-[#A9C0D6]">Organization Name</Label>
                          <Input id="org-name" placeholder="City of..." className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#3BA6A6]" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="org-email" className="text-xs uppercase tracking-widest text-[#A9C0D6]">Contact Email</Label>
                          <Input id="org-email" type="email" placeholder="contact@org.gov" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#3BA6A6]" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="org-message" className="text-xs uppercase tracking-widest text-[#A9C0D6]">Deployment Interest</Label>
                          <Textarea id="org-message" placeholder="Tell us about your region's flood challenges..." className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#3BA6A6] min-h-[100px]" />
                        </div>
                        <Button type="submit" className="bg-[#3BA6A6] text-[#0F1620] hover:bg-white transition-colors mt-2">
                          Send Request
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="group inline-flex items-center gap-2 border border-white/25 text-white px-5 py-3 rounded-sm hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Fund the Pilot
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#1B2A41] border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl">Invest in Resilience</DialogTitle>
                        <DialogDescription className="text-[#A9C0D6]">
                          Join us in building a self-healing, community-driven safety network.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="grid gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-2">
                          <Label htmlFor="invest-name" className="text-xs uppercase tracking-widest text-[#A9C0D6]">Full Name / Entity</Label>
                          <Input id="invest-name" placeholder="Your name or firm" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#3BA6A6]" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="invest-email" className="text-xs uppercase tracking-widest text-[#A9C0D6]">Email Address</Label>
                          <Input id="invest-email" type="email" placeholder="investor@firm.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#3BA6A6]" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="invest-amount" className="text-xs uppercase tracking-widest text-[#A9C0D6]">Interest / Allocation</Label>
                          <Input id="invest-amount" placeholder="Pilot funding, series, or strategic partnership" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#3BA6A6]" />
                        </div>
                        <Button type="submit" className="bg-[#3BA6A6] text-[#0F1620] hover:bg-white transition-colors mt-2">
                          Initiate Conversation
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-5 flex items-center gap-2.5">
            <span className="relative inline-flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[#3BA6A6]" />
              <span className="absolute inset-1.5 rounded-full bg-[#3BA6A6]" />
            </span>
            <span className="font-display text-[18px] tracking-tight text-[#1B2A41]">HydroMesh</span>
          </div>
          <div className="col-span-12 md:col-span-4 text-sm text-muted-foreground leading-relaxed max-w-md">
            HydroMesh is a climate-resilience initiative focused on community safety.
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
          </div>
          <div className="col-span-12 mt-6 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>© {new Date().getFullYear()} HydroMesh — All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
