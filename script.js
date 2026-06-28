// Video fallback: if video file missing, show photo layer
const vid = document.getElementById('heroVideo');
const fallback = document.querySelector('.hero-photo-fallback');
if (vid) {
  vid.addEventListener('error', () => { vid.style.display='none'; fallback.style.display='block'; });
  vid.addEventListener('loadeddata', () => { fallback.style.display='none'; });
  // If no mp4 src exists yet, show photo immediately
  if (!vid.querySelector('source') || !vid.querySelector('source').src.includes('hero-video')) {
    fallback.style.display = 'block';
  }
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