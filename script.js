// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const body = document.body;
const backToTopBtn = document.querySelector('.back-to-top');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close mobile nav when clicking a nav link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Back to Top Button functionality
window.addEventListener('scroll', function() {
    // Show back-to-top button when scrolled down 300px
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Add click event to scroll back to top
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll reveal animation with enhanced effects
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', revealOnScroll);

function revealOnScroll() {
    const animElements = [
        { selector: '.feature-card', delay: 0.1 },
        { selector: '.timeline-item', delay: 0.2 },
        { selector: '.partner', delay: 0.1 },
        { selector: '.stat-card', delay: 0.15 },
        { selector: '.phone', delay: 0.2 },
        { selector: '.app-button', delay: 0.1 }
    ];
    
    animElements.forEach(({selector, delay}) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            // Calculate the actual delay based on element index
            const actualDelay = delay * (index + 1);
            element.style.transitionDelay = `${actualDelay}s`;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    });
    
    // Special animation for timeline to draw the line
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineTop = timeline.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (timelineTop < windowHeight - 100) {
            timeline.classList.add('active');
        }
    }
    
    // Parallax effect for the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollValue = window.scrollY;
        const wave = document.querySelector('.wave');
        if (wave) {
            wave.style.transform = `translateY(${scrollValue * 0.1}px)`;
        }
    }
}

// Add interactive counters to stats
function animateCounters() {
    const statElements = document.querySelectorAll('.stat-card h3');
    
    statElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50; // Divide for smoother counting
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count) + (stat.getAttribute('data-suffix') || '');
                setTimeout(updateCount, 30);
            } else {
                stat.textContent = target + (stat.getAttribute('data-suffix') || '');
            }
        };
        
        // Create an Intersection Observer to start the animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Add 'active' class for animation and initialize other features
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to elements that should be animated on page load
    const initialAnimElements = document.querySelectorAll('.hero-text, .hero-image');
    initialAnimElements.forEach(el => {
        el.classList.add('active');
    });
    
    // Typewriter effect for hero heading
    const heroHeading = document.querySelector('.hero-text h2');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Call revealOnScroll to handle visible elements on page load
    revealOnScroll();
    
    // Initialize counter animations
    animateCounters();
    
    // Add interactive hover effects to features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            featureCards.forEach(c => c.classList.remove('highlight'));
            card.classList.add('highlight');
        });
    });
    
    // Partner logos mouse follow effect
    const partners = document.querySelectorAll('.partner');
    partners.forEach(partner => {
        partner.addEventListener('mousemove', (e) => {
            const img = partner.querySelector('img');
            const bounds = partner.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const rotateY = (mouseX / bounds.width - 0.5) * 20;
            const rotateX = (mouseY / bounds.height - 0.5) * -20;
            
            img.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });
        
        partner.addEventListener('mouseleave', () => {
            const img = partner.querySelector('img');
            img.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Smooth scrolling for anchor links with improved performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Add active class to the clicked menu item
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active-link');
            });
            this.classList.add('active-link');
            
            // Smooth scroll with easing
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            window.requestAnimationFrame(step);
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function (ease-out-cubic)
                const easing = 1 - Math.pow(1 - percentage, 3);
                
                window.scrollTo(0, startPosition + distance * easing);
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
        }
    });
});

// Add scroll-based navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200; // Offset for better UX
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the current FAQ item
            item.classList.toggle('active');
        });
    });
});

// Add back-to-top button functionality
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
