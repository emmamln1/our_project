class AboutUsAnimations {
    constructor() {
        this.thoughtBubble = document.getElementById('thoughtBubble');
        this.thoughtText = document.getElementById('thoughtText');
        this.typingCursor = document.getElementById('typingCursor');
        this.contactBtn = document.getElementById('contactBtn');
        
        this.messages = [
            'Hello!',
            'I will help you',
            'Click the button below'
        ];
        
        this.currentMessageIndex = 0;
        this.isAnimating = false;
        this.hasTriggered = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupContactButton();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasTriggered) {
                    this.hasTriggered = true;
                    this.startThoughtSequence();
                }
            });
        }, options);
        
        const aboutSection = document.getElementById('about-us');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }
    
    async startThoughtSequence() {
        // Show thought bubble first
        this.thoughtBubble.classList.add('show');
        
        // Wait a bit before starting text animation
        await this.delay(500);
        
        // Start the message sequence
        this.animateMessages();
    }
    
    async animateMessages() {
        for (let i = 0; i < this.messages.length; i++) {
            await this.typeMessage(this.messages[i]);
            
            // Pause between messages (except after the last one)
            if (i < this.messages.length - 1) {
                await this.delay(1500);
                this.clearMessage();
                await this.delay(300);
            }
        }
        
        // Keep the last message and hide cursor
        setTimeout(() => {
            this.typingCursor.style.opacity = '0';
        }, 1000);
    }
    
    async typeMessage(message) {
        this.isAnimating = true;
        this.typingCursor.style.opacity = '1';
        
        for (let i = 0; i <= message.length; i++) {
            this.thoughtText.textContent = message.substring(0, i);
            await this.delay(80); // Typing speed
        }
        
        this.isAnimating = false;
    }
    
    clearMessage() {
        this.thoughtText.textContent = '';
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    setupContactButton() {
        if (this.contactBtn) {
            this.contactBtn.addEventListener('click', () => {
                // Scroll to contact section or show contact modal
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Fallback: scroll to bottom of page
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }
                
                // Add click animation
                this.contactBtn.style.transform = 'translateY(-3px) scale(0.95)';
                setTimeout(() => {
                    this.contactBtn.style.transform = '';
                }, 150);
            });
            
            // Add hover sound effect simulation
            this.contactBtn.addEventListener('mouseenter', () => {
                this.contactBtn.style.boxShadow = '0 15px 40px rgba(88, 30, 184, 0.6), 0 0 20px rgba(0, 203, 250, 0.4)';
            });
            
            this.contactBtn.addEventListener('mouseleave', () => {
                this.contactBtn.style.boxShadow = '0 8px 25px rgba(88, 30, 184, 0.4)';
            });
        }
    }
}

// Enhanced robot animations
class RobotEnhancements {
    constructor() {
        this.robot = document.querySelector('#about-us .robot');
        this.leftEye = document.querySelector('#about-us .left-eye');
        this.rightEye = document.querySelector('#about-us .right-eye');
        this.chestLight = document.querySelector('#about-us .chest-light');
        
        this.init();
    }
    
    init() {
        this.addInteractiveEyes();
        this.addRandomBlinks();
        this.addChestLightVariations();
    }
    
    addInteractiveEyes() {
        if (!this.leftEye || !this.rightEye) return;
        
        document.addEventListener('mousemove', (e) => {
            const robotRect = this.robot.getBoundingClientRect();
            const robotCenterX = robotRect.left + robotRect.width / 2;
            const robotCenterY = robotRect.top + robotRect.height / 2;
            
            const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
            const distance = Math.min(3, Math.sqrt(Math.pow(e.clientX - robotCenterX, 2) + Math.pow(e.clientY - robotCenterY, 2)) / 100);
            
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            this.leftEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            this.rightEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }
    
    addRandomBlinks() {
        if (!this.leftEye || !this.rightEye) return;
        
        const blink = () => {
            this.leftEye.style.transform = 'scaleY(0.1)';
            this.rightEye.style.transform = 'scaleY(0.1)';
            
            setTimeout(() => {
                this.leftEye.style.transform = '';
                this.rightEye.style.transform = '';
            }, 150);
        };
        
        // Random blinks every 3-7 seconds
        const scheduleNextBlink = () => {
            const delay = 3000 + Math.random() * 4000;
            setTimeout(() => {
                blink();
                scheduleNextBlink();
            }, delay);
        };
        
        scheduleNextBlink();
    }
    
    addChestLightVariations() {
        if (!this.chestLight) return;
        
        // Occasionally change chest light intensity
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.chestLight.style.opacity = '0.5';
                setTimeout(() => {
                    this.chestLight.style.opacity = '';
                }, 200);
            }
        }, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutUsAnimations();
    new RobotEnhancements();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        const robot = document.querySelector('#about-us .robot');
        if (robot) {
            robot.style.animationPlayState = 'paused';
        }
    } else {
        // Resume animations when page becomes visible
        const robot = document.querySelector('#about-us .robot');
        if (robot) {
            robot.style.animationPlayState = 'running';
        }
    }
});

// Smooth scroll enhancement for better UX
const smoothScrollToSection = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Export for potential external use
window.AboutUsAnimations = AboutUsAnimations;
window.RobotEnhancements = RobotEnhancements;
