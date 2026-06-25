/* ============================================================
   NM Portfolio — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navigation burger ---------- */
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, observerOptions);
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- Fade-up on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ---------- Terminal typing effect ---------- */
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const lines = [
    'SysAdmin & Network Engineer',
    'PHP Web Developer (OOP)',
    'Linux & Windows Server Admin',
    'Cisco IOS Configuration',
    'Web Solutions for Networks',
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const SPEED_TYPE = 60;
  const SPEED_DELETE = 30;
  const PAUSE_END = 2000;
  const PAUSE_START = 400;

  function type() {
    const current = lines[lineIdx];
    if (!isDeleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(type, PAUSE_START);
        return;
      }
    }
    setTimeout(type, isDeleting ? SPEED_DELETE : SPEED_TYPE);
  }
  type();

});