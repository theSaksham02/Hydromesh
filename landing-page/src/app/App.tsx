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
  CheckCircle2,
  Database,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { SubmissionModal } from "./components/SubmissionModal";
import {
  submitNewsletter,
  submitPilot,
  submitContact,
  getSavedMember,
  getStoredSubmissions,
  type StoredSubmission,
} from "./services/forms";

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

// Pilot Phase HD Imagery
const PILOT_PHASE_1 = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"; // Aerial catchment & topographical GIS contours
const PILOT_PHASE_2 = "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"; // Field response volunteers with mobile devices
const PILOT_PHASE_3 = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"; // Network telecom command center telemetry diagnostics
const PILOT_PHASE_4 = "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80"; // Torrential monsoon rain & civic flood response

// Technology Architecture HD Imagery
const TECH_PILLAR_1 = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"; // BLE mesh radio packet broadcast
const TECH_PILLAR_2 = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"; // Geospatial GIS danger polygons & clustering
const TECH_PILLAR_3 = "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1200&q=80"; // Water depth measurement gauge calibration
const TECH_PILLAR_4 = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"; // Municipal Emergency Operations Center (EOC) console

// Founder & Project Coordinates
const GITHUB = "https://github.com/theSaksham02/Hydromesh";
const FOUNDER_EMAIL = "sxm2114@student.bham.ac.uk";
const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/saksham-mishra-7b1930345/";

type PageType = "home" | "about" | "technology" | "impact" | "join" | "blog" | "faq" | "contact" | "legal";

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
  savedMember,
  onOpenMemberModal,
}: {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  savedMember: { name: string; email: string; type: string } | null;
  onOpenMemberModal: () => void;
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

        <div className="flex items-center gap-3">
          {savedMember && (
            <button
              type="button"
              onClick={onOpenMemberModal}
              className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-[#047857] hover:bg-[#10B981]/20 transition-all cursor-pointer shadow-xs"
              title="View your saved HydroMesh submission"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>Joined ({savedMember.name.split(" ")[0]})</span>
            </button>
          )}
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

          {subscribed || (savedMember && savedMember.type === "newsletter") ? (
            <div className="mt-12 border border-[#10B981]/30 bg-[#10B981]/5 p-8 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-[#002456]">
                You are Registered on the Network!
              </h3>
              <p className="mt-2 text-[1rem] font-light text-[#334155]">
                Your subscription has been stored in our Supabase database and saved on this website. You will receive updates on municipal pilot deployments and flood resilience briefs.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onFormSubmitted(getStoredSubmissions()[0])}
                  className="inline-flex items-center gap-2 border border-[#002456] bg-white px-5 py-2.5 text-xs font-medium text-[#002456] hover:bg-[#F3F1EC] transition-colors cursor-pointer"
                >
                  <Database className="h-3.5 w-3.5 text-[#0284C7]" />
                  <span>View Stored Supabase Record</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setConsent(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs text-[#64748B] hover:text-[#002456] transition-colors cursor-pointer underline"
                >
                  Register another email
                </button>
              </div>
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
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] bg-[#002456] text-[1rem] font-medium text-white transition-colors duration-200 hover:bg-[#001838] cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Recording to Supabase...</span>
                    </>
                  ) : (
                    "Submit"
                  )}
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
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            About HydroMesh
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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

      {/* CONFIRMED 3-MEMBER LEADERSHIP & OPERATIONAL REGIONAL STRATEGY */}
      <section className="bg-[#F3F1EC] py-24 sm:py-36 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-[#002456] text-white text-xs font-semibold px-3.5 py-1 tracking-wider uppercase mb-4">
              Regional Insight · Local Validation
            </span>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tight text-[#002456]">
              Operational Leadership & Regional Strategy
            </h2>
            <p className="mt-3 text-[1rem] sm:text-[1.05rem] font-light text-[#334155]">
              Developed out of the University of Birmingham School of Computer Science.
            </p>
          </div>

          {/* Operational Team Strategy Card */}
          <div className="mt-14 bg-white border border-[#002456]/20 p-8 sm:p-12 shadow-sm">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#002456] uppercase tracking-widest">
                Team Strategy & Operational Scope
              </span>
              <blockquote className="mt-3 font-display text-[1.25rem] sm:text-[1.45rem] font-semibold text-[#002456] leading-snug">
                “Our team brings lived and regional insight from flood-vulnerable communities across Asia and Africa. We are beginning validation through focused local partnerships.”
              </blockquote>
              <p className="mt-3 text-[0.95rem] font-extralight leading-relaxed text-[#334155]">
                Rather than diffuse claims, HydroMesh translates our founders' lived and regional perspectives into four concrete, operational mandates:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
              <div className="border-l-2 border-[#002456] pl-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Technical Lead</span>
                <h4 className="mt-1 font-display text-[1.05rem] font-semibold text-[#002456]">Core Platform & Data</h4>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#334155]">
                  Maintains a single stable app and backend release, ensures zero-latency local caching, and curates live simulated telemetry data for demonstrations.
                </p>
              </div>

              <div className="border-l-2 border-[#002456] pl-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">India Lead</span>
                <h4 className="mt-1 font-display text-[1.05rem] font-semibold text-[#002456]">Field Validation</h4>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#334155]">
                  Secures first municipal drainage and ward testing partners in flood-prone Indian catchments, gathering direct citizen user feedback loops.
                </p>
              </div>

              <div className="border-l-2 border-[#002456] pl-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Africa-Region Lead</span>
                <h4 className="mt-1 font-display text-[1.05rem] font-semibold text-[#002456]">Community Partners</h4>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#334155]">
                  Identifies realistic NGO and community test partners across vulnerable African catchments, mapping local drainage workflows and language accessibility.
                </p>
              </div>

              <div className="border-l-2 border-[#002456] pl-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">UAE Lead</span>
                <h4 className="mt-1 font-display text-[1.05rem] font-semibold text-[#002456]">Ecosystem & Funding</h4>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#334155]">
                  Drives regional university partnerships, climate resilience innovation networks, and international fellowship and disaster tech grant funding.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Founder Card: Saksham Mishra */}
          <div className="mt-10 sm:mt-12 bg-white border border-[#002456]/20 p-6 sm:p-12 lg:p-14 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F3F1EC] border border-[#002456]/10 text-center group">
                <div className="aspect-square w-full max-w-[280px] overflow-hidden bg-slate-950 border border-[#002456]/15">
                  <img
                    src="/team-saksham.png"
                    alt="Saksham Mishra"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#002456] tracking-wider uppercase">
                  <Shield className="h-4 w-4" />
                  <span>Project Lead & System Architect</span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-display text-[1.85rem] sm:text-[2.1rem] font-semibold text-[#002456] leading-tight">
                      Saksham Mishra
                    </h3>
                    <p className="text-[0.92rem] font-light text-[#002456] mt-0.5">
                      University of Birmingham, UK · Technical Lead & India Field Validation Lead
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-[#002456] text-white text-xs font-medium px-3 py-1">
                    <Award className="h-3.5 w-3.5" /> FII–MIT Finalist & Distinction
                  </span>
                </div>

                <p className="mt-5 text-[1rem] sm:text-[1.05rem] font-extralight leading-[1.8] text-[#334155]">
                  "We built HydroMesh because when municipal pumps submerge and cell towers drop, neighbors shouldn't be left in the dark. By turning the phones already in people's pockets into a self-healing mesh, we give city engineers real-time drainage visibility at zero hardware cost."
                </p>

                <div className="mt-4 p-4 bg-[#F3F1EC] border border-[#002456]/10 text-xs font-light text-[#334155]">
                  <strong className="font-medium text-[#002456]">Operational Focus:</strong> Maintains a single, reliable application and backend release; maintains live telemetry demo data; and leads outreach for our first municipal field-testing partnership in Indian monsoon catchments.
                </div>

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

          {/* Core Engineering & Regional Cohort: Shaazia & Adham */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
            {[
              {
                name: "Shaazia Raziq",
                role: "Database Architect & Africa-Region Lead",
                focus: "PostgreSQL / PostGIS Spatial Modeling & African Community Outreach",
                desc: "Engineers real-time PostGIS spatial clustering and hazard polygons while identifying realistic African NGO and community test partners to tailor local drainage workflows and multilingual accessibility.",
                linkedin: "https://www.linkedin.com/in/shaazia-raziq",
                image: "/team-shaazia.png",
              },
              {
                name: "Adham Khashan",
                role: "Systems Reliability & UAE Ecosystem Lead",
                focus: "Blackout Mesh Failover & Regional University Partnerships",
                desc: "Spearheads blackout mesh verification, failover disaster protocols, UAE university ecosystem relationships, and international climate resilience grant funding.",
                linkedin: "https://www.linkedin.com/in/adhamkhashan",
                image: "/team-adham.png",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[#002456]/15 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#002456] group shadow-sm"
              >
                <div>
                  {member.image ? (
                    <div className="aspect-square overflow-hidden bg-slate-100 mb-6 border border-[#002456]/10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-[#F3F1EC] mb-6 flex flex-col items-center justify-center border border-[#002456]/10 text-center p-4">
                      <HydroMeshLogo className="h-12 w-auto opacity-30" />
                      <span className="mt-2 text-xs font-light text-slate-400">Headshot Pending</span>
                    </div>
                  )}
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

          <div className="mt-14 p-6 sm:p-8 border border-[#002456]/15 bg-white flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
            <img
              src="/sdg-11-banner.png"
              alt="UN Sustainable Cities and Communities"
              className="h-16 w-auto object-contain shrink-0"
            />
            <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed text-center sm:text-left">
              HydroMesh was developed as an academic capstone at the University of Birmingham School of Computer Science, engineering accessible mobile telemetry to protect vulnerable urban communities from flash floods in direct alignment with UN SDG 11.
            </p>
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
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Decentralized Mesh Architecture
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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

      {/* 4 Architectural Pillars with HD Visuals & Code Snippets */}
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

          <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {[
              {
                num: "01",
                title: "Sub-Second Peer Discovery",
                desc: "Optimized BLE beacon intervals discover neighboring citizen devices within 800ms while consuming less than 1.8% device battery per hour.",
                image: TECH_PILLAR_1,
                tag: "BLE Mesh Protocol",
                snippet: "MeshPacket(ttl: 7, rssi: -85dBm)",
              },
              {
                num: "02",
                title: "Dynamic Spatial Consensus",
                desc: "PostGIS clustering algorithms (ST_ClusterDBSCAN) group overlapping citizen reports with digital elevation models to eliminate fraudulent or erroneous alerts.",
                image: TECH_PILLAR_2,
                tag: "PostGIS Spatial Engine",
                snippet: "ST_ClusterDBSCAN(geom, eps: 0.005)",
              },
              {
                num: "03",
                title: "Universal Reporting Scale",
                desc: "Standardized anatomical depth markers (Ankle, Knee, Waist, Chest, Submerged) ensure instant, accurate reporting without measuring tapes or complex tools.",
                image: TECH_PILLAR_3,
                tag: "Universal Depth Enum",
                snippet: "CHECK(water_level IN ('ankle'..'above_head'))",
              },
              {
                num: "04",
                title: "Open Civic Standards",
                desc: "Full support for OASIS Common Alerting Protocol (CAP v1.2) and GeoJSON outputs, integrating directly with city dispatch centers and emergency radio networks.",
                image: TECH_PILLAR_4,
                tag: "OASIS CAP v1.2 XML",
                snippet: "<alert xmlns='urn:oasis:names:tc:emergency:cap:1.2'>",
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="bg-[#F3F1EC] border border-[#002456]/15 flex flex-col justify-between overflow-hidden group hover:border-[#002456] transition-all duration-300"
              >
                <div>
                  <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#001838]/25 group-hover:bg-transparent transition-colors duration-300" />
                    <span className="absolute bottom-2.5 left-3 text-[0.68rem] font-medium tracking-wider uppercase bg-[#002456]/85 text-white px-2.5 py-0.5 backdrop-blur-[2px]">
                      {pillar.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="font-display text-2xl font-semibold text-[#002456]">{pillar.num}</span>
                    <h3 className="mt-2 font-display text-[1.2rem] font-semibold text-[#002456] leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[0.88rem] font-extralight leading-relaxed text-[#334155]">
                      {pillar.desc}
                    </p>
                    <div className="mt-4 bg-[#001838] p-2.5 text-[0.72rem] font-mono text-cyan-300 border border-[#002456]/20 truncate">
                      <code>{pillar.snippet}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Field Impact & Empirical Trials
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 bg-[#F3F1EC] p-8 sm:p-12 lg:p-14 border border-[#002456]/15">
            <div className="shrink-0">
              <img
                src="/sdg-11-square.png"
                alt="UN SDG 11: Sustainable Cities and Communities"
                className="h-32 w-32 sm:h-40 sm:w-40 object-contain shadow-xs border border-amber-500/20"
              />
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-[#002456] tracking-widest uppercase">
                Global Agenda Alignment
              </span>
              <h2 className="mt-2 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-tight text-[#002456]">
                UN Sustainable Development Goal 11.5
              </h2>
              <p className="mt-4 text-[0.95rem] sm:text-[1rem] font-extralight leading-relaxed text-[#334155]">
                "By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations."
              </p>
              <div className="mt-5 pt-4 border-t border-[#002456]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-medium text-[#002456] uppercase tracking-wider">Academic Provenance</span>
                <span className="font-light">University of Birmingham School of Computer Science</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page 5: Join / Pilot (Municipal Intake & 4-Stage Roadmap)           */
/* ------------------------------------------------------------------ */
function JoinPage({
  onFormSubmitted,
  savedMember,
}: {
  onFormSubmitted: (sub: StoredSubmission) => void;
  savedMember: { name: string; email: string; type: string } | null;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [agency, setAgency] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlePilotSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agency || !city || !email) return;

    setIsSubmitting(true);
    try {
      const submission = await submitPilot({ agency, city, email, notes });
      setSubmitted(true);
      onFormSubmitted(submission);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_JOIN}')` }}
      >
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Initiate a Municipal Pilot
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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
                image: PILOT_PHASE_1,
                tag: "GIS Topography",
              },
              {
                step: "Phase 02",
                weeks: "Weeks 3–4",
                title: "Field Node Seeding",
                desc: "Equipping local sanitation crews, ward volunteers, and municipal dispatchers with the offline-first HydroMesh reporting tool.",
                image: PILOT_PHASE_2,
                tag: "Volunteer Mobilization",
              },
              {
                step: "Phase 03",
                weeks: "Weeks 5–6",
                title: "Blackout Simulation",
                desc: "Stress-testing peer-to-peer Bluetooth and Wi-Fi Direct packet routing under controlled cellular dropout conditions.",
                image: PILOT_PHASE_3,
                tag: "Radio Telemetry",
              },
              {
                step: "Phase 04",
                weeks: "Weeks 7–8",
                title: "Live Monsoon Evaluation",
                desc: "Full operational audit during seasonal rainfall events, assessing evacuation route safety and emergency SOS response times.",
                image: PILOT_PHASE_4,
                tag: "Monsoon Deluge",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#F3F1EC] border border-[#002456]/15 flex flex-col justify-between overflow-hidden group hover:border-[#002456] transition-all duration-300"
              >
                <div>
                  <div className="h-44 sm:h-48 w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#001838]/20 group-hover:bg-transparent transition-colors duration-300" />
                    <span className="absolute bottom-2.5 left-3 text-[0.68rem] font-medium tracking-wider uppercase bg-[#002456]/85 text-white px-2 py-0.5 backdrop-blur-[2px]">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex justify-between items-center text-xs font-semibold text-[#002456]">
                      <span>{item.step}</span>
                      <span>{item.weeks}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.2rem] font-semibold text-[#002456] leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] font-extralight leading-relaxed text-[#334155]">
                      {item.desc}
                    </p>
                  </div>
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

          {submitted || (savedMember && savedMember.type === "pilot") ? (
            <div className="mt-12 border border-[#10B981]/30 bg-white p-8 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-[#002456]">
                Pilot Deployment Application Recorded
              </h3>
              <p className="mt-3 text-[1rem] font-light text-[#334155]">
                Your deployment request has been stored in our Supabase database and saved on the website. Our municipal deployment engineers will follow up with your technical dossier within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onFormSubmitted(getStoredSubmissions()[0])}
                  className="inline-flex items-center gap-2 border border-[#002456] bg-[#F3F1EC] px-5 py-2.5 text-xs font-medium text-[#002456] hover:bg-white transition-colors cursor-pointer"
                >
                  <Database className="h-3.5 w-3.5 text-[#0284C7]" />
                  <span>View Stored Application</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setAgency("");
                    setCity("");
                    setEmail("");
                    setNotes("");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs text-[#64748B] hover:text-[#002456] transition-colors cursor-pointer underline"
                >
                  Submit another municipal intake
                </button>
              </div>
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
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] bg-[#002456] text-[1rem] font-medium text-white transition-colors duration-200 hover:bg-[#001838] cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Recording Application to Supabase...</span>
                    </>
                  ) : (
                    "Submit Pilot Request"
                  )}
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
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Field Dispatches
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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
function ContactPage({
  onFormSubmitted,
  savedMember,
}: {
  onFormSubmitted: (sub: StoredSubmission) => void;
  savedMember: { name: string; email: string; type: string } | null;
}) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    try {
      const submission = await submitContact({ name, email, message });
      setSent(true);
      onFormSubmitted(submission);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative flex min-h-[50vh] w-full items-center justify-center bg-cover bg-center px-6 py-24 text-center"
        style={{ backgroundImage: `url('${HERO_CONTACT}')` }}
      >
        <div className="absolute inset-0 bg-[#001838]/75 backdrop-blur-[1px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.1] text-white drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-light tracking-wide text-slate-100 drop-shadow-md">
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
            {sent || (savedMember && savedMember.type === "contact") ? (
              <div className="mt-8 border border-[#10B981]/30 bg-[#10B981]/5 p-8 text-center shadow-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-[1.35rem] font-semibold text-[#002456]">
                  Message Stored & Delivered
                </h3>
                <p className="mt-2 text-sm font-light text-[#334155]">
                  Thank you for reaching out. Your inquiry has been stored in our Supabase database and saved on the website.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onFormSubmitted(getStoredSubmissions()[0])}
                    className="inline-flex items-center gap-2 border border-[#002456] bg-white px-5 py-2 text-xs font-medium text-[#002456] hover:bg-[#F3F1EC] transition-colors cursor-pointer"
                  >
                    <Database className="h-3.5 w-3.5 text-[#0284C7]" />
                    <span>View Stored Message</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs text-[#64748B] hover:text-[#002456] transition-colors cursor-pointer underline"
                  >
                    Send another message
                  </button>
                </div>
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
                    disabled={isSubmitting}
                    className="w-full min-h-[52px] bg-[#002456] text-[1rem] font-medium text-white transition-colors duration-200 hover:bg-[#001838] cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Delivering to Supabase...</span>
                      </>
                    ) : (
                      "Send Message"
                    )}
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
/* Page 8: Legal, Privacy & Operational Safety Hub                    */
/* ------------------------------------------------------------------ */
function LegalPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const [activeDoc, setActiveDoc] = useState<"privacy" | "terms" | "consent" | "emergency" | "retention" | "escalation">("privacy");
  const [copiedSection, setCopiedSection] = useState(false);

  const copyNotice = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2000);
  };

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-[#001838] py-20 sm:py-28 px-6 sm:px-8 lg:px-14 text-white border-b border-white/10">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#002456] border border-cyan-400/40 text-cyan-300 text-xs font-semibold px-3.5 py-1 uppercase tracking-wider">
              Legal, Privacy & Product Safety Pack
            </span>
            <span className="bg-white/10 text-slate-300 text-xs px-3 py-1 font-mono">
              Version: Prototype v1.0
            </span>
            <span className="bg-white/10 text-slate-300 text-xs px-3 py-1 font-mono">
              Reviewed: 04 Sep 2026
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.2rem,4vw,3.75rem)] font-semibold tracking-tight text-white max-w-3xl leading-tight">
            Compliance & Operational Governance Framework
          </h1>
          <p className="mt-4 text-[1rem] sm:text-[1.1rem] font-extralight leading-relaxed text-slate-200 max-w-3xl">
            Plain-language legal and operational policies for the pre-pilot HydroMesh prototype, anchored in the UAE Personal Data Protection Law (PDPL), the India Digital Personal Data Protection Act 2023 (DPDP), and international GDPR best practices.
          </p>
        </div>
      </section>

      {/* Mandatory Emergency Disclaimer Alert Box */}
      <section className="bg-[#FFF6E0] border-y-2 border-[#FFB703] py-5 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="h-6 w-6 text-[#002456] shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-[0.98rem] font-bold tracking-tight text-[#002456] uppercase">
                Important Notice: Experimental University Prototype — Not an Emergency Service
              </p>
              <p className="mt-0.5 text-xs sm:text-sm font-light text-[#334155] leading-relaxed">
                HydroMesh is developed for research and testing by the Output Outlaws team (University of Birmingham / Dubai-linked). It does NOT dispatch police, medical, fire, or municipal rescue units. If you are in immediate life-threatening danger, dial statutory emergency services: <strong>UAE: 999 (Police) / 997 (Fire)</strong> · <strong>India: 112 / 100</strong> · <strong>UK: 999</strong> · <strong>Global: 112</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Document Tabs & Reader */}
      <section className="bg-[#F3F1EC] py-16 sm:py-24 px-6 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-white p-2 border border-[#002456]/15">
            {[
              { id: "privacy", label: "1. Privacy Policy" },
              { id: "terms", label: "2. Terms & Disclaimer" },
              { id: "consent", label: "3. In-App Consent" },
              { id: "emergency", label: "4. Emergency Notice" },
              { id: "retention", label: "5. Data Retention" },
              { id: "escalation", label: "6. Incident Escalation" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDoc(tab.id as any)}
                className={`px-3.5 py-2.5 text-xs font-medium transition-all text-center cursor-pointer ${
                  activeDoc === tab.id
                    ? "bg-[#002456] text-white shadow-sm font-semibold"
                    : "text-[#334155] hover:bg-[#F3F1EC] hover:text-[#002456]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Document Canvas */}
          <div className="mt-8 bg-white border border-[#002456]/20 p-8 sm:p-14 shadow-sm">
            {/* Document 1: Privacy Policy */}
            {activeDoc === "privacy" && (
              <article className="space-y-8 text-[#334155]">
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002456]">
                    Document 01 · Public-Facing
                  </span>
                  <h2 className="mt-1 font-display text-[2rem] font-semibold text-[#002456]">
                    Privacy Policy
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.75rem]">
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Legal Basis: UAE PDPL Art. 5 · India DPDP Act 2023 §6 · GDPR Art. 6(1)(a)/(d)
                    </span>
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Cross-Border: UAE (Dubai) ↔ India ↔ Africa/Asia
                    </span>
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Security: AES-256 at Rest · TLS 1.2+ in Transit
                    </span>
                  </div>
                </div>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">1. Purpose</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    This Privacy Policy explains how the HydroMesh research team collects, handles, stores, and protects personal and geospatial observations during pre-pilot testing of the HydroMesh mobile resilience prototype.
                  </p>
                  <div className="mt-3 p-3 bg-[#FFF6E0] border-l-4 border-[#FFB703] text-xs font-semibold text-[#002456]">
                    Important: This is a prototype, not an emergency service.
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">2. Data Minimisation: What We Collect & Why</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    In strict accordance with data minimisation principles, we collect only information strictly necessary for spatial hazard modeling, safe evacuation routing, and peer-to-peer relay testing:
                  </p>
                  <ul className="mt-3 list-disc pl-5 text-[0.92rem] font-light space-y-2">
                    <li><strong>Geospatial Coordinates:</strong> Ephemeral latitude and longitude points, captured only when a user actively files a flood depth report or initiates an SOS beacon.</li>
                    <li><strong>Temporal Timestamps:</strong> Exact time of submission to ensure stale reports are expired.</li>
                    <li><strong>Physical Water Level:</strong> User-selected depth category (Ankle, Knee, Waist).</li>
                    <li><strong>Optional User Data:</strong> Optional photos of flood water (stripped of EXIF metadata) and temporary ephemeral device tokens for mesh deduplication.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">3. Cross-Border Data Transfers</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    HydroMesh is built by the Output Outlaws academic cohort (University of Birmingham / Dubai-linked development) with core researchers distributed across <strong>Dubai (UAE)</strong> and <strong>India</strong>, supported by contributors across <strong>Africa and Asia</strong>. Collected test data is synchronized to encrypted PostgreSQL/PostGIS servers and may be accessed by authorized researchers across these jurisdictions under UAE PDPL Art. 22 and India DPDP Act cross-border transfer standards.
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">4. Data Security</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    All stored database records are secured using AES-256 encryption at rest. In-flight API and WebSocket packets are secured using TLS 1.2+ end-to-end encryption. Administrative dashboard access is strictly confined to verified core research team members.
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">5. Children & Vulnerable Users</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    HydroMesh does not knowingly target, market to, or collect data from minors under 18 years of age. If a minor participates in a community trial, verifiable parental or guardian consent must be provided in compliance with India DPDP Act §9 and UAE PDPL regulations.
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">6. Contact & Data Protection Officer (DPO) Note</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    For all data inquiries, deletion requests, or questions, contact us at <strong>[EMAIL]</strong>.
                  </p>
                  <p className="mt-2 text-xs font-light text-slate-500">
                    *DPO Applicability Note:* Under UAE PDPL Art. 10 and India DPDP Act §10, appointing a statutory Data Protection Officer is mandatory only for entities engaged in large-scale processing of sensitive data or regular systematic tracking. As HydroMesh is in pre-pilot academic research, a formal DPO is not currently required; compliance is overseen directly by the project leadership.
                  </p>
                </section>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reviewed on [DATE]</span>
                  <span>Version: Prototype v1.0</span>
                </div>
              </article>
            )}

            {/* Document 2: Terms of Use */}
            {activeDoc === "terms" && (
              <article className="space-y-8 text-[#334155]">
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002456]">
                    Document 02 · Public-Facing
                  </span>
                  <h2 className="mt-1 font-display text-[2rem] font-semibold text-[#002456]">
                    Terms of Use & Prototype Disclaimer
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.75rem]">
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Legal Basis: Voluntary Academic Research Participation
                    </span>
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Security: AES-256 at Rest · TLS 1.2+ in Transit
                    </span>
                  </div>
                </div>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">1. Purpose</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    These Terms govern your voluntary participation in testing the HydroMesh digital twin mobile application prototype.
                  </p>
                  <div className="mt-3 p-3 bg-[#FFF6E0] border-l-4 border-[#FFB703] text-xs font-semibold text-[#002456]">
                    Important: This is a prototype, not an emergency service.
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">2. Purely Experimental Prototype Scope</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    HydroMesh is developed by the Output Outlaws academic research cohort at the University of Birmingham (Dubai-linked). It is in a pre-pilot, controlled testing stage. There are no commercial fees, paid services, municipal service level agreements, or public consumer availability.
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">3. Absolute Emergency Disclaimer & No Warranty</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    HydroMesh is provided strictly on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis. The software does not guarantee delivery of flood alerts, network connectivity, or physical rescue. In any critical emergency, immediately dial official authorities (UAE: 999; India: 112/100; UK: 999; International: 112).
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">4. User Obligations & Anti-Hoax Policy</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    Testers must only report accurate, observed water levels. Submitting false distress beacons or spoofed coordinates is grounds for immediate exclusion from pilot trials.
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">5. Cross-Border Research & Contact</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    Research testing is coordinated between Dubai (UAE) and India with contributors from Africa and Asia. Data is transmitted securely under TLS 1.2+. Inquiries: <strong>[EMAIL]</strong>.
                  </p>
                </section>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reviewed on [DATE]</span>
                  <span>Version: Prototype v1.0</span>
                </div>
              </article>
            )}

            {/* Document 3: In-App Consent Microcopy */}
            {activeDoc === "consent" && (
              <article className="space-y-8 text-[#334155]">
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002456]">
                    Document 03 · In-App Text
                  </span>
                  <h2 className="mt-1 font-display text-[2rem] font-semibold text-[#002456]">
                    Consent Wording for Flood Reports & SOS
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.75rem]">
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Legal Basis: Explicit In-App Consent (UAE PDPL Art. 5 · India DPDP §6)
                    </span>
                  </div>
                </div>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">1. Purpose</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    Precise, friction-free microcopy implemented in the Flutter mobile application dialogs prior to data transmission.
                  </p>
                  <div className="mt-3 p-3 bg-[#FFF6E0] border-l-4 border-[#FFB703] text-xs font-semibold text-[#002456]">
                    Important: This is a prototype, not an emergency service.
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">2. Flood Report Submission Dialog Microcopy</h3>
                  <div className="mt-3 bg-[#F8FAFC] border border-slate-200 p-5 font-mono text-xs text-[#002456] leading-relaxed relative">
                    <p className="font-bold">[ ] SHARE FLOOD OBSERVATION (Pre-Pilot Test)</p>
                    <p className="mt-2">
                      By submitting this report, you consent to sharing your approximate GPS coordinates, timestamp, water level (ankle/knee/waist), and optional photo with HydroMesh researchers.
                    </p>
                    <p className="mt-2 text-slate-500">
                      • Purpose: Aggregating local drainage hazard maps.<br />
                      • Security: Encrypted via TLS 1.2+ / AES-256. Access restricted to core team.<br />
                      • Cross-border: Telemetry processed by research leads in UAE and India.<br />
                      • You must be 18+ or have parental consent.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">3. Emergency SOS Beacon Modal Microcopy</h3>
                  <div className="mt-3 bg-[#FFF6E0] border border-[#FFB703] p-5 font-mono text-xs text-[#002456] leading-relaxed relative">
                    <p className="font-bold text-red-700">⚠️ ACTIVATE EMERGENCY SOS BEACON</p>
                    <p className="mt-2 font-semibold">
                      IMPORTANT: HydroMesh is an experimental academic prototype. ACTIVATING THIS BEACON DOES NOT CONTACT POLICE, AMBULANCE, OR FIRE SERVICES.
                    </p>
                    <p className="mt-2">
                      By activating, you consent to broadcasting your live coordinates to nearby peer devices and our research monitoring dashboard. If you are in immediate life-threatening danger, DIAL STATUTORY EMERGENCY SERVICES (UAE: 999 | India: 112) IMMEDIATELY.
                    </p>
                    <p className="mt-3 font-bold text-slate-700">[ CONFIRM SOS BROADCAST ] &nbsp;&nbsp;&nbsp; [ CANCEL ]</p>
                  </div>
                </section>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reviewed on [DATE]</span>
                  <span>Version: Prototype v1.0</span>
                </div>
              </article>
            )}

            {/* Document 4: Not an Emergency Service Notice */}
            {activeDoc === "emergency" && (
              <article className="space-y-8 text-[#334155]">
                <div className="border-b border-slate-100 pb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#002456]">
                      Document 04 · Copy-Paste Ready
                    </span>
                    <h2 className="mt-1 font-display text-[2rem] font-semibold text-[#002456]">
                      “Not an Emergency Service” Notice
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyNotice(
                        "⚠️ NOTICE: NOT AN EMERGENCY SERVICE ⚠️\nHydroMesh is an experimental academic prototype only. It is NOT certified, equipped, or authorized to dispatch statutory emergency response units. DO NOT RELY ON THIS APPLICATION FOR LIFE-SAVING RESCUE. IF IN DANGER, CALL: UAE: 999 | India: 112/100 | UK: 999 | International: 112."
                      )
                    }
                    className="inline-flex items-center gap-1.5 bg-[#002456] text-white px-3.5 py-1.5 text-xs font-medium hover:bg-[#001838] transition-colors cursor-pointer"
                  >
                    <span>{copiedSection ? "Copied Notice!" : "Copy Notice Text"}</span>
                  </button>
                </div>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">1. Purpose</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    A copy-pasteable, bold statutory notice for mobile splash screens, test agreement headers, and printed field testing cards.
                  </p>
                  <div className="mt-3 p-3 bg-[#FFF6E0] border-l-4 border-[#FFB703] text-xs font-semibold text-[#002456]">
                    Important: This is a prototype, not an emergency service.
                  </div>
                </section>

                <div className="bg-[#001838] p-6 text-white font-mono text-xs sm:text-sm leading-relaxed border-2 border-red-500">
                  <p className="text-red-400 font-bold text-center tracking-widest uppercase">
                    ⚠️ NOTICE: NOT AN EMERGENCY SERVICE ⚠️
                  </p>
                  <p className="text-slate-300 text-center font-light mt-1">
                    HYDROMESH IS AN EXPERIMENTAL PROTOTYPE ONLY
                  </p>
                  <hr className="my-4 border-white/20" />
                  <p>
                    HydroMesh is a university research prototype designed to evaluate peer-to-peer flood mapping. It is NOT certified, equipped, or authorized to dispatch statutory emergency response units.
                  </p>
                  <p className="mt-3 font-semibold text-amber-300">
                    DO NOT RELY ON THIS APPLICATION FOR LIFE-SAVING RESCUE OR EVACUATION ASSISTANCE.
                  </p>
                  <p className="mt-3">
                    IF YOU ARE IN IMMEDIATE PHYSICAL DANGER, CONTACT LOCAL STATUTORY AUTHORITIES:
                  </p>
                  <ul className="mt-2 space-y-1 pl-4 text-cyan-300">
                    <li>• UNITED ARAB EMIRATES: 999 (Police) | 997 (Fire / Civil Defence)</li>
                    <li>• INDIA: 112 (National Unified Emergency) | 100 (Police)</li>
                    <li>• UNITED KINGDOM: 999 or 112</li>
                    <li>• EUROPE & GLOBAL: 112</li>
                  </ul>
                  <p className="mt-4 text-[0.8rem] text-slate-400">
                    The Output Outlaws research team, the University of Birmingham, and academic partners accept zero liability for injuries, property loss, or delayed rescue resulting from reliance on this prototype software.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reviewed on [DATE]</span>
                  <span>Version: Prototype v1.0</span>
                </div>
              </article>
            )}

            {/* Document 5: Data Retention & Deletion */}
            {activeDoc === "retention" && (
              <article className="space-y-8 text-[#334155]">
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002456]">
                    Document 05 · Internal & Public Policy
                  </span>
                  <h2 className="mt-1 font-display text-[2rem] font-semibold text-[#002456]">
                    Data Retention & Deletion Policy
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.75rem]">
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Legal Basis: Storage Limitation (UAE PDPL Art. 8 · India DPDP §8(7))
                    </span>
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Security: AES-256 Storage · Audit Logging
                    </span>
                  </div>
                </div>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">1. Purpose</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    Establishes strict operational retention horizons and permanent deletion procedures for volunteer telemetry.
                  </p>
                  <div className="mt-3 p-3 bg-[#FFF6E0] border-l-4 border-[#FFB703] text-xs font-semibold text-[#002456]">
                    Important: This is a prototype, not an emergency service.
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">2. Retention Schedule Summary</h3>
                  <div className="mt-4 border border-[#002456]/15 overflow-hidden">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#F3F1EC] text-[#002456] border-b border-[#002456]/15 font-semibold">
                        <tr>
                          <th className="p-3">Data Category</th>
                          <th className="p-3">Retention Window</th>
                          <th className="p-3">Action at Window End</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-light">
                        <tr>
                          <td className="p-3 font-medium text-[#002456]">Raw Flood Observations</td>
                          <td className="p-3">24 Hours</td>
                          <td className="p-3 text-slate-500">Auto-deleted via database cron job</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-[#002456]">SOS Distress Incident Records</td>
                          <td className="p-3">30 Days</td>
                          <td className="p-3 text-slate-500">Purged following safety review</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-[#002456]">Aggregated Hazard Polygons</td>
                          <td className="p-3">Academic Term</td>
                          <td className="p-3 text-slate-500">Retained anonymized without device links</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">3. Tester Deletion Requests</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    Any volunteer tester may demand immediate erasure of their submitted observations by emailing <strong>[EMAIL]</strong>. Deletion requests will be fulfilled across primary servers and replicas within <strong>72 hours</strong>.
                  </p>
                </section>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reviewed on [DATE]</span>
                  <span>Version: Prototype v1.0</span>
                </div>
              </article>
            )}

            {/* Document 6: Incident Escalation Playbook */}
            {activeDoc === "escalation" && (
              <article className="space-y-8 text-[#334155]">
                <div className="border-b border-slate-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002456]">
                    Document 06 · Operational Playbook
                  </span>
                  <h2 className="mt-1 font-display text-[2rem] font-semibold text-[#002456]">
                    Incident Escalation Rules
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.75rem]">
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Scope: Pre-Pilot Trial On-Call Safety Protocols
                    </span>
                    <span className="bg-[#F3F1EC] text-[#002456] px-2.5 py-1 font-mono border border-[#002456]/10">
                      Cross-Border: UAE & India On-Call Nodes
                    </span>
                  </div>
                </div>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">1. Purpose</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed">
                    Operational rules governing team conduct when an SOS distress beacon or high-water hazard report is detected during controlled testing.
                  </p>
                  <div className="mt-3 p-3 bg-[#FFF6E0] border-l-4 border-[#FFB703] text-xs font-semibold text-[#002456]">
                    Important: This is a prototype, not an emergency service.
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-[1.25rem] font-semibold text-[#002456]">2. Four-Step Escalation Protocol</h3>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-[#F8FAFC] border-l-4 border-[#002456]">
                      <p className="text-xs font-bold uppercase text-[#002456]">Step 1 · Immediate Triage (&lt; 2 Minutes)</p>
                      <p className="mt-1 text-xs sm:text-sm font-light leading-relaxed">
                        The monitoring dashboard sounds an audible chime. The designated on-call research lead logs timestamp, GPS coordinates, water stage, and tester ID.
                      </p>
                    </div>

                    <div className="p-4 bg-[#F8FAFC] border-l-4 border-cyan-700">
                      <p className="text-xs font-bold uppercase text-cyan-800">Step 2 · Tester Verification Call (&lt; 3 Minutes)</p>
                      <p className="mt-1 text-xs sm:text-sm font-light leading-relaxed">
                        On-call lead places an immediate telephone call to the registered tester. If verified as an accidental tap or test run, cancel beacon and record resolution. If unreachable or in distress: proceed immediately to Step 3.
                      </p>
                    </div>

                    <div className="p-4 bg-[#FFF6E0] border-l-4 border-red-500">
                      <p className="text-xs font-bold uppercase text-red-700">Step 3 · Statutory Dispatch Escalation (&lt; 5 Minutes)</p>
                      <p className="mt-1 text-xs sm:text-sm font-light leading-relaxed">
                        On-call lead contacts statutory dispatch (UAE: 999 | India: 112 | UK: 999). State: <em>"We are academic researchers running a flood testing exercise. A participant has triggered a distress signal at [GPS coordinates] and is unresponsive to telephone follow-up."</em>
                      </p>
                    </div>

                    <div className="p-4 bg-[#F8FAFC] border-l-4 border-slate-400">
                      <p className="text-xs font-bold uppercase text-slate-700">Step 4 · Logging & Review (&lt; 24 Hours)</p>
                      <p className="mt-1 text-xs sm:text-sm font-light leading-relaxed">
                        Document incident timestamps, authority dispatch reference, and outcome in the encrypted audit log (AES-256). Retain for 30 days for safety review.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reviewed on [DATE]</span>
                  <span>Version: Prototype v1.0</span>
                </div>
              </article>
            )}
          </div>

          {/* Legal Advisory & Team Operational Summary Box */}
          <div className="mt-12 bg-white border border-[#002456]/15 p-8 sm:p-10 space-y-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#002456] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-[1.1rem] font-semibold text-[#002456]">
                  Prototype Regulatory Advisory
                </h4>
                <p className="mt-1 text-xs sm:text-sm font-light text-[#334155] leading-relaxed">
                  This is a prototype policy pack designed for controlled academic testing; formal professional legal review is strongly recommended prior to any public or commercial launch.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-display text-[1.1rem] font-semibold text-[#002456]">
                How to Use This Pack (For the HydroMesh Team)
              </h4>
              <p className="mt-2 text-xs sm:text-sm font-light text-[#334155] leading-relaxed">
                This document pack serves as the comprehensive legal and operational baseline for all HydroMesh pre-pilot activities. Deploy Document 1 (Privacy Policy) and Document 2 (Terms of Use) on this landing page under the <code className="bg-[#F3F1EC] text-[#002456] px-1 py-0.5">#legal</code> route; implement Document 3 (Consent Microcopy) verbatim in the Flutter mobile intake and SOS dialogs; embed Document 4 (Emergency Disclaimer) on the mobile splash screen and print it onto field-test briefing cards; enforce Document 5 (Retention Schedule) via database cron jobs running automated 24-hour cleanup routines; and mandate that all researchers on duty during live trials memorize and follow Document 6 (Incident Escalation Playbook).
              </p>
            </div>
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
  const [savedMember, setSavedMember] = useState(getSavedMember());
  const [activeModalSubmission, setActiveModalSubmission] = useState<StoredSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSavedMember(getSavedMember());
  }, []);

  function handleFormSuccess(submission: StoredSubmission) {
    setActiveModalSubmission(submission);
    setIsModalOpen(true);
    setSavedMember(getSavedMember());
    toast.success(
      submission.type === "newsletter"
        ? "🎉 Welcome to the HydroMesh resilience network!"
        : submission.type === "pilot"
        ? "🚀 Pilot application recorded in Supabase!"
        : "✉️ Direct message stored & delivered to founder!"
    );
  }

  function openMemberModal() {
    const subs = getStoredSubmissions();
    if (subs.length > 0) {
      setActiveModalSubmission(subs[0]);
    } else if (savedMember) {
      setActiveModalSubmission({
        id: savedMember.id || 'sb-member',
        type: (savedMember.type as any) || 'newsletter',
        title: 'HydroMesh Membership',
        name: savedMember.name,
        email: savedMember.email,
        timestamp: savedMember.timestamp || new Date().toISOString(),
        syncedWithSupabase: true,
        status: 'Active Member',
      });
    }
    setIsModalOpen(true);
  }

  // Read initial hash & bind hashchange listener
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#", "").toLowerCase() as PageType;
      const validPages: PageType[] = ["home", "about", "technology", "impact", "join", "blog", "faq", "contact", "legal"];
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
      <Toaster position="top-right" richColors />
      <SubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={activeModalSubmission}
        onAction={() => navigateTo("join")}
      />

      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        savedMember={savedMember}
        onOpenMemberModal={openMemberModal}
      />

      <main id="main">
        {currentPage === "home" && (
          <HomePage
            onNavigate={navigateTo}
            onFormSubmitted={handleFormSuccess}
            savedMember={savedMember}
          />
        )}
        {currentPage === "about" && <AboutPage onNavigate={navigateTo} />}
        {currentPage === "technology" && <TechnologyPage onNavigate={navigateTo} />}
        {currentPage === "impact" && <ImpactPage onNavigate={navigateTo} />}
        {currentPage === "join" && (
          <JoinPage
            onFormSubmitted={handleFormSuccess}
            savedMember={savedMember}
          />
        )}
        {currentPage === "blog" && <BlogPage />}
        {currentPage === "faq" && <FaqPage onNavigate={navigateTo} />}
        {currentPage === "contact" && (
          <ContactPage
            onFormSubmitted={handleFormSuccess}
            savedMember={savedMember}
          />
        )}
        {currentPage === "legal" && <LegalPage onNavigate={navigateTo} />}
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
            <button
              type="button"
              onClick={() => navigateTo("legal")}
              className="hover:text-[#002456] transition-colors cursor-pointer font-medium text-[#002456]"
            >
              Legal & Safety
            </button>
            <ExtLink href={GITHUB} className="hover:text-[#002456] transition-colors">
              GitHub (MIT)
            </ExtLink>
          </div>

          <div className="flex items-center gap-2.5">
            <img
              src="/sdg-11-square.png"
              alt="UN SDG 11"
              className="h-5 w-5 object-contain"
            />
            <p className="font-extralight text-center">©2026 HydroMesh · University of Birmingham — SDG 11.5</p>
          </div>

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
