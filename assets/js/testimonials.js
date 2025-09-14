class TestimonialCarousel {
    constructor() {
        this.carousel = document.querySelector('.testimonial-carousel');
        this.items = document.querySelectorAll('.carousel__item');
        
        this.currentIndex = 0;
        this.totalItems = this.items.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds
        this.isAnimating = false;
        
        // Touch/swipe variables
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.threshold = 50; // minimum distance for swipe
        
        this.init();
    }
    
    init() {
        if (!this.carousel || this.items.length === 0) return;
        
        this.setupEventListeners();
        this.setupTouchEvents();
        this.startAutoPlay();
        this.updateActiveStates();
        
        // Pause auto-play when user hovers over carousel
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Pause auto-play when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }
    
    setupEventListeners() {
        // No manual navigation controls
    }
    
    setupTouchEvents() {
        // Touch events for mobile swipe
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse events for desktop drag
        this.carousel.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.carousel.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.carousel.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.carousel.addEventListener('mouseleave', (e) => this.handleMouseUp(e));
        
        // Prevent context menu on long press
        this.carousel.addEventListener('contextmenu', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
    }
    
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.isDragging = true;
        this.pauseAutoPlay();
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;
    }
    
    handleTouchEnd(e) {
        if (!this.isDragging) return;
        
        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.threshold) {
            if (deltaX > 0) {
                this.goToPrevious();
            } else {
                this.goToNext();
            }
        }
        
        this.isDragging = false;
        this.startAutoPlay();
    }
    
    handleMouseDown(e) {
        e.preventDefault();
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.isDragging = true;
        this.pauseAutoPlay();
        this.carousel.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX;
        this.currentY = e.clientY;
    }
    
    handleMouseUp(e) {
        if (!this.isDragging) return;
        
        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Check if horizontal drag is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.threshold) {
            if (deltaX > 0) {
                this.goToPrevious();
            } else {
                this.goToNext();
            }
        }
        
        this.isDragging = false;
        this.carousel.style.cursor = 'grab';
        this.startAutoPlay();
    }
    
    goToNext() {
        if (this.isAnimating) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateActiveStates();
        this.resetAutoPlay();
    }
    
    goToPrevious() {
        if (this.isAnimating) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateActiveStates();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateActiveStates();
        this.resetAutoPlay();
    }
    
    updateActiveStates() {
        // Add animation lock
        this.isAnimating = true;
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.goToNext();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        setTimeout(() => {
            this.startAutoPlay();
        }, 1000); // Wait 1 second before restarting auto-play
    }
    
    // Method to add new testimonial (for admin functionality)
    addTestimonial(testimonialData) {
        const { photo, name, title, review } = testimonialData;
        
        const newItem = document.createElement('div');
        newItem.className = 'carousel__item';
        newItem.innerHTML = `
            <div class="carousel__item-head">
                <img src="${photo}" alt="${name}" class="customer-photo">
            </div>
            <div class="carousel__item-body">
                <p class="review-text">"${review}"</p>
                <p class="customer-name">${name}</p>
                <p class="customer-title">${title}</p>
            </div>
        `;
        
        // Add animation delay
        const itemIndex = this.items.length;
        newItem.style.animationDelay = `calc(var(--animation-delay-fraction) * ${itemIndex - 1})`;
        
        this.carousel.appendChild(newItem);
        
        // Update references
        this.items = document.querySelectorAll('.carousel__item');
        this.totalItems = this.items.length;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--carousel-items', this.totalItems);
    }
    
    // Method to remove testimonial (for admin functionality)
    removeTestimonial(index) {
        if (index < 0 || index >= this.totalItems) return;
        
        const itemToRemove = this.items[index];
        
        if (itemToRemove) itemToRemove.remove();
        
        // Update references
        this.items = document.querySelectorAll('.carousel__item');
        this.totalItems = this.items.length;
        
        // Adjust current index if necessary
        if (this.currentIndex >= this.totalItems) {
            this.currentIndex = this.totalItems - 1;
        }
        
        // Update CSS variables
        document.documentElement.style.setProperty('--carousel-items', this.totalItems);
        
        this.updateActiveStates();
    }
}

// Language support for testimonials
const testimonialTranslations = {
    am: {
        title: "Գնահատականներ",
        subtitle: "Ինչ են ասում մեր հաճախորդները մեր ապագայական մոտեցման մասին",
        testimonials: [
            {
                name: "Ջոն Սմիթ",
                title: "Տեխնոլոգիական ընկերության CEO",
                review: "LandingCraft Pro-ն փոխակերպեց մեր բիզնեսը: Նրանց ապագայական մոտեցումը և նորարարական լուծումները մեզ օգնեցին հասնել նոր բարձունքների:"
            },
            {
                name: "Սարա Ջոնսոն",
                title: "Մարքեթինգի տնօրեն",
                review: "Անհավատալի արդյունք: Մեր վեբկայքի վերափոխումը բերեց 300% ավելի շատ հաճախորդներ: Խորհուրդ եմ տալիս բոլորին:"
            },
            {
                name: "Մայքլ Չեն",
                title: "Ստարտափի հիմնադիր",
                review: "Պրոֆեսիոնալ թիմ, որակյալ աշխատանք և գերազանց արդյունք: Նրանք իսկապես հասկանում են, թե ինչպես ստեղծել ապագայական դիզայն:"
            },
            {
                name: "Էմիլի Ռոդրիգես",
                title: "Էլեկտրոնային առևտրի մասնագետ",
                review: "LandingCraft Pro-ի հետ աշխատելը իսկական հաճույք էր: Նրանք ոչ միայն ստեղծեցին գեղեցիկ կայք, այլև ապահովեցին բարձր կատարողականություն:"
            },
            {
                name: "Դեյվիդ Պարկ",
                title: "Ծրագրային ապահովման ճարտարապետ",
                review: "Գերազանց փորձ սկսից մինչև վերջ: Թիմը շատ ուշադիր էր մանրուքների նկատմամբ և ապահովեց բոլոր մեր պահանջները:"
            },
            {
                name: "Լիսա Թոմսոն",
                title: "Դիզայնի ստուդիայի սեփականատեր",
                review: "Նրանց ստեղծագործական մոտեցումը և տեխնիկական գիտելիքները կատարյալ համադրություն են: Մեր նոր կայքը իսկապես առանձնանում է:"
            }
        ]
    },
    ru: {
        title: "Отзывы",
        subtitle: "Что говорят наши клиенты о нашем футуристическом подходе",
        testimonials: [
            {
                name: "Джон Смит",
                title: "CEO технологической компании",
                review: "LandingCraft Pro преобразил наш бизнес. Их футуристический подход и инновационные решения помогли нам достичь новых высот."
            },
            {
                name: "Сара Джонсон",
                title: "Директор по маркетингу",
                review: "Невероятный результат! Преобразование нашего сайта привело к увеличению клиентов на 300%. Рекомендую всем!"
            },
            {
                name: "Майкл Чен",
                title: "Основатель стартапа",
                review: "Профессиональная команда, качественная работа и отличный результат. Они действительно понимают, как создать футуристический дизайн."
            },
            {
                name: "Эмили Родригес",
                title: "Специалист по электронной коммерции",
                review: "Работать с LandingCraft Pro было настоящим удовольствием. Они не только создали красивый сайт, но и обеспечили высокую производительность."
            },
            {
                name: "Дэвид Парк",
                title: "Архитектор программного обеспечения",
                review: "Отличный опыт от начала до конца. Команда была очень внимательна к деталям и выполнила все наши требования."
            },
            {
                name: "Лиза Томсон",
                title: "Владелец дизайн-студии",
                review: "Их творческий подход и технические знания - идеальное сочетание. Наш новый сайт действительно выделяется."
            }
        ]
    },
    en: {
        title: "Reviews",
        subtitle: "What our clients say about our futuristic approach",
        testimonials: [
            {
                name: "John Smith",
                title: "Tech Company CEO",
                review: "LandingCraft Pro transformed our business. Their futuristic approach and innovative solutions helped us reach new heights."
            },
            {
                name: "Sarah Johnson",
                title: "Marketing Director",
                review: "Incredible results! Our website transformation brought 300% more customers. I recommend them to everyone!"
            },
            {
                name: "Michael Chen",
                title: "Startup Founder",
                review: "Professional team, quality work, and excellent results. They truly understand how to create futuristic design."
            },
            {
                name: "Emily Rodriguez",
                title: "E-commerce Specialist",
                review: "Working with LandingCraft Pro was a real pleasure. They not only created a beautiful site but also ensured high performance."
            },
            {
                name: "David Park",
                title: "Software Architect",
                review: "Excellent experience from start to finish. The team was very attentive to details and met all our requirements."
            },
            {
                name: "Lisa Thompson",
                title: "Design Studio Owner",
                review: "Their creative approach and technical knowledge are a perfect combination. Our new website truly stands out."
            }
        ]
    }
};

// Function to update testimonial content based on language
function updateTestimonialLanguage(language) {
    const translations = testimonialTranslations[language];
    if (!translations) return;
    
    // Update header
    const titleElement = document.querySelector('.reviews-header h2');
    const subtitleElement = document.querySelector('.reviews-header p');
    
    if (titleElement) titleElement.textContent = translations.title;
    if (subtitleElement) subtitleElement.textContent = translations.subtitle;
    
    // Update testimonial content
    const testimonialItems = document.querySelectorAll('.carousel__item');
    testimonialItems.forEach((item, index) => {
        if (translations.testimonials[index]) {
            const reviewText = item.querySelector('.review-text');
            const customerName = item.querySelector('.customer-name');
            const customerTitle = item.querySelector('.customer-title');
            
            if (reviewText) reviewText.textContent = `"${translations.testimonials[index].review}"`;
            if (customerName) customerName.textContent = translations.testimonials[index].name;
            if (customerTitle) customerTitle.textContent = translations.testimonials[index].title;
        }
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new TestimonialCarousel();
    
    // Listen for language changes
    document.addEventListener('languageChanged', (e) => {
        updateTestimonialLanguage(e.detail.language);
    });
    
    // Set initial language
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'am';
    updateTestimonialLanguage(currentLanguage);
    
    // Make carousel globally accessible for admin functionality
    window.testimonialCarousel = carousel;
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestimonialCarousel, testimonialTranslations, updateTestimonialLanguage };
}
