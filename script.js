// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mm-link, .mm-wa').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// HERO SLIDESHOW
const slides = document.querySelectorAll('.hs');
const dotsContainer = document.getElementById('slideDots');
let current = 0;
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'sdot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});
function goTo(n) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
}
setInterval(() => goTo((current + 1) % slides.length), 5000);

// PACKAGE TABS
document.querySelectorAll('.pkg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.pkg-grid').forEach(g => g.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        // Re-trigger animations
        document.querySelectorAll('#tab-' + tab.dataset.tab + ' .reveal-card').forEach((el, i) => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), i * 80);
        });
    });
});

// COUNTER ANIMATION
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = target / 50;
    const timer = setInterval(() => {
        count += step;
        if (count >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = Math.floor(count);
    }, 30);
}
const counterDone = new Set();
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterDone.has(entry.target)) {
            counterDone.add(entry.target);
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-n').forEach(el => counterObserver.observe(el));

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-card').forEach((el, i) => {
    if (el.classList.contains('reveal-card')) {
        const parent = el.parentElement;
        const siblings = parent.querySelectorAll('.reveal-card');
        const index = Array.from(siblings).indexOf(el);
        el.dataset.delay = index * 80;
    }
    revealObserver.observe(el);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
        }
    });
});
