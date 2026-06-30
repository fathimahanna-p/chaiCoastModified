// Canvas Animation for Scroll
const canvas = document.getElementById("heroVideo");
const fallback = document.querySelector(".hero-photo-fallback");
const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");
const homeSection = document.getElementById("home");

if (canvas && canvas.tagName === "CANVAS") {
  const ctx = canvas.getContext("2d");
  const frameStep = 3;
  const frameNumbers = [];

  for (let i = 1; i <= 74; i += frameStep) {
    frameNumbers.push(i);
  }

  const images = frameNumbers.map((frameNo) => {
    const img = new Image();
    img.decoding = "async";
    img.src = `assets/animation/ezgif-frame-${String(frameNo).padStart(3, "0")}.png`;
    return img;
  });

  let currentFrame = 0;
  let targetFrame = 0;
  let frameReady = false;

  const render = () => {
    currentFrame += (targetFrame - currentFrame) * 0.12;
    const frameIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(currentFrame)),
    );
    const img = images[frameIndex];

    if (img && img.complete && img.naturalWidth !== 0 && canvas.width > 0) {
      if (!frameReady) {
        frameReady = true;
        if (fallback) fallback.style.display = "none";
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(render);
  };

  const preloadAndStart = () => {
    const firstImage = images[0];
    if (!firstImage) return;

    if (firstImage.complete && firstImage.naturalWidth) {
      canvas.width = firstImage.width;
      canvas.height = firstImage.height;
      ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(render);
      return;
    }

    firstImage.onload = () => {
      canvas.width = firstImage.width;
      canvas.height = firstImage.height;
      ctx.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(render);
    };
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(preloadAndStart, { timeout: 1000 });
  } else {
    setTimeout(preloadAndStart, 150);
  }
}

// Nav scroll effect and hero frame updates
let scrollTicking = false;
const updateScrollState = () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  }

  if (topBtn) {
    topBtn.classList.toggle("visible", window.scrollY > 400);
  }

  if (homeSection) {
    const maxScroll = Math.max(1, homeSection.offsetHeight - window.innerHeight);
    let scrollFraction = window.scrollY / maxScroll;
    scrollFraction = Math.max(0, Math.min(1, scrollFraction));
    const heroCanvas = document.getElementById("heroVideo");
    if (heroCanvas && heroCanvas.dataset.frameTarget !== undefined) {
      heroCanvas.dataset.frameTarget = String(scrollFraction);
    }
  }
};

const handleScroll = () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateScrollState();
      scrollTicking = false;
    });
  }
};

window.addEventListener("scroll", handleScroll, { passive: true });
updateScrollState();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "80px 0px" },
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Lazy-load maps
const lazyMaps = document.querySelectorAll(".lazy-map");
if ("IntersectionObserver" in window && lazyMaps.length) {
  const mapObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          const src = iframe.getAttribute("data-src");
          if (src) {
            iframe.src = src;
          }
          observer.unobserve(iframe);
        }
      });
    },
    { rootMargin: "200px 0px" },
  );

  lazyMaps.forEach((map) => mapObserver.observe(map));
} else {
  lazyMaps.forEach((map) => {
    const src = map.getAttribute("data-src");
    if (src) {
      map.src = src;
    }
  });
}

// Form submit
function submitForm() {
  const nameInput = document.getElementById("fname");
  const emailInput = document.getElementById("femail");
  const submitBtn = document.querySelector(".btn-submit");
  const successMsg = document.getElementById("formSuccess");

  const name = nameInput?.value.trim() || "";
  const email = emailInput?.value.trim() || "";

  if (!name || !email) {
    alert("Please fill in your name and email.");
    return;
  }

  if (submitBtn) submitBtn.style.display = "none";
  if (successMsg) successMsg.style.display = "block";
}

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}
