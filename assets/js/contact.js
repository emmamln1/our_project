/**
 * Contact Form Controller
 * Handles form validation, submission, and 3D card animations
 */

class ContactController {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.formStatus = document.getElementById('formStatus');
        this.contactCard = document.querySelector('.contact-card');
        
        this.init();
    }

    init() {
        if (this.form) {
            this.setupFormValidation();
            this.setupFormSubmission();
            this.setupFloatingLabels();
            this.setupCardAnimations();
            this.setupScrollAnimations();
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const errorElement = document.getElementById(fieldName + 'Error');
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.getFieldLabel(fieldName) + ' is required';
        }
        
        // Email validation
        else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation (if provided)
        else if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Name validation
        else if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }
        
        // Message validation
        else if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        this.showFieldError(errorElement, errorMessage, !isValid);
        return isValid;
    }

    clearFieldError(input) {
        const fieldName = input.name;
        const errorElement = document.getElementById(fieldName + 'Error');
        this.showFieldError(errorElement, '', false);
    }

    showFieldError(errorElement, message, show) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.toggle('show', show);
        }
    }

    getFieldLabel(fieldName) {
        const labels = {
            'name': 'Name',
            'email': 'Email',
            'phone': 'Phone',
            'message': 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('.form-input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validateForm()) {
                this.showFormStatus('Please fix the errors above', 'error');
                return;
            }

            await this.submitForm();
        });
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        this.setSubmitButtonLoading(true);
        this.hideFormStatus();

        try {
            const response = await fetch('api/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.showFormStatus(result.message, 'success');
                this.form.reset();
                this.resetFloatingLabels();
                this.triggerSuccessAnimation();
            } else {
                this.showFormStatus(result.message || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Network error. Please try again later.', 'error');
        } finally {
            this.setSubmitButtonLoading(false);
        }
    }

    setSubmitButtonLoading(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const particles = this.submitBtn.querySelector('.btn-particles');
        
        if (loading) {
            btnText.textContent = 'Sending...';
            this.submitBtn.disabled = true;
            particles.style.opacity = '1';
        } else {
            btnText.textContent = 'Send Message';
            this.submitBtn.disabled = false;
            particles.style.opacity = '0.6';
        }
    }

    showFormStatus(message, type) {
        this.formStatus.textContent = message;
        this.formStatus.className = `form-status ${type} show`;
    }

    hideFormStatus() {
        this.formStatus.classList.remove('show');
    }

    resetFloatingLabels() {
        // Labels are now above inputs, no reset needed
        return;
    }

    setupFloatingLabels() {
        const inputs = this.form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            // Handle initial state
            this.updateLabelState(input);
            
            // Handle focus/blur events
            input.addEventListener('focus', () => this.updateLabelState(input));
            input.addEventListener('blur', () => this.updateLabelState(input));
            input.addEventListener('input', () => this.updateLabelState(input));
        });
    }

    updateLabelState(input) {
        // Labels are now above inputs, no need for floating animation
        return;
    }

    setupCardAnimations() {
        if (!this.contactCard) return;

        // Mouse move 3D effect
        this.contactCard.addEventListener('mousemove', (e) => {
            const rect = this.contactCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.contactCard.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });

        // Reset on mouse leave
        this.contactCard.addEventListener('mouseleave', () => {
            this.contactCard.style.transform = '';
        });

        // Click animation
        this.contactCard.addEventListener('click', () => {
            this.contactCard.style.transform = 'perspective(1000px) rotateY(180deg)';
            setTimeout(() => {
                this.contactCard.style.transform = '';
            }, 600);
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe contact elements
        const contactElements = document.querySelectorAll('.contact-card, .form-container, .info-item');
        contactElements.forEach(el => {
            observer.observe(el);
        });

        // Add CSS for scroll animations
        this.addScrollAnimationStyles();
    }

    addScrollAnimationStyles() {
        if (document.querySelector('#contactScrollAnimations')) return;

        const style = document.createElement('style');
        style.id = 'contactScrollAnimations';
        style.textContent = `
            .contact-card,
            .form-container,
            .info-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .contact-card.animate-in,
            .form-container.animate-in,
            .info-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .info-item:nth-child(2).animate-in {
                transition-delay: 0.2s;
            }
        `;
        document.head.appendChild(style);
    }

    triggerSuccessAnimation() {
        // Card success animation
        if (this.contactCard) {
            this.contactCard.style.transform = 'perspective(1000px) rotateY(360deg) scale(1.05)';
            setTimeout(() => {
                this.contactCard.style.transform = '';
            }, 1000);
        }

        // Form success animation
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.style.transform = 'scale(1.02)';
            formContainer.style.boxShadow = '0 30px 60px rgba(88, 30, 184, 0.3)';
            setTimeout(() => {
                formContainer.style.transform = '';
                formContainer.style.boxShadow = '';
            }, 500);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.contact-section')) {
        window.contactController = new ContactController();
    }
});

// Add language support for contact section
if (window.languageManager) {
    window.languageManager.addTranslations({
        'contact': {
            'am': {
                'title': 'Կապ Մեզ Հետ',
                'subtitle': 'Պատրա՞ստ եք միասին կառուցել ապագան',
                'formTitle': 'Ուղարկեք Հաղորդագրություն',
                'name': 'Անուն',
                'email': 'Էլ. հասցե',
                'emailField': 'Էլ. հասցե',
                'phoneField': 'Հեռախոս (ոչ պարտադիր)',
                'phone': 'Հեռախոս',
                'message': 'Հաղորդագրություն',
                'send': 'Ուղարկել'
            },
            'ru': {
                'title': 'Свяжитесь с нами',
                'subtitle': 'Готовы строить будущее вместе?',
                'formTitle': 'Отправить сообщение',
                'name': 'Имя',
                'email': 'Эл. почта',
                'emailField': 'Эл. почта',
                'phoneField': 'Телефон (необязательно)',
                'phone': 'Телефон',
                'message': 'Сообщение',
                'send': 'Отправить'
            },
            'en': {
                'title': 'Contact Us',
                'subtitle': 'Ready to build the future together?',
                'formTitle': 'Send Message',
                'name': 'Name',
                'email': 'Email',
                'emailField': 'Email',
                'phoneField': 'Phone (optional)',
                'phone': 'Phone',
                'message': 'Message',
                'send': 'Send'
            }
        }
    });
}
