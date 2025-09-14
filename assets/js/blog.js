class BlogManager {
    constructor() {
        this.likedPosts = new Set(JSON.parse(localStorage.getItem('likedPosts') || '[]'));
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.allPosts = [];
        this.init();
    }

    init() {
        this.initializeLikeButtons();
        this.initializeLoadMore();
        this.initializeAnimations();
        this.loadLikedStates();
    }

    initializeLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-btn');
        
        likeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleLike(button);
            });
        });
    }

    handleLike(button) {
        const postId = this.getPostId(button);
        const likeCountSpan = button.querySelector('.like-count');
        const heartIcon = button.querySelector('svg');
        let currentCount = parseInt(likeCountSpan.textContent);

        if (this.likedPosts.has(postId)) {
            // Unlike
            this.likedPosts.delete(postId);
            button.classList.remove('liked');
            likeCountSpan.textContent = currentCount - 1;
            button.setAttribute('data-likes', currentCount - 1);
            
            // Animation for unlike
            heartIcon.style.transform = 'scale(0.8)';
            setTimeout(() => {
                heartIcon.style.transform = 'scale(1)';
            }, 150);
        } else {
            // Like
            this.likedPosts.add(postId);
            button.classList.add('liked');
            likeCountSpan.textContent = currentCount + 1;
            button.setAttribute('data-likes', currentCount + 1);
            
            // Animation for like
            heartIcon.style.transform = 'scale(1.3)';
            button.style.transform = 'translateY(-2px) scale(1.1)';
            
            // Create floating heart animation
            this.createFloatingHeart(button);
            
            setTimeout(() => {
                heartIcon.style.transform = 'scale(1)';
                button.style.transform = 'translateY(-2px)';
            }, 300);
        }

        // Save to localStorage
        localStorage.setItem('likedPosts', JSON.stringify([...this.likedPosts]));
        
        // Add ripple effect
        this.createRippleEffect(button);
    }

    getPostId(button) {
        // Generate a unique ID based on the blog card content
        const blogCard = button.closest('.blog-card');
        const title = blogCard.querySelector('.blog-card-title').textContent;
        const author = blogCard.querySelector('.author-info h4').textContent;
        return btoa(title + author).replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
    }

    loadLikedStates() {
        const likeButtons = document.querySelectorAll('.like-btn');
        
        likeButtons.forEach(button => {
            const postId = this.getPostId(button);
            if (this.likedPosts.has(postId)) {
                button.classList.add('liked');
            }
        });
    }

    createFloatingHeart(button) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: floatHeart 1.5s ease-out forwards;
        `;

        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + 'px';

        document.body.appendChild(heart);

        // Add CSS animation if not already added
        if (!document.querySelector('#floatHeartStyle')) {
            const style = document.createElement('style');
            style.id = 'floatHeartStyle';
            style.textContent = `
                @keyframes floatHeart {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            heart.remove();
        }, 1500);
    }

    createRippleEffect(button) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(216, 17, 240, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = rect.width / 2 - size / 2 + 'px';
        ripple.style.top = rect.height / 2 - size / 2 + 'px';

        button.style.position = 'relative';
        button.appendChild(ripple);

        // Add ripple animation if not already added
        if (!document.querySelector('#rippleStyle')) {
            const style = document.createElement('style');
            style.id = 'rippleStyle';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initializeLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }
    }

    loadMorePosts() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const blogGrid = document.getElementById('blogGrid');
        
        // Show loading state
        loadMoreBtn.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Բեռնում...</span>
        `;
        loadMoreBtn.disabled = true;

        // Add loading spinner styles if not already added
        if (!document.querySelector('#loadingSpinnerStyle')) {
            const style = document.createElement('style');
            style.id = 'loadingSpinnerStyle';
            style.textContent = `
                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Simulate loading delay
        setTimeout(() => {
            // Add more blog posts (in a real app, this would fetch from API)
            const newPosts = this.generateMorePosts();
            
            newPosts.forEach((post, index) => {
                const postElement = this.createBlogPostElement(post);
                postElement.style.opacity = '0';
                postElement.style.transform = 'translateY(30px)';
                blogGrid.appendChild(postElement);
                
                // Animate in
                setTimeout(() => {
                    postElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    postElement.style.opacity = '1';
                    postElement.style.transform = 'translateY(0)';
                }, index * 100);
            });

            // Re-initialize like buttons for new posts
            this.initializeLikeButtons();

            // Reset button
            loadMoreBtn.innerHTML = `
                <span>Ավելի շատ բեռնել</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12l7 7 7-7"></path>
                </svg>
            `;
            loadMoreBtn.disabled = false;

            this.currentPage++;
            
            // Hide button after loading 3 pages
            if (this.currentPage >= 3) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1500);
    }

    generateMorePosts() {
        const morePosts = [
            {
                category: 'development',
                categoryText: 'Ծրագրավորում',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center',
                title: 'React-ի Նոր Հնարավորությունները 2024-ում',
                excerpt: 'Բացահայտեք React-ի վերջին թարմացումները և ինչպես դրանք կարող են բարելավել ձեր զարգացման գործընթացը:',
                author: 'Գագիկ Սարգսյան',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                date: '1 Դեկտեմբեր, 2024',
                views: 167,
                rating: 4.6,
                likes: 12
            },
            {
                category: 'seo',
                categoryText: 'SEO',
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop&crop=center',
                title: 'SEO Օպտիմիզացիայի Ամբողջական Ուղեցույց',
                excerpt: 'Սովորեք ինչպես բարելավել ձեր կայքի դիրքը որոնման արդյունքներում և ավելացնել օրգանական ցրաֆիկը:',
                author: 'Լուսինե Ղազարյան',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                date: '28 Նոյեմբեր, 2024',
                views: 234,
                rating: 4.9,
                likes: 41
            },
            {
                category: 'ecommerce',
                categoryText: 'Էլ-առևտուր',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
                title: 'Էլեկտրոնային Առևտրի Հաջողության Գաղտնիքները',
                excerpt: 'Ինչպես ստեղծել հաջողակ օնլայն խանութ և ավելացնել վաճառքները արդյունավետ ռազմավարությունների միջոցով:',
                author: 'Արտակ Մանուկյան',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                date: '25 Նոյեմբեր, 2024',
                views: 189,
                rating: 4.7,
                likes: 33
            }
        ];

        return morePosts;
    }

    createBlogPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-card';
        article.setAttribute('data-category', post.category);

        article.innerHTML = `
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-category ${post.category}">${post.categoryText}</div>
            </div>
            <div class="blog-card-content">
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                
                <div class="blog-card-meta">
                    <div class="blog-author">
                        <img src="${post.avatar}" alt="Author" class="author-avatar">
                        <div class="author-info">
                            <h4>${post.author}</h4>
                            <span class="blog-date">${post.date}</span>
                        </div>
                    </div>
                </div>

                <div class="blog-card-footer">
                    <div class="blog-stats">
                        <span class="stat-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            ${post.views}
                        </span>
                        <span class="stat-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            ${post.rating}
                        </span>
                    </div>
                    <button class="like-btn" data-likes="${post.likes}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-count">${post.likes}</span>
                    </button>
                </div>
            </div>
        `;

        return article;
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
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

        // Observe all blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });

        // Add CSS for scroll animations
        if (!document.querySelector('#scrollAnimationStyle')) {
            const style = document.createElement('style');
            style.id = 'scrollAnimationStyle';
            style.textContent = `
                .blog-card {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .blog-card.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Add language support for blog section
if (window.languageManager) {
    window.languageManager.addTranslations({
        'blog': {
            'am': {
                'title': 'Բլոգ',
                'subtitle': 'Վերջին գիտելիքները ցիֆրային սահմանից',
                'loadMore': 'Ավելի շատ բեռնել',
                'loading': 'Բեռնում...'
            },
            'ru': {
                'title': 'Блог',
                'subtitle': 'Последние знания с цифровой границы',
                'loadMore': 'Загрузить еще',
                'loading': 'Загрузка...'
            },
            'en': {
                'title': 'Blog',
                'subtitle': 'Latest insights from the digital frontier',
                'loadMore': 'Load More',
                'loading': 'Loading...'
            }
        }
    });
}
