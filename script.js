// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.package-card, .feature-card, .testimonial-card, .gallery-item, .day-item').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// ===== FORM SUBMISSION =====
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.innerHTML = 'Sending...';
    btn.style.opacity = '0.8';
    const formData = new FormData(this);
    try {
        const response = await fetch('https://formspree.io/f/xgogbzav', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            btn.innerHTML = '✓ Enquiry Sent! We\'ll contact you soon.';
            btn.style.background = '#25a244';
            btn.style.opacity = '1';
            this.reset();
        } else {
            btn.innerHTML = 'Error! Please WhatsApp us directly.';
            btn.style.background = '#e24b4a';
            btn.style.opacity = '1';
        }
    } catch {
        btn.innerHTML = 'Error! Please WhatsApp us directly.';
        btn.style.background = '#e24b4a';
        btn.style.opacity = '1';
    }
    setTimeout(() => {
        btn.innerHTML = 'Send Enquiry <i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
        btn.style.opacity = '1';
    }, 5000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
