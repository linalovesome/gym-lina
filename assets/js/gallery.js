/**
 * FitPower Gym Website
 * Скрипт для сторінки галереї
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Дані для галереї
        const galleryItems = [
            {
                id: 1,
                src: 'assets/images/gallery/gym-1.png',
                thumbnail: 'assets/images/gallery/gym-1.png',
                category: 'gym',
                title: 'Тренажерний зал',
                description: 'Загальний вигляд тренажерного залу FitPower'
            },
            {
                id: 2,
                src: 'assets/images/gallery/equipment-1.png',
                thumbnail: 'assets/images/gallery/equipment-1.png',
                category: 'equipment',
                title: 'Силові тренажери',
                description: 'Сучасні силові тренажери для ефективних тренувань'
            },
            {
                id: 3,
                src: 'assets/images/gallery/training-1.jpg',
                thumbnail: 'assets/images/gallery/training-1.jpg',
                category: 'training',
                title: 'Персональне тренування',
                description: 'Індивідуальний підхід до кожного клієнта'
            },
            {
                id: 4,
                src: 'assets/images/gallery/group-1.png',
                thumbnail: 'assets/images/gallery/group-1.png',
                category: 'group',
                title: 'Групове заняття з йоги',
                description: 'Йога для всіх рівнів підготовки'
            },
            {
                id: 5,
                src: 'assets/images/gallery/event-1.png',
                thumbnail: 'assets/images/gallery/event-1.png',
                category: 'events',
                title: 'День відкритих дверей',
                description: 'Щорічний захід для всіх бажаючих'
            },
            {
                id: 6,
                src: 'assets/images/gallery/gym-2.png',
                thumbnail: 'assets/images/gallery/gym-2.png',
                category: 'gym',
                title: 'Кардіо-зона',
                description: 'Сучасні кардіо-тренажери для ефективних тренувань'
            },
            {
                id: 7,
                src: 'assets/images/gallery/equipment-2.png',
                thumbnail: 'assets/images/gallery/equipment-2.png',
                category: 'equipment',
                title: 'Зона вільних ваг',
                description: 'Гантелі, штанги та інше обладнання для силових тренувань'
            },
            {
                id: 8,
                src: 'assets/images/gallery/training-2.jpg',
                thumbnail: 'assets/images/gallery/training-2.jpg',
                category: 'training',
                title: 'Функціональне тренування',
                description: 'Тренування з використанням функціонального обладнання'
            },
            {
                id: 9,
                src: 'assets/images/gallery/group-2.png',
                thumbnail: 'assets/images/gallery/group-2.png',
                category: 'group',
                title: 'Групове заняття з пілатесу',
                description: 'Пілатес для зміцнення м\'язів кора та покращення гнучкості'
            },
            // Додайте більше зображень за потреби
        ];

        // Ініціалізація галереї
        initGallery();
        
        function initGallery() {
            const galleryGrid = document.getElementById('galleryGrid');
            const itemsPerPage = 6;
            let currentPage = 1;
            let currentFilter = 'all';
            
            // Рендеримо галерею
            renderGallery(galleryItems, currentPage, itemsPerPage, currentFilter);
            
            // Ініціалізація фільтрації
            initFilter();
            
            // Ініціалізація пагінації
            initPagination();
            
            // Ініціалізація лайтбоксу
            initLightbox();
            
            function renderGallery(items, page, perPage, filter) {
                // Очищаємо галерею
                galleryGrid.innerHTML = '';
                
                // Фільтруємо елементи
                let filteredItems = items;
                if (filter !== 'all') {
                    filteredItems = items.filter(item => item.category === filter);
                }
                
                // Обчислюємо індекси для поточної сторінки
                const startIndex = (page - 1) * perPage;
                const endIndex = startIndex + perPage;
                
                // Отримуємо елементи для поточної сторінки
                const pageItems = filteredItems.slice(startIndex, endIndex);
                
                // Показуємо повідомлення, якщо немає елементів
                const noResults = document.querySelector('.no-results');
                if (pageItems.length === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
                
                // Рендеримо елементи
                pageItems.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item animate-on-scroll';
                    galleryItem.setAttribute('data-category', item.category);
                    galleryItem.setAttribute('data-id', item.id);
                    
                    galleryItem.innerHTML = `
                        <img src="${item.thumbnail}" alt="${item.title}">
                        <div class="gallery-overlay">
                            <div class="gallery-info">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `;
                    
                    galleryGrid.appendChild(galleryItem);
                    
                    // Додаємо обробник кліку для відкриття лайтбоксу
                    galleryItem.addEventListener('click', function() {
                        openLightbox(item.id);
                    });
                });
                
                // Оновлюємо пагінацію
                updatePagination(filteredItems.length, perPage, page);
            }
            
            function initFilter() {
                const filterButtons = document.querySelectorAll('.filter-btn');
                
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Видаляємо активний клас з усіх кнопок
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        
                        // Додаємо активний клас до натиснутої кнопки
                        this.classList.add('active');
                        
                        // Отримуємо фільтр
                        currentFilter = this.getAttribute('data-filter');
                        
                        // Скидаємо сторінку на першу
                        currentPage = 1;
                        
                        // Рендеримо галерею з новим фільтром
                        renderGallery(galleryItems, currentPage, itemsPerPage, currentFilter);
                    });
                });
            }
            
            function initPagination() {
                const paginationNumbers = document.querySelectorAll('.page-number');
                const prevButton = document.querySelector('.pagination-btn.prev');
                const nextButton = document.querySelector('.pagination-btn.next');
                
                // Обробник кліку на номер сторінки
                paginationNumbers.forEach(number => {
                    number.addEventListener('click', function() {
                        currentPage = parseInt(this.textContent);
                        renderGallery(galleryItems, currentPage, itemsPerPage, currentFilter);
                    });
                });
                
                // Обробник кліку на кнопку "Попередня"
                prevButton.addEventListener('click', function() {
                    if (currentPage > 1) {
                        currentPage--;
                        renderGallery(galleryItems, currentPage, itemsPerPage, currentFilter);
                    }
                });
                
                // Обробник кліку на кнопку "Наступна"
                nextButton.addEventListener('click', function() {
                    const filteredItems = currentFilter === 'all' 
                        ? galleryItems 
                        : galleryItems.filter(item => item.category === currentFilter);
                    
                    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
                    
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderGallery(galleryItems, currentPage, itemsPerPage, currentFilter);
                    }
                });
            }
            
            function updatePagination(totalItems, perPage, currentPage) {
                const totalPages = Math.ceil(totalItems / perPage);
                const paginationNumbers = document.querySelectorAll('.page-number');
                const prevButton = document.querySelector('.pagination-btn.prev');
                const nextButton = document.querySelector('.pagination-btn.next');
                
                // Оновлюємо видимість номерів сторінок
                paginationNumbers.forEach((number, index) => {
                    if (index < totalPages) {
                        number.style.display = 'flex';
                        number.classList.toggle('active', index + 1 === currentPage);
                    } else {
                        number.style.display = 'none';
                    }
                });
            }
        }
    });
})(); 