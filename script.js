// Canvas Animation for chaiglassAnime
const canvas = document.getElementById('heroVideo');
const fallback = document.querySelector('.hero-photo-fallback');
if (canvas && canvas.tagName === 'CANVAS') {
  const ctx = canvas.getContext('2d');
  const frameCount = 210;
  const images = [];
  let currentFrame = 1;

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const frameNum = i.toString().padStart(3, '0');
    img.src = `assets/chaiglassAnime/ezgif-frame-${frameNum}.png`;
    images.push(img);
  }
  
  // Set canvas dimensions based on the first image once it loads
  images[0].onload = () => {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    if (fallback) fallback.style.display = 'none';
  };

  setInterval(() => {
    const img = images[currentFrame - 1];
    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    currentFrame = (currentFrame % frameCount) + 1;
  }, 1000 / 24); // 24 FPS
}

// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('topBtn').classList.toggle('visible', window.scrollY > 400);
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Form submit
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  if (!name || !email) { alert('Please fill in your name and email.'); return; }
  document.querySelector('.btn-submit').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}