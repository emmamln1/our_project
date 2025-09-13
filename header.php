<!-- Modern Futuristic Header -->
<header class="header" id="header">
    <div class="header-container">
       
        <div class="logo-section">
            <a href="#home" class="logo-link">
                <img src="assets/images/logo.png" alt="LandingCraft Pro" class="logo-img">
            </a>
        </div>

        <!-- Navigation Menu -->
        <nav class="nav-menu" role="navigation" aria-label="Main navigation">
            <ul class="nav-list" id="navList">
                <li class="nav-item">
                    <a href="#about" class="nav-link" data-translate="nav-about">About Us</a>
                </li>
                <li class="nav-item">
                    <a href="#why-us" class="nav-link" data-translate="nav-why-us">Why Us</a>
                </li>
                <li class="nav-item">
                    <a href="#features" class="nav-link" data-translate="nav-features">Features</a>
                </li>
                <li class="nav-item">
                    <a href="#blog" class="nav-link" data-translate="nav-blog">Blog</a>
                </li>
                <li class="nav-item">
                    <a href="#projects" class="nav-link" data-translate="nav-projects">Our Projects</a>
                </li>
                <li class="nav-item">
                    <a href="#reviews" class="nav-link" data-translate="nav-reviews">Reviews</a>
                </li>
                <li class="nav-item">
                    <a href="#contact" class="nav-link" data-translate="nav-contact">Contact</a>
                </li>
            </ul>
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
            <!-- Language Selector with Globe Icon -->
            <div class="language-selector" role="group" aria-label="Language selection">
                <button class="lang-btn" aria-haspopup="true" aria-expanded="false" id="langBtn">
                    <svg class="globe-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span class="lang-code">EN</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="lang-dropdown" id="langDropdown" role="menu">
                    <button class="lang-option active" data-lang="en" role="menuitem">
                        <span class="lang-name">English</span>
                        <span class="lang-code-small">EN</span>
                    </button>
                    <button class="lang-option" data-lang="ru" role="menuitem">
                        <span class="lang-name">Русский</span>
                        <span class="lang-code-small">RU</span>
                    </button>
                    <button class="lang-option" data-lang="hy" role="menuitem">
                        <span class="lang-name">Հայերեն</span>
                        <span class="lang-code-small">AM</span>
                    </button>
                </div>
            </div>


            <!-- Mobile Menu Toggle -->
            <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenuOverlay">
        <div class="mobile-menu">
            <div class="mobile-menu-header">
                <div class="mobile-logo">
                    <h2 class="logo-text" data-translate="logo">LandingCraft Pro</h2>
                </div>
            </div>
            <nav class="mobile-nav" role="navigation" aria-label="Mobile navigation">
                <ul class="mobile-nav-list">
                    <li class="mobile-nav-item">
                        <a href="#about" class="mobile-nav-link" data-translate="nav-about">About Us</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#why-us" class="mobile-nav-link" data-translate="nav-why-us">Why Us</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#blog" class="mobile-nav-link" data-translate="nav-blog">Blog</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#projects" class="mobile-nav-link" data-translate="nav-projects">Our Projects</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#reviews" class="mobile-nav-link" data-translate="nav-reviews">Reviews</a>
                    </li>
                    <li class="mobile-nav-item">
                        <a href="#contact" class="mobile-nav-link" data-translate="nav-contact">Contact</a>
                    </li>
                </ul>
                <div class="mobile-actions">
                    <div class="mobile-language-selector">
                        <button class="mobile-lang-btn active" data-lang="en">
                            <svg class="globe-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <span class="lang-name">English</span>
                        </button>
                        <button class="mobile-lang-btn" data-lang="ru">
                            <svg class="globe-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <span class="lang-name">Русский</span>
                        </button>
                        <button class="mobile-lang-btn" data-lang="hy">
                            <svg class="globe-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <span class="lang-name">Հայերեն</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</header>
