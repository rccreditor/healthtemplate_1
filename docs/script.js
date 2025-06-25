// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav ul');
const authButtons = document.querySelector('.auth-buttons');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    // Move auth buttons after nav when menu is active
    if (nav.classList.contains('active')) {
        nav.parentNode.insertBefore(authButtons, nav.nextSibling);
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Animate elements when scrolling
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-image, .service-card, .accordion-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Start counters when section is in view
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
});

aboutObserver.observe(aboutSection);

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

// Initialize testimonial slider
if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Show first testimonial
    showTestimonial(0);
}

// Accordion functionality
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        
        item.classList.toggle('active');
    });
});

// Form submission
document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you shortly.');
    this.reset();
});

document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Dynamic Navbar Hide/Show on Scroll and Mouse Hover at Top
let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector('.header');
let mouseAtTop = false;

function handleNav() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
        header.classList.remove('nav-hidden');
    } else if (mouseAtTop) {
        header.classList.remove('nav-hidden');
    } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        header.classList.add('nav-hidden');
    } else {
        // Scrolling up
        header.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleNav);
        ticking = true;
    }
});

document.addEventListener('mousemove', (e) => {
    if (e.clientY < 40) {
        mouseAtTop = true;
        header.classList.remove('nav-hidden');
    } else {
        mouseAtTop = false;
    }
});

// Modal functionality
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    launchLeafConfetti();
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// Update form submission to close modal
document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you shortly.');
    this.reset();
    closeContactModal(); // Close modal after form submission
});

// Leaf confetti effect
function launchLeafConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.left = 0;
    confettiContainer.style.top = 0;
    confettiContainer.style.width = '100vw';
    confettiContainer.style.height = '100vh';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = 3000;
    document.body.appendChild(confettiContainer);

    const leaves = ['🍃','🍂','🤸‍♂️','🌿'];
    const numLeaves = 24;
    for (let i = 0; i < numLeaves; i++) {
        const leaf = document.createElement('span');
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.position = 'absolute';
        leaf.style.fontSize = `${24 + Math.random() * 18}px`;
        leaf.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
        leaf.style.bottom = '40px';
        leaf.style.opacity = 0.85;
        leaf.style.transition = 'transform 1.2s cubic-bezier(.4,1.6,.6,1), opacity 1.2s';
        confettiContainer.appendChild(leaf);
        setTimeout(() => {
            leaf.style.transform = `translateY(-${window.innerHeight * (0.7 + Math.random() * 0.3)}px) rotate(${Math.random() * 360}deg)`;
            leaf.style.opacity = 0;
        }, 30 + i * 18);
    }
    setTimeout(() => {
        confettiContainer.remove();
    }, 1800);
}