/**
 * HydroMesh Investor Pitch Deck — 15 slides
 * Palette: Navy #0B1F3A · Teal #00C6A7 · Amber #FFB703 · Grey #F4F6F8
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const {
  FiMapPin,
  FiAlertTriangle,
  FiUsers,
  FiEyeOff,
  FiSmartphone,
  FiNavigation,
  FiRadio,
  FiLayers,
  FiCheckCircle,
  FiClock,
  FiGitBranch,
  FiAward,
  FiDatabase,
  FiCloud,
  FiMonitor,
  FiTarget,
  FiMail,
  FiGithub,
  FiExternalLink,
  FiShield,
  FiActivity,
  FiMessageCircle,
  FiMap,
  FiCpu,
  FiArrowRight,
} = require("react-icons/fi");
const { MdOutlineFlood, MdOutlineEmergency } = require("react-icons/md");
const { HiOutlineLocationMarker } = require("react-icons/hi");

const C = {
  navy: "0B1F3A",
  teal: "00C6A7",
  amber: "FFB703",
  white: "FFFFFF",
  grey: "F4F6F8",
  softNavy: "132A4A",
  muted: "5A6A7A",
  lightTeal: "E6FAF6",
  lightAmber: "FFF6E0",
  lightRed: "FDECEC",
  cardBorder: "E2E8EE",
  built: "00C6A7",
  next: "FFB703",
  research: "3B82F6",
  future: "94A3B8",
};

const FONT = "Arial";

async function iconPng(Icon, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color: `#${color}`, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function shadowSoft() {
  return { type: "outer", color: "0B1F3A", blur: 10, offset: 3, opacity: 0.08 };
}

function addFooter(slide, text, dark = false) {
  slide.addText(text, {
    x: 0.5,
    y: 5.28,
    w: 9,
    h: 0.28,
    fontSize: 10,
    fontFace: FONT,
    color: dark ? "A8B8C8" : C.muted,
    margin: 0,
  });
}

async function build() {
  const icons = {
    mapPin: await iconPng(FiMapPin, C.teal),
    alert: await iconPng(FiAlertTriangle, C.amber),
    users: await iconPng(FiUsers, C.navy),
    eyeOff: await iconPng(FiEyeOff, "C0392B"),
    phone: await iconPng(FiSmartphone, C.teal),
    nav: await iconPng(FiNavigation, C.teal),
    radio: await iconPng(FiRadio, C.amber),
    layers: await iconPng(FiLayers, C.teal),
    check: await iconPng(FiCheckCircle, C.teal),
    clock: await iconPng(FiClock, C.navy),
    git: await iconPng(FiGitBranch, C.teal),
    award: await iconPng(FiAward, C.amber),
    db: await iconPng(FiDatabase, C.navy),
    cloud: await iconPng(FiCloud, C.teal),
    monitor: await iconPng(FiMonitor, C.navy),
    target: await iconPng(FiTarget, C.teal),
    mail: await iconPng(FiMail, C.teal),
    github: await iconPng(FiGithub, C.navy),
    link: await iconPng(FiExternalLink, C.teal),
    shield: await iconPng(FiShield, C.teal),
    activity: await iconPng(FiActivity, C.amber),
    chat: await iconPng(FiMessageCircle, C.navy),
    map: await iconPng(FiMap, C.teal),
    cpu: await iconPng(FiCpu, C.navy),
    arrow: await iconPng(FiArrowRight, C.teal),
    flood: await iconPng(MdOutlineFlood, C.teal),
    sos: await iconPng(MdOutlineEmergency, "C0392B"),
    loc: await iconPng(HiOutlineLocationMarker, C.teal),
    whiteCheck: await iconPng(FiCheckCircle, C.white),
    whitePhone: await iconPng(FiSmartphone, C.white),
    whiteMap: await iconPng(FiMap, C.white),
    whiteNav: await iconPng(FiNavigation, C.white),
    whiteSos: await iconPng(MdOutlineEmergency, C.white),
    whiteMonitor: await iconPng(FiMonitor, C.white),
    whiteUsers: await iconPng(FiUsers, C.white),
    whiteTarget: await iconPng(FiTarget, C.white),
    whiteCpu: await iconPng(FiCpu, C.white),
  };

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Output Outlaws | HydroMesh";
  pres.title = "HydroMesh — Street-level flood intelligence";
  pres.subject = "Investor / academic pitch deck";

  // ═══════════════════════════════════════════════════
  // SLIDE 1 — COVER
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.navy },
    });
    // abstract map grid motif
    for (let i = 0; i < 8; i++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.4 + i * 1.2, y: 0, w: 0.015, h: 5.625,
        fill: { color: "143456" },
      });
    }
    for (let i = 0; i < 5; i++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0.5 + i * 1.1, w: 10, h: 0.015,
        fill: { color: "143456" },
      });
    }
    // risk zone blobs
    s.addShape(pres.shapes.OVAL, {
      x: 6.8, y: 1.2, w: 2.4, h: 1.8,
      fill: { color: "00C6A7", transparency: 82 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 7.6, y: 2.8, w: 1.6, h: 1.2,
      fill: { color: "FFB703", transparency: 78 },
    });

    s.addText("HydroMesh", {
      x: 0.6, y: 1.35, w: 6.5, h: 0.7,
      fontSize: 48, fontFace: FONT, bold: true, color: C.white, margin: 0,
    });
    s.addText("Street-level flood intelligence for safer cities", {
      x: 0.6, y: 2.1, w: 6.8, h: 0.45,
      fontSize: 20, fontFace: FONT, color: C.teal, margin: 0,
    });
    s.addText("Community reports + climate data  →  faster local action", {
      x: 0.6, y: 2.7, w: 6.5, h: 0.35,
      fontSize: 14, fontFace: FONT, color: "A8B8C8", margin: 0,
    });

    // phone mock card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.35, y: 1.55, w: 2.05, h: 3.15, rectRadius: 0.18,
      fill: { color: C.softNavy }, shadow: shadowSoft(),
    });
    s.addImage({ data: icons.whitePhone, x: 8.05, y: 1.85, w: 0.45, h: 0.45 });
    s.addText("Flood report", {
      x: 7.5, y: 2.45, w: 1.75, h: 0.25,
      fontSize: 11, fontFace: FONT, bold: true, color: C.white, align: "center", margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.55, y: 2.85, w: 1.65, h: 0.55, rectRadius: 0.08,
      fill: { color: "1A3355" },
    });
    s.addText("Knee-deep water\nMain St · Just now", {
      x: 7.6, y: 2.9, w: 1.55, h: 0.5,
      fontSize: 9, fontFace: FONT, color: "A8B8C8", align: "center", margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.55, y: 3.55, w: 1.65, h: 0.4, rectRadius: 0.08,
      fill: { color: C.teal },
    });
    s.addText("Submit report", {
      x: 7.55, y: 3.6, w: 1.65, h: 0.3,
      fontSize: 10, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
    });
    s.addText("Live map · SOS", {
      x: 7.5, y: 4.15, w: 1.75, h: 0.25,
      fontSize: 9, fontFace: FONT, color: C.teal, align: "center", margin: 0,
    });

    s.addText("Output Outlaws  ·  University of Birmingham  ·  SDG 11", {
      x: 0.6, y: 4.55, w: 6.5, h: 0.28,
      fontSize: 12, fontFace: FONT, color: "8A9AAA", margin: 0,
    });
    s.addText("hydromesh.vercel.app  ·  github.com/theSaksham02/Hydromesh", {
      x: 0.6, y: 5.1, w: 7, h: 0.25,
      fontSize: 11, fontFace: FONT, color: "6A7A8A", margin: 0,
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 2 — THE PROBLEM
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.white },
    });
    s.addText("When floods change by the minute,\nbroad alerts are not enough.", {
      x: 0.5, y: 0.3, w: 9, h: 0.9,
      fontSize: 28, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    // Left card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 1.45, w: 4.35, h: 3.5, rectRadius: 0.12,
      fill: { color: C.grey }, shadow: shadowSoft(),
    });
    s.addText("CURRENT SITUATION", {
      x: 0.75, y: 1.7, w: 3.9, h: 0.3,
      fontSize: 11, fontFace: FONT, bold: true, color: C.teal, margin: 0, charSpacing: 1.5,
    });
    const leftItems = [
      { ic: icons.alert, t: "Broad warnings, no street-level data" },
      { ic: icons.chat, t: "Fragmented reports from residents" },
      { ic: icons.eyeOff, t: "Responders lack a unified operational view" },
    ];
    leftItems.forEach((it, i) => {
      const y = 2.25 + i * 0.75;
      s.addShape(pres.shapes.OVAL, {
        x: 0.8, y: y, w: 0.42, h: 0.42, fill: { color: C.white },
      });
      s.addImage({ data: it.ic, x: 0.88, y: y + 0.08, w: 0.26, h: 0.26 });
      s.addText(it.t, {
        x: 1.4, y: y + 0.05, w: 3.1, h: 0.4,
        fontSize: 14, fontFace: FONT, color: C.navy, margin: 0, valign: "middle",
      });
    });

    // Right card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.15, y: 1.45, w: 4.35, h: 3.5, rectRadius: 0.12,
      fill: { color: C.navy }, shadow: shadowSoft(),
    });
    s.addText("HUMAN CONSEQUENCE", {
      x: 5.4, y: 1.7, w: 3.9, h: 0.3,
      fontSize: 11, fontFace: FONT, bold: true, color: C.amber, margin: 0, charSpacing: 1.5,
    });
    const rightItems = [
      "Unsafe travel decisions",
      "Delayed emergency response",
      "Greater exposure for vulnerable residents",
    ];
    rightItems.forEach((t, i) => {
      const y = 2.35 + i * 0.7;
      s.addText(`${i + 1}`, {
        x: 5.45, y: y, w: 0.35, h: 0.35,
        fontSize: 18, fontFace: FONT, bold: true, color: C.teal, margin: 0,
      });
      s.addText(t, {
        x: 5.95, y: y, w: 3.2, h: 0.4,
        fontSize: 15, fontFace: FONT, color: C.white, margin: 0, valign: "middle",
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 3 — WHY IT MATTERS
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.grey },
    });
    s.addText("Communities need local information\nbefore they can take local action.", {
      x: 0.5, y: 0.3, w: 9, h: 0.85,
      fontSize: 26, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    const cards = [
      { ic: icons.chat, title: "Flood reports are fragmented", body: "Residents, responders, and agencies use different channels" },
      { ic: icons.mapPin, title: "Conditions vary street by street", body: "A safe road upstream can be deadly downstream" },
      { ic: icons.layers, title: "No shared operational picture", body: "Coordination is slow and reactive" },
    ];
    cards.forEach((c, i) => {
      const x = 0.5 + i * 3.1;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.5, w: 2.9, h: 3.2, rectRadius: 0.12,
        fill: { color: C.white }, shadow: shadowSoft(),
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.95, y: 1.85, w: 0.9, h: 0.9, fill: { color: C.lightTeal },
      });
      s.addImage({ data: c.ic, x: x + 1.15, y: 2.05, w: 0.5, h: 0.5 });
      s.addText(c.title, {
        x: x + 0.2, y: 3.0, w: 2.5, h: 0.7,
        fontSize: 15, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
      });
      s.addText(c.body, {
        x: x + 0.2, y: 3.7, w: 2.5, h: 0.7,
        fontSize: 12, fontFace: FONT, color: C.muted, align: "center", margin: 0,
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 4 — THE SOLUTION
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.white },
    });
    s.addText("HydroMesh turns community observations\ninto actionable flood intelligence.", {
      x: 0.5, y: 0.3, w: 9, h: 0.85,
      fontSize: 26, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    const steps = [
      { n: "01", title: "Report", body: "Geo-tagged, timestamped,\nicon-based flood reports", ic: icons.phone },
      { n: "02", title: "Fuse", body: "AI validation + weather\n+ elevation data", ic: icons.cpu },
      { n: "03", title: "Act", body: "Safe routes, alerts,\nand emergency requests", ic: icons.nav },
    ];
    steps.forEach((st, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.55, w: 2.95, h: 3.2, rectRadius: 0.12,
        fill: { color: i === 1 ? C.navy : C.grey },
      });
      s.addText(st.n, {
        x: x + 0.25, y: 1.75, w: 1.2, h: 0.35,
        fontSize: 14, fontFace: FONT, bold: true,
        color: i === 1 ? C.teal : C.muted, margin: 0,
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 1.0, y: 2.25, w: 0.85, h: 0.85,
        fill: { color: i === 1 ? "143456" : C.white },
      });
      s.addImage({
        data: i === 1 ? icons.whiteCpu : st.ic,
        x: x + 1.2, y: 2.45, w: 0.45, h: 0.45,
      });
      s.addText(st.title, {
        x: x + 0.2, y: 3.35, w: 2.55, h: 0.4,
        fontSize: 22, fontFace: FONT, bold: true,
        color: i === 1 ? C.white : C.navy, align: "center", margin: 0,
      });
      s.addText(st.body, {
        x: x + 0.2, y: 3.85, w: 2.55, h: 0.65,
        fontSize: 13, fontFace: FONT,
        color: i === 1 ? "A8B8C8" : C.muted, align: "center", margin: 0,
      });
      if (i < 2) {
        s.addImage({ data: icons.arrow, x: x + 2.85, y: 2.9, w: 0.28, h: 0.28 });
      }
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 5 — SHOW THE PRODUCT
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.grey },
    });
    s.addText("One event. Two views. Faster coordination.", {
      x: 0.5, y: 0.28, w: 9, h: 0.5,
      fontSize: 26, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    // Left — resident
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.45, y: 1.05, w: 4.4, h: 4.1, rectRadius: 0.12,
      fill: { color: C.white }, shadow: shadowSoft(),
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.45, y: 1.05, w: 4.4, h: 0.7, rectRadius: 0.12,
      fill: { color: C.navy },
    });
    // cover bottom radius of header
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.45, y: 1.5, w: 4.4, h: 0.25, fill: { color: C.navy },
    });
    s.addImage({ data: icons.whitePhone, x: 0.7, y: 1.22, w: 0.35, h: 0.35 });
    s.addText("Resident mobile app", {
      x: 1.15, y: 1.22, w: 3.4, h: 0.4,
      fontSize: 16, fontFace: FONT, bold: true, color: C.white, margin: 0, valign: "middle",
    });
    const leftFeats = [
      { n: "1", t: "Report flooding" },
      { n: "2", t: "View risk map" },
      { n: "3", t: "Get safe route" },
      { n: "4", t: "Trigger SOS" },
    ];
    leftFeats.forEach((f, i) => {
      const y = 2.05 + i * 0.7;
      s.addShape(pres.shapes.OVAL, {
        x: 0.8, y: y, w: 0.45, h: 0.45, fill: { color: C.lightTeal },
      });
      s.addText(f.n, {
        x: 0.8, y: y, w: 0.45, h: 0.45,
        fontSize: 14, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle", margin: 0,
      });
      s.addText(f.t, {
        x: 1.45, y: y, w: 3, h: 0.45,
        fontSize: 16, fontFace: FONT, color: C.navy, margin: 0, valign: "middle",
      });
    });

    // Right — responder
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.15, y: 1.05, w: 4.4, h: 4.1, rectRadius: 0.12,
      fill: { color: C.white }, shadow: shadowSoft(),
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.15, y: 1.05, w: 4.4, h: 0.7, rectRadius: 0.12,
      fill: { color: C.teal },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.15, y: 1.5, w: 4.4, h: 0.25, fill: { color: C.teal },
    });
    s.addImage({ data: icons.monitor, x: 5.4, y: 1.22, w: 0.35, h: 0.35 });
    s.addText("Responder dashboard", {
      x: 5.9, y: 1.22, w: 3.4, h: 0.4,
      fontSize: 16, fontFace: FONT, bold: true, color: C.navy, margin: 0, valign: "middle",
    });
    const rightFeats = [
      { n: "1", t: "See reports on map" },
      { n: "2", t: "Track hazard zones" },
      { n: "3", t: "Prioritise requests" },
      { n: "4", t: "Coordinate response" },
    ];
    rightFeats.forEach((f, i) => {
      const y = 2.05 + i * 0.7;
      s.addShape(pres.shapes.OVAL, {
        x: 5.5, y: y, w: 0.45, h: 0.45, fill: { color: C.navy },
      });
      s.addText(f.n, {
        x: 5.5, y: y, w: 0.45, h: 0.45,
        fontSize: 14, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
      });
      s.addText(f.t, {
        x: 6.15, y: y, w: 3, h: 0.45,
        fontSize: 16, fontFace: FONT, color: C.navy, margin: 0, valign: "middle",
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 6 — LIVE SCENARIO (DEMO)
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.white },
    });
    s.addText("From a street report to an operational response.", {
      x: 0.5, y: 0.25, w: 9, h: 0.45,
      fontSize: 24, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 0.8, w: 4.2, h: 0.35, rectRadius: 0.08,
      fill: { color: C.lightAmber },
    });
    s.addText("Demo: Simulated flood conditions", {
      x: 0.6, y: 0.82, w: 4, h: 0.3,
      fontSize: 12, fontFace: FONT, bold: true, color: "8A6200", margin: 0, valign: "middle",
    });

    const frames = [
      { n: "1", title: "Report", body: "Resident reports\nknee-deep water" },
      { n: "2", title: "Locate", body: "Geolocated &\ntimestamped" },
      { n: "3", title: "Update", body: "Risk map\nupdates live" },
      { n: "4", title: "Route", body: "Safe route avoids\naffected road" },
      { n: "5", title: "Respond", body: "Prioritised request\nto responders" },
    ];
    frames.forEach((f, i) => {
      const x = 0.35 + i * 1.93;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.5, w: 1.8, h: 3.4, rectRadius: 0.1,
        fill: { color: i === 2 ? C.navy : C.grey },
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.55, y: 1.8, w: 0.7, h: 0.7,
        fill: { color: i === 2 ? C.teal : C.white },
      });
      s.addText(f.n, {
        x: x + 0.55, y: 1.8, w: 0.7, h: 0.7,
        fontSize: 20, fontFace: FONT, bold: true,
        color: i === 2 ? C.navy : C.navy, align: "center", valign: "middle", margin: 0,
      });
      s.addText(f.title, {
        x: x + 0.1, y: 2.75, w: 1.6, h: 0.4,
        fontSize: 15, fontFace: FONT, bold: true,
        color: i === 2 ? C.white : C.navy, align: "center", margin: 0,
      });
      s.addText(f.body, {
        x: x + 0.1, y: 3.3, w: 1.6, h: 0.9,
        fontSize: 12, fontFace: FONT,
        color: i === 2 ? "A8B8C8" : C.muted, align: "center", margin: 0,
      });
      if (i < 4) {
        s.addImage({ data: icons.arrow, x: x + 1.72, y: 2.95, w: 0.2, h: 0.2 });
      }
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 7 — TECHNICAL ARCHITECTURE
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.grey },
    });
    s.addText("A modular architecture connects people,\ndata, and decisions.", {
      x: 0.5, y: 0.22, w: 9, h: 0.7,
      fontSize: 24, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    // Top inputs
    const inputs = [
      { t: "Community\nreports", x: 0.55 },
      { t: "Weather\ndata", x: 3.55 },
      { t: "Map &\nelevation", x: 6.55 },
    ];
    inputs.forEach((inp) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: inp.x, y: 1.15, w: 2.7, h: 0.75, rectRadius: 0.08,
        fill: { color: C.white },
      });
      s.addText(inp.t, {
        x: inp.x, y: 1.2, w: 2.7, h: 0.65,
        fontSize: 13, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle", margin: 0,
      });
    });

    // API
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 2.5, y: 2.15, w: 5, h: 0.55, rectRadius: 0.08,
      fill: { color: C.navy },
    });
    s.addText("Node.js API  ·  Express  ·  Socket.io", {
      x: 2.5, y: 2.2, w: 5, h: 0.45,
      fontSize: 14, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });

    // DB
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 2.5, y: 2.9, w: 5, h: 0.5, rectRadius: 0.08,
      fill: { color: C.teal },
    });
    s.addText("PostgreSQL + PostGIS", {
      x: 2.5, y: 2.95, w: 5, h: 0.4,
      fontSize: 14, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle", margin: 0,
    });

    // Processing
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.5, y: 3.6, w: 7, h: 0.5, rectRadius: 0.08,
      fill: { color: C.white },
    });
    s.addText("Risk processing  ·  Validation  ·  OSRM routing", {
      x: 1.5, y: 3.65, w: 7, h: 0.4,
      fontSize: 13, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle", margin: 0,
    });

    // Outputs
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 4.35, w: 3.8, h: 0.6, rectRadius: 0.08,
      fill: { color: C.navy },
    });
    s.addText("Flutter mobile app", {
      x: 0.8, y: 4.4, w: 3.8, h: 0.5,
      fontSize: 14, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.4, y: 4.35, w: 3.8, h: 0.6, rectRadius: 0.08,
      fill: { color: C.navy },
    });
    s.addText("Responder dashboard", {
      x: 5.4, y: 4.4, w: 3.8, h: 0.5,
      fontSize: 14, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });

    s.addText("Flutter · Node.js · Express · Socket.io · PostgreSQL/PostGIS · OSRM · Open-Meteo · Render", {
      x: 0.5, y: 5.15, w: 9, h: 0.3,
      fontSize: 10, fontFace: FONT, color: C.muted, align: "center", margin: 0,
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 8 — WHAT IS BUILT TODAY
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.white },
    });
    s.addText("The core prototype is complete and\nready for controlled testing.", {
      x: 0.5, y: 0.22, w: 9, h: 0.7,
      fontSize: 24, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    const caps = [
      { name: "Flood reporting", status: "Built", color: C.built },
      { name: "Geolocation", status: "Built", color: C.built },
      { name: "Live map", status: "Built", color: C.built },
      { name: "Safe routing", status: "Built", color: C.built },
      { name: "SOS / help requests", status: "Built", color: C.built },
      { name: "Backend integration", status: "Built", color: C.built },
      { name: "Municipal dashboard", status: "Next phase", color: C.next },
      { name: "LSTM forecasting", status: "Research", color: C.research },
      { name: "Sentiment / news layer", status: "Research", color: C.research },
      { name: "RL resource allocation", status: "Future", color: C.future },
    ];

    caps.forEach((c, i) => {
      const col = i < 5 ? 0 : 1;
      const row = i % 5;
      const x = 0.5 + col * 4.75;
      const y = 1.15 + row * 0.7;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 4.5, h: 0.58, rectRadius: 0.08,
        fill: { color: C.grey },
      });
      s.addText(c.name, {
        x: x + 0.2, y, w: 2.5, h: 0.58,
        fontSize: 14, fontFace: FONT, bold: true, color: C.navy, margin: 0, valign: "middle",
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 2.85, y: y + 0.12, w: 1.45, h: 0.34, rectRadius: 0.08,
        fill: { color: c.color },
      });
      s.addText(c.status, {
        x: x + 2.85, y: y + 0.12, w: 1.45, h: 0.34,
        fontSize: 11, fontFace: FONT, bold: true,
        color: c.color === C.next || c.color === C.built ? C.navy : C.white,
        align: "center", valign: "middle", margin: 0,
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 9 — VALIDATION AND EVIDENCE
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.grey },
    });
    s.addText("We have validated the system as an\nintegrated academic prototype.", {
      x: 0.5, y: 0.25, w: 9, h: 0.7,
      fontSize: 24, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    const ev = [
      { ic: icons.award, title: "Distinction-grade\nuniversity project", body: "University of Birmingham\nSDG 11" },
      { ic: icons.target, title: "FII–MIT competition\nfinalist", body: "Reached final rounds\nof international challenge" },
      { ic: icons.users, title: "MCN UN fellowship\nselected", body: "International recognition\nfor climate resilience" },
      { ic: icons.git, title: "122 GitHub commits\nend-to-end tested", body: "Full-stack prototype\nready for pilot partners" },
    ];
    ev.forEach((e, i) => {
      const x = 0.4 + i * 2.4;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.3, w: 2.25, h: 3.5, rectRadius: 0.12,
        fill: { color: C.white }, shadow: shadowSoft(),
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.65, y: 1.6, w: 0.9, h: 0.9, fill: { color: C.lightTeal },
      });
      s.addImage({ data: e.ic, x: x + 0.85, y: 1.8, w: 0.5, h: 0.5 });
      s.addText(e.title, {
        x: x + 0.15, y: 2.75, w: 1.95, h: 0.85,
        fontSize: 14, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
      });
      s.addText(e.body, {
        x: x + 0.15, y: 3.7, w: 1.95, h: 0.75,
        fontSize: 12, fontFace: FONT, color: C.muted, align: "center", margin: 0,
      });
    });
    addFooter(s, "Institutional logos shown only with permission");
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 10 — FUTURE MUNICIPAL DASHBOARD
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.white },
    });
    s.addText("The next layer is decision support\nfor municipal teams.", {
      x: 0.5, y: 0.2, w: 7, h: 0.7,
      fontSize: 24, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.3, y: 0.3, w: 3.2, h: 0.4, rectRadius: 0.08,
      fill: { color: C.lightAmber },
    });
    s.addText("Planned R&D — not yet deployed", {
      x: 6.35, y: 0.32, w: 3.1, h: 0.35,
      fontSize: 11, fontFace: FONT, bold: true, color: "8A6200", align: "center", margin: 0, valign: "middle",
    });

    const panels = [
      { ic: icons.map, title: "Live flood map", body: "Reports, weather, sensors,\naffected roads" },
      { ic: icons.activity, title: "Forecasting", body: "LSTM short-horizon\nrisk estimates" },
      { ic: icons.chat, title: "Public signal monitoring", body: "News & sentiment with\nconfidence levels" },
      { ic: icons.shield, title: "Response planning", body: "Incidents, resources,\nshelters, routes" },
    ];
    panels.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.5 + col * 4.75;
      const y = 1.2 + row * 1.95;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 4.5, h: 1.75, rectRadius: 0.12,
        fill: { color: C.grey },
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.25, y: y + 0.45, w: 0.7, h: 0.7, fill: { color: C.white },
      });
      s.addImage({ data: p.ic, x: x + 0.4, y: y + 0.6, w: 0.4, h: 0.4 });
      s.addText(p.title, {
        x: x + 1.15, y: y + 0.35, w: 3.1, h: 0.4,
        fontSize: 16, fontFace: FONT, bold: true, color: C.navy, margin: 0,
      });
      s.addText(p.body, {
        x: x + 1.15, y: y + 0.85, w: 3.1, h: 0.65,
        fontSize: 13, fontFace: FONT, color: C.muted, margin: 0,
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 11 — PILOT MODEL
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.grey },
    });
    s.addText("We are looking for one city or institutional\npartner to validate HydroMesh in practice.", {
      x: 0.5, y: 0.2, w: 9, h: 0.7,
      fontSize: 22, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });

    const weeks = [
      { w: "Weeks 1–2", t: "City data &\nstakeholder setup" },
      { w: "Weeks 3–4", t: "Community onboarding\n& configuration" },
      { w: "Weeks 5–6", t: "Controlled event\ntesting" },
      { w: "Weeks 7–8", t: "Evaluation &\nimpact report" },
    ];
    weeks.forEach((wk, i) => {
      const x = 0.45 + i * 2.4;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.15, w: 2.25, h: 1.85, rectRadius: 0.1,
        fill: { color: i % 2 === 0 ? C.navy : C.white },
      });
      s.addText(wk.w, {
        x: x + 0.1, y: 1.35, w: 2.05, h: 0.35,
        fontSize: 13, fontFace: FONT, bold: true,
        color: i % 2 === 0 ? C.teal : C.teal, align: "center", margin: 0,
      });
      s.addText(wk.t, {
        x: x + 0.1, y: 1.85, w: 2.05, h: 0.85,
        fontSize: 13, fontFace: FONT, bold: true,
        color: i % 2 === 0 ? C.white : C.navy, align: "center", margin: 0,
      });
    });

    s.addText("Pilot KPIs", {
      x: 0.5, y: 3.3, w: 9, h: 0.3,
      fontSize: 14, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });
    const kpis = [
      "Report → map update time",
      "Verified reports",
      "Route generation time",
      "SOS acknowledgement",
      "Active users",
      "False-alert rate",
      "Coordination time",
    ];
    kpis.forEach((k, i) => {
      const x = 0.45 + (i % 4) * 2.4;
      const y = 3.7 + Math.floor(i / 4) * 0.65;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 2.25, h: 0.5, rectRadius: 0.08,
        fill: { color: C.white },
      });
      s.addText(k, {
        x, y, w: 2.25, h: 0.5,
        fontSize: 11, fontFace: FONT, color: C.navy, align: "center", valign: "middle", margin: 0,
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 12 — THE ASK
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.navy },
    });
    s.addText("Help us move from validated prototype\nto real-world pilot.", {
      x: 0.5, y: 0.3, w: 9, h: 0.75,
      fontSize: 26, fontFace: FONT, bold: true, color: C.white, margin: 0,
    });

    const asks = [
      { n: "01", title: "Pilot partner", body: "Municipal agency, NGO,\nor university" },
      { n: "02", title: "Technical support", body: "Data, validation, and\ndeployment expertise" },
      { n: "03", title: "Funding", body: "Testing, infrastructure,\naccessibility & models" },
    ];
    asks.forEach((a, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.4, w: 2.95, h: 2.35, rectRadius: 0.12,
        fill: { color: "132A4A" },
      });
      s.addText(a.n, {
        x: x + 0.25, y: 1.6, w: 2.4, h: 0.35,
        fontSize: 14, fontFace: FONT, bold: true, color: C.teal, margin: 0,
      });
      s.addText(a.title, {
        x: x + 0.25, y: 2.1, w: 2.4, h: 0.45,
        fontSize: 18, fontFace: FONT, bold: true, color: C.white, margin: 0,
      });
      s.addText(a.body, {
        x: x + 0.25, y: 2.65, w: 2.4, h: 0.75,
        fontSize: 13, fontFace: FONT, color: "A8B8C8", margin: 0,
      });
    });

    s.addText("HydroMesh makes flood intelligence local, actionable, and accessible.", {
      x: 0.5, y: 4.05, w: 9, h: 0.4,
      fontSize: 15, fontFace: FONT, italic: true, color: C.teal, margin: 0,
    });
    s.addText("sxm2114@student.bham.ac.uk  ·  github.com/theSaksham02/Hydromesh  ·  hydromesh.vercel.app", {
      x: 0.5, y: 4.7, w: 9, h: 0.3,
      fontSize: 12, fontFace: FONT, color: "8A9AAA", margin: 0,
    });
    s.addImage({
      path: "/Users/sakshammishra/Hydromesh/pitch-deck/qr-demo.png",
      x: 8.55, y: 4.55, w: 0.9, h: 0.9,
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 13 — TEAM (OPERATIONAL REGIONAL STRATEGY)
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.white },
    });
    s.addText("Leadership & Operational Regional Strategy", {
      x: 0.5, y: 0.25, w: 7.8, h: 0.45,
      fontSize: 22, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });
    s.addText("APPENDIX", {
      x: 8.3, y: 0.3, w: 1.3, h: 0.3,
      fontSize: 11, fontFace: FONT, bold: true, color: C.teal, align: "right", margin: 0,
    });
    s.addText("“Our team brings lived and regional insight from flood-vulnerable communities across Asia and Africa. We are beginning validation through focused local partnerships.”", {
      x: 0.5, y: 0.72, w: 9.0, h: 0.45,
      fontSize: 10, fontFace: FONT, italic: true, color: C.muted, margin: 0,
    });

    const team = [
      {
        name: "Saksham Mishra",
        role: "Project Lead & System Architect",
        mandate: "Technical Lead & India Validation",
        desc: "Maintains single stable Flutter/Node.js release, verifies zero-latency caching, curates demo data, and secures first municipal partner in Indian monsoon catchments.",
      },
      {
        name: "Shaazia Raziq",
        role: "Database Architect",
        mandate: "Spatial Modeling & Africa-Region Lead",
        desc: "Engineers PostGIS spatial density clustering (ST_ClusterDBSCAN) and hazard polygons; identifies realistic African NGO partners to tailor local drainage workflows.",
      },
      {
        name: "Adham Khashan",
        role: "Systems Reliability",
        mandate: "Mesh Resilience & UAE Ecosystem Lead",
        desc: "Spearheads blackout BLE mesh verification, failover disaster protocols, UAE university research partnerships, and climate resilience fellowship and grant funding.",
      },
    ];

    team.forEach((m, i) => {
      const x = 0.6 + i * 3.05;
      const y = 1.3;
      const w = 2.75;
      const h = 3.9;

      // Card container
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w, h, rectRadius: 0.1,
        fill: { color: C.grey },
        line: { color: C.cardBorder, width: 1 },
      });

      // Avatar circle with initials
      s.addShape(pres.shapes.OVAL, {
        x: x + (w - 0.75) / 2, y: y + 0.25, w: 0.75, h: 0.75,
        fill: { color: C.navy },
      });
      s.addText(m.name.split(" ").map((p) => p[0]).join(""), {
        x: x + (w - 0.75) / 2, y: y + 0.25, w: 0.75, h: 0.75,
        fontSize: 14, fontFace: FONT, bold: true, color: C.teal, align: "center", valign: "middle", margin: 0,
      });

      // Name
      s.addText(m.name, {
        x: x + 0.15, y: y + 1.1, w: w - 0.3, h: 0.3,
        fontSize: 13, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
      });

      // Role
      s.addText(m.role, {
        x: x + 0.15, y: y + 1.4, w: w - 0.3, h: 0.25,
        fontSize: 9.5, fontFace: FONT, bold: true, color: C.teal, align: "center", margin: 0,
      });

      // Regional Mandate Badge
      s.addText(m.mandate, {
        x: x + 0.15, y: y + 1.7, w: w - 0.3, h: 0.35,
        fontSize: 9.5, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
      });

      // Description
      s.addText(m.desc, {
        x: x + 0.2, y: y + 2.15, w: w - 0.4, h: 1.5,
        fontSize: 9, fontFace: FONT, color: C.muted, align: "left", margin: 0,
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 14 — DATASETS AND FUTURE AI
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.grey },
    });
    s.addText("Training data and AI models for future forecasting.", {
      x: 0.5, y: 0.25, w: 8, h: 0.45,
      fontSize: 24, fontFace: FONT, bold: true, color: C.navy, margin: 0,
    });
    s.addText("APPENDIX  ·  Research phase — planned integration", {
      x: 0.5, y: 0.75, w: 9, h: 0.3,
      fontSize: 12, fontFace: FONT, bold: true, color: "8A6200", margin: 0,
    });

    const sources = [
      { title: "Groundsource", body: "2.6M flood events" },
      { title: "Open-Meteo", body: "Historical weather" },
      { title: "Community reports", body: "Growing live dataset" },
    ];
    sources.forEach((src, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.3, w: 2.95, h: 1.3, rectRadius: 0.1,
        fill: { color: C.white },
      });
      s.addText(src.title, {
        x: x + 0.2, y: 1.5, w: 2.55, h: 0.4,
        fontSize: 16, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
      });
      s.addText(src.body, {
        x: x + 0.2, y: 2.0, w: 2.55, h: 0.35,
        fontSize: 13, fontFace: FONT, color: C.muted, align: "center", margin: 0,
      });
    });

    // Arrow down visual via teal bar
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 3.25, y: 2.85, w: 3.5, h: 0.55, rectRadius: 0.08,
      fill: { color: C.navy },
    });
    s.addText("LSTM encoder–decoder", {
      x: 3.25, y: 2.9, w: 3.5, h: 0.45,
      fontSize: 14, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 2.0, y: 3.7, w: 6, h: 1.1, rectRadius: 0.1,
      fill: { color: C.teal },
    });
    s.addText("24-hour flood risk forecast", {
      x: 2.0, y: 3.85, w: 6, h: 0.4,
      fontSize: 20, fontFace: FONT, bold: true, color: C.navy, align: "center", margin: 0,
    });
    s.addText("Planned research integration — not in current prototype", {
      x: 2.0, y: 4.3, w: 6, h: 0.3,
      fontSize: 12, fontFace: FONT, color: "0B3A32", align: "center", margin: 0,
    });
  }

  // ═══════════════════════════════════════════════════
  // SLIDE 15 — THANK YOU
  // ═══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.navy },
    });
    for (let i = 0; i < 8; i++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.4 + i * 1.2, y: 0, w: 0.015, h: 5.625, fill: { color: "143456" },
      });
    }
    s.addShape(pres.shapes.OVAL, {
      x: 7.2, y: 0.8, w: 2.2, h: 1.6,
      fill: { color: "00C6A7", transparency: 85 },
    });

    s.addText("Thank you.", {
      x: 0.6, y: 1.4, w: 6, h: 0.7,
      fontSize: 48, fontFace: FONT, bold: true, color: C.white, margin: 0,
    });
    s.addText("Questions?", {
      x: 0.6, y: 2.15, w: 6, h: 0.45,
      fontSize: 22, fontFace: FONT, color: C.teal, margin: 0,
    });

    s.addImage({
      path: "/Users/sakshammishra/Hydromesh/pitch-deck/qr-demo.png",
      x: 7.35, y: 2.55, w: 2.0, h: 2.0,
    });
    s.addText("hydromesh.vercel.app", {
      x: 7.15, y: 4.65, w: 2.4, h: 0.3,
      fontSize: 11, fontFace: FONT, color: "A8B8C8", align: "center", margin: 0,
    });

    s.addText("sxm2114@student.bham.ac.uk", {
      x: 0.6, y: 3.3, w: 6, h: 0.35,
      fontSize: 16, fontFace: FONT, color: C.white, margin: 0,
    });
    s.addText("github.com/theSaksham02/Hydromesh", {
      x: 0.6, y: 3.7, w: 6, h: 0.3,
      fontSize: 14, fontFace: FONT, color: "A8B8C8", margin: 0,
    });
    s.addText("hydromesh.vercel.app", {
      x: 0.6, y: 4.1, w: 6, h: 0.3,
      fontSize: 14, fontFace: FONT, color: C.teal, margin: 0,
    });
    s.addText("Output Outlaws  ·  University of Birmingham  ·  SDG 11", {
      x: 0.6, y: 5.05, w: 6.5, h: 0.3,
      fontSize: 12, fontFace: FONT, color: "6A7A8A", margin: 0,
    });
  }

  const out = "/Users/sakshammishra/Hydromesh/pitch-deck/HydroMesh_Pitch_Deck.pptx";
  await pres.writeFile({ fileName: out });
  console.log("Wrote", out);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
