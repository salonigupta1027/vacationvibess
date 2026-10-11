// LOADER
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2200);
});

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});
function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();
document.querySelectorAll('a, button, .package-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));

// HERO SLIDESHOW
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0;
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});
function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dotsContainer.children[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dotsContainer.children[currentSlide].classList.add('active');
}
setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

// TYPING EFFECT
const texts = ['Magic of Sikkim', 'Spirit of Himalayas', 'Beauty of the East', 'Adventure of a Lifetime'];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');
function type() {
    const current = texts[textIndex];
    if (!isDeleting) {
        typingEl.innerHTML = current.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
        charIndex++;
        if (charIndex === current.length) { isDeleting = true; setTimeout(type, 2000); return; }
    } else {
        typingEl.innerHTML = current.substring(0, charIndex - 1) + '<span class="typing-cursor"></span>';
        charIndex--;
        if (charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
    }
    setTimeout(type, isDeleting ? 60 : 100);
}
type();

// PARTICLES
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 10 + 8) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
        p.style.opacity = Math.random() * 0.6 + 0.2;
        container.appendChild(p);
    }
}
createParticles();

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-card').forEach(el => revealObserver.observe(el));

// COUNTER ANIMATION
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(el => {
                const target = parseInt(el.dataset.target);
                let count = 0;
                const inc = target / 60;
                const timer = setInterval(() => {
                    count += inc;
                    if (count >= target) { el.textContent = target; clearInterval(timer); }
                    else el.textContent = Math.floor(count);
                }, 30);
            });
            counterObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.hero-stats');
if (statsSection) counterObserver.observe(statsSection);

// 3D CARD TILT
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.querySelector('.card-3d-wrapper').style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.card-3d-wrapper').style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// FAQ
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// FORM
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.style.opacity = '0.8';
    try {
        const response = await fetch('https://formspree.io/f/xgogbzav', {
            method: 'POST', body: new FormData(this), headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            btn.innerHTML = '✓ Enquiry Sent! We\'ll contact you soon.';
            btn.style.background = '#25a244'; btn.style.opacity = '1';
            this.reset();
        } else {
            btn.innerHTML = '✗ Error! Please WhatsApp us.';
            btn.style.background = '#e24b4a'; btn.style.opacity = '1';
        }
    } catch {
        btn.innerHTML = '✗ Error! Please WhatsApp us.';
        btn.style.background = '#e24b4a'; btn.style.opacity = '1';
    }
    setTimeout(() => {
        btn.innerHTML = 'Send Enquiry <i class="fas fa-paper-plane"></i>';
        btn.style.background = ''; btn.style.opacity = '1';
    }, 5000);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
});
