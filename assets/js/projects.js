/**
 * Projects Portfolio Controller
 * Handles filtering, lightbox, and project management
 */

class ProjectsController {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "Modern online shopping experience with AI recommendations",
                extendedDescription: "A comprehensive e-commerce platform featuring advanced AI-powered product recommendations, real-time inventory management, and seamless payment integration. Built with scalability and user experience in mind.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23581EB8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23D811F0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad1)'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EE-Commerce%3C/text%3E%3C/svg%3E",
                technologies: ["React", "Node.js", "MongoDB", "AI"],
                duration: "6 months",
                team: "5 developers",
                client: "TechCorp Inc.",
                features: ["AI Recommendations", "Real-time Inventory", "Payment Gateway", "Admin Dashboard"],
                stats: { views: "15.2K", likes: "892", shares: "156" },
                websiteUrl: "#",
                detailsUrl: "#"
            },
            {
                id: 2,
                title: "Healthcare Dashboard",
                description: "Real-time patient monitoring and analytics system",
                extendedDescription: "A comprehensive healthcare management system providing real-time patient monitoring, advanced analytics, and seamless integration with medical devices. Designed for hospitals and clinics to improve patient care.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300CBFA;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230093F6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad2)'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EHealthcare%3C/text%3E%3C/svg%3E",
                technologies: ["Vue.js", "Python", "PostgreSQL", "IoT"],
                duration: "8 months",
                team: "7 developers",
                client: "MedTech Solutions",
                features: ["Real-time Monitoring", "Analytics Dashboard", "Device Integration", "Patient Records"],
                stats: { views: "12.8K", likes: "654", shares: "98" },
                websiteUrl: "#",
                detailsUrl: "#"
            },
            {
                id: 3,
                title: "Fintech Mobile App",
                description: "Secure digital banking with blockchain integration",
                extendedDescription: "A cutting-edge mobile banking application featuring blockchain technology for enhanced security, cryptocurrency support, and advanced financial analytics. Built for the next generation of digital banking.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23D811F0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23581EB8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad3)'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EFintech%3C/text%3E%3C/svg%3E",
                technologies: ["React Native", "Blockchain", "Node.js", "Security"],
                duration: "10 months",
                team: "8 developers",
                client: "CryptoBank Ltd.",
                features: ["Blockchain Security", "Crypto Support", "Analytics", "Mobile Banking"],
                stats: { views: "18.5K", likes: "1.2K", shares: "234" },
                websiteUrl: "#",
                detailsUrl: "#"
            },
            {
                id: 4,
                title: "AI Learning Platform",
                description: "Personalized education with machine learning algorithms",
                extendedDescription: "An innovative educational platform leveraging artificial intelligence to provide personalized learning experiences. Features adaptive content delivery, progress tracking, and intelligent tutoring systems.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230093F6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2300CBFA;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad4)'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EAI Learning%3C/text%3E%3C/svg%3E",
                technologies: ["Machine Learning", "Python", "React", "TensorFlow"],
                duration: "12 months",
                team: "10 developers",
                client: "EduTech Global",
                features: ["Personalized Learning", "Progress Tracking", "AI Tutoring", "Content Adaptation"],
                stats: { views: "22.1K", likes: "1.5K", shares: "312" },
                websiteUrl: "#",
                detailsUrl: "#"
            },
            {
                id: 5,
                title: "Smart City IoT",
                description: "Urban infrastructure monitoring and optimization",
                extendedDescription: "A comprehensive IoT solution for smart city management, featuring real-time monitoring of traffic, energy consumption, waste management, and environmental conditions. Designed to optimize urban living.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23581EB8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2300CBFA;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad5)'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3ESmart City%3C/text%3E%3C/svg%3E",
                technologies: ["IoT", "Big Data", "Cloud", "Analytics"],
                duration: "15 months",
                team: "12 developers",
                client: "City Council",
                features: ["Traffic Monitoring", "Energy Management", "Waste Optimization", "Environmental Sensors"],
                stats: { views: "19.7K", likes: "987", shares: "198" },
                websiteUrl: "#",
                detailsUrl: "#"
            },
            {
                id: 6,
                title: "VR Training Simulator",
                description: "Immersive virtual reality training environments",
                extendedDescription: "A state-of-the-art VR training platform providing immersive simulations for various industries including healthcare, aviation, and manufacturing. Features realistic physics and haptic feedback.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23D811F0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230093F6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad6)'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EVR Training%3C/text%3E%3C/svg%3E",
                technologies: ["Unity", "VR", "C#", "3D Graphics"],
                duration: "9 months",
                team: "6 developers",
                client: "TrainTech Corp",
                features: ["Immersive VR", "Haptic Feedback", "Multi-Industry", "Performance Analytics"],
                stats: { views: "14.3K", likes: "756", shares: "134" },
                websiteUrl: "#",
                detailsUrl: "#"
            }
        ];
        this.currentFilter = 'all';
        this.isInitialized = false;
        this.lightboxActive = false;
        this.visibleProjects = 3;
        this.projectsPerLoad = 3;
        
        this.projectData = this.getProjectData();
        this.init();
    }

    /**
     * Initialize the Projects section
     */
    init() {
        if (this.isInitialized) return;
        
        this.setupFilterButtons();
        this.setupProjectCards();
        this.setupLightbox();
        this.setupScrollAnimations();
        this.setupLoadMore();
        this.loadProjects();
        
        this.isInitialized = true;
        console.log('Projects section initialized successfully');
    }

    /**
     * Get project data
     */
    getProjectData() {
        return [
            {
                id: 1,
                title: 'E-commerce Platform',
                titleAm: 'E-commerce Platform',
                description: 'Ժամանակակից առևտրային հարթակ React և Node.js տեխնոլոգիաներով',
                image: 'assets/images/project1.jpg',
                url: 'https://example.com',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                techFilter: ['react', 'nodejs'],
                stats: [
                    { value: '95%', label: 'Performance' },
                    { value: '50K+', label: 'Users' }
                ],
                details: {
                    fullDescription: 'Ամբողջական առևտրային հարթակ ժամանակակից տեխնոլոգիաներով։ Ներառում է օգտատերերի կառավարում, ապրանքների կատալոգ, զամբյուղ, վճարման համակարգ և ադմինիստրատիվ վահանակ։',
                    features: ['Responsive Design', 'Payment Integration', 'Admin Dashboard', 'Real-time Updates', 'SEO Optimized'],
                    duration: '3 ամիս',
                    team: '4 մարդ',
                    client: 'TechCorp LLC'
                }
            },
            {
                id: 2,
                title: 'Corporate Website',
                titleAm: 'Corporate Website',
                description: 'Պրոֆեսիոնալ կորպորատիվ կայք Vue.js և PHP backend-ով',
                image: 'assets/images/project2.jpg',
                url: 'https://example2.com',
                technologies: ['Vue.js', 'PHP', 'MySQL', 'SCSS'],
                techFilter: ['vue', 'php'],
                stats: [
                    { value: '98%', label: 'SEO Score' },
                    { value: '2.1s', label: 'Load Time' }
                ],
                details: {
                    fullDescription: 'Ժամանակակից կորպորատիվ կայք բարձր արդյունավետությամբ և SEO օպտիմիզացիայով։ Ներառում է բլոգ, կոնտակտային ձևեր և բազմալեզու աջակցություն։',
                    features: ['Multi-language Support', 'Blog System', 'Contact Forms', 'Fast Loading', 'Mobile Responsive'],
                    duration: '2 ամիս',
                    team: '3 մարդ',
                    client: 'Business Solutions Inc'
                }
            },
            {
                id: 3,
                title: 'Blog Platform',
                titleAm: 'Blog Platform',
                description: 'Հզոր բլոգային հարթակ WordPress-ի հիման վրա',
                image: 'assets/images/project3.jpg',
                url: 'https://example3.com',
                technologies: ['WordPress', 'PHP', 'Custom Themes', 'REST API'],
                techFilter: ['wordpress', 'php'],
                stats: [
                    { value: '10K+', label: 'Articles' },
                    { value: '100K+', label: 'Monthly Views' }
                ],
                details: {
                    fullDescription: 'Հզոր բլոգային հարթակ հարուստ ֆունկցիոնալությամբ։ Ներառում է հեղինակների կառավարում, կատեգորիաներ, մեկնաբանություններ և սոցիալական ցանցերի ինտեգրացիա։',
                    features: ['Custom CMS', 'Author Management', 'Social Integration', 'SEO Tools', 'Analytics Dashboard'],
                    duration: '4 ամիս',
                    team: '2 մարդ',
                    client: 'Media Group'
                }
            },
            {
                id: 4,
                title: 'Mobile Shopping App',
                titleAm: 'Mobile Shopping App',
                description: 'Բջջային առևտրային հավելված React Native-ով',
                image: 'assets/images/project4.jpg',
                url: 'https://example4.com',
                technologies: ['React Native', 'Redux', 'Firebase', 'Payment Gateway'],
                techFilter: ['react', 'ecommerce'],
                stats: [
                    { value: '4.8★', label: 'App Rating' },
                    { value: '25K+', label: 'Downloads' }
                ],
                details: {
                    fullDescription: 'Բջջային առևտրային հավելված iOS և Android համակարգերի համար։ Ներառում է push ծանուցումներ, offline աշխատանք և անվտանգ վճարումներ։',
                    features: ['Cross-platform', 'Push Notifications', 'Offline Support', 'Secure Payments', 'User Reviews'],
                    duration: '5 ամիս',
                    team: '5 մարդ',
                    client: 'Mobile Commerce Ltd'
                }
            },
            {
                id: 5,
                title: 'Analytics Dashboard',
                titleAm: 'Analytics Dashboard',
                description: 'Ինտերակտիվ վերլուծական վահանակ Vue.js-ով',
                image: 'assets/images/project5.jpg',
                url: 'https://example5.com',
                technologies: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
                techFilter: ['vue', 'nodejs'],
                stats: [
                    { value: '1M+', label: 'Data Points' },
                    { value: '99.9%', label: 'Uptime' }
                ],
                details: {
                    fullDescription: 'Ինտերակտիվ վերլուծական վահանակ մեծ ծավալի տվյալների մշակման համար։ Ներառում է real-time գրաֆիկներ, ֆիլտրեր և էքսպորտի հնարավորություններ։',
                    features: ['Real-time Charts', 'Data Export', 'Custom Filters', 'User Permissions', 'API Integration'],
                    duration: '6 ամիս',
                    team: '4 մարդ',
                    client: 'Data Analytics Corp'
                }
            },
            {
                id: 6,
                title: 'Hotel Booking System',
                titleAm: 'Hotel Booking System',
                description: 'Ամբողջական հյուրանոցային ամրագրման համակարգ',
                image: 'assets/images/project6.jpg',
                url: 'https://example6.com',
                technologies: ['PHP', 'Laravel', 'MySQL', 'Payment API'],
                techFilter: ['php', 'ecommerce'],
                stats: [
                    { value: '500+', label: 'Hotels' },
                    { value: '15K+', label: 'Bookings/Month' }
                ],
                details: {
                    fullDescription: 'Ամբողջական հյուրանոցային ամրագրման համակարգ բազմաֆունկցիոնալ հնարավորություններով։ Ներառում է սենյակների կառավարում, գնային քաղաքականություն և հաշվետվություններ։',
                    features: ['Room Management', 'Pricing Engine', 'Multi-currency', 'Reporting Tools', 'Channel Manager'],
                    duration: '8 ամիս',
                    team: '6 մարդ',
                    client: 'Hospitality Group'
                }
            }
        ];
    }

    /**
     * Setup filter buttons
     */
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(button);
            });
        });
    }

    /**
     * Handle filter button click
     */
    handleFilterClick(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        this.currentFilter = filter;
        
        // Filter projects
        this.filterProjects(filter);
    }
    
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProjectSubmit(e);
        });
        
        // Update filtered projects array
        if (filter === 'all') {
            this.filteredProjects = [...this.projectData];
        } else {
            this.filteredProjects = this.projectData.filter(project => 
                project.techFilter.includes(filter)
            );
        }
    }

    /**
     * Setup project cards
     */
    setupProjectCards() {
        // Setup view details buttons
        const detailsButtons = document.querySelectorAll('.view-details-btn');
        detailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project');
                this.showProjectDetails(projectId);
            });
        });

        // Setup view website buttons
        const websiteButtons = document.querySelectorAll('.view-website-btn');
        websiteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = button.getAttribute('data-url');
                window.open(url, '_blank');
            });
        });
    }

    /**
     * Setup lightbox functionality
     */
    setupLightbox() {
        const lightbox = document.getElementById('projectLightbox');
        const closeButton = document.getElementById('closeLightbox');
        
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closeLightbox();
            });
        }
        
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }
        
        // ESC key to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightboxActive) {
                this.closeLightbox();
            }
        });
    }

    /**
     * Show project details in lightbox
     */
    showProjectDetails(projectId) {
        const project = this.projectData.find(p => p.id == projectId);
        if (!project) return;
        
        const lightbox = document.getElementById('projectLightbox');
        const content = document.getElementById('lightboxContent');
        
        if (!lightbox || !content) return;
        
        // Create lightbox content
        content.innerHTML = `
            <div class="lightbox-project">
                <div class="lightbox-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="lightbox-info">
                    <h2 class="lightbox-title">${project.titleAm}</h2>
                    <p class="lightbox-description">${project.details.fullDescription}</p>
                    
                    <div class="lightbox-tech">
                        <h3>Տեխնոլոգիաներ</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="lightbox-features">
                        <h3>Հիմնական Հատկություններ</h3>
                        <ul class="features-list">
                            ${project.details.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="lightbox-meta">
                        <div class="meta-item">
                            <strong>Տևողություն:</strong> ${project.details.duration}
                        </div>
                        <div class="meta-item">
                            <strong>Թիմ:</strong> ${project.details.team}
                        </div>
                        <div class="meta-item">
                            <strong>Հաճախորդ:</strong> ${project.details.client}
                        </div>
                    </div>
                    
                    <div class="lightbox-stats">
                        ${project.stats.map(stat => `
                            <div class="stat">
                                <span class="stat-value">${stat.value}</span>
                                <span class="stat-label">${stat.label}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="lightbox-actions">
                        <a href="${project.url}" target="_blank" class="view-website-btn">
                            <span>Կայքը Դիտել</span>
                            <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                <polyline points="15,3 21,3 21,9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Show lightbox
        lightbox.classList.add('active');
        this.lightboxActive = true;
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close lightbox
     */
    closeLightbox() {
        const lightbox = document.getElementById('projectLightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            this.lightboxActive = false;
            document.body.style.overflow = 'unset';
        }
    }





    /**
     * Create project card HTML
     */
    createProjectCard(project) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'project-card';
        cardDiv.setAttribute('data-tech', project.technologies.join(' ').toLowerCase());
        cardDiv.setAttribute('data-project', project.id);
        
        cardDiv.innerHTML = `
            <div class="card-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="image-overlay">
                    <div class="overlay-content">
                        <button class="view-details-btn" data-project="${project.id}">
                            <span>Մանրամասներ</span>
                        </button>
                        <button class="view-website-btn" data-url="${project.websiteUrl}">
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
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-value">${project.stats.views}</span>
                        <span class="stat-label">Views</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${project.stats.likes}</span>
                        <span class="stat-label">Likes</span>
                    </div>
                </div>
            </div>
        `;
        
        return cardDiv;
    }

    /**
     * Setup scroll animations
     */
    setupScrollAnimations() {
        const projectsSection = document.querySelector('.projects-section');
        if (!projectsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectsSection.classList.add('animate-in');
                    this.animateProjectCards();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(projectsSection);
    }

    /**
     * Animate project cards on scroll
     */
    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Setup load more functionality
     */
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProjects();
            });
        }
    }

    /**
     * Load more projects
     */
    loadMoreProjects() {
        this.visibleProjects += this.projectsPerLoad;
        this.renderProjects();
        
        // Hide load more button if all projects are visible
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (this.visibleProjects >= this.getFilteredProjects().length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    /**
     * Load projects on initialization
     */
    loadProjects() {
        this.filteredProjects = [...this.projectData];
        this.renderProjects();
    }

    /**
     * Get filtered projects based on current filter
     */
    getFilteredProjects() {
        if (this.currentFilter === 'all') {
            return this.projects;
        }
        return this.projects.filter(project => 
            project.technologies.some(tech => 
                tech.toLowerCase().includes(this.currentFilter.toLowerCase())
            )
        );
    }

    /**
     * Render projects with load more functionality
     */
    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!projectsGrid) return;

        // Clear existing projects
        projectsGrid.innerHTML = '';

        // Get filtered projects
        const filteredProjects = this.getFilteredProjects();
        
        // Show only visible number of projects
        const projectsToShow = filteredProjects.slice(0, this.visibleProjects);
        
        projectsToShow.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        // Show/hide load more button
        if (loadMoreBtn) {
            if (this.visibleProjects >= filteredProjects.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        // Add scroll animations
        this.addScrollAnimations();
    }

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--cyber-gradient);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        // Create and show error notification
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #ff4757, #ff3838);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    /**
     * Destroy controller and clean up
     */
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeydown);
        this.isInitialized = false;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if Projects section exists
    if (document.querySelector('.projects-section')) {
        window.projectsController = new ProjectsController();
    }
});

// Export for manual initialization
window.ProjectsController = ProjectsController;
