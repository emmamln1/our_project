class WhyChooseUsAnimations {
    constructor() {
        this.section = document.getElementById('why-choose-us');
        this.cards = document.querySelectorAll('#why-choose-us .advantage-card');
        this.hasTriggered = false;
        this.isMouseTracking = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupMagneticEffect();
        this.startSequentialPulse();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasTriggered) {
                    this.hasTriggered = true;
                    this.startRevealAnimation();
                }
            });
        }, options);
        
        if (this.section) {
            observer.observe(this.section);
        }
    }
    
    async startRevealAnimation() {
        // Sequential reveal with staggered timing
        for (let i = 0; i < this.cards.length; i++) {
            setTimeout(() => {
                this.cards[i].classList.add('reveal');
                
                // Add pulse effect to icon
                setTimeout(() => {
                    this.cards[i].classList.add('pulse');
                    setTimeout(() => {
                        this.cards[i].classList.remove('pulse');
                    }, 1000);
                }, 200);
                
            }, i * 200);
        }
    }
    
    setupHoverEffects() {
        this.cards.forEach((card, index) => {
            const cardInner = card.querySelector('.card-inner');
            const icon = card.querySelector('.advantage-icon');
            const iconGlow = card.querySelector('.icon-glow');
            
            card.addEventListener('mouseenter', () => {
                // Enhanced hover animation
                this.animateCardHover(card, true);
                
                // Add ripple effect
                this.createRippleEffect(cardInner);
                
                // Icon rotation with bounce
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1.15) rotate(-2deg)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1.2) rotate(5deg)';
                        }, 100);
                    }, 100);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
                
                if (icon) {
                    icon.style.transform = '';
                }
            });
            
            // Add click effect
            card.addEventListener('click', () => {
                this.createClickEffect(card);
            });
        });
    }
    
    setupMagneticEffect() {
        if (window.innerWidth > 768) { // Only on desktop
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const deltaX = (e.clientX - centerX) * 0.1;
                    const deltaY = (e.clientY - centerY) * 0.1;
                    
                    card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }
    }
    
    startSequentialPulse() {
        let currentIndex = 0;
        
        const pulseNext = () => {
            if (this.hasTriggered && this.cards[currentIndex]) {
                this.cards[currentIndex].classList.add('pulse');
                
                setTimeout(() => {
                    this.cards[currentIndex].classList.remove('pulse');
                }, 1000);
                
                currentIndex = (currentIndex + 1) % this.cards.length;
            }
            
            setTimeout(pulseNext, 2000);
        };
        
        // Start pulsing after initial reveal
        setTimeout(pulseNext, 3000);
    }
    
    animateCardHover(card, isHover) {
        const cardInner = card.querySelector('.card-inner');
        const title = card.querySelector('.advantage-title');
        const description = card.querySelector('.advantage-description');
        
        if (isHover) {
            // Enhanced hover state
            cardInner.style.transform = 'translateY(-15px) scale(1.08)';
            cardInner.style.boxShadow = '0 25px 80px rgba(0, 203, 250, 0.4), 0 0 60px rgba(88, 30, 184, 0.3)';
            
            // Text animations
            if (title) {
                title.style.transform = 'translateY(-3px)';
                title.style.textShadow = '0 0 20px rgba(0, 203, 250, 0.6)';
            }
            
            if (description) {
                description.style.transform = 'translateY(2px)';
            }
        } else {
            // Reset to normal state
            cardInner.style.transform = '';
            cardInner.style.boxShadow = '';
            
            if (title) {
                title.style.transform = '';
                title.style.textShadow = '';
            }
            
            if (description) {
                description.style.transform = '';
            }
        }
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 203, 250, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.pointerEvents = 'none';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    createClickEffect(card) {
        const cardInner = card.querySelector('.card-inner');
        
        // Scale down and back up
        cardInner.style.transform = 'translateY(-15px) scale(0.95)';
        
        setTimeout(() => {
            cardInner.style.transform = 'translateY(-15px) scale(1.08)';
        }, 150);
        
        // Create expanding circle effect
        const circle = document.createElement('div');
        circle.style.position = 'absolute';
        circle.style.left = '50%';
        circle.style.top = '50%';
        circle.style.width = '0';
        circle.style.height = '0';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(88, 30, 184, 0.2)';
        circle.style.transform = 'translate(-50%, -50%)';
        circle.style.animation = 'expandCircle 0.8s ease-out';
        circle.style.pointerEvents = 'none';
        
        cardInner.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 800);
    }
}

// Enhanced floating background animation
class FloatingBackgroundManager {
    constructor() {
        this.elements = document.querySelectorAll('#why-choose-us .bg-element');
        this.init();
    }
    
    init() {
        this.elements.forEach((element, index) => {
            this.addMouseInteraction(element);
            this.addRandomMovement(element, index);
        });
    }
    
    addMouseInteraction(element) {
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.02;
                const deltaY = (e.clientY - centerY) * 0.02;
                
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        }
    }
    
    addRandomMovement(element, index) {
        const randomFloat = () => {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const rotation = (Math.random() - 0.5) * 180;
            
            element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            
            setTimeout(randomFloat, 3000 + Math.random() * 2000);
        };
        
        setTimeout(randomFloat, index * 1000);
    }
}

// Performance optimization
class PerformanceManager {
    constructor() {
        this.isVisible = true;
        this.init();
    }
    
    init() {
        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            const cards = document.querySelectorAll('#why-choose-us .advantage-card');
            const bgElements = document.querySelectorAll('#why-choose-us .bg-element');
            
            if (document.hidden) {
                this.isVisible = false;
                cards.forEach(card => {
                    card.style.animationPlayState = 'paused';
                });
                bgElements.forEach(element => {
                    element.style.animationPlayState = 'paused';
                });
            } else {
                this.isVisible = true;
                cards.forEach(card => {
                    card.style.animationPlayState = 'running';
                });
                bgElements.forEach(element => {
                    element.style.animationPlayState = 'running';
                });
            }
        });
        
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                #why-choose-us * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Add CSS for additional animations
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes expandCircle {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize all managers
    new WhyChooseUsAnimations();
    new FloatingBackgroundManager();
    new PerformanceManager();
});

// Export for potential external use
window.WhyChooseUsAnimations = WhyChooseUsAnimations;
