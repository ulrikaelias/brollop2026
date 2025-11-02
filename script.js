// Countdown Timer
function updateCountdown() {
    // Ändra detta datum till ert bröllopsdatum
    const weddingDate = new Date('2026-05-16T16:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = days.toString().padStart(3, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '<h3>Vi är gifta!</h3>';
    }
}

// Uppdatera nedräkningen varje sekund
setInterval(updateCountdown, 1000);
updateCountdown();

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('show');
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
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Är du säker på att du vill logga ut?')) {
                localStorage.removeItem('weddingAccess');
                window.location.href = 'index.html';
            }
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// RSVP Form hantering
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
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

// Gallery click functionality (för framtida bildvisning)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img && img.style.display !== 'none') {
            // Här kan du lägga till en lightbox eller modal för att visa bilden större
            console.log('Öppna bild i lightbox:', img.src);
        }
    });
});

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