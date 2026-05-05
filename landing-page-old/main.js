const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const rainCanvas = document.getElementById("rain-canvas");
const mapCanvas = document.getElementById("map-canvas");

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.done === "true") {
          return;
        }

        entry.target.dataset.done = "true";
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.65 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
  counters.forEach((counter) => {
    const prefix = counter.dataset.prefix ?? "";
    const suffix = counter.dataset.suffix ?? "";
    const pad = Number(counter.dataset.pad ?? 0);
    const target = Number(counter.dataset.count ?? 0);
    counter.textContent = `${prefix}${String(target).padStart(pad, "0")}${suffix}`;
  });
}

function animateCount(element) {
  const target = Number(element.dataset.count ?? 0);
  const prefix = element.dataset.prefix ?? "";
  const suffix = element.dataset.suffix ?? "";
  const pad = Number(element.dataset.pad ?? 0);
  const duration = 1100;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(target * eased);
    element.textContent = `${prefix}${String(value).padStart(pad, "0")}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function createHiDPICanvas(canvas) {
  const context = canvas.getContext("2d");

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width, height };
  }

  return { context, resize };
}

const rainSurface = createHiDPICanvas(rainCanvas);
const mapSurface = createHiDPICanvas(mapCanvas);

let rainBounds = rainSurface.resize();
let mapBounds = mapSurface.resize();

const rainDrops = Array.from({ length: 84 }, (_, index) => ({
  x: ((index * 43.2) % Math.max(rainBounds.width, 1)) + 10,
  y: ((index * 57.7) % Math.max(window.innerHeight, 1)) - window.innerHeight,
  length: 18 + (index % 4) * 5,
  speed: 2.2 + (index % 5) * 0.38,
  drift: 4 + (index % 3) * 1.2,
}));

function drawRain() {
  const { context } = rainSurface;
  const width = rainBounds.width;
  const height = window.innerHeight;

  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  context.lineCap = "round";

  rainDrops.forEach((drop, index) => {
    drop.y += drop.speed;
    if (drop.y > height + 40) {
      drop.y = -80 - index * 12;
      drop.x = ((drop.x + 73) % width) || 16;
    }

    context.strokeStyle =
      index % 7 === 0 ? "rgba(214, 167, 122, 0.18)" : "rgba(168, 214, 205, 0.16)";
    context.beginPath();
    context.moveTo(drop.x, drop.y);
    context.lineTo(drop.x - drop.drift, drop.y + drop.length);
    context.stroke();
  });
}

function drawMap(time) {
  const { context } = mapSurface;
  const width = mapBounds.width;
  const height = mapBounds.height;
  const progress = time * 0.00016;

  context.clearRect(0, 0, width, height);

  context.strokeStyle = "rgba(53, 81, 85, 0.36)";
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += width / 7) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += height / 7) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  const routeA = [
    [0.14, 0.72],
    [0.26, 0.48],
    [0.43, 0.66],
    [0.56, 0.42],
    [0.68, 0.2],
    [0.84, 0.3],
  ];

  const routeB = [
    [0.18, 0.22],
    [0.32, 0.12],
    [0.48, 0.34],
    [0.62, 0.52],
    [0.79, 0.61],
    [0.9, 0.76],
  ];

  drawBezier(routeA, "rgba(190, 218, 213, 0.84)", 2.1);
  drawBezier(routeB, "rgba(132, 176, 171, 0.68)", 1.8);

  context.fillStyle = "rgba(214, 167, 122, 0.12)";
  context.strokeStyle = "rgba(214, 167, 122, 0.52)";
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(width * 0.28, height * 0.62);
  context.lineTo(width * 0.39, height * 0.48);
  context.lineTo(width * 0.56, height * 0.56);
  context.lineTo(width * 0.52, height * 0.8);
  context.lineTo(width * 0.34, height * 0.82);
  context.closePath();
  context.fill();
  context.stroke();

  const nodes = [
    [0.2, 0.26, "rgba(191, 217, 212, 1)"],
    [0.37, 0.54, "rgba(214, 167, 122, 1)"],
    [0.56, 0.42, "rgba(191, 217, 212, 1)"],
    [0.75, 0.28, "rgba(191, 217, 212, 1)"],
    [0.81, 0.72, "rgba(132, 176, 171, 1)"],
  ];

  nodes.forEach(([px, py, color], index) => {
    const x = width * px;
    const y = height * py;
    const local = (progress + index * 0.22) % 1;
    const radius = 10 + local * 26;

    context.strokeStyle = `rgba(191, 217, 212, ${0.14 * (1 - local)})`;
    context.lineWidth = 1.2;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, 4.2, 0, Math.PI * 2);
    context.fill();
  });

  const sweep = context.createLinearGradient(
    width * ((progress * 0.9) % 1),
    0,
    width * (((progress * 0.9) % 1) + 0.2),
    height,
  );
  sweep.addColorStop(0, "rgba(0, 0, 0, 0)");
  sweep.addColorStop(0.5, "rgba(191, 217, 212, 0.12)");
  sweep.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = sweep;
  context.fillRect(0, 0, width, height);

  function drawBezier(points, color, lineWidth) {
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(width * points[0][0], height * points[0][1]);

    for (let i = 1; i < points.length - 2; i += 1) {
      const xc = width * ((points[i][0] + points[i + 1][0]) / 2);
      const yc = height * ((points[i][1] + points[i + 1][1]) / 2);
      context.quadraticCurveTo(
        width * points[i][0],
        height * points[i][1],
        xc,
        yc,
      );
    }

    const penultimate = points[points.length - 2];
    const last = points[points.length - 1];
    context.quadraticCurveTo(
      width * penultimate[0],
      height * penultimate[1],
      width * last[0],
      height * last[1],
    );
    context.stroke();
  }
}

function loop(time) {
  drawRain();
  drawMap(time);
  requestAnimationFrame(loop);
}

function handleResize() {
  rainBounds = rainSurface.resize();
  mapBounds = mapSurface.resize();
}

window.addEventListener("resize", handleResize);
handleResize();

if (!prefersReducedMotion) {
  requestAnimationFrame(loop);
} else {
  drawRain();
  drawMap(0);
}
