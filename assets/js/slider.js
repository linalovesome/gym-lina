/**
 * FitPower Gym Website
 * Скрипт для слайдерів
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Слайдер тренерів
        initTrainersSlider();
        
        // Слайдер галереї (якщо він є на сторінці)
        initGallerySlider();
    });

    /**
     * Ініціалізація слайдера тренерів
     */
    function initTrainersSlider() {
        const trainersSlider = document.getElementById('trainersSlider');
        if (!trainersSlider) return;

        let sliderItems = trainersSlider.querySelectorAll('.trainer-card');
        if (sliderItems.length <= 1) return;

        let currentSlide = 0;
        let slideWidth = 0;
        let slideInterval = null;
        let isAutoplay = true;
        let isMobile = window.innerWidth < 768;

        const updateSlideWidth = () => {
            isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                slideWidth = trainersSlider.offsetWidth;
            } else {
                const computedStyle = getComputedStyle(sliderItems[0]);
                const marginRight = parseInt(computedStyle.marginRight) || 30;
                slideWidth = sliderItems[0].offsetWidth + marginRight;
            }
        };
        
        updateSlideWidth();

        createSliderNavigation();

        createSliderArrows();

        function createSliderNavigation() {
            const navContainer = document.createElement('div');
            navContainer.className = 'slider-nav';
            
            for (let i = 0; i < sliderItems.length; i++) {
                const dot = document.createElement('span');
                dot.className = 'nav-dot';
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', function() {
                    goToSlide(i);
                    resetInterval();
                });
                
                navContainer.appendChild(dot);
            }
            
            trainersSlider.parentNode.appendChild(navContainer);
        }
        
        function createSliderArrows() {
            const prevArrow = document.createElement('button');
            prevArrow.className = 'slider-arrow prev-arrow';
            prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevArrow.addEventListener('click', function() {
                prevSlide();
                resetInterval();
            });
            
            const nextArrow = document.createElement('button');
            nextArrow.className = 'slider-arrow next-arrow';
            nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextArrow.addEventListener('click', function() {
                nextSlide();
                resetInterval();
            });
            
            trainersSlider.parentNode.appendChild(prevArrow);
            trainersSlider.parentNode.appendChild(nextArrow);
        }
        
        function goToSlide(n) {
            currentSlide = n;
            updateSliderPosition();
            updateNavDots();
        }
        
        function updateSliderPosition() {
            trainersSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            trainersSlider.style.transition = 'transform 0.5s ease-in-out';
        }
        
        function updateNavDots() {
            const dots = document.querySelectorAll('.nav-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Функція для переходу до наступного слайда
        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderItems.length;
            updateSliderPosition();
            updateNavDots();
        }
        
        // Функція для переходу до попереднього слайда
        function prevSlide() {
            currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
            updateSliderPosition();
            updateNavDots();
        }
        
        // Функція для перезапуску інтервалу автоматичної прокрутки
        function resetInterval() {
            if (isAutoplay) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
        }
        
        // Ініціалізація автоматичної прокрутки
        if (isAutoplay) {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Зупинка автоматичної прокрутки при наведенні на слайдер
        trainersSlider.addEventListener('mouseenter', function() {
            if (isAutoplay) {
                clearInterval(slideInterval);
            }
        });
        
        // Відновлення автоматичної прокрутки при відведенні миші
        trainersSlider.addEventListener('mouseleave', function() {
            if (isAutoplay) {
                resetInterval();
            }
        });
        
        // Оновлення розмірів при зміні розміру вікна
        window.addEventListener('resize', function() {
            updateSlideWidth();
            updateSliderPosition();
        });
        
        // Touch events для мобільних пристроїв
        let touchStartX = 0;
        let touchEndX = 0;
        
        trainersSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        trainersSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const minSwipeDistance = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance > minSwipeDistance) {
                // Свайп вправо (попередній слайд)
                prevSlide();
                resetInterval();
            } else if (swipeDistance < -minSwipeDistance) {
                // Свайп вліво (наступний слайд)
                nextSlide();
                resetInterval();
            }
        }
    }

    /**
     * Ініціалізація слайдера галереї
     */
    function initGallerySlider() {
        const gallerySlider = document.getElementById('gallerySlider');
        if (!gallerySlider) return;
        
        // Аналогічна логіка як і в слайдері тренерів, але з урахуванням особливостей галереї
        let sliderItems = gallerySlider.querySelectorAll('.gallery-item');
        if (sliderItems.length <= 1) return;


        let currentSlide = 0;
        let slideWidth = 0;
        let slideInterval = null;
        let isAutoplay = true;
        
        // Визначення ширини слайда
        const updateSlideWidth = () => {
            const computedStyle = getComputedStyle(sliderItems[0]);
            const marginRight = parseInt(computedStyle.marginRight) || 20;
            slideWidth = sliderItems[0].offsetWidth + marginRight;
        };
        
        updateSlideWidth();
        
        // Додавання навігації для слайдера
        const navContainer = document.createElement('div');
        navContainer.className = 'slider-nav';
        
        for (let i = 0; i < sliderItems.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'nav-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                goToSlide(i);
                resetInterval();
            });
            
            navContainer.appendChild(dot);
        }
        
        gallerySlider.parentNode.appendChild(navContainer);
        
        // Додавання контролів "Попередній" та "Наступний"
        const prevArrow = document.createElement('button');
        prevArrow.className = 'slider-arrow prev-arrow';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevArrow.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        const nextArrow = document.createElement('button');
        nextArrow.className = 'slider-arrow next-arrow';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextArrow.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
        
        gallerySlider.parentNode.appendChild(prevArrow);
        gallerySlider.parentNode.appendChild(nextArrow);

        function goToSlide(n) {
            currentSlide = n;
            gallerySlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

            const dots = document.querySelectorAll('.slider-nav .nav-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderItems.length;
            goToSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
            goToSlide(currentSlide);
        }
        
        function resetInterval() {
            if (isAutoplay) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
        }
        
        if (isAutoplay) {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        gallerySlider.addEventListener('mouseenter', function() {
            if (isAutoplay) {
                clearInterval(slideInterval);
            }
        });
        
        gallerySlider.addEventListener('mouseleave', function() {
            if (isAutoplay) {
                resetInterval();
            }
        });

        window.addEventListener('resize', function() {
            updateSlideWidth();
            goToSlide(currentSlide);
        });
    
        initGalleryLightbox();
    }


    /**
     * Ініціалізація лайтбоксу для галереї
     */
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        if (!galleryItems.length) return;
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                openLightbox(this.getAttribute('src'), this.getAttribute('alt'));
            });
        });
        
        function openLightbox(src, alt) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = alt || '';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
            
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
        }
    }
})();
