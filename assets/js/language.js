// Language Controller with Globe Icon
class LanguageController {
    constructor() {
        this.currentLanguage = 'en';
        this.langBtn = document.getElementById('langBtn');
        this.langDropdown = document.getElementById('langDropdown');
        this.langOptions = document.querySelectorAll('.lang-option');
        this.mobileLangButtons = document.querySelectorAll('.mobile-lang-btn');
        this.translatableElements = document.querySelectorAll('[data-translate]');
        
        this.translations = {
            en: {
                'nav-about': 'About Us',
                'nav-why-us': 'Why Us',
                'nav-features': 'Features',
                'nav-blog': 'Blog',
                'nav-projects': 'Our Projects',
                'nav-reviews': 'Reviews',
                'nav-contact': 'Contact',
            },
            ru: {
                'nav-about': 'О нас',
                'nav-why-us': 'Почему мы',
                'nav-features': 'Возможности',
                'nav-blog': 'Блог',
                'nav-projects': 'Наши проекты',
                'nav-reviews': 'Отзывы',
                'nav-contact': 'Контакты',
            },
            hy: {
                'nav-about': 'Մենք',
                'nav-why-us': 'Ինչու մենք',
                'nav-features': 'Հնարավորություններ',
                'nav-blog': 'Բլոգ',
                'nav-projects': 'Մեր նախագծերը',
                'nav-reviews': 'Կարծիքներ',
                'nav-contact': 'Կապ',
            }
        };
        
        this.languageData = {
            en: { name: 'English', code: 'EN' },
            ru: { name: 'Русский', code: 'RU' },
            hy: { name: 'Հայերեն', code: 'AM' }
        };
        
        this.init();
    }
    
    init() {
        this.loadSavedLanguage();
        this.setupDropdownBehavior();
        this.setupLanguageButtons();
        this.setupKeyboardNavigation();
        this.updatePageLanguage();
        this.setupClickOutside();
    }
    
    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
    }
    
    // Dropdown behavior
    setupDropdownBehavior() {
        this.langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
        });
        
        this.langBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.openDropdown();
                setTimeout(() => {
                    const firstOption = this.langDropdown.querySelector('.lang-option');
                    if (firstOption) firstOption.focus();
                }, 100);
            }
        });
    }
    
    toggleDropdown() {
        const isOpen = this.langBtn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }
    
    openDropdown() {
        this.langBtn.setAttribute('aria-expanded', 'true');
        this.langDropdown.classList.add('active');
    }
    
    closeDropdown() {
        this.langBtn.setAttribute('aria-expanded', 'false');
        this.langDropdown.classList.remove('active');
    }
    
    setupClickOutside() {
        document.addEventListener('click', (e) => {
            if (!this.langBtn.contains(e.target) && !this.langDropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });
    }
    
    setupLanguageButtons() {
        // Dropdown language options
        this.langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                this.switchLanguage(lang);
                this.closeDropdown();
            });
        });
        
        // Mobile language buttons
        this.mobileLangButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
                
                if (window.headerController && window.headerController.isMenuOpen) {
                    setTimeout(() => {
                        window.headerController.closeMobileMenu();
                    }, 300);
                }
            });
        });
    }
    
    setupKeyboardNavigation() {
        this.langOptions.forEach((option, index) => {
            option.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % this.langOptions.length;
                    this.langOptions[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + this.langOptions.length) % this.langOptions.length;
                    this.langOptions[prevIndex].focus();
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const lang = option.getAttribute('data-lang');
                    this.switchLanguage(lang);
                    this.closeDropdown();
                    this.langBtn.focus();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    this.closeDropdown();
                    this.langBtn.focus();
                }
            });
        });
        
        this.mobileLangButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % this.mobileLangButtons.length;
                    this.mobileLangButtons[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + this.mobileLangButtons.length) % this.mobileLangButtons.length;
                    this.mobileLangButtons[prevIndex].focus();
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const lang = button.getAttribute('data-lang');
                    this.switchLanguage(lang);
                }
            });
        });
    }
    
    switchLanguage(lang) {
        if (!this.translations[lang] || lang === this.currentLanguage) {
            return;
        }
        
        const previousLanguage = this.currentLanguage;
        this.currentLanguage = lang;
        
        localStorage.setItem('preferred-language', lang);
        document.documentElement.lang = lang;
        
        this.updateLanguageButton();
        this.updateButtonStates();
        this.translateContent(previousLanguage);
        this.updateURL();
        this.dispatchLanguageChangeEvent(lang, previousLanguage);
    }
    
    updateLanguageButton() {
        const langData = this.languageData[this.currentLanguage];
        const codeSpan = this.langBtn.querySelector('.lang-code');
        
        if (codeSpan && langData) {
            codeSpan.textContent = langData.code;
        }
    }
    
    updateButtonStates() {
        this.langOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            const isActive = optionLang === this.currentLanguage;
            option.classList.toggle('active', isActive);
        });
        
        this.mobileLangButtons.forEach(button => {
            const buttonLang = button.getAttribute('data-lang');
            const isActive = buttonLang === this.currentLanguage;
            button.classList.toggle('active', isActive);
        });
    }
    
    translateContent(previousLanguage) {
        const currentTranslations = this.translations[this.currentLanguage];
        
        this.translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const newText = currentTranslations[key];
            
            if (newText && element.textContent !== newText) {
                element.style.opacity = '0.5';
                element.style.transform = 'translateY(-5px)';
                
                setTimeout(() => {
                    element.textContent = newText;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 150);
            }
        });
        
        // Trigger font size adjustment after translation
        if (window.headerController) {
            setTimeout(() => {
                window.headerController.adjustNavigationFontSize();
            }, 200);
        }
    }
    
    updateURL() {
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        
        let newPath = currentPath.replace(/^\/(en|ru|hy)\//, '/');
        
        if (this.currentLanguage !== 'en') {
            newPath = `/${this.currentLanguage}${newPath}`;
        }
        
        const newURL = `${newPath}${currentSearch}${currentHash}`;
        
        if (newURL !== window.location.pathname + currentSearch + currentHash) {
            window.history.replaceState({}, '', newURL);
        }
    }
    
    updatePageLanguage() {
        this.updateLanguageButton();
        this.updateButtonStates();
        this.translateContent();
        document.documentElement.lang = this.currentLanguage;
    }
    
    dispatchLanguageChangeEvent(newLang, previousLang) {
        const event = new CustomEvent('languageChanged', {
            detail: {
                newLanguage: newLang,
                previousLanguage: previousLang,
                translations: this.translations[newLang]
            }
        });
        
        document.dispatchEvent(event);
    }
    
    // Public methods
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    addTranslations(lang, translations) {
        if (!this.translations[lang]) {
            this.translations[lang] = {};
        }
        
        Object.assign(this.translations[lang], translations);
    }
    
    addTranslatableElement(element, key) {
        element.setAttribute('data-translate', key);
        this.translatableElements = document.querySelectorAll('[data-translate]');
        
        const translation = this.getTranslation(key);
        if (translation !== key) {
            element.textContent = translation;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageController = new LanguageController();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    if (window.languageController) {
        const pathParts = window.location.pathname.split('/');
        const urlLang = pathParts[1];
        
        if (['en', 'ru', 'hy'].includes(urlLang) && urlLang !== window.languageController.getCurrentLanguage()) {
            window.languageController.switchLanguage(urlLang);
        } else if (!['en', 'ru', 'hy'].includes(urlLang) && window.languageController.getCurrentLanguage() !== 'en') {
            window.languageController.switchLanguage('en');
        }
    }
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageController;
}
