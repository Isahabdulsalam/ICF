document.addEventListener("DOMContentLoaded", function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if(themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    if(themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
        mobileMenuButton.querySelector('i').className = 
            mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }

    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
        
        document.addEventListener('click', (e) => {
            if(!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                mobileMenuButton.querySelector('i').className = 'fas fa-bars';
            }
        });
    }

    // Swiper Sliders
    const initSwiper = (selector, config) => {
        if(document.querySelector(selector)) {
            new Swiper(selector, {
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
                ...config
            });
        }
    };

    initSwiper('.gallerySwiper', {
        slidesPerView: 1,
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    initSwiper('.blogSwiper', {
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        slidesPerView: 1,
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    // AOS Animation
    if(window.AOS) {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // Number Animation
    const animateNumbers = () => {
        document.querySelectorAll('.impact-stat').forEach(stat => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const number = entry.target.querySelector('.impact-number');
                        const originalText = number.innerText;
                        const hasK = originalText.includes('k');
                        const hasPlus = originalText.includes('+');
                        const hasPercent = originalText.includes('%');
                        const numericValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
                        const finalValue = hasK ? numericValue * 1000 : numericValue;

                        let current = 0;
                        const increment = Math.ceil(finalValue / 50);

                        const interval = setInterval(() => {
                            current += increment;
                            if (current >= finalValue) {
                                clearInterval(interval);
                                current = finalValue;
                            }
                            number.innerText = 
                                (hasK ? (current/1000).toFixed(0) + 'k' : current) + 
                                (hasPlus ? '+' : '') +
                                (hasPercent ? '%' : '');
                        }, 30);

                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            observer.observe(stat);
        });
    };
    animateNumbers();

    // Back to Top
    const backToTop = document.getElementById('backToTop');
    if(backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});