// Canvas Animation for Scroll
const canvas = document.getElementById("heroVideo");
const fallback = document.querySelector(".hero-photo-fallback");
if (canvas && canvas.tagName === "CANVAS") {
  const ctx = canvas.getContext("2d");
  const frameCount = 74;
  const images = [];

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const frameNum = i.toString().padStart(3, "0");
    img.src = `assets/animation/ezgif-frame-${frameNum}.png`;
    images.push(img);
  }

  images[0].onload = () => {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    if (fallback) fallback.style.display = "none";
    ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
  };

  const homeSection = document.getElementById("home");

  let currentFrame = 0;
  let targetFrame = 0;

  // Smooth frame interpolation for premium feel
  function render() {
    currentFrame += (targetFrame - currentFrame) * 0.1;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(currentFrame)),
    );
    const img = images[frameIndex];

    if (img && img.complete && img.naturalWidth !== 0 && canvas.width > 0) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  window.addEventListener(
    "scroll",
    () => {
      if (!homeSection) return;

      const maxScroll = homeSection.offsetHeight - window.innerHeight;
      let scrollFraction = window.scrollY / maxScroll;

      // Clamp fraction
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      targetFrame = scrollFraction * (frameCount - 1);
    },
    { passive: true },
  );
}

// Nav scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  document
    .getElementById("topBtn")
    .classList.toggle("visible", window.scrollY > 400);
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => observer.observe(el));

// Form submit
function submitForm() {
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  if (!name || !email) {
    alert("Please fill in your name and email.");
    return;
  }
  document.querySelector(".btn-submit").style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
}

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}
