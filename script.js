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

	// Add this to your existing JavaScript
function setupDropdowns() {
    // Desktop dropdown
    const desktopAbout = document.querySelector('.desktop .dropdown');
    const desktopDropdown = document.querySelector('.desktop .dropdown-content');

    if(desktopAbout && desktopDropdown) {
        desktopAbout.addEventListener('click', (e) => {
            e.stopPropagation();
            desktopDropdown.classList.toggle('active');
        });
    }

    // Mobile dropdown
    const mobileAboutBtn = document.getElementById('about-dropdown-btn');
    const mobileDropdown = document.getElementById('about-dropdown');

    if(mobileAboutBtn && mobileDropdown) {
        mobileAboutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle('active');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        [desktopDropdown, mobileDropdown].forEach(dropdown => {
            dropdown?.classList.remove('active');
        });
    });
}

// Add this to your DOMContentLoaded callback
setupDropdowns();

    // Swiper Sliders
    if (document.querySelector(".gallerySwiper")) {
        new Swiper(".gallerySwiper", {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            slidesPerView: 1,
            pagination: { el: ".swiper-pagination", clickable: true},
            spaceBetween: 30,
            breakpoints: { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3} }
        });
    }

    if (document.querySelector(".blogSwiper")) {
        new Swiper(".blogSwiper", {
            loop: true,
            slidesPerView: 1,
            pagination: { el: ".swiper-pagination", clickable: true},
            spaceBetween: 30,
            breakpoints: { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3} },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        });
    }

    // AOS Animation
    if(window.AOS) {
        AOS.init({ duration: 800, once: true, offset: 120, easing: 'ease-in-out' });
    }

const aboutDropdownBtn = document.getElementById("about-dropdown-btn");
     const aboutDropdown = document.getElementById("about-dropdown");

     if (aboutDropdownBtn && aboutDropdown) {
         aboutDropdownBtn.addEventListener("click", function () {
             aboutDropdown.classList.toggle("hidden");
         });
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
});
