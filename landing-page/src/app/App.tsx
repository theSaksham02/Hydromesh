import { useState, type FormEvent, type ReactNode } from "react";
import { Menu, X, Facebook, Twitter, Linkedin } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Assets matching the HydroMesh flood resilience topic               */
/* ------------------------------------------------------------------ */
// Atmospheric urban rainfall & storm water
const HERO_FLOOD =
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2400&q=85";

// 3 Full-bleed photos for the stat banner (Rain, Flooded road, Response team)
const STAT_RAIN_OBSERVATION =
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const STAT_FLOOD_WATER =
  "https://images.unsplash.com/photo-1547683905-f686c799ddf0?auto=format&fit=crop&w=1200&q=80";
const STAT_COMMUNITY_TEAM =
  "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80";

// 50/50 Split Right Image: Rushing stormwater channel / urban drainage surge
const PHOTO_SURGE_WATER =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1600&q=85";

// 6-Photo Mosaic Grid: Urban flood situations, stormwater, drainage & response
const MOSAIC_1 =
  "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80";
const MOSAIC_2 =
  "https://images.unsplash.com/photo-1547683905-f686c799ddf0?auto=format&fit=crop&w=800&q=80";
const MOSAIC_3 =
  "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=800&q=80";
const MOSAIC_4 =
  "https://images.unsplash.com/photo-1428908728789-d2de25dbd9e5?auto=format&fit=crop&w=800&q=80";
const MOSAIC_5 =
  "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80";
const MOSAIC_6 =
  "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80";

const GITHUB = "https://github.com/theSaksham02/Hydromesh";
const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/saksham-mishra-91696222b/";

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
/* Header Navigation                                                  */
/* ------------------------------------------------------------------ */
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="mx-auto flex h-24 max-w-[1360px] items-center justify-between px-8 lg:px-14">
        {/* Brand Logo & Name */}
        <a href="#top" className="flex items-center gap-3.5" aria-label="HydroMesh Home">
          <svg
            className="h-10 w-10 text-[#002456]"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="20" cy="20" r="17" />
            <path d="M12 24 C14 18, 20 16, 26 22 C29 25, 33 22, 34 20" />
            <path d="M9 20 C13 14, 18 12, 23 16" />
          </svg>
          <span className="font-display text-[1.6rem] font-semibold tracking-tight text-[#002456]">
            HydroMesh
          </span>
        </a>

        {/* Clean, Simple Text Links (Poppins Light) */}
        <nav className="hidden items-center gap-10 text-[0.95rem] font-light text-[#002456] md:flex">
          <a href="#top" className="hover:opacity-75 transition-opacity">Home</a>
          <a href="#about" className="hover:opacity-75 transition-opacity">About</a>
          <a href="#join" className="hover:opacity-75 transition-opacity">Join</a>
          <a href="#how-it-works" className="hover:opacity-75 transition-opacity">How It Works</a>
          <a href="#contact" className="hover:opacity-75 transition-opacity">Contact</a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 text-[#002456] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-8 py-5 md:hidden flex flex-col gap-4 font-light text-[#002456]">
          <a href="#top" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#join" onClick={() => setOpen(false)}>Join</a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Main Application Component                                         */
/* ------------------------------------------------------------------ */
export default function App() {
  const [subscribed, setSubscribed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <div className="min-h-screen bg-white text-[#002456] antialiased selection:bg-[#002456] selection:text-white">
      <Header />

      <main id="main">
        {/* ========================================================= */}
        {/* 1. HERO SECTION                                           */}
        {/* Full-bleed flood/rainstorm photography + Poppins SemiBold */}
        {/* ========================================================= */}
        <section
          id="top"
          className="relative flex min-h-[82vh] w-full items-center justify-center bg-cover bg-center px-6 py-28 text-center"
          style={{
            backgroundImage: `url('${HERO_FLOOD}')`,
          }}
        >
          {/* Subtle water atmospheric wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/35 via-transparent to-sky-950/45" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold tracking-tight text-white leading-[1.05] drop-shadow-sm">
              Community Flood Intelligence
            </h1>
            <p className="mt-7 text-[clamp(1.15rem,2.2vw,1.55rem)] font-light text-white tracking-wide drop-shadow-sm">
              Take Action Before The Water Rises
            </p>
            <div className="mt-10">
              <a
                href="#join"
                className="inline-flex min-h-[52px] items-center justify-center bg-[#002456] px-10 text-[1rem] font-medium text-white transition-all duration-200 hover:bg-[#001838]"
              >
                Join the movement
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. THREE-COLUMN FULL-BLEED PHOTO STAT BANNER             */}
        {/* 3 photos of flood & rainfall with overlaid statistics     */}
        {/* ========================================================= */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 w-full gap-0">
          {/* Stat 1: Wards Mapped */}
          <div
            className="relative flex h-[380px] lg:h-[460px] items-center justify-center bg-cover bg-center text-center text-white px-6"
            style={{ backgroundImage: `url('${STAT_RAIN_OBSERVATION}')` }}
          >
            <div className="absolute inset-0 bg-[#002456]/45 transition-opacity hover:bg-[#002456]/35" />
            <div className="relative z-10">
              <p className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-tight">
                120
              </p>
              <h2 className="mt-4 font-display text-[1.45rem] font-semibold">
                Neighborhood Wards Mapped
              </h2>
            </div>
          </div>

          {/* Stat 2: Inundation Visibility */}
          <div
            className="relative flex h-[380px] lg:h-[460px] items-center justify-center bg-cover bg-center text-center text-white px-6"
            style={{ backgroundImage: `url('${STAT_FLOOD_WATER}')` }}
          >
            <div className="absolute inset-0 bg-[#002456]/45 transition-opacity hover:bg-[#002456]/35" />
            <div className="relative z-10">
              <p className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-tight">
                60K
              </p>
              <h2 className="mt-4 font-display text-[1.45rem] font-semibold">
                Hours of Drainage Visibility
              </h2>
            </div>
          </div>

          {/* Stat 3: Mesh Nodes */}
          <div
            className="relative flex h-[380px] lg:h-[460px] items-center justify-center bg-cover bg-center text-center text-white px-6"
            style={{ backgroundImage: `url('${STAT_COMMUNITY_TEAM}')` }}
          >
            <div className="absolute inset-0 bg-[#002456]/45 transition-opacity hover:bg-[#002456]/35" />
            <div className="relative z-10">
              <p className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] font-semibold leading-none tracking-tight">
                600
              </p>
              <h2 className="mt-4 font-display text-[1.45rem] font-semibold">
                Mesh Connected Nodes
              </h2>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. WHAT WE DO SECTION                                     */}
        {/* Clean white background, 3 circular line-art icons          */}
        {/* ========================================================= */}
        <section className="bg-white py-28 sm:py-36 px-8 lg:px-14">
          <div className="mx-auto max-w-[1240px] text-center">
            <h2 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-semibold tracking-tight text-[#002456]">
              What We Do
            </h2>

            <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-3 text-center">
              {/* Pillar 1: Sun & Wave */}
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

              {/* Pillar 2: Whale & Wave */}
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

              {/* Pillar 3: Twin Circular Loop */}
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

        {/* ========================================================= */}
        {/* 4. 50/50 SPLIT SECTION: HOW DOES IT WORK?                */}
        {/* Left: Warm sand/cream background with text & button       */}
        {/* Right: Full-bleed stormwater drainage channel              */}
        {/* ========================================================= */}
        <section id="how-it-works" className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left: Warm Sand / Cream Container */}
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
                <a
                  href="#join"
                  className="inline-flex min-h-[48px] items-center justify-center border border-[#002456] bg-transparent px-8 text-[0.95rem] font-light text-[#002456] transition-colors duration-200 hover:bg-[#002456] hover:text-white"
                >
                  Act Now
                </a>
              </div>
            </div>
          </div>

          {/* Right: Full Bleed Dramatic Stormwater Surge Photo */}
          <div
            className="min-h-[440px] lg:min-h-[660px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${PHOTO_SURGE_WATER}')` }}
            role="img"
            aria-label="Rushing stormwater surge channel"
          />
        </section>

        {/* ========================================================= */}
        {/* 5. 6-PHOTO FIELD MOSAIC GRID                             */}
        {/* Real urban flood, stormwater drainage, and recovery      */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-0">
          {[
            { img: MOSAIC_1, alt: "Heavy urban rain falling on pavement" },
            { img: MOSAIC_2, alt: "Submerged roadway monitored in real-time" },
            { img: MOSAIC_3, alt: "Municipal stormwater drainage surge" },
            { img: MOSAIC_4, alt: "Rain drops and water telemetry" },
            { img: MOSAIC_5, alt: "First responders and community team" },
            { img: MOSAIC_6, alt: "Storm clouds over urban watershed" },
          ].map((item, idx) => (
            <div key={idx} className="relative aspect-4/3 overflow-hidden group">
              <img
                src={item.img}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#002456]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </section>

        {/* ========================================================= */}
        {/* 6. SIGN UP TO OUR MAILING LIST                            */}
        {/* Clean minimalist underline form with Poppins typography   */}
        {/* ========================================================= */}
        <section id="join" className="bg-white py-28 sm:py-36 px-8 lg:px-14">
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
              <form onSubmit={handleSubmit} className="mt-16 text-left">
                {/* First Name & Last Name in 2 columns */}
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

                {/* Email Address full width */}
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

                {/* Checkbox */}
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

                {/* Full Width Solid Navy Button */}
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
      </main>

      {/* ========================================================= */}
      {/* 7. FOOTER                                                 */}
      {/* Matching Save Our Shores template footer                   */}
      {/* ========================================================= */}
      <footer id="contact" className="border-t border-slate-200 bg-white py-12 px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1360px] flex-col sm:flex-row items-center justify-between gap-6 text-[0.8125rem] text-slate-600">
          <div className="flex gap-6 font-light">
            <a href="#top" className="hover:text-[#002456] transition-colors">
              Terms & Conditions
            </a>
            <a href="#top" className="hover:text-[#002456] transition-colors">
              Privacy Policy
            </a>
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
