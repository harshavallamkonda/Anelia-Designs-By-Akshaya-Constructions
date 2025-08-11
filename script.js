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

        // Hide both sections first
        constructionPackages.classList.add("hidden");
        interiorPackages.classList.add("hidden");

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove("hidden");
            
            // Scroll to the packages section after showing it
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    };

    // Add event listeners to view packages buttons
    document.querySelectorAll(".view-packages-btn").forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.dataset.target;
            window.togglePackagesSection(targetId);
        });
    });

    // Contact form submission
    window.handleFormSubmit = function(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Create email body
        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AService: ${service}%0D%0AMessage: ${message}`;
        
        // Open email client
        window.location.href = `mailto:sales@aneliadesign.com?subject=Website Inquiry from ${name}&body=${emailBody}`;
    };

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });

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

