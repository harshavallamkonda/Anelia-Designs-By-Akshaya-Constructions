document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById("mobileMenu");
        mobileMenu.classList.toggle("active");
    };

    window.closeMobileMenu = function() {
        const mobileMenu = document.getElementById("mobileMenu");
        mobileMenu.classList.remove("active");
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Package dropdown toggle functionality
    window.toggleDropdown = function(id) {
        const dropdown = document.getElementById(id);
        const icon = document.getElementById(id + "-icon");
        
        if (dropdown) {
            dropdown.classList.toggle("active");
            if (icon) {
                icon.classList.toggle("rotated");
            }
        }
    };

    // Package section visibility toggle
    window.togglePackagesSection = function(targetId) {
        const constructionPackages = document.getElementById("construction-packages-section");
        const interiorPackages = document.getElementById("interior-packages-section");
        // If target is already visible, toggle it closed
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        const isHidden = targetSection.classList.contains('hidden');

        // Hide both sections first to ensure only one is visible at a time
        constructionPackages.classList.add("hidden");
        interiorPackages.classList.add("hidden");

        if (isHidden) {
            // Show the requested section
            targetSection.classList.remove('hidden');
            // Scroll to it after a small delay for smoothness
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // It was visible — we've hidden it already, so do nothing further (i.e., close)
        }
    };

    // Add event listeners to view packages buttons
    document.querySelectorAll(".view-packages-btn").forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.dataset.target;
            window.togglePackagesSection(targetId);
        });
    });

    // Contact form submission placeholder (EmailJS handler is attached directly in index.html)
    window.handleFormSubmit = function(event) {
        // no-op to avoid duplicate behavior; EmailJS submit handler handles the form
        event.preventDefault();
    };

    // Navbar background on scroll + scroll-driven glow for CTAs
    // Use rAF and a short timeout to keep this handler performant.
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }

        // Scroll-driven glow: add a lightweight body class while scrolling.
        // Debounced removal after short idle to avoid layout thrash.
        if (!window._isScrollTicking) {
            window._isScrollTicking = true;
            window.requestAnimationFrame(() => {
                document.body.classList.add('scroll-glow');
                window._isScrollTicking = false;
            });
        }

        clearTimeout(window._scrollGlowTimeout);
        window._scrollGlowTimeout = setTimeout(() => {
            document.body.classList.remove('scroll-glow');
        }, 180);
    }, { passive: true });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .package-card, .project-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});



