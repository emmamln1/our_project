// Footer JavaScript for animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer functionality
    initFooterAnimations();
    initBackToTop();
    initNewsletterForm();
    initSocialLinks();
    initScrollAnimations();
});

// Footer animations initialization
function initFooterAnimations() {
    const footerSections = document.querySelectorAll('#footer .footer-section-item');
    
    // Intersection Observer for footer sections
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    footerSections.forEach(section => {
        footerObserver.observe(section);
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // Show/hide back to top button based on scroll position
    function toggleBackToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show button when scrolled down 20% of page
        if (scrollTop > windowHeight * 0.2) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    backToTopBtn.addEventListener('click', scrollToTop);

    // Add hover animation
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterInput = newsletterForm?.querySelector('.newsletter-input');
    const newsletterBtn = newsletterForm?.querySelector('.newsletter-btn');

    if (!newsletterForm) return;

    // Form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!email) {
            showNotification('Խնդրում ենք մուտքագրել ձեր էլ. հասցեն', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Խնդրում ենք մուտքագրել վավեր էլ. հասցե', 'error');
            return;
        }

        // Simulate form submission
        newsletterBtn.disabled = true;
        newsletterBtn.innerHTML = '<span>Ուղարկվում է...</span>';

        setTimeout(() => {
            showNotification('Շնորհակալություն! Դուք հաջողությամբ բաժանորդագրվեցիք:', 'success');
            newsletterInput.value = '';
            newsletterBtn.disabled = false;
            newsletterBtn.innerHTML = '<span>Բաժանորդագրվել</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>';
        }, 1500);
    });

    // Input focus effects
    newsletterInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    newsletterInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
}

// Social links interactions
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('#footer .social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'social-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(88, 30, 184, 0.3), transparent);
                border-radius: 50%;
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Click tracking (for analytics)
        link.addEventListener('click', function(e) {
            const platform = this.dataset.platform;
            console.log(`Social link clicked: ${platform}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95) translateY(-3px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('#footer .footer-link, #footer .contact-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(element);
    });
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #581EB8, #00CBFA)' : 'linear-gradient(45deg, #D811F0, #581EB8)'};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(88, 30, 184, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add CSS animations for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 80px;
            height: 80px;
            opacity: 0;
        }
    }
    
    #footer .newsletter-input-container.focused .input-glow {
        opacity: 0.3 !important;
    }
    
    #footer .social-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
