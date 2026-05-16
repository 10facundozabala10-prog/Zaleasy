document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-up');
    animateElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links (if browser native support isn't enough or need offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });


    // Products Carousel - Infinite Loop
    const carousel = document.querySelector('.products-carousel');
    const track = document.querySelector('.products-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (carousel && track && prevBtn && nextBtn) {
        const cards = Array.from(track.children);
        const cardCount = cards.length;

        // Create fragments for clones to maintain order
        const startClones = document.createDocumentFragment();
        const endClones = document.createDocumentFragment();

        // Clone cards for infinite effect
        cards.forEach(card => {
            const cloneBefore = card.cloneNode(true);
            const cloneAfter = card.cloneNode(true);
            startClones.appendChild(cloneBefore);
            endClones.appendChild(cloneAfter);
        });

        // Insert clones
        track.insertBefore(startClones, track.firstChild);
        track.appendChild(endClones);

        let currentIndex = cardCount; // Start from the first original set
        let isTransitioning = false;

        // Function to get cards per view based on screen size
        function getCardsPerView() {
            return window.innerWidth <= 768 ? 1 : 3;
        }

        // Function to update carousel position
        function updateCarousel(smooth = true) {
            const cardsPerView = getCardsPerView();
            const cardWidth = track.children[0].offsetWidth;
            const gap = 48; // 3rem = 48px
            const offset = currentIndex * (cardWidth + gap);

            track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
            track.style.transform = `translateX(-${offset}px)`;
        }

        // Next button handler
        function moveNext() {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex++;
            updateCarousel();

            setTimeout(() => {
                // If we've reached the cloned end, jump to the real beginning
                if (currentIndex >= cardCount * 2) {
                    currentIndex = cardCount;
                    updateCarousel(false);
                }
                isTransitioning = false;
            }, 500);
        }

        // Previous button handler
        function movePrev() {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex--;
            updateCarousel();

            setTimeout(() => {
                // If we've reached the cloned beginning, jump to the real end
                if (currentIndex < cardCount) {
                    currentIndex = cardCount * 2 - 1;
                    updateCarousel(false);
                }
                isTransitioning = false;
            }, 500);
        }

        nextBtn.addEventListener('click', moveNext);
        prevBtn.addEventListener('click', movePrev);

        // Initialize carousel position
        updateCarousel(false);

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel(false);
            }, 250);
        });
    }

    // Truck Animation
    const truck = document.getElementById('truck-anim');
    if (truck) {
        truck.addEventListener('click', () => {
            // Prevent spamming
            if (truck.classList.contains('truck-moving')) return;

            truck.classList.add('truck-moving');

            // Remove class after animation completes
            truck.addEventListener('animationend', () => {
                truck.classList.remove('truck-moving');
            }, { once: true });
        });
    }

    // Scroll to Top Button (Dynamic Creation)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Quote Form Submission to WhatsApp
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const marca = document.getElementById('marca').value.trim();
            const modelo = document.getElementById('modelo').value.trim();
            const repuestos = document.getElementById('repuestos').value.trim();
            
            if (marca && modelo && repuestos) {
                // WhatsApp number from the footer/floating button: +5492645859764
                const phoneNumber = '5492645859764'; 
                
                // Construct the message
                const message = `*Hola Zabala Repuestos, quisiera cotizar lo siguiente:*%0A%0A*Marca:* ${encodeURIComponent(marca)}%0A*Modelo/Año:* ${encodeURIComponent(modelo)}%0A*Repuestos:*%0A${encodeURIComponent(repuestos)}`;
                
                // Open WhatsApp
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                
                // Reset form optionally
                quoteForm.reset();
            }
        });
    }
});
