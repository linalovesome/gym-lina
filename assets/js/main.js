/**
 * FitPower Gym Website
 * Основний JavaScript файл
 */

(function() {
    'use strict';


    document.addEventListener('DOMContentLoaded', function() {
      
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(function() {
                    preloader.style.opacity = '0';
                    setTimeout(function() {
                        preloader.style.display = 'none';
                    }, 300);
                }, 500);
            }
        });

 
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }


        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
        
                const spans = this.querySelectorAll('span');
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                    mobileMenu.style.display = 'block';
                    setTimeout(function() {
                        mobileMenu.style.opacity = '1';
                    }, 10);
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    mobileMenu.style.opacity = '0';
                    setTimeout(function() {
                        mobileMenu.style.display = 'none';
                    }, 300);
                }
            });
        }

        const setActiveMenuItem = function() {
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-link');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            
            const setActive = function(links) {
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    // Порівнюємо поточну сторінку з href посилання
                    if (href === currentPage || 
                        (currentPage === '' && href === 'index.html') || 
                        (currentPage === '/' && href === 'index.html')) {
                        link.classList.add('active');
                    }
                });
            };
            
            setActive(navLinks);
            setActive(mobileNavLinks);
        };
        
        setActiveMenuItem();
        

        const contactForm = document.getElementById('contactForm');
        if (contactForm && contactForm.closest('.contact-form-section')) { // Перевіряємо, що це форма на головній сторінці
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
               
                let isValid = true;
                const name = document.getElementById('name');
                const phone = document.getElementById('phone');
                
                if (!name.value.trim()) {
                    isValid = false;
                    showError(name, 'Будь ласка, введіть ваше ім\'я');
                } else {
                    removeError(name);
                }
                
                if (!phone.value.trim()) {
                    isValid = false;
                    showError(phone, 'Будь ласка, введіть ваш телефон');
                } else {
                    removeError(phone);
                }
                
            
                if (isValid) {
                 
                    
                   
                    showSuccessMessage(contactForm, 'Дякуємо! Ваша заявка прийнята. Ми зв\'яжемося з вами найближчим часом.');
                    
                    
                    contactForm.reset();
                }
            });
        }

        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            let errorMessage = formGroup.querySelector('.error-message');
            
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                formGroup.appendChild(errorMessage);
            }
            
            errorMessage.textContent = message;
            formGroup.classList.add('has-error');
            input.classList.add('error');
        }

        function removeError(input) {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (errorMessage) {
                formGroup.removeChild(errorMessage);
            }
            
            formGroup.classList.remove('has-error');
            input.classList.remove('error');
        }

        function showSuccessMessage(form, message) {
            let successMessage = form.querySelector('.success-message');
            
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                form.appendChild(successMessage);
            }
            
            successMessage.textContent = message;
            successMessage.style.display = 'block';

            setTimeout(function() {
                successMessage.style.opacity = '0';
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 300);
            }, 5000);
        }
 
        const subscribeForm = document.querySelector('.subscribe-form');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            
                    const formGroup = emailInput.closest('.form-group');
                    let errorMessage = formGroup.querySelector('.error-message');
                    
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        formGroup.appendChild(errorMessage);
                    }
                    
                    errorMessage.textContent = 'Будь ласка, введіть коректний email';
                    emailInput.classList.add('error');
                    return;
                }
                
                const formGroup = emailInput.closest('.form-group');
                let successMessage = formGroup.querySelector('.success-message-footer');
                
                if (!successMessage) {
                    successMessage = document.createElement('div');
                    successMessage.className = 'success-message-footer';
                    formGroup.appendChild(successMessage);
                }
                
                successMessage.textContent = 'Дякуємо за підписку!';
                successMessage.style.display = 'block';

                emailInput.value = '';
                setTimeout(function() {
                    successMessage.style.opacity = '0';
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 300);
                }, 3000);
            });
        }
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        if (animateElements.length > 0) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            
            animateElements.forEach(element => {
                observer.observe(element);
            });
        }
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length > 0) {
            galleryItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const imgSrc = this.querySelector('img').getAttribute('src');
                    const imgAlt = this.querySelector('img').getAttribute('alt');
                    
                    openLightbox(imgSrc, imgAlt);
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
        const modalTriggers = document.querySelectorAll('[data-modal]');
        if (modalTriggers.length > 0) {
            modalTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    const modalId = this.getAttribute('data-modal');
                    const modal = document.getElementById(modalId);
                    
                    if (modal) {
                        modal.classList.add('open');
                        document.body.classList.add('modal-open');
                    }
                });
            });
            
            const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');
            modalCloses.forEach(close => {
                close.addEventListener('click', function(e) {
                    e.preventDefault();
                    const modal = this.closest('.modal');
                    if (modal) {
                        modal.classList.remove('open');
                        document.body.classList.remove('modal-open');
                    }
                });
            });
        }
    });
})();


