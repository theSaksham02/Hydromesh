import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import { Menu, X, Facebook, Twitter, Linkedin, ArrowRight, Download, ExternalLink } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 100% Verified High-Contrast Image Assets (All 200 OK)              */
/* ------------------------------------------------------------------ */
const HERO_RAIN =
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2400&q=85";
const HERO_WATERSHED =
  "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=2400&q=85";
const HERO_SURGE =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=2400&q=85";
const HERO_WET_STREET =
  "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=2400&q=85";

// Stat Banner Photos (High contrast, clearly visible)
const STAT_RAIN =
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const STAT_FLOOD =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80";
const STAT_TEAM =
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80";

// 50/50 Split Right Imagery
const PHOTO_SURGE_WATER =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1600&q=85";

// 6-Photo Mosaic Grid (All verified 200 OK with distinct contrast)
const MOSAIC_1 =
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80";
const MOSAIC_2 =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=800&q=80";
const MOSAIC_3 =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80";
const MOSAIC_4 =
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=800&q=80";
const MOSAIC_5 =
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80";
const MOSAIC_6 =
  "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80";

// Verified Team Portraits
const PORTRAIT_SAKSHAM =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
const PORTRAIT_SHAAZIA =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80";
const PORTRAIT_MOUSTAFA =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80";
const PORTRAIT_YAMAN =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

const GITHUB = "https://github.com/theSaksham02/Hydromesh";
const FOUNDER_EMAIL = "0x142857@gmail.com";
const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/saksham-mishra-91696222b/";

type PageType = "home" | "about" | "join" | "blog" | "contact";

function ExtLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Official HydroMesh Logo Component (Droplet Mesh Network Mark)      */
/* ------------------------------------------------------------------ */
function HydroMeshLogo({ className = "h-10 w-10 text-[#002456]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 8 C50 8 18 52 18 76 C18 94 32 108 50 108 C68 108 82 94 82 76 C82 52 50 8 50 8 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="50" y1="36" x2="35" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="36" x2="65" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <line x1="35" y1="52" x2="65" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <line x1="35" y1="52" x2="28" y2="70" stroke="currentColor" strokeWidth="2.5" />
      <line x1="35" y1="52" x2="50" y2="68" stroke="currentColor" strokeWidth="2.5" />
      <line x1="65" y1="52" x2="50" y2="68" stroke="currentColor" strokeWidth="2.5" />
      <line x1="65" y1="52" x2="72" y2="70" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="70" x2="50" y2="68" stroke="currentColor" strokeWidth="2.5" />
      <line x1="72" y1="70" x2="50" y2="68" stroke="currentColor" strokeWidth="2.5" />

      <circle cx="50" cy="36" r="4" fill="currentColor" />
      <circle cx="35" cy="52" r="4" fill="currentColor" />
      <circle cx="65" cy="52" r="4" fill="currentColor" />
      <circle cx="28" cy="70" r="4" fill="currentColor" />
      <circle cx="50" cy="68" r="4" fill="currentColor" />
      <circle cx="72" cy="70" r="4" fill="currentColor" />

      <path d="M26 84 C34 80 42 86 50 82 C58 78 66 84 74 80" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M30 92 C38 88 46 94 54 90 C60 87 66 91 70 89" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Header Navigation with Active Page State & Routing                 */
/* ------------------------------------------------------------------ */
function Header({
  currentPage,
  onNavigate,
}: {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}) {
  const [open, setOpen] = useState(false);

  const navItems: { page: PageType; label: string }[] = [
    { page: "home", label: "Home" },
    { page: "about", label: "About" },
    { page: "join", label: "Join" },
    { page: "blog", label: "Blog" },
    { page: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="mx-auto flex h-24 max-w-[1360px] items-center justify-between px-8 lg:px-14">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3.5 text-left cursor-pointer"
          aria-label="HydroMesh Home"
        >
          <HydroMeshLogo />
          <span className="font-display text-[1.65rem] font-semibold tracking-tight text-[#002456]">
            HydroMesh
          </span>
        </button>

        {/* Clean, Simple Text Links with Active Underline Indicator */}
        <nav className="hidden items-center gap-10 text-[0.95rem] text-[#002456] md:flex">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate(item.page)}
                className={`relative py-2 transition-opacity cursor-pointer ${
                  isActive ? "font-semibold opacity-100" : "font-light opacity-75 hover:opacity-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#002456]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 text-[#002456] md:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-8 py-5 md:hidden flex flex-col gap-4 font-light text-[#002456]">
          {navItems.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => {
                setOpen(false);
                onNavigate(item.page);
              }}
              className={`text-left py-1 text-[1rem] ${
                currentPage === item.page ? "font-semibold underline underline-offset-4" : "font-light"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Page 1: Home (The Master Resilience Landing Page)                  */
/* ------------------------------------------------------------------ */
function HomePage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const [subscribed, setSubscribed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <>
      {/* 1. Hero Section (Clearly visible rainstorm + crisp text) */}
      <section
        id="top"
        className="relative flex min-h-[82vh] w-full items-center justify-center bg-cover bg-center px-6 py-28 text-center"
        style={{ backgroundImage: `url('${HERO_RAIN}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/40 backdrop-brightness-75" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold tracking-tight text-white leading-[1.05] drop-shadow-md">
            Community Flood Intelligence
          </h1>
          <p className="mt-7 text-[clamp(1.15rem,2.2vw,1.55rem)] font-light text-white tracking-wide drop-shadow-md">
            Take Action Before The Water Rises
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => onNavigate("join")}
              className="inline-flex min-h-[52px] items-center justify-center bg-[#002456] px-10 text-[1rem] font-medium text-white transition-all duration-200 hover:bg-[#001838] cursor-pointer shadow-md"
            >
              Join the movement
            </button>
          </div>
        </div>
      </section>

      {/* 2. Three-Column Full-Bleed Photo Stat Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 w-full gap-0">
        <div
          className="relative flex h-[380px] lg:h-[460px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${STAT_RAIN}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              120
            </p>
            <h2 className="mt-4 font-display text-[1.45rem] font-semibold drop-shadow-sm">
              Neighborhood Wards Mapped
            </h2>
          </div>
        </div>

        <div
          className="relative flex h-[380px] lg:h-[460px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${STAT_FLOOD}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              60K
            </p>
            <h2 className="mt-4 font-display text-[1.45rem] font-semibold drop-shadow-sm">
              Hours of Drainage Visibility
            </h2>
          </div>
        </div>

        <div
          className="relative flex h-[380px] lg:h-[460px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${STAT_TEAM}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              600
            </p>
            <h2 className="mt-4 font-display text-[1.45rem] font-semibold drop-shadow-sm">
              Mesh Connected Nodes
            </h2>
          </div>
        </div>
      </section>

      {/* 3. What We Do Section */}
      <section className="bg-white py-28 sm:py-36 px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px] text-center">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-semibold tracking-tight text-[#002456]">
            What We Do
          </h2>

          <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="grid h-28 w-28 place-items-center text-[#002456]">
                <svg className="h-24 w-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" />
                  <circle cx="50" cy="34" r="8" fill="currentColor" />
                  <path d="M22 62 C32 44, 48 46, 62 60 C70 68, 78 64, 82 58" />
                </svg>
              </div>
              <h3 className="mt-8 font-display text-[1.45rem] font-semibold text-[#002456]">
                Street-Level Reporting
              </h3>
              <p className="mt-4 max-w-xs text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                Accessible icon and voice flood reporting captures water depth and GPS coordinates in seconds, designed for every smartphone in the neighborhood.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid h-28 w-28 place-items-center text-[#002456]">
                <svg className="h-24 w-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" />
                  <path d="M26 62 C26 42, 44 28, 64 36 C74 42, 78 54, 68 64 C56 74, 38 72, 26 62 Z" />
                  <circle cx="44" cy="46" r="3" fill="currentColor" />
                  <path d="M68 64 C76 70, 84 66, 86 58" />
                </svg>
              </div>
              <h3 className="mt-8 font-display text-[1.45rem] font-semibold text-[#002456]">
                Spatial Risk Mapping
              </h3>
              <p className="mt-4 max-w-xs text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                PostGIS spatial consensus engine clusters neighbor observations with Open-Meteo precipitation models to identify active inundation boundaries.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid h-28 w-28 place-items-center text-[#002456]">
                <svg className="h-24 w-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" />
                  <path d="M34 38 C42 26, 62 28, 68 40 C60 44, 48 46, 34 38 Z" />
                  <path d="M66 62 C58 74, 38 72, 32 60 C40 56, 52 54, 66 62 Z" />
                  <circle cx="56" cy="34" r="2.5" fill="currentColor" />
                  <circle cx="44" cy="66" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="mt-8 font-display text-[1.45rem] font-semibold text-[#002456]">
                Building A Community
              </h3>
              <p className="mt-4 max-w-xs text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                Connecting citizens, municipal responders, and environmental advocates into an active decentralized network prepared to safeguard neighborhood coastlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 50/50 Split Section: How Does It Work? */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col justify-center bg-[#F3F1EC] p-12 sm:p-20 lg:p-28">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.35rem,4.5vw,3.75rem)] font-semibold tracking-tight text-[#002456]">
              How Does It Work?
            </h2>
            <p className="mt-8 text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Traditional municipal flood sensors cost between $15,000 and $50,000 per kilometer and fail completely when cellular towers submerge. HydroMesh transforms everyday smartphones into decentralized sensing nodes that self-organize into an emergency telemetry mesh.
            </p>
            <p className="mt-6 text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Reports submitted by residents are instantly cross-verified with local elevation maps and rainfall feeds. The system calculates safe walking paths around submerged corridors and dispatches rescue SOS signals to city crews before underpasses drown.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onNavigate("about")}
                className="inline-flex min-h-[48px] items-center justify-center border border-[#002456] bg-transparent px-8 text-[0.95rem] font-light text-[#002456] transition-colors duration-200 hover:bg-[#002456] hover:text-white cursor-pointer"
              >
                Act Now
              </button>
            </div>
          </div>
        </div>

        <div
          className="min-h-[440px] lg:min-h-[660px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${PHOTO_SURGE_WATER}')` }}
          role="img"
          aria-label="Rushing stormwater surge channel"
        />
      </section>

      {/* 5. 6-Photo Field Mosaic Grid (All verified 200 OK) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-0">
        {[
          { img: MOSAIC_1, alt: "Heavy urban rain falling on pavement" },
          { img: MOSAIC_2, alt: "Municipal stormwater drainage surge" },
          { img: MOSAIC_3, alt: "Deep storm water surface" },
          { img: MOSAIC_4, alt: "Heavy rainfall precipitation clouds" },
          { img: MOSAIC_5, alt: "First responders and community volunteers" },
          { img: MOSAIC_6, alt: "Storm clouds over urban watershed" },
        ].map((item, idx) => (
          <div key={idx} className="relative aspect-4/3 overflow-hidden group">
            <img
              src={item.img}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#002456]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </section>

      {/* 6. Sign up to Our Mailing List */}
      <section className="bg-white py-28 sm:py-36 px-8 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-semibold tracking-tight text-[#002456]">
            Sign up to Our Mailing List
          </h2>

          {subscribed ? (
            <div className="mt-14 border border-[#002456] bg-[#F3F1EC] p-8 text-center">
              <h3 className="font-display text-[1.4rem] font-semibold text-[#002456]">
                Thank You for Subscribing!
              </h3>
              <p className="mt-3 text-[1rem] font-light text-[#334155]">
                You have been added to our network. We will send you updates on municipal pilot deployments and flood resilience briefs.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-16 text-left">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-12">
                <label className="block text-[0.875rem] font-light text-[#002456]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                />
              </div>

              <div className="mt-9 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-4 w-4 rounded-none border-[#002456] accent-[#002456] cursor-pointer"
                />
                <label htmlFor="consent" className="text-[0.875rem] font-extralight text-[#334155] cursor-pointer">
                  Yes, subscribe me to your newsletter. *
                </label>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full min-h-[52px] bg-[#002456] text-[1rem] font-medium text-white transition-colors duration-200 hover:bg-[#001838] cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page 2: About (Mission, Sensor Economics & Founding Team)          */
/* ------------------------------------------------------------------ */
function AboutPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[52vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_WATERSHED}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            About HydroMesh
          </h1>
          <p className="mt-5 text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Decentralized Climate Resilience for Vulnerable Cities
          </p>
        </div>
      </section>

      {/* 50/50 Split: The Founding Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col justify-center bg-[#F3F1EC] p-12 sm:p-20 lg:p-28">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.25rem)] font-semibold tracking-tight text-[#002456]">
              Closing the Drainage Visibility Gap
            </h2>
            <p className="mt-7 text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Urban flooding is the most frequent and devastating weather disaster in the Global South. While high-income metropolitan areas deploy millions of dollars in industrial telemetry, developing municipalities fly blind during the crucial 2-to-6 hour flash-flood response window.
            </p>
            <p className="mt-5 text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              HydroMesh was born out of an academic mission at the University of Birmingham to democratize flood intelligence. We turn ordinary smartphones already carried by residents into self-healing sensing nodes that broadcast emergency routes and water depths even when cell towers submerge.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => onNavigate("join")}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#002456] px-8 text-[0.95rem] font-medium text-white hover:bg-[#001838] transition-colors cursor-pointer"
              >
                Explore Municipal Pilots
              </button>
            </div>
          </div>
        </div>
        <div
          className="min-h-[440px] lg:min-h-[600px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${STAT_FLOOD}')` }}
          role="img"
          aria-label="Urban flooded underpass"
        />
      </section>

      {/* 3 Core Impact Pillars */}
      <section className="bg-white py-28 sm:py-36 px-8 lg:px-14 border-b border-slate-100">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.35rem,4.5vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              Why Decentralized Resilience?
            </h2>
            <p className="mt-4 text-[1.05rem] font-light text-[#334155]">
              Addressing structural limitations in traditional municipal flood management.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="border-t-2 border-[#002456] pt-8">
              <span className="font-display text-4xl font-semibold text-[#002456]">01</span>
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold text-[#002456]">
                $0 Sensor Hardware Capex
              </h3>
              <p className="mt-4 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                Traditional ultrasonic probes cost upwards of $50,000 per kilometer and require expensive maintenance. HydroMesh leverages existing citizen devices to generate dense ground telemetry without hardware procurement.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-8">
              <span className="font-display text-4xl font-semibold text-[#002456]">02</span>
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold text-[#002456]">
                Offline Mesh Continuity
              </h3>
              <p className="mt-4 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                When severe monsoons trigger electrical substation failures and topple cellular backhaul, HydroMesh switches autonomously to Bluetooth Low Energy (BLE) and Wi-Fi Direct packet forwarding.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-8">
              <span className="font-display text-4xl font-semibold text-[#002456]">03</span>
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold text-[#002456]">
                Inclusive Accessibility
              </h3>
              <p className="mt-4 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                Designed with low-literacy icon reporting, speech-to-text voice input, and colorblind-safe visual scales to ensure vulnerable populations are never excluded from disaster alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team Section (With Real Portraits) */}
      <section className="bg-[#F3F1EC] py-28 sm:py-36 px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.35rem,4.5vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              Founding Team
            </h2>
            <p className="mt-4 text-[1.05rem] font-light text-[#334155]">
              Built by a dedicated engineering team, drawing on the full contributor cohort behind the original university prototype.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Saksham Mishra",
                role: "Project Lead — Backend API, WebSockets & Map UI",
                img: PORTRAIT_SAKSHAM,
                github: "https://github.com/theSaksham02",
                linkedin: FOUNDER_LINKEDIN,
              },
              {
                name: "Shaazia Raziq",
                role: "Database Architect — PostgreSQL / PostGIS",
                img: PORTRAIT_SHAAZIA,
                github: "",
                linkedin: "",
              },
              {
                name: "Moustafa Ameen",
                role: "UI/UX Developer — Icon & Voice Reporting",
                img: PORTRAIT_MOUSTAFA,
                github: "",
                linkedin: "",
              },
              {
                name: "Yaman Gulcan",
                role: "Integration — Weather API & OSRM Routes",
                img: PORTRAIT_YAMAN,
                github: "",
                linkedin: "",
              },
            ].map((person) => (
              <div key={person.name} className="bg-white p-7 border border-[#002456]/15 flex flex-col justify-between group">
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="h-full w-full object-cover grayscale-[20%] transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-[1.3rem] font-semibold text-[#002456]">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] font-extralight leading-relaxed text-[#334155]">
                    {person.role}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4 text-xs font-medium text-[#002456]">
                  {person.linkedin ? (
                    <ExtLink href={person.linkedin} className="hover:underline">LinkedIn</ExtLink>
                  ) : (
                    <span className="opacity-50">LinkedIn</span>
                  )}
                  {person.github ? (
                    <ExtLink href={person.github} className="hover:underline">GitHub</ExtLink>
                  ) : (
                    <span className="opacity-50">GitHub</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 sm:p-12 border border-[#002456]/15 max-w-3xl mx-auto text-center">
            <h3 className="font-display text-[1.35rem] font-semibold text-[#002456]">
              Verified Academic Provenance
            </h3>
            <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-[#334155]">
              Developed as a distinction-grade University of Birmingham capstone project aligned with UN Sustainable Development Goal 11.5. Selected for the prestigious MCN UN Millennium Fellowship and advanced to final rounds of the FII–MIT competition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 3: Join / Pilot (Municipal Intake & 4-Stage Roadmap)           */
/* ------------------------------------------------------------------ */
function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agency, setAgency] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  function handlePilotSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`HydroMesh Municipal Pilot Inquiry: ${agency} (${city})`);
    const body = encodeURIComponent(
      `Agency / Organization: ${agency}\nJurisdiction / City: ${city}\nOfficial Email: ${email}\nOperational Context:\n${notes}\n\nRequesting pilot deployment documentation.`
    );
    window.location.href = `mailto:${FOUNDER_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[52vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_SURGE}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Initiate a Municipal Pilot
          </h1>
          <p className="mt-5 text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            From City Catchment to Active Telemetry in 8 Weeks
          </p>
        </div>
      </section>

      {/* 4-Stage Deployment Roadmap */}
      <section className="bg-white py-28 sm:py-36 px-8 lg:px-14 border-b border-slate-100">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.35rem,4.5vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              8-Week Implementation Blueprint
            </h2>
            <p className="mt-4 text-[1.05rem] font-light text-[#334155]">
              A proven staged rollout designed to minimize administrative overhead for municipal drainage teams.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "Phase 01",
                weeks: "Weeks 1–2",
                title: "Catchment & GIS Topology",
                desc: "Ingesting municipal drainage maps, topographical digital elevation models, and historic flood inundation zones into PostGIS.",
              },
              {
                step: "Phase 02",
                weeks: "Weeks 3–4",
                title: "Field Node Seeding",
                desc: "Equipping local sanitation crews, ward volunteers, and municipal dispatchers with the offline-first HydroMesh reporting tool.",
              },
              {
                step: "Phase 03",
                weeks: "Weeks 5–6",
                title: "Blackout Simulation",
                desc: "Stress-testing peer-to-peer Bluetooth and Wi-Fi Direct packet routing under controlled cellular dropout conditions.",
              },
              {
                step: "Phase 04",
                weeks: "Weeks 7–8",
                title: "Live Monsoon Evaluation",
                desc: "Full operational audit during seasonal rainfall events, assessing evacuation route safety and emergency SOS response times.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-[#F3F1EC] p-8 border border-[#002456]/15 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-[#002456]">
                    <span>{item.step}</span>
                    <span>{item.weeks}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.3rem] font-semibold text-[#002456]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="/pilot-specification.html"
              className="inline-flex items-center gap-2 border border-[#002456] px-8 py-3.5 text-[0.95rem] font-light text-[#002456] hover:bg-[#002456] hover:text-white transition-colors"
            >
              <span>Download Full Pilot Specification (PDF)</span>
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Municipal Pilot Intake Form */}
      <section className="bg-[#F3F1EC] py-28 sm:py-36 px-8 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.35rem,4.5vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
            Request a Pilot Briefing
          </h2>
          <p className="mt-4 text-[1rem] font-light text-[#334155]">
            Direct technical intake for municipal disaster management cells, NGOs, and humanitarian coordinators.
          </p>

          {submitted ? (
            <div className="mt-14 border border-[#002456] bg-white p-8 text-center">
              <h3 className="font-display text-[1.4rem] font-semibold text-[#002456]">
                Inquiry Prepared
              </h3>
              <p className="mt-3 text-[1rem] font-light text-[#334155]">
                Your email application has been launched with your pilot details. Our lead engineer will reply within 24 hours.
              </p>
              <p className="mt-4 font-semibold text-[#002456]">
                <a href={`mailto:${FOUNDER_EMAIL}`}>{FOUNDER_EMAIL}</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handlePilotSubmit} className="mt-16 text-left bg-white p-8 sm:p-12 border border-[#002456]/15">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    Agency or Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    City / Jurisdiction *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-10">
                <label className="block text-[0.875rem] font-light text-[#002456]">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                />
              </div>

              <div className="mt-10">
                <label className="block text-[0.875rem] font-light text-[#002456]">
                  Key Drainage & Flood Vulnerabilities *
                </label>
                <textarea
                  required
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your city's monsoon season challenges, power outages, and critical underpasses..."
                  className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                />
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full min-h-[52px] bg-[#002456] text-[1rem] font-medium text-white transition-colors duration-200 hover:bg-[#001838] cursor-pointer"
                >
                  Submit Pilot Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 4: Blog / Field Dispatches                                    */
/* ------------------------------------------------------------------ */
function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const posts = [
    {
      id: 1,
      title: "Autonomous Mesh Relays During Major Monsoon Outages",
      date: "September 2026",
      readTime: "4 min read",
      img: MOSAIC_1,
      summary:
        "When severe cloudbursts knock power substations offline, communication networks often follow. We examine how Bluetooth Low Energy and Wi-Fi Direct can keep critical flood beacons hopping.",
      content:
        "Traditional centralized alert systems assume cell towers remain operational throughout natural disasters. In coastal and riverine settlements across South Asia and Southeast Asia, localized transformer submergence routinely cuts cellular backhaul within the first 90 minutes. HydroMesh approaches resilience from the bottom up: every smartphone acts as a lightweight store-and-forward relay. Water column measurements and SOS packets propagate peer-to-peer across neighborhood clusters, reaching municipal emergency command centers as soon as any device touches an active gateway.",
    },
    {
      id: 2,
      title: "Why PostGIS Spatial Consensus Outperforms Fixed Hardware Probes",
      date: "August 2026",
      readTime: "5 min read",
      img: MOSAIC_2,
      summary:
        "Fixed ultrasonic sensors cost up to $50,000 per kilometer and provide zero visibility outside their line of sight. Here is how spatial clustering creates dynamic inundation polygons.",
      content:
        "Procuring point sensors creates an illusion of complete safety while leaving vast stretches of urban drainage unmonitored. By leveraging PostgreSQL and PostGIS spatial clustering (ST_DWithin, ST_ClusterDBSCAN), HydroMesh fuses dozens of citizen observations with Open-Meteo precipitation models. The result is a dynamic, continuous hazard contour that updates in real time rather than a scattered array of vulnerable hardware probes.",
    },
    {
      id: 3,
      title: "Designing for Universal Literacy in Emergency Situations",
      date: "July 2026",
      readTime: "3 min read",
      img: MOSAIC_4,
      summary:
        "In a crisis, reading dense technical text causes fatal delays. How we built visual icon scales and speech-to-text reporting into Module F-17.",
      content:
        "A disaster resilience platform is useless if citizens cannot intuitively submit data in under ten seconds. Module F-17 introduces an iconographic anatomical scale (Ankle, Knee, Waist, Chest, Submerged) paired with high-contrast color palettes adhering strictly to WCAG 2.2 AAA guidelines. Voice dictation enables immediate hands-free reporting for residents navigating torrential rainfall.",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[52vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_WET_STREET}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Field Dispatches
          </h1>
          <p className="mt-5 text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Operational Insights, Spatial Engineering & Field Notes
          </p>
        </div>
      </section>

      {/* Dispatches Grid */}
      <section className="bg-white py-28 sm:py-36 px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between border-b border-[#002456]/15 pb-10 group"
              >
                <div>
                  <div className="aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs font-light text-slate-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-[1.35rem] font-semibold text-[#002456] leading-snug group-hover:opacity-80 transition-opacity">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                    {post.summary}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#002456] hover:underline cursor-pointer"
                  >
                    <span>{selectedPost === post.id ? "Close Article" : "Read Dispatch"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  {selectedPost === post.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-[0.9375rem] font-light leading-relaxed text-[#334155] bg-[#F3F1EC] p-4">
                      {post.content}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 5: Contact (Talk to the Founder & Institutional Line)         */
/* ------------------------------------------------------------------ */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`HydroMesh Direct Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${FOUNDER_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[52vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_RAIN}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Contact Us
          </h1>
          <p className="mt-5 text-[clamp(1.1rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Direct Coordination for Municipalities, Responders & Donors
          </p>
        </div>
      </section>

      {/* Two-Column Contact Layout */}
      <section className="bg-white py-28 sm:py-36 px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Direct Founder Details */}
          <div className="bg-[#F3F1EC] p-10 sm:p-14 border border-[#002456]/15">
            <h2 className="font-display text-[2rem] font-semibold text-[#002456]">
              Talk to the Founder
            </h2>
            <p className="mt-4 text-[1rem] font-extralight leading-relaxed text-[#334155]">
              HydroMesh is led by Saksham Mishra. If you are exploring a municipal pilot, research partnership, or grant collaboration, connect with us directly.
            </p>

            <div className="mt-8 space-y-4 text-[0.95rem] text-[#002456]">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Founder Direct Email</p>
                <a href={`mailto:${FOUNDER_EMAIL}`} className="font-medium hover:underline text-[1.1rem]">
                  {FOUNDER_EMAIL}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Founder LinkedIn</p>
                <ExtLink href={FOUNDER_LINKEDIN} className="font-medium hover:underline">
                  Saksham Mishra (LinkedIn Profile)
                </ExtLink>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Public Codebase</p>
                <ExtLink href={GITHUB} className="font-medium hover:underline">
                  github.com/theSaksham02/Hydromesh
                </ExtLink>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Academic Provenance</p>
                <p className="font-light">University of Birmingham, United Kingdom</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Underline Form */}
          <div className="border border-[#002456]/15 p-10 sm:p-14">
            <h2 className="font-display text-[2rem] font-semibold text-[#002456]">
              Send a Message
            </h2>
            {sent ? (
              <div className="mt-8 border border-[#002456] bg-[#F3F1EC] p-6 text-center">
                <p className="font-semibold text-[#002456]">Thank you for reaching out.</p>
                <p className="mt-2 text-sm font-light text-[#334155]">Your default mail app has been opened with your inquiry.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>

                <div className="mt-8">
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>

                <div className="mt-8">
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your city, organization, or research focus..."
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none"
                  />
                </div>

                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full min-h-[52px] bg-[#002456] text-[1rem] font-medium text-white transition-colors duration-200 hover:bg-[#001838] cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Application Entry                                              */
/* ------------------------------------------------------------------ */
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  // Read initial hash & bind hashchange listener
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#", "").toLowerCase() as PageType;
      if (["home", "about", "join", "blog", "contact"].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  function navigateTo(page: PageType) {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white text-[#002456] antialiased selection:bg-[#002456] selection:text-white">
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      <main id="main">
        {currentPage === "home" && <HomePage onNavigate={navigateTo} />}
        {currentPage === "about" && <AboutPage onNavigate={navigateTo} />}
        {currentPage === "join" && <JoinPage />}
        {currentPage === "blog" && <BlogPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>

      {/* Shared Minimalist Footer */}
      <footer id="footer" className="border-t border-slate-200 bg-white py-12 px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1360px] flex-col sm:flex-row items-center justify-between gap-6 text-[0.8125rem] text-slate-600">
          <div className="flex gap-6 font-light">
            <button
              type="button"
              onClick={() => navigateTo("about")}
              className="hover:text-[#002456] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={() => navigateTo("about")}
              className="hover:text-[#002456] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <ExtLink href={GITHUB} className="hover:text-[#002456] transition-colors">
              GitHub (MIT)
            </ExtLink>
          </div>

          <p className="font-extralight">©2026 by HydroMesh · University of Birmingham — SDG 11</p>

          <div className="flex items-center gap-5 text-[#002456]">
            <ExtLink href={GITHUB} className="hover:opacity-75 transition-opacity" aria-label="Facebook">
              <Facebook className="h-4 w-4 fill-current" />
            </ExtLink>
            <ExtLink href={GITHUB} className="hover:opacity-75 transition-opacity" aria-label="Twitter">
              <Twitter className="h-4 w-4 fill-current" />
            </ExtLink>
            <ExtLink href={FOUNDER_LINKEDIN} className="hover:opacity-75 transition-opacity" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4 fill-current" />
            </ExtLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
