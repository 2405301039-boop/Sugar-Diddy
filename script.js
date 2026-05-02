// ==========================================
// DAYGLOW CAFÉ — Interaction & Animation Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Set current year in footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');

        // Prevent body scrolling when menu is open
        if (navLinks.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 5. Hero Particle Generation ---
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 30; // Number of floating particles

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize size, position, and animation timing
        const size = Math.random() * 4 + 2; // 2px to 6px
        const posX = Math.random() * 100; // 0% to 100% viewpoint width
        const delay = Math.random() * 8; // 0s to 8s delay
        const duration = Math.random() * 10 + 10; // 10s to 20s animation duration

        // Pick random color from palette for particle
        const colors = ['#ff6a00', '#a855f7', '#ff9a44'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.backgroundColor = color;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // --- 6. Chatbase User Identification ---
    // In production: call your backend to get a signed JWT token.
    // Replace getUserToken() with a real fetch, e.g.:
    //   const res = await fetch('/api/get-chatbase-token');
    //   const { token } = await res.json();
    //   window.chatbase('identify', { token });
    //
    // For a static/demo site, you can pass user info directly (no JWT):
    async function identifyChatbaseUser() {
        try {
            // 👇 Replace with real auth data (e.g. from Firebase, Auth0, etc.)
            const token = await getUserToken(); // fetch JWT from your server
            if (window.chatbase) {
                window.chatbase('identify', { token });
            }
        } catch (err) {
            // No token available (user not signed in) — chatbot works anonymously
            console.info('Chatbase: no user identified (anonymous session).');
        }
    }

    // Stub: replace this with your actual token-fetching logic
    async function getUserToken() {
        // Example: return await fetch('/api/chatbase-token').then(r => r.json()).then(d => d.token);
        throw new Error('getUserToken() not implemented — running as anonymous.');
    }

    identifyChatbaseUser();
});
