class InteractiveFeaturesSection {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.touchStartTime = 0;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCardInteractions();
        this.setupMobileInteractions();
        this.setupLoadingAnimations();
        this.setupResizeHandler();
        this.preloadAnimations();
    }

    setupScrollAnimations() {
        const featuresSection = document.getElementById('features');
        const featureCards = document.querySelectorAll('#features .feature-card');
        
        if (!featuresSection) return;

        // Intersection Observer for section entrance
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.startStaggeredCardAnimations();
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        sectionObserver.observe(featuresSection);

        // Individual card observers for enhanced animations
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.enhanceCardAnimation(entry.target);
                }
            });
        }, { threshold: 0.3 });

        featureCards.forEach(card => {
            cardObserver.observe(card);
        });
    }

    startStaggeredCardAnimations() {
        const cards = document.querySelectorAll('#features .feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                this.addGlowEffect(card);
            }, index * 100);
        });
    }

    enhanceCardAnimation(card) {
        // Add subtle entrance glow
        setTimeout(() => {
            // card.style.boxShadow = '0 0 30px rgba(88, 30, 184, 0.2)';
            setTimeout(() => {
                card.style.boxShadow = '';
            }, 1000);
        }, 200);
    }

    addGlowEffect(card) {
        const cardInner = card.querySelector('.card-inner');
        if (cardInner) {
            cardInner.style.filter = 'drop-shadow(0 0 20px rgba(0, 203, 250, 0.1))';
            setTimeout(() => {
                cardInner.style.filter = '';
            }, 800);
        }
    }

    setupCardInteractions() {
        const featureCards = document.querySelectorAll('#features .feature-card');

        featureCards.forEach(card => {
            // Desktop hover interactions
            if (!this.isMobile) {
                card.addEventListener('mouseenter', (e) => {
                    this.handleCardHover(e.target, true);
                });

                card.addEventListener('mouseleave', (e) => {
                    this.handleCardHover(e.target, false);
                });

                // Enhanced hover with mouse movement
                card.addEventListener('mousemove', (e) => {
                    this.handleMouseMove(e, card);
                });
            }

            // Click interactions for both desktop and mobile
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCardClick(card);
            });
        });
    }

    handleCardHover(card, isHovering) {
        if (this.isAnimating) return;

        const cardInner = card.querySelector('.card-inner');
        const icon = card.querySelector('.feature-icon');
        const flipIndicator = card.querySelector('.flip-indicator');

        if (isHovering) {
            // Enhanced hover effects
            card.style.transform = 'translateY(-10px) scale(1.02)';
            // card.style.boxShadow = '0 20px 60px rgba(88, 30, 184, 0.3), 0 0 40px rgba(0, 203, 250, 0.2)';
            
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                icon.style.boxShadow = '0 0 50px rgba(0, 203, 250, 0.7)';
            }

            if (flipIndicator) {
                flipIndicator.style.opacity = '1';
                flipIndicator.style.transform = 'translateY(-5px)';
            }

            // Start demo animations
            this.startDemoAnimation(card);
        } else {
            // Reset hover effects
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                // icon.style.boxShadow = '0 0 30px rgba(88, 30, 184, 0.5)';
            }

            if (flipIndicator) {
                flipIndicator.style.opacity = '0.7';
                flipIndicator.style.transform = 'translateY(0)';
            }

            // Stop demo animations
            this.stopDemoAnimation(card);
        }
    }

    handleMouseMove(e, card) {
        if (this.isMobile) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / rect.height) * 5;
        const rotateY = (mouseX / rect.width) * 5;
        
        card.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    }

    handleCardClick(card) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const cardInner = card.querySelector('.card-inner');
        
        if (this.isMobile) {
            // Mobile tilt and flip animation
            card.classList.add('mobile-tilt');
            
            setTimeout(() => {
                card.classList.toggle('mobile-flipped');
                card.classList.remove('mobile-tilt');
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 300);
            }, 200);
        } else {
            // Desktop click enhancement
            const isFlipped = cardInner.style.transform.includes('rotateY(180deg)');
            
            if (!isFlipped) {
                cardInner.style.transform = 'rotateY(180deg) scale(1.05)';
                setTimeout(() => {
                    cardInner.style.transform = 'rotateY(180deg)';
                }, 200);
            } else {
                cardInner.style.transform = 'rotateY(0deg) scale(1.05)';
                setTimeout(() => {
                    cardInner.style.transform = 'rotateY(0deg)';
                }, 200);
            }
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 800);
        }

        // Add click ripple effect
        this.createRippleEffect(card, event);
    }

    createRippleEffect(card, event) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 203, 250, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupMobileInteractions() {
        if (!('ontouchstart' in window)) return;

        const featureCards = document.querySelectorAll('#features .feature-card');

        featureCards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                this.touchStartTime = Date.now();
                card.classList.add('mobile-tilt');
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                const touchDuration = Date.now() - this.touchStartTime;
                
                setTimeout(() => {
                    card.classList.remove('mobile-tilt');
                }, 100);

                // Long press for flip
                if (touchDuration > 300) {
                    e.preventDefault();
                    this.handleCardClick(card);
                }
            }, { passive: false });

            // Touch move for tilt effect
            card.addEventListener('touchmove', (e) => {
                if (this.isAnimating) return;
                
                const touch = e.touches[0];
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const touchX = touch.clientX - centerX;
                const touchY = touch.clientY - centerY;
                
                const tiltX = (touchY / rect.height) * 10;
                const tiltY = (touchX / rect.width) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            }, { passive: true });
        });
    }

    startDemoAnimation(card) {
        const feature = card.dataset.feature;
        const demoVideo = card.querySelector('.demo-video');
        
        if (!demoVideo) return;

        switch (feature) {
            case 'responsive':
                this.animateDeviceMockup(demoVideo);
                break;
            case 'performance':
                this.animateSpeedMeter(demoVideo);
                break;
            case 'seo':
                this.animateSEOChart(demoVideo);
                break;
            case 'security':
                this.animateSecurityShield(demoVideo);
                break;
            case 'custom':
                this.animateCodeAnimation(demoVideo);
                break;
            case 'support':
                this.animateSupportChat(demoVideo);
                break;
        }
    }

    stopDemoAnimation(card) {
        const demoVideo = card.querySelector('.demo-video');
        if (demoVideo) {
            // Reset all animations to initial state
            const animatedElements = demoVideo.querySelectorAll('*');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
                setTimeout(() => {
                    el.style.animationPlayState = 'running';
                }, 100);
            });
        }
    }

    animateDeviceMockup(container) {
        const mockup = container.querySelector('.device-mockup');
        const screen = container.querySelector('.screen');
        const dots = container.querySelectorAll('.animation-dots span');
        
        if (mockup) mockup.style.animationDuration = '1s';
        if (screen) screen.style.animationDuration = '1.5s';
        dots.forEach(dot => dot.style.animationDuration = '0.8s');
    }

    animateSpeedMeter(container) {
        const needle = container.querySelector('.meter-needle');
        const arc = container.querySelector('.meter-arc');
        
        if (needle) needle.style.animationDuration = '1.5s';
        if (arc) arc.style.animationDuration = '1s';
    }

    animateSEOChart(container) {
        const bars = container.querySelectorAll('.chart-bar');
        bars.forEach((bar, index) => {
            bar.style.animationDuration = '1s';
            bar.style.animationDelay = (index * 0.1) + 's';
        });
    }

    animateSecurityShield(container) {
        const waves = container.querySelectorAll('.wave');
        const shield = container.querySelector('.shield-icon');
        
        waves.forEach(wave => wave.style.animationDuration = '1s');
        if (shield) shield.style.animationDuration = '1s';
    }

    animateCodeAnimation(container) {
        const lines = container.querySelectorAll('.code-line');
        const cursor = container.querySelector('.code-cursor');
        
        lines.forEach(line => line.style.animationDuration = '1.5s');
        if (cursor) cursor.style.animationDuration = '0.5s';
    }

    animateSupportChat(container) {
        const typingDots = container.querySelectorAll('.typing-indicator span');
        const onlineIndicator = container.querySelector('.online-indicator');
        
        typingDots.forEach(dot => dot.style.animationDuration = '0.8s');
        if (onlineIndicator) onlineIndicator.style.animationDuration = '1s';
    }

    setupLoadingAnimations() {
        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.resetAllCards();
            }, 250);
        });
    }

    resetAllCards() {
        const cards = document.querySelectorAll('#features .feature-card');
        cards.forEach(card => {
            const cardInner = card.querySelector('.card-inner');
            card.style.transform = '';
            card.classList.remove('mobile-flipped', 'mobile-tilt');
            if (cardInner) {
                cardInner.style.transform = '';
            }
        });
        this.isAnimating = false;
    }

    preloadAnimations() {
        // Preload and optimize animations for better performance
        const cards = document.querySelectorAll('#features .feature-card');
        cards.forEach(card => {
            card.style.willChange = 'transform';
            const cardInner = card.querySelector('.card-inner');
            if (cardInner) {
                cardInner.style.willChange = 'transform';
            }
        });

        // Remove will-change after animations are complete
        setTimeout(() => {
            cards.forEach(card => {
                card.style.willChange = 'auto';
                const cardInner = card.querySelector('.card-inner');
                if (cardInner) {
                    cardInner.style.willChange = 'auto';
                }
            });
        }, 3000);
    }

    // Public method to manually trigger card flip
    flipCard(cardIndex) {
        const cards = document.querySelectorAll('#features .feature-card');
        if (cards[cardIndex]) {
            this.handleCardClick(cards[cardIndex]);
        }
    }

    // Public method to reset all cards
    resetCards() {
        this.resetAllCards();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.featuresSection = new InteractiveFeaturesSection();
});

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        const animatedElements = document.querySelectorAll('#features [style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        const animatedElements = document.querySelectorAll('#features [style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
