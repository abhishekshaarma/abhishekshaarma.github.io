
// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const messageDiv = document.getElementById('contactFormMessage');
        
        // Simulate form submission
        messageDiv.innerHTML = '<div class="success-message">Thank you for your message! I\'ll get back to you soon.</div>';
        messageDiv.style.display = 'block';
        
        // Clear form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Enhanced Project Hover Effects
function initProjectHovers() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe projects for scroll animations
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(project);
    });

    // Skills cards animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });

    // Contact cards animation
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showPage('projects');
                    document.querySelector('[onclick="showPage(\'projects\')"]').click();
                    break;
                case '2':
                    e.preventDefault();
                    showPage('about');
                    document.querySelector('[onclick="showPage(\'about\')"]').click();
                    break;
                case '3':
                    e.preventDefault();
                    showPage('contact');
                    document.querySelector('[onclick="showPage(\'contact\')"]').click();
                    break;
                case 'd':
                    e.preventDefault();
                    toggleTheme();
                    break;
            }
        }
    });
}

// Typing Effect (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for title (uncomment to enable)
function initTypingEffect() {
    // const title = document.querySelector('h1');
    // typeWriter(title, 'ABHISHEK SHARMA', 150);
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateScrollElements() {
        initBackToTop();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    loadTheme();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();
    initProjectHovers();
    initScrollAnimations();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    
    // Optional enhancements
    // initTypingEffect(); // Uncomment to enable typing effect
    
    console.log('Portfolio initialized successfully!');
});

// Export functions for potential use in other scripts
window.portfolioFunctions = {
    toggleTheme,
    showPage,
    scrollToTop,
    typeWriter
};