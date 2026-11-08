const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const navAnchors = document.querySelectorAll(".nav-links a");
const root = document.documentElement;
const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setMenuOpen = (isOpen) => {
  document.body.classList.toggle("nav-open", isOpen);
  navLinks?.classList.toggle("is-open", isOpen);
  navToggle?.setAttribute("aria-expanded", String(isOpen));
  navToggle?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

  const icon = navToggle?.querySelector("i");
  if (icon) {
    icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
    window.lucide?.createIcons();
  }
};

navToggle?.addEventListener("click", () => {
  setMenuOpen(!navLinks?.classList.contains("is-open"));
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.14 },
  );

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.92) {
      item.classList.add("is-visible");
      return;
    }

    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sectionLinks = new Map();
navAnchors.forEach((anchor) => {
  const targetId = anchor.getAttribute("href")?.replace(/^#/, "");
  if (!targetId) return;
  const target = document.getElementById(targetId);
  if (target) {
    sectionLinks.set(target, anchor);
  }
});

if ("IntersectionObserver" in window && sectionLinks.size > 0) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const anchor = sectionLinks.get(entry.target);
        if (!anchor) return;
        if (entry.isIntersecting) {
          navAnchors.forEach((other) => other.removeAttribute("aria-current"));
          anchor.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sectionLinks.forEach((_, section) => activeObserver.observe(section));
}

const setPointerVars = (event) => {
  const x = `${event.clientX}px`;
  const y = `${event.clientY}px`;
  root.style.setProperty("--mx", x);
  root.style.setProperty("--my", y);
};

if (motionOK) {
  window.addEventListener("pointermove", setPointerVars, { passive: true });
}

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  root.style.setProperty("--scroll", progress.toFixed(4));
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const interactiveItems = document.querySelectorAll(".button, .contact-link, .project-card, .social-tile");

interactiveItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--local-x", `${event.clientX - rect.left}px`);
    item.style.setProperty("--local-y", `${event.clientY - rect.top}px`);
  });

  item.addEventListener("click", (event) => {
    const rect = item.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "pointer-ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    item.append(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  });
});

if (motionOK) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--ry", `${x * 8}deg`);
      card.style.setProperty("--rx", `${y * -8}deg`);
      card.style.setProperty("--local-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--local-y", `${event.clientY - rect.top}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

const setupShaderBackground = () => {
  const canvas = document.querySelector("#shader-canvas");
  const ctx = canvas?.getContext("2d");

  if (!canvas || !ctx) {
    return;
  }

  const colors = {
    red: [255, 68, 59],
    blue: [31, 62, 219],
    orange: [225, 98, 70],
    cyan: [86, 244, 255],
  };

  const pointer = { x: window.innerWidth * 0.48, y: window.innerHeight * 0.42 };

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    },
    { passive: true },
  );

  const resize = () => {
    const density = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.floor(window.innerWidth * density));
    const height = Math.max(1, Math.floor(window.innerHeight * density));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  window.addEventListener("resize", resize);
  resize();

  const started = performance.now();
  const frameDelay = 1000 / 10;

  const rgba = ([r, g, b], alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

  const blob = (x, y, radius, color, alpha) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, rgba(color, alpha));
    gradient.addColorStop(0.38, rgba(color, alpha * 0.62));
    gradient.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawWaterLine = (y, amplitude, phase, color, alpha) => {
    ctx.beginPath();
    ctx.moveTo(-40, y);

    for (let x = -40; x <= canvas.width + 80; x += 42) {
      const wave = Math.sin(x * 0.006 + phase) * amplitude + Math.cos(x * 0.013 - phase * 0.7) * amplitude * 0.44;
      ctx.lineTo(x, y + wave);
    }

    ctx.strokeStyle = rgba(color, alpha);
    ctx.lineWidth = Math.max(1, canvas.width * 0.003);
    ctx.stroke();
  };

  const render = () => {
    resize();
    const densityX = canvas.width / window.innerWidth;
    const densityY = canvas.height / window.innerHeight;
    const time = (performance.now() - started) / 1000;
    const px = pointer.x * densityX;
    const py = pointer.y * densityY;

    const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    base.addColorStop(0, "#09080f");
    base.addColorStop(0.26, "#38101a");
    base.addColorStop(0.52, "#10145f");
    base.addColorStop(0.78, "#451820");
    base.addColorStop(1, "#050509");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "screen";
    blob(canvas.width * (0.12 + Math.sin(time * 0.16) * 0.06), canvas.height * 0.2, canvas.width * 0.52, colors.red, 0.72);
    blob(canvas.width * (0.68 + Math.cos(time * 0.13) * 0.06), canvas.height * 0.22, canvas.width * 0.5, colors.blue, 0.72);
    blob(canvas.width * 0.47, canvas.height * (0.7 + Math.sin(time * 0.18) * 0.06), canvas.width * 0.58, colors.orange, 0.56);
    blob(px, py, canvas.width * 0.22, colors.cyan, 0.24);

    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 9; i += 1) {
      const y = canvas.height * (0.22 + i * 0.085);
      const color = i % 3 === 0 ? colors.red : i % 3 === 1 ? colors.blue : colors.orange;
      drawWaterLine(y, canvas.height * (0.03 + i * 0.002), time * (0.35 + i * 0.04) + i, color, 0.11);
    }

    ctx.globalCompositeOperation = "source-over";
    const vignette = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.45,
      canvas.width * 0.08,
      canvas.width * 0.5,
      canvas.height * 0.45,
      canvas.width * 0.72,
    );
    vignette.addColorStop(0, "rgba(5, 5, 9, 0)");
    vignette.addColorStop(1, "rgba(5, 5, 9, 0.76)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (motionOK) {
      window.setTimeout(() => requestAnimationFrame(render), frameDelay);
    }
  };

  render();
};

const setupScrollVideo = () => {
  const video = document.querySelector(".hero-video-bg");
  const hero = document.querySelector(".text-hero");

  if (!video || !hero) return;

  video.pause();
  video.removeAttribute("autoplay");
  video.removeAttribute("loop");
  video.preload = "auto";

  // Silent play-pause to warm up decoder queues and preload frames
  video.play().then(() => {
    video.pause();
  }).catch(() => {});

  let targetTime = 0;
  let currentTime = 0;
  let isSeekingLock = false;
  let animId = null;

  const updateTargetTime = () => {
    if (!video.duration || isNaN(video.duration)) return;

    const heroHeight = hero.clientHeight || window.innerHeight;
    const scrollY = window.scrollY;
    
    // Calculate fraction of scroll inside the hero height (0 to 1)
    let fraction = scrollY / heroHeight;
    fraction = Math.min(Math.max(fraction, 0), 1);

    // Buffer the end time slightly to prevent index-out-of-bounds decoder lockups
    targetTime = fraction * (video.duration - 0.05);
  };

  const smoothSeekLoop = () => {
    if (video.duration && !isNaN(video.duration)) {
      const diff = targetTime - currentTime;

      // Easing logic: lerp factor 0.08 creates a fluid deceleration glide
      if (Math.abs(diff) > 0.005) {
        currentTime += diff * 0.08;

        // Regulate seek commands based on browser hardware decode speed
        if (!video.seeking && !isSeekingLock) {
          isSeekingLock = true;
          video.currentTime = Math.min(Math.max(currentTime, 0), video.duration - 0.02);
        }
      } else {
        // Snap precisely once we are close enough to conserve GPU resources
        currentTime = targetTime;
        if (!video.seeking && !isSeekingLock && Math.abs(video.currentTime - currentTime) > 0.01) {
          isSeekingLock = true;
          video.currentTime = currentTime;
        }
      }
    }
    animId = requestAnimationFrame(smoothSeekLoop);
  };

  // Regulate backpressure: release seeking lock as soon as browser reports completion
  video.addEventListener("seeked", () => {
    isSeekingLock = false;
  });

  // Passive event listener for instantly tracking scroll actions
  window.addEventListener("scroll", updateTargetTime, { passive: true });
  window.addEventListener("resize", updateTargetTime, { passive: true });

  // Warm start position on data loaded
  const initPosition = () => {
    updateTargetTime();
    currentTime = targetTime;
    video.currentTime = currentTime;
  };

  video.addEventListener("loadedmetadata", initPosition);
  video.addEventListener("loadeddata", initPosition);

  // If metadata is already loaded, kick off immediately
  if (video.readyState >= 1) {
    initPosition();
  }

  // Launch the animation frame loop
  animId = requestAnimationFrame(smoothSeekLoop);
};

setupShaderBackground();

const handleHeaderScroll = () => {
  const header = document.querySelector(".site-header");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
};

window.addEventListener("scroll", handleHeaderScroll, { passive: true });

window.addEventListener("load", () => {
  window.lucide?.createIcons();
  updateScrollProgress();
  setupScrollVideo();
  handleHeaderScroll(); // Initialize on load
});
