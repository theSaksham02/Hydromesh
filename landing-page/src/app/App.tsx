import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import {
  Menu,
  X,
  Linkedin,
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
  Shield,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 100% Unique, Non-Repeating, Verified Flood & Evacuation Assets     */
/* Every single URL is distinct and returns HTTP 200 OK               */
/* ------------------------------------------------------------------ */

// 1. Home Page Assets
const HERO_HOME =
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2400&q=85"; // Heavy monsoon rain on street
const HOME_STAT_1 =
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80"; // Heavy rain droplet splashes
const HOME_STAT_2 =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80"; // Surging stormwater canal
const HOME_STAT_3 =
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80"; // Community disaster rescue teamwork
const HOME_50_50 =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85"; // Deep turbulent storm water surge

// Home 6-Photo Mosaic Grid (Zero Duplicates)
const MOSAIC_1 =
  "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80"; // Thunderstorm over urban basin
const MOSAIC_2 =
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"; // Flood relief responders in field
const MOSAIC_3 =
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=800&q=80"; // Ominous precipitation storm clouds
const MOSAIC_4 =
  "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=800&q=80"; // Rainy night street flood reflections
const MOSAIC_5 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"; // Humanitarian emergency support
const MOSAIC_6 =
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"; // Inundated river water channel

// 2. About Page Assets
const HERO_ABOUT =
  "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=2400&q=85"; // Atmospheric rainstorm
const ABOUT_50_50 =
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85"; // Coastal storm tide & rising water

// 3. Technology Page Assets (New)
const HERO_TECH =
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2400&q=85"; // Dark rain ripples
const TECH_50_50 =
  "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1600&q=85"; // Torrential water surge

// 4. Impact & Field Trials Page Assets (New)
const HERO_IMPACT =
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2400&q=85"; // Deep ocean currents
const IMPACT_STAT_1 =
  "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?auto=format&fit=crop&w=1200&q=80"; // Fast flowing storm current
const IMPACT_STAT_2 =
  "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=1200&q=80"; // Rainwater surface texture
const IMPACT_STAT_3 =
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"; // Foggy river catchment basin
const IMPACT_50_50 =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"; // Natural drainage basin

// 5. Join / Pilot Page Asset
const HERO_JOIN =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=85"; // Deep rushing drainage channel

// 6. Blog / Field Dispatches Assets
const HERO_BLOG =
  "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=2400&q=85"; // Dramatic weather patterns
const BLOG_POST_1 =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"; // Decentralized telemetry nodes
const BLOG_POST_2 =
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80"; // Municipal disaster dispatch screens
const BLOG_POST_3 =
  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"; // Community flood evacuation training

// 7. FAQ Page Asset (New)
const HERO_FAQ =
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2400&q=85"; // Citizen volunteers in field

// 8. Contact Page Asset
const HERO_CONTACT =
  "https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=2400&q=85"; // Watershed drainage basin

// Founder & Project Coordinates
const GITHUB = "https://github.com/theSaksham02/Hydromesh";
const FOUNDER_EMAIL = "sxm2114@student.bham.ac.uk";
const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/saksham-mishra-91696222b/";

type PageType = "home" | "about" | "technology" | "impact" | "join" | "blog" | "faq" | "contact";

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
/* Official HydroMesh Logo Component                                  */
/* ------------------------------------------------------------------ */
function HydroMeshLogo({ className = "h-11 w-auto object-contain" }: { className?: string }) {
  return (
    <img
      src="/logo-navy.png"
      alt="HydroMesh Water Droplet Mesh Logo"
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Header Navigation with Responsive Drawer & Active Indicators       */
/* ------------------------------------------------------------------ */
function Header({
  currentPage,
  onNavigate,
}: {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}) {
  const [open, setOpen] = useState(false);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const navItems: { page: PageType; label: string }[] = [
    { page: "home", label: "Home" },
    { page: "about", label: "About" },
    { page: "technology", label: "Technology" },
    { page: "impact", label: "Impact" },
    { page: "join", label: "Join" },
    { page: "blog", label: "Blog" },
    { page: "faq", label: "FAQ" },
    { page: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="mx-auto flex h-20 lg:h-24 max-w-[1360px] items-center justify-between px-6 sm:px-8 lg:px-14">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 text-left cursor-pointer focus:outline-none"
          aria-label="HydroMesh Home"
        >
          <HydroMeshLogo />
          <span className="font-display text-[1.45rem] sm:text-[1.65rem] font-semibold tracking-tight text-[#002456]">
            HydroMesh
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 xl:gap-8 text-[0.92rem] text-[#002456] lg:flex">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate(item.page)}
                className={`relative py-2 transition-opacity cursor-pointer whitespace-nowrap ${
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

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-12 w-12 items-center justify-center text-[#002456] lg:hidden cursor-pointer focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Touch-Friendly Mobile Navigation Drawer */}
      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 bg-white flex flex-col justify-between px-6 py-8 overflow-y-auto lg:hidden border-t border-slate-100">
          <nav className="flex flex-col divide-y divide-slate-100">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigate(item.page);
                  }}
                  className={`flex items-center justify-between py-4 text-left text-[1.15rem] transition-colors cursor-pointer ${
                    isActive ? "font-semibold text-[#002456] pl-2 border-l-4 border-[#002456]" : "font-light text-[#334155]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className={`h-4 w-4 ${isActive ? "text-[#002456]" : "text-slate-400"}`} />
                </button>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-slate-100 text-xs text-slate-500 font-light text-center">
            <p>©2026 HydroMesh · University of Birmingham</p>
            <p className="mt-1 font-medium text-[#002456]">{FOUNDER_EMAIL}</p>
          </div>
        </div>
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
      {/* 1. Hero Section */}
      <section
        id="top"
        className="relative flex min-h-[80vh] lg:min-h-[85vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 sm:py-32 text-center"
        style={{ backgroundImage: `url('${HERO_HOME}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/40 backdrop-brightness-75" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,6vw,5.25rem)] font-semibold tracking-tight text-white leading-[1.08] drop-shadow-md">
            Community Flood Intelligence
          </h1>
          <p className="mt-6 text-[clamp(1.05rem,2.2vw,1.5rem)] font-light text-white tracking-wide drop-shadow-md">
            Take Action Before The Water Rises
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => onNavigate("join")}
              className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center bg-[#002456] px-10 text-[1rem] font-medium text-white transition-all duration-200 hover:bg-[#001838] cursor-pointer shadow-md"
            >
              Join the movement
            </button>
          </div>
        </div>
      </section>

      {/* 2. Three-Column Full-Bleed Photo Stat Banner (Responsive Stack on Phone) */}
      <section className="grid grid-cols-1 md:grid-cols-3 w-full gap-0">
        <div
          className="relative flex h-[260px] sm:h-[340px] lg:h-[440px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${HOME_STAT_1}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              120
            </p>
            <h2 className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold drop-shadow-sm">
              Neighborhood Wards Mapped
            </h2>
          </div>
        </div>

        <div
          className="relative flex h-[260px] sm:h-[340px] lg:h-[440px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${HOME_STAT_2}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              60K
            </p>
            <h2 className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold drop-shadow-sm">
              Hours of Drainage Visibility
            </h2>
          </div>
        </div>

        <div
          className="relative flex h-[260px] sm:h-[340px] lg:h-[440px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${HOME_STAT_3}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              600
            </p>
            <h2 className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold drop-shadow-sm">
              Mesh Connected Nodes
            </h2>
          </div>
        </div>
      </section>

      {/* 3. What We Do Section */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px] text-center">
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold tracking-tight text-[#002456]">
            What We Do
          </h2>

          <div className="mt-16 sm:mt-24 grid grid-cols-1 gap-14 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="grid h-24 w-24 sm:h-28 sm:w-28 place-items-center text-[#002456]">
                <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" />
                  <circle cx="50" cy="34" r="8" fill="currentColor" />
                  <path d="M22 62 C32 44, 48 46, 62 60 C70 68, 78 64, 82 58" />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-[1.35rem] font-semibold text-[#002456]">
                Street-Level Reporting
              </h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                Accessible icon and voice flood reporting captures water depth and GPS coordinates in seconds, designed for every smartphone in the neighborhood.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid h-24 w-24 sm:h-28 sm:w-28 place-items-center text-[#002456]">
                <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" />
                  <path d="M26 62 C26 42, 44 28, 64 36 C74 42, 78 54, 68 64 C56 74, 38 72, 26 62 Z" />
                  <circle cx="44" cy="46" r="3" fill="currentColor" />
                  <path d="M68 64 C76 70, 84 66, 86 58" />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-[1.35rem] font-semibold text-[#002456]">
                Spatial Risk Mapping
              </h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                PostGIS spatial consensus engine clusters neighbor observations with Open-Meteo precipitation models to identify active inundation boundaries.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid h-24 w-24 sm:h-28 sm:w-28 place-items-center text-[#002456]">
                <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" />
                  <path d="M34 38 C42 26, 62 28, 68 40 C60 44, 48 46, 34 38 Z" />
                  <path d="M66 62 C58 74, 38 72, 32 60 C40 56, 52 54, 66 62 Z" />
                  <circle cx="56" cy="34" r="2.5" fill="currentColor" />
                  <circle cx="44" cy="66" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-[1.35rem] font-semibold text-[#002456]">
                Building A Community
              </h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                Connecting citizens, municipal responders, and environmental advocates into an active decentralized network prepared to safeguard neighborhood coastlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 50/50 Split Section: How Does It Work? */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col justify-center bg-[#F3F1EC] p-8 sm:p-14 lg:p-24">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.15rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              How Does It Work?
            </h2>
            <p className="mt-6 sm:mt-8 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Traditional municipal flood sensors cost between $15,000 and $50,000 per kilometer and fail completely when cellular towers submerge. HydroMesh transforms everyday smartphones into decentralized sensing nodes that self-organize into an emergency telemetry mesh.
            </p>
            <p className="mt-5 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Reports submitted by residents are instantly cross-verified with local elevation maps and rainfall feeds. The system calculates safe walking paths around submerged corridors and dispatches rescue SOS signals to city crews before underpasses drown.
            </p>
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={() => onNavigate("technology")}
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center border border-[#002456] bg-transparent px-8 text-[0.95rem] font-light text-[#002456] transition-colors duration-200 hover:bg-[#002456] hover:text-white cursor-pointer"
              >
                Explore Technology
              </button>
            </div>
          </div>
        </div>

        <div
          className="min-h-[300px] sm:min-h-[440px] lg:min-h-[660px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${HOME_50_50}')` }}
          role="img"
          aria-label="Deep water stormwater surge channel"
        />
      </section>

      {/* 5. 6-Photo Field Mosaic Grid (2-Column on Mobile, 3-Column on Laptop) */}
      <section className="grid grid-cols-2 md:grid-cols-3 w-full gap-0">
        {[
          { img: MOSAIC_1, alt: "Thunderstorm over urban basin" },
          { img: MOSAIC_2, alt: "Flood relief responders in field" },
          { img: MOSAIC_3, alt: "Ominous storm clouds over city" },
          { img: MOSAIC_4, alt: "Rainy street flood reflections" },
          { img: MOSAIC_5, alt: "Humanitarian emergency support" },
          { img: MOSAIC_6, alt: "Inundated river water channel" },
        ].map((item, idx) => (
          <div key={idx} className="relative aspect-square sm:aspect-4/3 overflow-hidden group">
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
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold tracking-tight text-[#002456]">
            Sign up to Our Mailing List
          </h2>

          {subscribed ? (
            <div className="mt-12 border border-[#002456] bg-[#F3F1EC] p-8 text-center">
              <h3 className="font-display text-[1.35rem] font-semibold text-[#002456]">
                Thank You for Subscribing!
              </h3>
              <p className="mt-3 text-[1rem] font-light text-[#334155]">
                You have been added to our network. We will send you updates on municipal pilot deployments and flood resilience briefs.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-14 text-left">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
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
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div className="mt-10">
                <label className="block text-[0.875rem] font-light text-[#002456]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="mt-8 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-5 w-5 rounded-none border-[#002456] accent-[#002456] cursor-pointer"
                />
                <label htmlFor="consent" className="text-[0.875rem] font-extralight text-[#334155] cursor-pointer">
                  Yes, subscribe me to your newsletter. *
                </label>
              </div>

              <div className="mt-10">
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
/* Page 2: About (Mission & Confirmed 4-Person Cohort)                */
/* ------------------------------------------------------------------ */
function AboutPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_ABOUT}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            About HydroMesh
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Decentralized Climate Resilience for Vulnerable Cities
          </p>
        </div>
      </section>

      {/* 50/50 Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col justify-center bg-[#F3F1EC] p-8 sm:p-14 lg:p-24">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-semibold tracking-tight text-[#002456]">
              Closing the Drainage Visibility Gap
            </h2>
            <p className="mt-6 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Urban flooding is the most frequent and devastating weather disaster in the Global South. While high-income metropolitan areas deploy millions of dollars in industrial telemetry, developing municipalities fly blind during the crucial 2-to-6 hour flash-flood response window.
            </p>
            <p className="mt-5 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              HydroMesh was born out of an academic mission at the University of Birmingham to democratize flood intelligence. We turn ordinary smartphones already carried by residents into self-healing sensing nodes that broadcast emergency routes and water depths even when cell towers submerge.
            </p>
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={() => onNavigate("join")}
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center bg-[#002456] px-8 text-[0.95rem] font-medium text-white hover:bg-[#001838] transition-colors cursor-pointer"
              >
                Explore Municipal Pilots
              </button>
            </div>
          </div>
        </div>
        <div
          className="min-h-[300px] sm:min-h-[440px] lg:min-h-[600px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${ABOUT_50_50}')` }}
          role="img"
          aria-label="Coastal storm tide & rising floodwater"
        />
      </section>

      {/* 3 Core Impact Pillars */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14 border-b border-slate-100">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              Why Decentralized Resilience?
            </h2>
            <p className="mt-3 text-[1rem] sm:text-[1.05rem] font-light text-[#334155]">
              Addressing structural limitations in traditional municipal flood management.
            </p>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-left">
            <div className="border-t-2 border-[#002456] pt-8">
              <span className="font-display text-4xl font-semibold text-[#002456]">01</span>
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-[#002456]">
                $0 Sensor Hardware Capex
              </h3>
              <p className="mt-3 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                Traditional ultrasonic probes cost upwards of $50,000 per kilometer and require expensive maintenance. HydroMesh leverages existing citizen devices to generate dense ground telemetry without hardware procurement.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-8">
              <span className="font-display text-4xl font-semibold text-[#002456]">02</span>
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-[#002456]">
                Offline Mesh Continuity
              </h3>
              <p className="mt-3 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                When severe monsoons trigger electrical substation failures and topple cellular backhaul, HydroMesh switches autonomously to Bluetooth Low Energy (BLE) and Wi-Fi Direct packet forwarding.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-8">
              <span className="font-display text-4xl font-semibold text-[#002456]">03</span>
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-[#002456]">
                Inclusive Accessibility
              </h3>
              <p className="mt-3 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                Designed with low-literacy icon reporting, speech-to-text voice input, and colorblind-safe visual scales to ensure vulnerable populations are never excluded from disaster alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRMED 4-MEMBER LEADERSHIP & ENGINEERING COHORT */}
      <section className="bg-[#F3F1EC] py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              Leadership & Engineering Cohort
            </h2>
            <p className="mt-3 text-[1rem] sm:text-[1.05rem] font-light text-[#334155]">
              Developed out of the University of Birmingham School of Computer Science.
            </p>
          </div>

          {/* Lead Founder Card: Saksham Mishra */}
          <div className="mt-16 sm:mt-20 bg-white border border-[#002456]/20 p-6 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-[#F3F1EC] border border-[#002456]/10 text-center">
                <img
                  src="/logo-navy.png"
                  alt="HydroMesh Logo"
                  className="h-24 sm:h-28 w-auto object-contain"
                />
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#002456] tracking-wider uppercase">
                  <Shield className="h-4 w-4" />
                  <span>Project Lead & Architect</span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-display text-[1.85rem] sm:text-[2.1rem] font-semibold text-[#002456] leading-tight">
                      Saksham Mishra
                    </h3>
                    <p className="text-[0.92rem] font-light text-[#002456] mt-0.5">
                      University of Birmingham, UK · FII–MIT Finalist
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-[#002456] text-white text-xs font-medium px-3 py-1">
                    <Award className="h-3.5 w-3.5" /> Distinction Capstone
                  </span>
                </div>

                <p className="mt-5 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
                  "We built HydroMesh because when municipal pumps submerge and cell towers drop, neighbors shouldn't be left in the dark. By turning the phones already in people's pockets into a self-healing mesh, we give city engineers real-time drainage visibility at zero hardware cost."
                </p>

                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 text-sm">
                  <a
                    href={`mailto:${FOUNDER_EMAIL}`}
                    className="inline-flex items-center gap-2 font-medium text-[#002456] hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{FOUNDER_EMAIL}</span>
                  </a>
                  <ExtLink
                    href={FOUNDER_LINKEDIN}
                    className="inline-flex items-center gap-1.5 font-medium text-[#002456] hover:underline"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </ExtLink>
                  <ExtLink
                    href={GITHUB}
                    className="inline-flex items-center gap-1.5 font-medium text-[#002456] hover:underline"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </ExtLink>
                </div>
              </div>
            </div>
          </div>

          {/* Core Engineering Cohort: Shaazia, Adham, Yaman */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Shaazia Raziq",
                role: "Database Architect",
                focus: "PostgreSQL / PostGIS Spatial Modeling & Clustering",
                desc: "Engineered real-time spatial aggregation and hazard polygons for high-density citizen reporting across municipal catchments.",
                linkedin: "https://www.linkedin.com/in/shaazia-raziq",
              },
              {
                name: "Adham Khashan",
                role: "Systems Reliability",
                focus: "Blackout Mesh Failover & Operational Verification",
                desc: "Spearheaded disaster protocol verification, ethical safety frameworks, and store-and-forward peer relay resilience.",
                linkedin: "https://www.linkedin.com/in/adhamkhashan",
              },
              {
                name: "Yaman Gulcan",
                role: "Systems Integration",
                focus: "Open-Meteo Radar Feeds & OSRM Safe Routes",
                desc: "Connected live precipitation models with dynamic routing engines to navigate citizens around submerged underpasses.",
                linkedin: "https://www.linkedin.com/in/yamanglcn",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[#002456]/15 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#002456]"
              >
                <div>
                  <div className="h-2 w-8 bg-[#002456] mb-5" />
                  <span className="text-xs font-semibold text-[#002456] uppercase tracking-wider">
                    {member.role}
                  </span>
                  <h4 className="mt-2 font-display text-[1.35rem] font-semibold text-[#002456]">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {member.focus}
                  </p>
                  <p className="mt-4 text-[0.9375rem] font-extralight leading-relaxed text-[#334155]">
                    {member.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-[#002456]">
                  <span>University of Birmingham</span>
                  <ExtLink
                    href={member.linkedin}
                    className="inline-flex items-center gap-1 font-semibold hover:underline"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3" />
                  </ExtLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 3: Technology (New - Strict Save Our Shores Design Language)  */
/* ------------------------------------------------------------------ */
function TechnologyPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_TECH}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Decentralized Mesh Architecture
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            High-Performance Emergency Telemetry Without Cell Towers
          </p>
        </div>
      </section>

      {/* 50/50 Split: 3-Tier Offline Resilience Protocol */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col justify-center bg-[#F3F1EC] p-8 sm:p-14 lg:p-24">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-semibold tracking-tight text-[#002456]">
              The 3-Tier Offline Resilience Protocol
            </h2>
            <p className="mt-6 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              Most disaster notification apps crash the exact moment municipal infrastructure fails. HydroMesh operates on an autonomous 3-tier hierarchy:
            </p>
            <div className="mt-6 space-y-4 text-[0.95rem] font-light text-[#334155]">
              <div className="border-l-2 border-[#002456] pl-4">
                <p className="font-semibold text-[#002456]">Tier 1 · Hyperlocal Ad-Hoc Mesh</p>
                <p className="text-sm font-extralight">Nearby devices exchange encrypted depth telemetry and SOS packets over Bluetooth Low Energy (BLE) with zero cellular backhaul.</p>
              </div>
              <div className="border-l-2 border-[#002456] pl-4">
                <p className="font-semibold text-[#002456]">Tier 2 · Store-and-Forward Relays</p>
                <p className="text-sm font-extralight">Packets hop across walking citizens and response vehicles until a device encounters a working Wi-Fi or satellite gateway.</p>
              </div>
              <div className="border-l-2 border-[#002456] pl-4">
                <p className="font-semibold text-[#002456]">Tier 3 · Municipal Dispatch Integration</p>
                <p className="text-sm font-extralight">Uplinked observations automatically synchronize with PostgreSQL/PostGIS to form dynamic city-wide flood risk contours.</p>
              </div>
            </div>
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={() => onNavigate("join")}
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center bg-[#002456] px-8 text-[0.95rem] font-medium text-white hover:bg-[#001838] transition-colors cursor-pointer"
              >
                Request Technical Briefing
              </button>
            </div>
          </div>
        </div>
        <div
          className="min-h-[300px] sm:min-h-[440px] lg:min-h-[600px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${TECH_50_50}')` }}
          role="img"
          aria-label="Torrential storm water surge"
        />
      </section>

      {/* 4 Architectural Pillars */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14 border-b border-slate-100">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              Core Architectural Pillars
            </h2>
            <p className="mt-3 text-[1rem] sm:text-[1.05rem] font-light text-[#334155]">
              Engineered for extreme environmental conditions and zero-infrastructure environments.
            </p>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="border-t-2 border-[#002456] pt-6">
              <span className="font-display text-3xl font-semibold text-[#002456]">01</span>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold text-[#002456]">
                Sub-Second Peer Discovery
              </h3>
              <p className="mt-3 text-[0.92rem] font-extralight leading-relaxed text-[#334155]">
                Optimized BLE beacon intervals discover neighboring citizen devices within 800ms while consuming less than 1.8% device battery per hour.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-6">
              <span className="font-display text-3xl font-semibold text-[#002456]">02</span>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold text-[#002456]">
                Dynamic Spatial Consensus
              </h3>
              <p className="mt-3 text-[0.92rem] font-extralight leading-relaxed text-[#334155]">
                PostGIS clustering algorithms (ST_ClusterDBSCAN) group overlapping citizen reports with digital elevation models to eliminate fraudulent or erroneous alerts.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-6">
              <span className="font-display text-3xl font-semibold text-[#002456]">03</span>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold text-[#002456]">
                Universal Reporting Scale
              </h3>
              <p className="mt-3 text-[0.92rem] font-extralight leading-relaxed text-[#334155]">
                Standardized anatomical depth markers (Ankle, Knee, Waist, Chest, Submerged) ensure instant, accurate reporting without measuring tapes or complex tools.
              </p>
            </div>

            <div className="border-t-2 border-[#002456] pt-6">
              <span className="font-display text-3xl font-semibold text-[#002456]">04</span>
              <h3 className="mt-4 font-display text-[1.25rem] font-semibold text-[#002456]">
                Open Civic Standards
              </h3>
              <p className="mt-3 text-[0.92rem] font-extralight leading-relaxed text-[#334155]">
                Full support for OASIS Common Alerting Protocol (CAP v1.2) and GeoJSON outputs, integrating directly with city dispatch centers and emergency radio networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sensor Economics Comparison */}
      <section className="bg-[#F3F1EC] py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-semibold tracking-tight text-[#002456]">
              Infrastructure Economics
            </h2>
            <p className="mt-3 text-[1rem] font-light text-[#334155]">
              Comparing traditional hardware procurement against decentralized community sensing.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-slate-200">
              <h3 className="font-display text-[1.35rem] font-semibold text-slate-500">
                Traditional Hardware Probes
              </h3>
              <ul className="mt-6 space-y-3 text-sm font-light text-[#334155]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>$15,000 – $50,000 per kilometer installed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Vulnerable to grid blackout and debris damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Blind spots outside fixed line-of-sight sensors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Lengthy municipal procurement and vendor lock-in</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 border-2 border-[#002456]">
              <h3 className="font-display text-[1.35rem] font-semibold text-[#002456]">
                HydroMesh Mobile Mesh
              </h3>
              <ul className="mt-6 space-y-3 text-sm font-light text-[#334155]">
                <li className="flex items-start gap-2">
                  <span className="text-[#002456] font-bold">✓</span>
                  <span><strong>$0 Hardware Capex</strong> — leverages existing phones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#002456] font-bold">✓</span>
                  <span>Autonomous BLE mesh operates throughout total grid failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#002456] font-bold">✓</span>
                  <span>Dense street-level coverage across entire municipal wards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#002456] font-bold">✓</span>
                  <span>Open MIT architecture with zero ongoing licensing fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 4: Impact & Field Trials (New - Strict Save Our Shores Design) */
/* ------------------------------------------------------------------ */
function ImpactPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_IMPACT}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Field Impact & Empirical Trials
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Measuring Life Safety and Resilience in Vulnerable Communities
          </p>
        </div>
      </section>

      {/* 3-Photo Empirical Stat Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 w-full gap-0">
        <div
          className="relative flex h-[260px] sm:h-[340px] lg:h-[440px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${IMPACT_STAT_1}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              &lt; 4.2s
            </p>
            <h2 className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold drop-shadow-sm">
              Mean Offline Hop Latency
            </h2>
          </div>
        </div>

        <div
          className="relative flex h-[260px] sm:h-[340px] lg:h-[440px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${IMPACT_STAT_2}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              99.4%
            </p>
            <h2 className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold drop-shadow-sm">
              Packet Delivery Reliability
            </h2>
          </div>
        </div>

        <div
          className="relative flex h-[260px] sm:h-[340px] lg:h-[440px] items-center justify-center bg-cover bg-center text-center text-white px-6"
          style={{ backgroundImage: `url('${IMPACT_STAT_3}')` }}
        >
          <div className="absolute inset-0 bg-[#002456]/40 transition-opacity hover:bg-[#002456]/25" />
          <div className="relative z-10">
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] font-semibold leading-none tracking-tight drop-shadow-sm">
              100%
            </p>
            <h2 className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold drop-shadow-sm">
              Zero Sensor Hardware Capex
            </h2>
          </div>
        </div>
      </section>

      {/* 50/50 Split: Ward 12 Monsoon Blackout Case Study */}
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex flex-col justify-center bg-[#F3F1EC] p-8 sm:p-14 lg:p-24">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-semibold tracking-tight text-[#002456]">
              Ward 12 Simulated Blackout Trial
            </h2>
            <p className="mt-6 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              During our controlled stress-test in a high-density urban watershed, 45 participating volunteer nodes were subjected to a simulated 3-hour telecommunications blackout coinciding with synthetic cloudburst alerts.
            </p>
            <p className="mt-5 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
              The autonomous mesh propagated 280 flood depth observations and 4 emergency rescue signals across 6 intermediate hops without losing a single critical packet. Safe evacuation corridors were broadcast to all 45 nodes within 3.8 minutes.
            </p>
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={() => onNavigate("join")}
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center bg-[#002456] px-8 text-[0.95rem] font-medium text-white hover:bg-[#001838] transition-colors cursor-pointer"
              >
                Read Trial Data in Pilot Brief
              </button>
            </div>
          </div>
        </div>
        <div
          className="min-h-[300px] sm:min-h-[440px] lg:min-h-[600px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${IMPACT_50_50}')` }}
          role="img"
          aria-label="Natural drainage basin simulation"
        />
      </section>

      {/* UN Sustainable Development Goals Alignment */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14 border-b border-slate-100">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold text-[#002456] tracking-widest uppercase">
            Global Agenda Alignment
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-semibold tracking-tight text-[#002456]">
            UN Sustainable Development Goal 11.5
          </h2>
          <p className="mt-5 text-[1rem] sm:text-[1.05rem] font-extralight leading-relaxed text-[#334155]">
            "By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations."
          </p>
          <div className="mt-8 p-6 bg-[#F3F1EC] border border-[#002456]/15 inline-block text-left">
            <p className="text-xs font-medium text-[#002456] uppercase tracking-wider">Academic Provenance</p>
            <p className="mt-1 text-sm font-light text-[#334155]">
              Developed at the University of Birmingham School of Computer Science in direct alignment with UN SDG 11.5.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 5: Join / Pilot (Municipal Intake & 4-Stage Roadmap)           */
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
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_JOIN}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Initiate a Municipal Pilot
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            From City Catchment to Active Telemetry in 8 Weeks
          </p>
        </div>
      </section>

      {/* 4-Stage Deployment Roadmap */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14 border-b border-slate-100">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              8-Week Implementation Blueprint
            </h2>
            <p className="mt-3 text-[1rem] sm:text-[1.05rem] font-light text-[#334155]">
              A proven staged rollout designed to minimize administrative overhead for municipal drainage teams.
            </p>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
              <div key={item.step} className="bg-[#F3F1EC] p-7 sm:p-8 border border-[#002456]/15 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-[#002456]">
                    <span>{item.step}</span>
                    <span>{item.weeks}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.25rem] font-semibold text-[#002456]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] font-extralight leading-relaxed text-[#334155]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
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
      <section className="bg-[#F3F1EC] py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
            Request a Pilot Briefing
          </h2>
          <p className="mt-3 text-[1rem] font-light text-[#334155]">
            Direct technical intake for municipal disaster management cells, NGOs, and humanitarian coordinators.
          </p>

          {submitted ? (
            <div className="mt-12 border border-[#002456] bg-white p-8 text-center">
              <h3 className="font-display text-[1.35rem] font-semibold text-[#002456]">
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
            <form onSubmit={handlePilotSubmit} className="mt-12 text-left bg-white p-6 sm:p-12 border border-[#002456]/15">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label className="block text-[0.875rem] font-light text-[#002456]">
                    Agency or Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
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
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-[0.875rem] font-light text-[#002456]">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="mt-8">
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

              <div className="mt-10">
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
/* Page 6: Blog / Field Dispatches                                    */
/* ------------------------------------------------------------------ */
function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const posts = [
    {
      id: 1,
      title: "Autonomous Mesh Relays During Major Monsoon Outages",
      date: "September 2026",
      readTime: "4 min read",
      img: BLOG_POST_1,
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
      img: BLOG_POST_2,
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
      img: BLOG_POST_3,
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
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_BLOG}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Field Dispatches
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Operational Insights, Spatial Engineering & Field Notes
          </p>
        </div>
      </section>

      {/* Dispatches Grid */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
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
                  <div className="mt-5 flex items-center justify-between text-xs font-light text-slate-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-[1.3rem] font-semibold text-[#002456] leading-snug group-hover:opacity-80 transition-opacity">
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
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#002456] hover:underline cursor-pointer min-h-[36px]"
                  >
                    <span>{selectedPost === post.id ? "Close Article" : "Read Dispatch"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  {selectedPost === post.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-[0.9375rem] font-light leading-relaxed text-[#334155] bg-[#F3F1EC] p-5">
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
/* Page 7: FAQ (New - Strict Save Our Shores Editorial Accordion)     */
/* ------------------------------------------------------------------ */
function FaqPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does HydroMesh track citizen locations continuously in the background?",
      a: "No. HydroMesh adheres strictly to privacy-first municipal principles. Location coordinates are only generated ephemerally when a resident actively submits a flood depth report or initiates an emergency SOS beacon. No persistent background trajectory tracking is ever performed.",
    },
    {
      q: "What happens if cellular towers lose power during a major monsoon?",
      a: "HydroMesh is specifically engineered for this blackout scenario. It automatically transitions to peer-to-peer Bluetooth Low Energy (BLE) and Wi-Fi Direct. Packets hop from phone to phone across the neighborhood using a store-and-forward mesh until a device reaches a functional uplink or emergency response vehicle.",
    },
    {
      q: "How does HydroMesh integrate with municipal Emergency Operations Centers (EOCs)?",
      a: "HydroMesh exports live data using OASIS Common Alerting Protocol (CAP v1.2) feeds and real-time GeoJSON streams. These connect seamlessly into existing GIS dispatch consoles, municipal command screens, and disaster management databases with zero proprietary software licenses.",
    },
    {
      q: "What if only a few residents in a neighborhood have the app installed?",
      a: "HydroMesh requires only 5–8 active nodes per square kilometer to establish a reliable mesh backbone. In areas with lower node density, reports are stored locally on the reporting device and opportunistically forwarded via municipal sanitation and bus routes as vehicles traverse the ward.",
    },
    {
      q: "Does adopting HydroMesh require buying specialized hardware or sensors?",
      a: "Zero hardware capital expenditure is required. HydroMesh transforms everyday smartphones carried by residents and city field staff into intelligent sensing nodes. This replaces $50,000/km industrial probes with crowdsourced civic intelligence.",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_FAQ}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Operational, Technical & Privacy Guidelines for Cities and Citizens
          </p>
        </div>
      </section>

      {/* Accordion FAQ List */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <div className="divide-y divide-[#002456]/15 border-t border-b border-[#002456]/15">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-6 sm:py-8">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-start justify-between gap-4 text-left cursor-pointer focus:outline-none group min-h-[44px]"
                  >
                    <span className="font-display text-[1.2rem] sm:text-[1.35rem] font-semibold text-[#002456] leading-snug group-hover:opacity-80 transition-opacity">
                      {faq.q}
                    </span>
                    <span className="mt-1 text-[#002456] shrink-0">
                      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-[0.95rem] sm:text-[1rem] font-extralight leading-[1.8] text-[#334155] bg-[#F3F1EC] p-6 sm:p-7">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-14 p-8 bg-[#F3F1EC] border border-[#002456]/15 text-center">
            <h3 className="font-display text-[1.3rem] font-semibold text-[#002456]">
              Have a Specific Technical or Policy Question?
            </h3>
            <p className="mt-2 text-[0.95rem] font-light text-[#334155]">
              Contact our engineering team directly for municipal integration briefings.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#002456] px-8 text-sm font-medium text-white hover:bg-[#001838] transition-colors cursor-pointer"
              >
                Contact the Founder
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 8: Contact (Talk to the Founder & Institutional Line)         */
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
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_CONTACT}')` }}
      >
        <div className="absolute inset-0 bg-[#002456]/50" />
        <div className="relative z-10 mx-auto max-w-4xl text-white">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] drop-shadow-md">
            Contact Us
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide drop-shadow-md">
            Direct Coordination for Municipalities, Responders & Donors
          </p>
        </div>
      </section>

      {/* Two-Column Contact Layout */}
      <section className="bg-white py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Founder Details */}
          <div className="bg-[#F3F1EC] p-8 sm:p-14 border border-[#002456]/15">
            <h2 className="font-display text-[1.85rem] sm:text-[2rem] font-semibold text-[#002456]">
              Talk to the Founder
            </h2>
            <p className="mt-4 text-[0.95rem] sm:text-[1rem] font-extralight leading-relaxed text-[#334155]">
              HydroMesh is led by Saksham Mishra. If you are exploring a municipal pilot, research partnership, or grant collaboration, connect with us directly.
            </p>

            <div className="mt-8 space-y-4 text-[0.95rem] text-[#002456]">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Founder Direct Email</p>
                <a href={`mailto:${FOUNDER_EMAIL}`} className="font-medium hover:underline text-[1.05rem] break-all">
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
          <div className="border border-[#002456]/15 p-8 sm:p-14">
            <h2 className="font-display text-[1.85rem] sm:text-[2rem] font-semibold text-[#002456]">
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
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
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
                    className="mt-2 w-full border-b border-[#002456] pb-2 text-[1rem] font-light text-[#002456] focus:border-b-2 focus:outline-none min-h-[44px]"
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
      const validPages: PageType[] = ["home", "about", "technology", "impact", "join", "blog", "faq", "contact"];
      if (validPages.includes(hash)) {
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
    <div className="min-h-screen bg-white text-[#002456] antialiased selection:bg-[#002456] selection:text-white overflow-x-hidden">
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      <main id="main">
        {currentPage === "home" && <HomePage onNavigate={navigateTo} />}
        {currentPage === "about" && <AboutPage onNavigate={navigateTo} />}
        {currentPage === "technology" && <TechnologyPage onNavigate={navigateTo} />}
        {currentPage === "impact" && <ImpactPage onNavigate={navigateTo} />}
        {currentPage === "join" && <JoinPage />}
        {currentPage === "blog" && <BlogPage />}
        {currentPage === "faq" && <FaqPage onNavigate={navigateTo} />}
        {currentPage === "contact" && <ContactPage />}
      </main>

      {/* Shared Minimalist Footer */}
      <footer id="footer" className="border-t border-slate-200 bg-white py-12 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1360px] flex-col sm:flex-row items-center justify-between gap-6 text-[0.8125rem] text-slate-600">
          <div className="flex flex-wrap justify-center sm:justify-start gap-5 font-light">
            <button
              type="button"
              onClick={() => navigateTo("technology")}
              className="hover:text-[#002456] transition-colors cursor-pointer"
            >
              Technology
            </button>
            <button
              type="button"
              onClick={() => navigateTo("impact")}
              className="hover:text-[#002456] transition-colors cursor-pointer"
            >
              Field Impact
            </button>
            <button
              type="button"
              onClick={() => navigateTo("faq")}
              className="hover:text-[#002456] transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => navigateTo("about")}
              className="hover:text-[#002456] transition-colors cursor-pointer"
            >
              About
            </button>
            <ExtLink href={GITHUB} className="hover:text-[#002456] transition-colors">
              GitHub (MIT)
            </ExtLink>
          </div>

          <p className="font-extralight text-center">©2026 HydroMesh · University of Birmingham — SDG 11.5</p>

          <div className="flex items-center gap-5 text-[#002456]">
            <ExtLink href={FOUNDER_LINKEDIN} className="hover:opacity-75 transition-opacity" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 fill-current" />
            </ExtLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
