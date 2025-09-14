// Modern Futuristic Header Controller
class HeaderController {
    constructor() {
        this.header = document.getElementById('header');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.sections = document.querySelectorAll('.section');
        this.navList = document.getElementById('navList');
        
        this.scrollThreshold = 50;
        this.isMenuOpen = false;
        this.currentSection = 'about';
        
        this.init();
    }
    
    init() {
        this.setupStickyHeader();
        this.setupMobileMenu();
        this.setupSectionDetection();
        this.setupSmoothScrolling();
        this.setupKeyboardNavigation();
        this.setupResponsiveFontSizing();
        this.handleResize();
    }
    
    // Sticky Header with Smooth Scroll Behavior
    setupStickyHeader() {
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > this.scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
        updateHeader();
    }
    
    // Responsive Font Sizing - Reduce Font Size Instead of Wrapping
    setupResponsiveFontSizing() {
        this.adjustNavigationFontSize();
        window.addEventListener('resize', () => this.adjustNavigationFontSize());
    }
    
    adjustNavigationFontSize() {
        if (!this.navList || window.innerWidth <= 768) return;
        
        const container = this.navList.parentElement;
        const containerWidth = container.offsetWidth;
        const navItems = this.navList.children;
        
        // Reset to default size first
        this.navLinks.forEach(link => {
            link.style.fontSize = '';
            link.style.padding = '';
        });
        
        // Check if content overflows
        let totalWidth = 0;
        Array.from(navItems).forEach(item => {
            totalWidth += item.offsetWidth;
        });
        
        // Add gap spacing
        totalWidth += (navItems.length - 1) * 24; // 1.5rem gap
        
        if (totalWidth > containerWidth) {
            // Reduce font size progressively
            const reductionSteps = [
                { fontSize: '0.9rem', padding: '0.6rem 1rem' },
                { fontSize: '0.85rem', padding: '0.5rem 0.8rem' },
                { fontSize: '0.8rem', padding: '0.4rem 0.6rem' },
                { fontSize: '0.75rem', padding: '0.3rem 0.5rem' }
            ];
            
            for (let step of reductionSteps) {
                this.navLinks.forEach(link => {
                    link.style.fontSize = step.fontSize;
                    link.style.padding = step.padding;
                });
                
                // Recalculate width
                totalWidth = 0;
                Array.from(navItems).forEach(item => {
                    totalWidth += item.offsetWidth;
                });
                totalWidth += (navItems.length - 1) * 20; // Reduced gap
                
                if (totalWidth <= containerWidth) break;
            }
        }
    }
    
    // Mobile Menu Functionality
    setupMobileMenu() {
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });
        
        
        this.mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileMenuOverlay) {
                this.closeMobileMenu();
            }
        });
        
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileMenuToggle.classList.add('active');
        this.mobileMenuOverlay.classList.add('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Remove focus from toggle button
        this.mobileMenuToggle.blur();
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenuToggle.classList.remove('active');
        this.mobileMenuOverlay.classList.remove('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        this.mobileMenuToggle.blur();
    }
    
    // Section Detection and Active Navigation
    setupSectionDetection() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveNavigation(sectionId);
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    updateActiveNavigation(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        
        // Update desktop navigation
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile navigation
        this.mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth Scrolling
    setupSmoothScrolling() {
        const allNavLinks = [...this.navLinks, ...this.mobileNavLinks];
        
        allNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    this.smoothScrollTo(targetPosition);
                }
            });
        });
    }
    
    // Enhanced Smooth Scrolling
    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        requestAnimationFrame(animation);
    }
    
    // Smooth easing function
    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    // Keyboard Navigation
    setupKeyboardNavigation() {
        this.navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % this.navLinks.length;
                    this.navLinks[nextIndex].focus();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + this.navLinks.length) % this.navLinks.length;
                    this.navLinks[prevIndex].focus();
                }
            });
        });
        
        this.mobileNavLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % this.mobileNavLinks.length;
                    this.mobileNavLinks[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + this.mobileNavLinks.length) % this.mobileNavLinks.length;
                    this.mobileNavLinks[prevIndex].focus();
                }
            });
        });
    }
    
    // Handle Window Resize
    handleResize() {
        window.addEventListener('resize', () => {
            if (this.isMenuOpen && window.innerWidth > 768) {
                this.closeMobileMenu();
            }
            
            // Debounce font size adjustment
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.adjustNavigationFontSize();
            }, 100);
        });
    }
    
    // Public Methods
    scrollToSection(sectionId) {
        const targetSection = document.querySelector(`#${sectionId}`);
        if (targetSection) {
            const headerHeight = this.header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            this.smoothScrollTo(targetPosition);
        }
    }
    
    getCurrentSection() {
        return this.currentSection;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.headerController = new HeaderController();
});

// Performance optimization
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
    }
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderController;
}
