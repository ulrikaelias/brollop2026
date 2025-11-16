// Mobile Menu Toggle
function toggleMobileMenu() {
    console.log('toggleMobileMenu called'); // Debug
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('show');
        console.log('Menu toggled, show class:', navMenu.classList.contains('show')); // Debug
    } else {
        console.error('navMenu element not found!');
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a:not(#logoutBtn)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('show');
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 80px för navbar höjd
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Utloggningsfunktion
    const logoutBtn = document.getElementById('logoutBtn');
    console.log('Logout button found:', logoutBtn); // Debug line
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicked'); // Debug line
            if (confirm('Är du säker på att du vill logga ut?')) {
                localStorage.removeItem('weddingAccess');
                console.log('Redirecting to index.html'); // Debug line
                window.location.href = 'index.html';
            }
        });
    } else {
        console.error('Logout button not found!');
    }

    // Mobile menu backup event listener
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            console.log('Mobile menu clicked via event listener'); // Debug
            toggleMobileMenu();
        });
        console.log('Mobile menu event listener added');
    } else {
        console.error('Mobile menu button not found!');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// RSVP Form hantering
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Samla form data
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Här kan du integrera med en backend service eller e-post service
    console.log('RSVP Data:', data);
    
    // Visa bekräftelse meddelande
    alert('Tack för din anmälan! Vi ser fram emot att fira med dig. 💕');
    
    // Rensa formuläret
    this.reset();
    
    // I en riktig implementation skulle du skicka detta till en server
    // eller en service som Google Forms, Netlify Forms, eller liknande
    });
} else {
    console.log('RSVP form not found');
}

// Gallery click functionality (för framtida bildvisning)
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.style.display !== 'none') {
                // Här kan du lägga till en lightbox eller modal för att visa bilden större
                console.log('Öppna bild i lightbox:', img.src);
            }
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.detail-card, .gallery-item, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements as hidden
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.detail-card, .gallery-item, .contact-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle (om du vill lägga till en hamburgermeny senare)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Hjälpfunktion för att visa/dölja bilder när de laddas
function handleImageLoad() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.display = 'block';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('placeholder-image')) {
                placeholder.style.display = 'none';
            }
        });
        
        img.addEventListener('error', function() {
            // Om bilden inte kan laddas, visa placeholder
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('placeholder-image')) {
                placeholder.style.display = 'flex';
            }
        });
    });
}

// Slideshow functionality
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Normalize index
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;
    
    // Show current slide
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-advance slideshow every 5 seconds
function autoSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }
}

// Start auto slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0); // Show first slide
    setInterval(autoSlideshow, 5000); // Auto-advance every 5 seconds
});

// Kör när sidan laddas
document.addEventListener('DOMContentLoaded', handleImageLoad);