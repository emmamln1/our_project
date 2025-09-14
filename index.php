<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LandingCraft Pro - Professional Landing Pages</title>
    <meta name="description" content="Professional landing page development services with modern futuristic design">
    <meta name="keywords" content="landing pages, web development, responsive design, multilingual websites">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include 'header.php'; ?>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Hero Section -->
        <section id="home" class="section hero-section">
            <!-- Animated Background Elements -->
            <div class="hero-background">
                <div class="flowing-lines">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                    <div class="line line-4"></div>
                </div>
                <div class="particles-container">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                <div class="energy-streams">
                    <div class="stream stream-1"></div>
                    <div class="stream stream-2"></div>
                    <div class="stream stream-3"></div>
                </div>
            </div>
            
            <!-- Main Hero Content -->
            <div class="hero-container">
                <div class="hero-content">
                    
                    
                    <h1 class="hero-title">
                        <span class="title-line-1">Welcome to the</span>
                        <span class="title-line-2 glow-text">Digital Future</span>
                        <span class="title-line-3">of Web Development</span>
                    </h1>
                    
                    <p class="hero-description">
                        Experience cutting-edge landing page development with futuristic design, 
                        advanced animations, and cyberpunk aesthetics that captivate your audience
                    </p>
                    
                    <div class="hero-actions">
                        <button class="cta-button primary-cta">
                            <span class="button-text">Start Your Project</span>
                            <div class="button-glow"></div>
                            <div class="button-particles">
                                <span class="particle-dot"></span>
                                <span class="particle-dot"></span>
                                <span class="particle-dot"></span>
                            </div>
                        </button>
                        
                        <button class="cta-button secondary-cta">
                            <span class="button-text">View Portfolio</span>
                            <div class="button-border"></div>
                        </button>
                    </div>
                </div>
                
                <!-- Floating Elements -->
                <div class="floating-elements">
                    <div class="floating-orb orb-1"></div>
                    <div class="floating-orb orb-2"></div>
                    <div class="floating-orb orb-3"></div>
                </div>
            </div>
        </section>
        
        <!-- About Us Section -->
        <section id="about" class="section about-section">
            <div class="container">
                <h2>About Us</h2>
                <p>Discover our innovative approach to web development</p>
            </div>
        </section>
        
        <!-- Why Us Section -->
        <section id="why-us" class="section why-us-section">
            <div class="container">
                <h2>Why Choose Us</h2>
                <p>Experience the difference with our futuristic solutions</p>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="section features-section">
            <div class="container">
                <h2>Our Features</h2>
                <p>What we offer to make your project a success</p>
            </div>
        </section>
        
        <!-- Blog Section -->
        <section id="blog" class="section blog-section">
            <div class="container">
                <h2>Blog</h2>
                <p>Latest insights from the digital frontier</p>
            </div>
        </section>
        
        <!-- Projects Section -->
        <section id="projects" class="section projects-section">
            <!-- Background Effects -->
            <div class="projects-background">
                <div class="floating-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                <div class="grid-lines">
                    <div class="grid-line horizontal"></div>
                    <div class="grid-line horizontal"></div>
                    <div class="grid-line vertical"></div>
                    <div class="grid-line vertical"></div>
                </div>
            </div>

            <div class="container">
                <!-- Section Header -->
                <div class="projects-header">
                    <h2 class="section-title">Մեր Նախագծերը</h2>
                    <p class="section-subtitle">Բացահայտեք մեր նորարարական աշխատանքների ցուցադրությունը</p>
                </div>

                <!-- Technology Filter -->
                <div class="tech-filter">
                    <button class="filter-btn active" data-filter="all">
                        <span class="filter-text">Բոլորը</span>
                        <div class="filter-glow"></div>
                    </button>
                    <button class="filter-btn" data-filter="react">
                        <span class="filter-text">React</span>
                        <div class="filter-glow"></div>
                    </button>
                    <button class="filter-btn" data-filter="vue">
                        <span class="filter-text">Vue.js</span>
                        <div class="filter-glow"></div>
                    </button>
                    <button class="filter-btn" data-filter="php">
                        <span class="filter-text">PHP</span>
                        <div class="filter-glow"></div>
                    </button>
                    <button class="filter-btn" data-filter="nodejs">
                        <span class="filter-text">Node.js</span>
                        <div class="filter-glow"></div>
                    </button>
                    <button class="filter-btn" data-filter="wordpress">
                        <span class="filter-text">WordPress</span>
                        <div class="filter-glow"></div>
                    </button>
                    <button class="filter-btn" data-filter="ecommerce">
                        <span class="filter-text">E-commerce</span>
                        <div class="filter-glow"></div>
                    </button>
                </div>

                <!-- Projects Grid -->
                <div class="projects-grid" id="projectsGrid">
                    <!-- Project Card 1 -->
                    <div class="project-card" data-tech="react nodejs" data-project="1">
                        <div class="card-image">
                            <img src="assets/images/project1.jpg" alt="E-commerce Platform" loading="lazy">
                            <div class="image-overlay">
                                <div class="overlay-content">
                                    <button class="view-details-btn" data-project="1">
                                        <span>Մանրամասներ</span>
                                    </button>
                                    <button class="view-website-btn" data-url="https://example.com">
                                        <span>Կայքը Դիտել</span>
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <polyline points="15,3 21,3 21,9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="project-title">E-commerce Platform</h3>
                            <p class="project-description">Ժամանակակից առևտրային հարթակ React և Node.js տեխնոլոգիաներով</p>
                            <div class="tech-tags">
                                <span class="tech-tag">React</span>
                                <span class="tech-tag">Node.js</span>
                                <span class="tech-tag">MongoDB</span>
                                <span class="tech-tag">Stripe</span>
                            </div>
                            <div class="project-stats">
                                <div class="stat">
                                    <span class="stat-value">95%</span>
                                    <span class="stat-label">Performance</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">50K+</span>
                                    <span class="stat-label">Users</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Card 2 -->
                    <div class="project-card" data-tech="vue php" data-project="2">
                        <div class="card-image">
                            <img src="assets/images/project2.jpg" alt="Corporate Website" loading="lazy">
                            <div class="image-overlay">
                                <div class="overlay-content">
                                    <button class="view-details-btn" data-project="2">
                                        <span>Մանրամասներ</span>
                                    </button>
                                    <button class="view-website-btn" data-url="https://example2.com">
                                        <span>Կայքը Դիտել</span>
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <polyline points="15,3 21,3 21,9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="project-title">Corporate Website</h3>
                            <p class="project-description">Պրոֆեսիոնալ կորպորատիվ կայք Vue.js և PHP backend-ով</p>
                            <div class="tech-tags">
                                <span class="tech-tag">Vue.js</span>
                                <span class="tech-tag">PHP</span>
                                <span class="tech-tag">MySQL</span>
                                <span class="tech-tag">SCSS</span>
                            </div>
                            <div class="project-stats">
                                <div class="stat">
                                    <span class="stat-value">98%</span>
                                    <span class="stat-label">SEO Score</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">2.1s</span>
                                    <span class="stat-label">Load Time</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Card 3 -->
                    <div class="project-card" data-tech="wordpress php" data-project="3">
                        <div class="card-image">
                            <img src="assets/images/project3.jpg" alt="Blog Platform" loading="lazy">
                            <div class="image-overlay">
                                <div class="overlay-content">
                                    <button class="view-details-btn" data-project="3">
                                        <span>Մանրամասներ</span>
                                    </button>
                                    <button class="view-website-btn" data-url="https://example3.com">
                                        <span>Կայքը Դիտել</span>
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <polyline points="15,3 21,3 21,9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="project-title">Blog Platform</h3>
                            <p class="project-description">Հզոր բլոգային հարթակ WordPress-ի հիման վրա</p>
                            <div class="tech-tags">
                                <span class="tech-tag">WordPress</span>
                                <span class="tech-tag">PHP</span>
                                <span class="tech-tag">Custom Themes</span>
                                <span class="tech-tag">REST API</span>
                            </div>
                            <div class="project-stats">
                                <div class="stat">
                                    <span class="stat-value">10K+</span>
                                    <span class="stat-label">Articles</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">100K+</span>
                                    <span class="stat-label">Monthly Views</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Card 4 -->
                    <div class="project-card" data-tech="react ecommerce" data-project="4">
                        <div class="card-image">
                            <img src="assets/images/project4.jpg" alt="Mobile App" loading="lazy">
                            <div class="image-overlay">
                                <div class="overlay-content">
                                    <button class="view-details-btn" data-project="4">
                                        <span>Մանրամասներ</span>
                                    </button>
                                    <button class="view-website-btn" data-url="https://example4.com">
                                        <span>Կայքը Դիտել</span>
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <polyline points="15,3 21,3 21,9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="project-title">Mobile Shopping App</h3>
                            <p class="project-description">Բջջային առևտրային հավելված React Native-ով</p>
                            <div class="tech-tags">
                                <span class="tech-tag">React Native</span>
                                <span class="tech-tag">Redux</span>
                                <span class="tech-tag">Firebase</span>
                                <span class="tech-tag">Payment Gateway</span>
                            </div>
                            <div class="project-stats">
                                <div class="stat">
                                    <span class="stat-value">4.8★</span>
                                    <span class="stat-label">App Rating</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">25K+</span>
                                    <span class="stat-label">Downloads</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Card 5 -->
                    <div class="project-card" data-tech="vue nodejs" data-project="5">
                        <div class="card-image">
                            <img src="assets/images/project5.jpg" alt="Dashboard" loading="lazy">
                            <div class="image-overlay">
                                <div class="overlay-content">
                                    <button class="view-details-btn" data-project="5">
                                        <span>Մանրամասներ</span>
                                    </button>
                                    <button class="view-website-btn" data-url="https://example5.com">
                                        <span>Կայքը Դիտել</span>
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <polyline points="15,3 21,3 21,9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="project-title">Analytics Dashboard</h3>
                            <p class="project-description">Ինտերակտիվ վերլուծական վահանակ Vue.js-ով</p>
                            <div class="tech-tags">
                                <span class="tech-tag">Vue.js</span>
                                <span class="tech-tag">D3.js</span>
                                <span class="tech-tag">Node.js</span>
                                <span class="tech-tag">PostgreSQL</span>
                            </div>
                            <div class="project-stats">
                                <div class="stat">
                                    <span class="stat-value">1M+</span>
                                    <span class="stat-label">Data Points</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">99.9%</span>
                                    <span class="stat-label">Uptime</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Card 6 -->
                    <div class="project-card" data-tech="php ecommerce" data-project="6">
                        <div class="card-image">
                            <img src="assets/images/project6.jpg" alt="Booking System" loading="lazy">
                            <div class="image-overlay">
                                <div class="overlay-content">
                                    <button class="view-details-btn" data-project="6">
                                        <span>Մանրամասներ</span>
                                    </button>
                                    <button class="view-website-btn" data-url="https://example6.com">
                                        <span>Կայքը Դիտել</span>
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <polyline points="15,3 21,3 21,9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="project-title">Hotel Booking System</h3>
                            <p class="project-description">Ամբողջական հյուրանոցային ամրագրման համակարգ</p>
                            <div class="tech-tags">
                                <span class="tech-tag">PHP</span>
                                <span class="tech-tag">Laravel</span>
                                <span class="tech-tag">MySQL</span>
                                <span class="tech-tag">Payment API</span>
                            </div>
                            <div class="project-stats">
                                <div class="stat">
                                    <span class="stat-value">500+</span>
                                    <span class="stat-label">Hotels</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-value">15K+</span>
                                    <span class="stat-label">Bookings/Month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Load More Button -->
                <div class="load-more-container">
                    <button class="load-more-btn" id="loadMoreBtn">
                        <span class="btn-text">Ավելին Բեռնել</span>
                        <div class="btn-glow"></div>
                        <div class="btn-particles">
                            <span class="particle-dot"></span>
                            <span class="particle-dot"></span>
                            <span class="particle-dot"></span>
                        </div>
                    </button>
                    <button class="close-projects-btn" id="closeProjectsBtn" style="display: none;">
                        <span class="btn-text">Փակել</span>
                        <div class="btn-glow"></div>
                        <div class="btn-particles">
                            <span class="particle-dot"></span>
                            <span class="particle-dot"></span>
                            <span class="particle-dot"></span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Project Details Lightbox -->
            <div class="lightbox-overlay" id="projectLightbox">
                <div class="lightbox-container">
                    <button class="lightbox-close" id="closeLightbox">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <div class="lightbox-content" id="lightboxContent">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                </div>
            </div>

        </section>
        
        <!-- Reviews Section -->
        <section id="reviews" class="section reviews-section">
            <div class="container">
                <h2>Reviews</h2>
                <p>What our clients say about our futuristic approach</p>
            </div>
        </section>
        
        <!-- Contact Section -->
        <section id="contact" class="section contact-section">
            <div class="container">
                <h2>Contact Us</h2>
                <p>Ready to build the future together?</p>
            </div>
        </section>
    </main>

    <script src="assets/js/header.js"></script>
    <script src="assets/js/language.js"></script>
    <script src="assets/js/hero.js"></script>
    <script src="assets/js/whyus.js"></script>
    <script src="assets/js/projects.js"></script>
</body>
</html>
