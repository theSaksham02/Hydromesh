import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
  Check,
  Map,
  Route,
  Radio,
  Mail,
  Github,
  Waves,
  ShieldCheck,
  Landmark,
  Award,
  GraduationCap,
  Building2,
  HeartHandshake,
  Users,
  Layers,
  Clock,
  Navigation,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Reveal wrapper                                                      */
/* ------------------------------------------------------------------ */
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
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Logo mark                                                           */
/* ------------------------------------------------------------------ */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-6 w-6 items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full border border-[#00C6A7]" />
      <span className="absolute inset-1.5 rounded-full bg-[#00C6A7]" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero flood-risk map background (dark, rainfall + live network)      */
/* ------------------------------------------------------------------ */
function HeroMap() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 70]);
  const yFast = useTransform(scrollY, [0, 600], [0, 130]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* glow wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_18%,#14325C_0%,#0B1F3A_58%)]" />

      {/* parallax map */}
      <motion.svg
        style={{ y }}
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#FFFFFF" strokeOpacity="0.045" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#00C6A7" stopOpacity="0" />
            <stop offset="50%" stopColor="#00C6A7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00C6A7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />

        {/* water body */}
        <path
          d="M-20 520 C 220 470, 380 600, 600 540 S 980 460, 1240 520"
          fill="none"
          stroke="#00C6A7"
          strokeOpacity="0.10"
          strokeWidth="64"
          strokeLinecap="round"
        />
        <path
          d="M-20 520 C 220 470, 380 600, 600 540 S 980 460, 1240 520"
          fill="none"
          stroke="#00C6A7"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />

        {/* flood contours */}
        {[
          { rx: 36, ry: 22, o: 0.22 },
          { rx: 66, ry: 42, o: 0.12 },
          { rx: 98, ry: 64, o: 0.06 },
        ].map((c, i) => (
          <ellipse
            key={i}
            cx="760"
            cy="420"
            rx={c.rx}
            ry={c.ry}
            fill="none"
            stroke="#00C6A7"
            strokeOpacity={c.o}
            strokeWidth="1"
          />
        ))}

        {/* route lines */}
        {[
          "M120 660 L 360 540 L 540 580 L 760 420 L 1020 360",
          "M80 200 L 280 280 L 460 240 L 700 320 L 980 260",
          "M180 740 L 420 700 L 620 660 L 880 700",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, delay: 0.3 + i * 0.3, ease: "easeOut" }}
          />
        ))}

        {/* pulsing network nodes */}
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
              fill="#00C6A7"
              fillOpacity="0.22"
              animate={{ r: [6, 24, 6], fillOpacity: [0.26, 0, 0.26] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
            <circle cx={cx} cy={cy} r="2.4" fill="#00C6A7" />
          </g>
        ))}
      </motion.svg>

      {/* rainfall */}
      <motion.svg
        style={{ y: yFast }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 52 }).map((_, i) => {
          const x = (i * 113) % 1200;
          const delay = (i % 10) * 0.22;
          const len = 14 + ((i * 7) % 18);
          const teal = i % 7 === 0;
          return (
            <motion.line
              key={i}
              x1={x}
              y1={-20}
              x2={x - 7}
              y2={-20 + len}
              stroke={teal ? "#00C6A7" : "#FFFFFF"}
              strokeOpacity={teal ? 0.22 : 0.10}
              strokeWidth="0.9"
              strokeLinecap="round"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: [0, 0.6, 0], y: [0, 820] }}
              transition={{ duration: 3 + (i % 5) * 0.4, repeat: Infinity, delay, ease: "linear" }}
            />
          );
        })}
      </motion.svg>

      {/* edge fades */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#0B1F3A]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone app preview (live component preview of the mobile app)        */
/* ------------------------------------------------------------------ */
function PhonePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]" aria-hidden="true">
      <div className="absolute -inset-4 rounded-full bg-[#00C6A7]/10 blur-3xl" />
      <div className="relative rounded-[2.4rem] border border-white/10 bg-[#081526] p-2.5 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.65)]">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#0B1F3A]">
          {/* status row */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <span className="font-mono text-[10px] text-[#7E93AB]">9:41</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00C6A7]/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#00C6A7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C6A7] animate-pulse" />
              Live
            </span>
          </div>

          {/* alert banner */}
          <div className="mx-4 mt-1 rounded-xl border border-[#C43E3E]/35 bg-[#C43E3E]/15 px-3.5 py-2.5">
            <p className="text-[12px] font-semibold text-[#FFB4B4]">Flood alert · Ward 14</p>
            <p className="mt-0.5 text-[11px] leading-snug text-[#C9D6E6]">
              Water rising near Gandhi Nagar bridge. Avoid underpasses.
            </p>
          </div>

          {/* map */}
          <div className="relative mx-4 mt-3 h-[216px] overflow-hidden rounded-xl border border-white/10">
            <svg viewBox="0 0 280 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              <rect width="280" height="220" fill="#0E2440" />
              {/* streets */}
              {["M40 0 L40 220", "M105 0 L105 220", "M170 0 L170 220", "M235 0 L235 220", "M0 45 L280 45", "M0 105 L280 105", "M0 165 L280 165"].map(
                (d) => (
                  <path key={d} d={d} stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="5" fill="none" />
                )
              )}
              {/* flood zone */}
              <path
                d="M55 60 C 110 40, 175 85, 205 125 C 160 175, 85 160, 45 125 Z"
                fill="#00C6A7"
                fillOpacity="0.14"
                stroke="#00C6A7"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              {/* sensor nodes */}
              {[
                [95, 70],
                [160, 120],
                [70, 140],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#00C6A7"
                    fillOpacity="0.25"
                    animate={{ r: [4, 14, 4], fillOpacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
                  />
                  <circle cx={cx} cy={cy} r="1.8" fill="#00C6A7" />
                </g>
              ))}
              {/* safe route */}
              <motion.path
                d="M35 195 C 85 175, 125 150, 195 112 L 255 88"
                fill="none"
                stroke="#00C6A7"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
              />
              {/* user */}
              <circle cx="35" cy="195" r="10" fill="none" stroke="#00C6A7" strokeOpacity="0.55" strokeWidth="1.5" />
              <circle cx="35" cy="195" r="5" fill="#FFFFFF" />
              {/* destination */}
              <circle cx="255" cy="88" r="4.5" fill="#00C6A7" />
            </svg>
            {/* reports chip */}
            <div className="absolute left-2 top-2 rounded-full bg-[#081526]/85 px-2.5 py-1 font-mono text-[10px] font-medium text-[#C9D6E6] backdrop-blur">
              +3 reports
            </div>
          </div>

          {/* route card */}
          <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <Navigation className="h-3.5 w-3.5 text-[#00C6A7]" strokeWidth={2.2} />
              <span className="text-[12px] font-medium text-white">Safe route</span>
            </div>
            <span className="font-mono text-[11px] text-[#00C6A7]">8 min</span>
          </div>

          {/* actions */}
          <div className="flex gap-2 px-4 py-4">
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#00C6A7] py-2.5 text-[12px] font-semibold text-[#06322B]">
              <Map className="h-3.5 w-3.5" strokeWidth={2.2} />
              Report flooding
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/20 py-2.5 text-[12px] font-semibold text-white">
              Emergency SOS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Partner form (pilot request)                                        */
/* ------------------------------------------------------------------ */
function PartnerForm() {
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgMessage, setOrgMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GFORM_URL =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeLqMiCvHHlG_aZeyKa1ydxvxT7OO3EdE4mW3vJjPR6BiBZ0A/formResponse";
    const body = new FormData();
    body.append("entry.1110557232", orgName);
    body.append("entry.666769330", orgEmail);
    body.append("entry.963832188", orgMessage);

    try {
      await fetch(GFORM_URL, { method: "POST", mode: "no-cors", body });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-8 text-center">
        <Check className="h-10 w-10 text-[#00C6A7] mx-auto mb-4" />
        <h3 className="text-xl text-white mb-2">Request received</h3>
        <p className="text-[#9FB3C8] text-sm">
          We'll be in touch shortly to discuss pilot opportunities in your region.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="org-name" className="text-xs uppercase tracking-widest text-[#9FB3C8]">
          Organization
        </Label>
        <Input
          id="org-name"
          required
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="City of..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-[#00C6A7]"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="org-email" className="text-xs uppercase tracking-widest text-[#9FB3C8]">
          Contact email
        </Label>
        <Input
          id="org-email"
          required
          type="email"
          value={orgEmail}
          onChange={(e) => setOrgEmail(e.target.value)}
          placeholder="contact@org.gov"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-[#00C6A7]"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="org-message" className="text-xs uppercase tracking-widest text-[#9FB3C8]">
          Deployment interest
        </Label>
        <Textarea
          id="org-message"
          required
          value={orgMessage}
          onChange={(e) => setOrgMessage(e.target.value)}
          placeholder="Tell us about your region's flood challenges..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-[#00C6A7] min-h-[100px]"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#00C6A7] text-[#06322B] hover:bg-white transition-colors mt-2 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Fund form (investment interest)                                     */
/* ------------------------------------------------------------------ */
function FundForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GFORM_URL =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdV0ociXtA6QR3tquFIpROc9iKr8vuVk40SwkjB9z47-4cFCg/formResponse";
    const body = new FormData();
    body.append("entry.236619283", name);
    body.append("entry.1907360191", email);
    body.append("entry.1132827542", amount);

    try {
      await fetch(GFORM_URL, { method: "POST", mode: "no-cors", body });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-8 text-center">
        <Check className="h-10 w-10 text-[#00C6A7] mx-auto mb-4" />
        <h3 className="text-xl text-white mb-2">Request received</h3>
        <p className="text-[#9FB3C8] text-sm">
          We'll be in touch shortly to discuss pilot opportunities.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="invest-name" className="text-xs uppercase tracking-widest text-[#9FB3C8]">
          Name / entity
        </Label>
        <Input
          id="invest-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name or firm"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-[#00C6A7]"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="invest-email" className="text-xs uppercase tracking-widest text-[#9FB3C8]">
          Email address
        </Label>
        <Input
          id="invest-email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@org.org"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-[#00C6A7]"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="invest-amount" className="text-xs uppercase tracking-widest text-[#9FB3C8]">
          Interest / allocation
        </Label>
        <Input
          id="invest-amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Pilot funding, series, or strategic partnership"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-[#00C6A7]"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#00C6A7] text-[#06322B] hover:bg-white transition-colors mt-2 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Initiate conversation"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans overflow-x-clip">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-[#0B1F3A]/90 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-[18px] font-bold tracking-tight text-white">HydroMesh</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-[#A9BCD4]">
            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#pilot" className="hover:text-white transition-colors">Pilot</a>
            <a href="#who" className="hover:text-white transition-colors">Who it's for</a>
          </nav>
          <a
            href="#engage"
            className="group inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-medium bg-[#00C6A7] text-[#06322B] px-3 sm:px-4 py-2 sm:py-2.5 rounded-md hover:bg-white transition-colors whitespace-nowrap"
          >
            Request a Pilot
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* 1. HERO */}
      <section id="top" className="relative min-h-screen supports-[height:100dvh]:min-h-[100dvh] pt-16 flex items-center bg-[#0B1F3A]">
        <HeroMap />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 w-full">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.16em] text-[#00C6A7]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C6A7] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C6A7]" />
                </span>
                Community flood intelligence
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-8 text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.04] tracking-[-0.03em] text-white font-bold">
                <span className="text-[#00C6A7]">Street-level</span> flood intelligence
                <br />
                for cities and communities.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-[#A9BCD4]">
                HydroMesh turns community reports into live risk maps and safe routes in under 90
                seconds, helping agencies respond faster and residents reach safety before the
                water rises.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#engage"
                  className="group inline-flex items-center gap-2 bg-[#00C6A7] text-[#06322B] px-6 py-3.5 rounded-md text-[15px] font-semibold hover:bg-white transition-colors"
                >
                  Request a Pilot
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#how"
                  className="group inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3.5 rounded-md text-[15px] font-medium hover:bg-white/10 transition-colors"
                >
                  See How It Works
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* hero stats (static, sourced) */}
          <Reveal delay={0.3} className="mt-14 lg:mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
              {[
                { stat: "47%", label: "of weather-related disasters are floods", src: "UNDRR" },
                { stat: "8×", label: "higher disaster mortality without early warning", src: "WMO" },
                { stat: "1/2", label: "of countries lack early warning systems", src: "UN" },
                { stat: "90s", label: "from report to safe route", src: "HydroMesh" },
              ].map((s) => (
                <div key={s.label} className="bg-[#0E2440]/80 backdrop-blur-sm px-4 sm:px-5 py-6">
                  <div className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] leading-none tracking-[-0.02em] text-[#00C6A7] font-bold">
                    {s.stat}
                  </div>
                  <div className="mt-3 text-[13px] leading-snug text-[#C7D5E6]">{s.label}</div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7E93AB]">
                    {s.src}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. TRUST */}
      <section className="relative bg-[#0B1F3A] border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E93AB]">
              A project of
            </span>
            <span className="inline-flex items-center gap-2 text-[14px] font-medium text-[#E6EDF5]">
              <Landmark className="h-4 w-4 text-[#00C6A7]" strokeWidth={1.8} />
              University of Birmingham Dubai
            </span>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <span className="inline-flex items-center gap-2 text-[14px] text-[#C7D5E6]">
              <Award className="h-4 w-4 text-[#7E93AB]" strokeWidth={1.8} />
              FII/MIT Finalist
            </span>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <span className="inline-flex items-center gap-2 text-[14px] text-[#C7D5E6]">
              <GraduationCap className="h-4 w-4 text-[#7E93AB]" strokeWidth={1.8} />
              MCN/UN Fellowship
            </span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <section id="problem" className="relative bg-white scroll-mt-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-[#0B1F3A] font-bold">
                Floods are the most common disaster on Earth. Early warning is still a privilege.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.6] text-[#5B6B7C] max-w-2xl">
                Communities and responders still lack real-time, street-level information. Alerts
                are broad, delayed, and hard to act on, leaving people exposed when it matters most.
              </p>
            </Reveal>
          </div>

          {/* 3 sourced fact cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "47%",
                title: "of weather-related disasters are floods",
                body: "Floods affected 2.3 billion people between 1995 and 2015, more than any other hazard.",
                src: "UNDRR / CRED",
              },
              {
                stat: "8×",
                title: "higher mortality without early warning",
                body: "Countries with limited early warning coverage suffer eight times the disaster deaths of covered countries.",
                src: "WMO / UNDRR",
              },
              {
                stat: "1/2",
                title: "of countries lack early warning",
                body: "Half of the world's countries still have no adequate multi-hazard early warning systems.",
                src: "UN Early Warnings for All",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="h-full rounded-xl border border-[#0B1F3A]/10 bg-white p-7 sm:p-8 transition-colors hover:border-[#00C6A7]/60">
                  <div className="h-[3px] w-12 rounded-full bg-[#00C6A7]" />
                  <div className="mt-6 font-display text-[clamp(2.4rem,4vw,3.2rem)] leading-none tracking-[-0.03em] text-[#0B1F3A] font-bold">
                    {c.stat}
                  </div>
                  <h3 className="mt-5 text-[18px] leading-snug font-semibold text-[#0B1F3A]">{c.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#5B6B7C]">{c.body}</p>
                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9FB3C8]">
                    {c.src}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-14 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.2] tracking-[-0.015em] text-[#0B1F3A] font-semibold max-w-3xl">
              The data exists. The infrastructure does not.{" "}
              <span className="text-[#007A66]">HydroMesh bridges that gap.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section id="solution" className="relative border-y border-[#0B1F3A]/8 scroll-mt-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="col-span-12 lg:col-span-6">
              <Reveal>
                <h2 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-[#0B1F3A] font-bold">
                  Live risk maps and safe routes, in under 90 seconds.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-[17px] leading-[1.6] text-[#5B6B7C] max-w-lg">
                  HydroMesh pairs community reports with AI validation and live routing, so the
                  people closest to the flood are the first to know.
                </p>
              </Reveal>

              {/* before / after */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Reveal delay={0.1}>
                  <div className="h-full rounded-xl border border-[#0B1F3A]/10 bg-white/70 p-6">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8A6A6A]">
                      <X className="h-3.5 w-3.5" strokeWidth={2.6} />
                      Before
                    </div>
                    <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#7A8899]">
                      <li>Broad alerts that reach everyone late</li>
                      <li>No street-level picture of where water is</li>
                      <li>Fragmented response across agencies</li>
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.16}>
                  <div className="h-full rounded-xl bg-[#0B1F3A] p-6 shadow-[0_20px_50px_-20px_rgba(11,31,58,0.5)]">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#00C6A7]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                      After
                    </div>
                    <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#E6EDF5]">
                      <li>Real-time reports from people on the ground</li>
                      <li>AI-validated, street-level risk maps</li>
                      <li>Safe routing in under 90 seconds</li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Reveal delay={0.12}>
                <PhonePreview />
                <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#9FB3C8]">
                  Live risk map · safe routing · community reports
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (incl. outcome strip) */}
      <section id="how" className="relative bg-white scroll-mt-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-[#0B1F3A] font-bold">
                From signal to safe route in 90 seconds.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.6] text-[#5B6B7C] max-w-2xl">
                A three-stage pipeline turns a phone report into a verified, routed alert. Each
                stage has a clock on it.
              </p>
            </Reveal>
          </div>

          {/* timeline rail */}
          <Reveal delay={0.12} className="mt-14">
            <div className="relative hidden md:block mb-12 h-8">
              <div className="absolute inset-x-0 top-[14px] h-px bg-[#0B1F3A]/10" />
              <div className="absolute top-[13px] left-0 w-[33.333%] h-[3px] rounded-full bg-[#00C6A7]" />
              <div className="absolute top-[13px] left-[33.333%] w-[33.333%] h-[3px] rounded-full bg-[#00C6A7]/60" />
              <div className="absolute top-[13px] left-[66.666%] w-[33.333%] h-[3px] rounded-full bg-[#00C6A7]/30" />
              {["left-0", "left-1/3", "left-2/3"].map((pos) => (
                <div key={pos} className={`absolute ${pos} top-[9px] h-[10px] w-px bg-[#0B1F3A]/25`} />
              ))}
              <div className="absolute right-0 top-[9px] h-[10px] w-px bg-[#0B1F3A]/25" />
              <span className="absolute left-0 top-0 font-mono text-[11px] text-[#5B6B7C]">0s</span>
              <span className="absolute left-1/3 -translate-x-1/2 top-0 font-mono text-[11px] text-[#5B6B7C]">30s</span>
              <span className="absolute left-2/3 -translate-x-1/2 top-0 font-mono text-[11px] text-[#5B6B7C]">60s</span>
              <span className="absolute right-0 top-0 font-mono text-[11px] text-[#5B6B7C]">90s</span>
            </div>
          </Reveal>

          {/* stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                icon: Radio,
                name: "Signal Intake",
                time: "0-30 sec",
                body: "A resident submits a report with location, photos, and water depth. It reaches the mesh in seconds.",
              },
              {
                icon: Layers,
                name: "Risk Fusion",
                time: "30-60 sec",
                body: "The engine validates the report against weather, terrain, and sensor data, then maps the hazard zone.",
              },
              {
                icon: Route,
                name: "Action Layer",
                time: "60-90 sec",
                body: "Safe routes, alerts, and dispatch requests reach residents and responders.",
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.name} delay={0.1 + i * 0.12}>
                  <div>
                    <div className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-[#0B1F3A]/10 bg-[#F4F6F8]">
                      <Icon className="h-6 w-6 text-[#007A66]" strokeWidth={1.6} />
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#00C6A7]/12 px-2.5 py-1 font-mono text-[11px] font-medium text-[#007A66]">
                      <Clock className="h-3 w-3" strokeWidth={2.2} />
                      {s.time}
                    </div>
                    <h3 className="mt-4 text-[22px] font-bold tracking-[-0.01em] text-[#0B1F3A]">
                      {s.name}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[#5B6B7C] max-w-sm">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* outcome strip (theory of change, compressed) */}
          <Reveal delay={0.1} className="mt-16">
            <div className="rounded-xl bg-[#0B1F3A] px-6 sm:px-10 py-8 lg:py-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-6 md:gap-x-6 lg:gap-x-8">
                <div className="flex items-center gap-3.5">
                  <Waves className="h-5 w-5 shrink-0 text-[#00C6A7]" strokeWidth={1.7} />
                  <div>
                    <p className="text-[15px] font-semibold text-white">Community signals in</p>
                    <p className="text-[13px] text-[#A9BCD4]">Reports, weather, map layers</p>
                  </div>
                </div>
                <ArrowRight className="hidden md:block h-4 w-4 shrink-0 text-[#00C6A7]/70" strokeWidth={2} />
                <div className="flex items-center gap-3.5">
                  <Map className="h-5 w-5 shrink-0 text-[#00C6A7]" strokeWidth={1.7} />
                  <div>
                    <p className="text-[15px] font-semibold text-white">Verified maps out</p>
                    <p className="text-[13px] text-[#A9BCD4]">Live risk zones, safe routes, alerts</p>
                  </div>
                </div>
                <ArrowRight className="hidden md:block h-4 w-4 shrink-0 text-[#00C6A7]/70" strokeWidth={2} />
                <div className="flex items-center gap-3.5">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#00C6A7]" strokeWidth={1.7} />
                  <div>
                    <p className="text-[15px] font-semibold text-white">Safer cities</p>
                    <p className="text-[13px] text-[#A9BCD4]">Faster response, reduced exposure</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. PILOT READINESS */}
      <section id="pilot" className="relative border-y border-[#0B1F3A]/8 scroll-mt-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-[#0B1F3A] font-bold">
                Ready to deploy in your city.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.6] text-[#5B6B7C] max-w-2xl">
                Here is exactly what works today, and what is still running on simulated data. No
                inflation, no roadmap dressed up as a product.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* working today */}
            <Reveal delay={0.05}>
              <div className="h-full rounded-xl border border-[#00C6A7]/40 bg-white p-7 sm:p-8">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#007A66]">
                  <span className="h-2 w-2 rounded-full bg-[#00C6A7]" />
                  Working today
                </div>
                <ul className="mt-6 space-y-4">
                  {[
                    ["Flutter mobile app", "Live flood map, community reporting, SOS"],
                    ["Node.js backend + PostGIS", "Spatial clustering and hazard zone queries"],
                    ["Safe-route guidance", "Walking routes steered around active hazards"],
                    ["Real-time alerts", "WebSocket push to residents and responders"],
                    ["Responder dashboard", "Live incidents with accept/resolve workflow"],
                    ["Weather intelligence", "Hyper-local rainfall and risk scoring (Open-Meteo)"],
                    ["Accessibility layer", "TTS, high contrast mode, haptic alerts"],
                    ["Open-source core", "MIT licence, auditable by any partner"],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00C6A7]">
                        <Check className="h-3 w-3 text-[#06322B]" strokeWidth={3} />
                      </span>
                      <div>
                        <span className="text-[15px] font-semibold text-[#0B1F3A]">{t}</span>
                        <span className="block text-[13.5px] leading-snug text-[#5B6B7C]">{d}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* demo only */}
            <Reveal delay={0.12}>
              <div className="h-full rounded-xl border border-[#0B1F3A]/10 bg-[#F4F6F8] p-7 sm:p-8">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#5B6B7C]">
                  <span className="h-2 w-2 rounded-full border border-[#5B6B7C]" />
                  Demo or simulated today
                </div>
                <ul className="mt-6 space-y-4">
                  {[
                    ["Sensor telemetry", "Runs on simulated feeds, not physical sensors"],
                    ["City-scale validation", "Workflows tested in simulated scenarios, not a live city"],
                    ["City onboarding", "Manual setup: map layers and data feeds configured per deployment"],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5B6B7C]/50">
                        <Clock className="h-3 w-3 text-[#5B6B7C]" strokeWidth={2.4} />
                      </span>
                      <div>
                        <span className="text-[15px] font-semibold text-[#0B1F3A]">{t}</span>
                        <span className="block text-[13.5px] leading-snug text-[#5B6B7C]">{d}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl bg-[#0B1F3A] p-6 sm:p-7">
                  <h3 className="text-[17px] font-bold text-white">What a pilot looks like</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#A9BCD4]">
                    An 8-week deployment: we onboard your map layers and data feeds, stand up
                    community reporting with your teams, and track KPIs on warning speed, route
                    adoption, and response time together.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Weeks 1-2 · Onboarding", "Weeks 3-6 · Live deployment", "Weeks 7-8 · KPI review"].map(
                      (p) => (
                        <span
                          key={p}
                          className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-[#C7D5E6]"
                        >
                          {p}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. WHO IT'S FOR */}
      <section id="who" className="relative bg-white scroll-mt-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-[#0B1F3A] font-bold">
                Built for cities, organizations, and the people they protect.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Building2,
                t: "Municipal agencies",
                l1: "Live street-level risk picture.",
                l2: "Coordinate response with one shared flood front.",
              },
              {
                icon: HeartHandshake,
                t: "NGOs & community organizations",
                l1: "Tools to warn, organize, and support.",
                l2: "Reach the neighborhoods most exposed.",
              },
              {
                icon: GraduationCap,
                t: "Universities & researchers",
                l1: "An open platform for resilience research.",
                l2: "Study real deployments, publish the results.",
              },
              {
                icon: Users,
                t: "Residents & commuters",
                l1: "The people the platform protects.",
                l2: "Safe routes and alerts that arrive in time.",
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.t} delay={i * 0.08}>
                  <div className="h-full rounded-xl border border-[#0B1F3A]/10 bg-white p-7 transition-colors hover:border-[#00C6A7]/60">
                    <Icon className="h-6 w-6 text-[#007A66]" strokeWidth={1.6} />
                    <h3 className="mt-6 text-[18px] font-bold tracking-[-0.01em] text-[#0B1F3A]">
                      {s.t}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[#5B6B7C]">{s.l1}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#5B6B7C]">{s.l2}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.12}>
            <p className="mt-14 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.25] tracking-[-0.015em] text-[#0B1F3A] font-semibold max-w-3xl">
              HydroMesh is not a product for sale. It is a public-interest platform built for the
              people most exposed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section id="engage" className="relative bg-[#0B1F3A] text-white overflow-hidden scroll-mt-16">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_125%,rgba(0,198,167,0.22),transparent_62%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06] tracking-[-0.025em] font-bold">
              Urban flooding is getting worse. The tools to respond haven't kept up.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-xl text-[18px] leading-[1.6] text-[#A9BCD4]">
              We're looking for one city to start with.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#00C6A7] text-[#06322B] px-6 sm:px-8 py-4 rounded-md text-[16px] font-bold hover:bg-white transition-colors cursor-pointer">
                    Request a Pilot Conversation
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#0B1F3A] border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Partner with HydroMesh</DialogTitle>
                    <DialogDescription className="text-[#9FB3C8]">
                      Help us deploy street-level flood intelligence to your community.
                    </DialogDescription>
                  </DialogHeader>
                  <PartnerForm />
                </DialogContent>
              </Dialog>
              <p className="font-mono text-[12px] text-[#7E93AB]">
                No commitment. 30-minute intro call. We'll bring the data.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#081526] border-t border-white/10 text-[#9FB3C8]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-6">
              <a href="#top" className="flex items-center gap-2.5">
                <LogoMark />
                <span className="font-display text-[18px] font-bold tracking-tight text-white">
                  HydroMesh
                </span>
              </a>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed">
                A climate-resilience initiative building community-driven flood intelligence for
                safer cities. A project of the University of Birmingham Dubai.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00C6A7]/40 bg-[#00C6A7]/10 px-3.5 py-1.5 text-[13px] font-medium text-[#00C6A7]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C6A7] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C6A7]" />
                </span>
                Seeking pilot partners
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white">Project</h4>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <a
                    href="https://github.com/theSaksham02/Hydromesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub repository
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:0x142857@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    0x142857@gmail.com
                  </a>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:text-white transition-colors cursor-pointer">
                        Invest in the pilot
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#0B1F3A] border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Invest in resilience</DialogTitle>
                        <DialogDescription className="text-[#9FB3C8]">
                          Join us in building a self-healing, community-driven safety network.
                        </DialogDescription>
                      </DialogHeader>
                      <FundForm />
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white">Programme</h4>
              <ul className="mt-4 space-y-3 text-[15px]">
                <li>
                  <a href="#pilot" className="hover:text-white transition-colors">
                    Pilot readiness
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-white transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#who" className="hover:text-white transition-colors">
                    Who it's for
                  </a>
                </li>
              </ul>
              <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white">Privacy</h4>
              <p className="mt-3 text-[13.5px] leading-relaxed max-w-xs">
                HydroMesh collects the minimum data needed to route alerts. Community reports are
                anonymized and handled under GDPR-aligned data minimization.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
              © {new Date().getFullYear()} HydroMesh · University of Birmingham Dubai
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Open-source core · MIT licence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
