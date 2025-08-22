// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }
    
    // Update copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for navigation links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (for frontend-only solution)
            showFormStatus('Thank you for your inquiry! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', {
                name,
                email,
                phone,
                company,
                message
            });
        });
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(44, 62, 80, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)';
                header.style.backdropFilter = 'none';
            }
        }
    });
    
    // Add animation on scroll for products
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
    
    // Observe all product items
    const productItems = document.querySelectorAll('.item');
    productItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
});

// Utility functions
function showFormStatus(message, type) {
    const statusDiv = document.getElementById('formStatus');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'status';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for form status
const style = document.createElement('style');
style.textContent = `
    .status.success {
        color: #27ae60;
        font-weight: 600;
    }
    
    .status.error {
        color: #e74c3c;
        font-weight: 600;
    }
    
    .status {
        margin-left: 1rem;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for statistics (if you want to add them later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add search functionality for products (if needed)
function searchProducts(query) {
    const products = document.querySelectorAll('.item');
    const queryLower = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(queryLower) || description.includes(queryLower)) {
            product.style.display = 'block';
            product.style.opacity = '1';
        } else {
            product.style.display = 'none';
            product.style.opacity = '0';
        }
    });
}

// Export functions for potential use in HTML
window.searchProducts = searchProducts;
window.animateCounter = animateCounter;
