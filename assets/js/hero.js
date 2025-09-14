/**
 * Hero Section Interactive Effects
 * Handles parallax scrolling, dynamic animations, and interactive elements
 */

class HeroEffects {
    constructor() {
        this.heroSection = document.getElementById('home');
        this.heroBackground = document.querySelector('.hero-background');
        this.floatingElements = document.querySelector('.floating-elements');
        this.particles = document.querySelectorAll('.particle');
        this.flowingLines = document.querySelectorAll('.line');
        this.energyStreams = document.querySelectorAll('.stream');
        this.floatingOrbs = document.querySelectorAll('.floating-orb');
        this.heroContent = document.querySelector('.hero-content');
        
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        if (this.isReducedMotion) return;
        
        this.setupParallaxScrolling();
        this.setupMouseInteraction();
        this.setupIntersectionObserver();
        this.setupDynamicParticles();
        this.setupButtonInteractions();
        
        // Update on resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupParallaxScrolling() {
        if (this.isMobile) return;
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        if (!this.heroSection) return;
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rateBackground = scrolled * -0.3;
        const rateFloating = scrolled * -0.7;
        
        // Parallax background elements
        if (this.heroBackground) {
            this.heroBackground.style.transform = `translateY(${rateBackground}px)`;
        }
        
        // Parallax floating elements
        if (this.floatingElements) {
            this.floatingElements.style.transform = `translateY(${rateFloating}px)`;
        }
        
        // Parallax content with subtle effect
        if (this.heroContent) {
            this.heroContent.style.transform = `translateY(${rate * 0.2}px)`;
        }
        
        // Dynamic opacity based on scroll
        const heroRect = this.heroSection.getBoundingClientRect();
        const opacity = Math.max(0, Math.min(1, (heroRect.bottom - 100) / heroRect.height));
        
        if (this.heroBackground) {
            this.heroBackground.style.opacity = opacity * 0.8;
        }
    }

    setupMouseInteraction() {
        if (this.isMobile) return;
        
        this.heroSection.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        const rect = this.heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        // Subtle floating orb movement
        this.floatingOrbs.forEach((orb, index) => {
            const intensity = (index + 1) * 0.5;
            const moveX = deltaX * intensity * 10;
            const moveY = deltaY * intensity * 10;
            
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Particle interaction
        this.particles.forEach((particle, index) => {
            const intensity = (index % 3 + 1) * 0.3;
            const moveX = deltaX * intensity * 5;
            const moveY = deltaY * intensity * 5;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateHeroElements();
                }
            });
        }, options);

        if (this.heroSection) {
            observer.observe(this.heroSection);
        }
    }

    animateHeroElements() {
        // Staggered animation for hero content
        const elements = [
            document.querySelector('.hero-title'),
            document.querySelector('.hero-description'),
            document.querySelector('.hero-actions'),
        ];

        elements.forEach((element, index) => {
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    setupDynamicParticles() {
        if (this.isMobile) return;
        
        // Add random movement to particles
        this.particles.forEach((particle, index) => {
            const randomDelay = Math.random() * 2000;
            const randomDuration = 3000 + Math.random() * 4000;
            
            setTimeout(() => {
                this.animateParticle(particle, randomDuration);
            }, randomDelay);
        });
    }

    animateParticle(particle, duration) {
        const startTime = Date.now();
        const initialX = Math.random() * 20 - 10;
        const initialY = Math.random() * 20 - 10;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % duration) / duration;
            
            const x = Math.sin(progress * Math.PI * 2) * initialX;
            const y = Math.cos(progress * Math.PI * 2) * initialY;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            
            if (elapsed < duration * 10) { // Run for 10 cycles
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    setupButtonInteractions() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleButtonHover(e) {
        const button = e.currentTarget;
        
        // Add ripple effect
        this.createRippleEffect(button, e);
        
        // Enhance glow effect
        if (button.classList.contains('primary-cta')) {
            button.style.boxShadow = '0 0 40px rgba(216, 17, 240, 0.8), 0 0 80px rgba(216, 17, 240, 0.4)';
        }
    }

    handleButtonLeave(e) {
        const button = e.currentTarget;
        
        // Reset glow effect
        if (button.classList.contains('primary-cta')) {
            button.style.boxShadow = '';
        }
    }

    handleButtonClick(e) {
        const button = e.currentTarget;
        
        // Create explosion effect
        this.createExplosionEffect(button);
        
        // Handle button actions
        if (button.textContent.includes('Start Your Project')) {
            // Scroll to contact section or open modal
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (button.textContent.includes('View Portfolio')) {
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    createRippleEffect(button, e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createExplosionEffect(button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00CBFA';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const lifetime = 1000 + Math.random() * 500;
            
            document.body.appendChild(particle);
            
            this.animateExplosionParticle(particle, angle, velocity, lifetime);
        }
    }

    animateExplosionParticle(particle, angle, velocity, lifetime) {
        const startTime = Date.now();
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / lifetime;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const distance = velocity * progress;
            const x = startX + Math.cos(angle) * distance;
            const y = startY + Math.sin(angle) * distance + (progress * progress * 200); // Gravity effect
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - progress;
            particle.style.transform = `scale(${1 - progress * 0.5})`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;
        
        // Reset transforms on resize
        if (this.heroBackground) {
            this.heroBackground.style.transform = '';
        }
        if (this.floatingElements) {
            this.floatingElements.style.transform = '';
        }
        if (this.heroContent) {
            this.heroContent.style.transform = '';
        }
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroEffects();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroEffects;
}
