/**
 * FitPower Gym Website
 * Скрипт для сторінки розкладу
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initScheduleTabs();
        initScheduleFilter();
    });

    /**
     * Ініціалізація вкладок для розкладу
     */
    function initScheduleTabs() {
        const tabButtons = document.querySelectorAll('.schedule-tab-btn');
        const tabContents = document.querySelectorAll('.schedule-tab');
        
        if (!tabButtons.length || !tabContents.length) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const day = this.getAttribute('data-day');
                
                // Видаляємо активний клас з усіх кнопок та вкладок
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Додаємо активний клас до поточної кнопки та вкладки
                this.classList.add('active');
                document.querySelector(`.schedule-tab[data-day="${day}"]`).classList.add('active');
            });
        });
        
        // Автоматичне встановлення поточного дня тижня при завантаженні
        setCurrentDayTab();
    }
    
    /**
     * Встановлення вкладки з поточним днем тижня
     */
    function setCurrentDayTab() {
        const today = new Date().getDay(); // 0 - неділя, 1 - понеділок, ..., 6 - субота
        const dayMapping = {0: 7, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6}; // Конвертація до нашого формату днів
        const currentDay = dayMapping[today];
        
        // Знаходимо кнопку для поточного дня і клікаємо на неї
        const currentDayButton = document.querySelector(`.schedule-tab-btn[data-day="${currentDay}"]`);
        if (currentDayButton) {
            currentDayButton.click();
        }
    }

    /**
     * Ініціалізація фільтрації для розкладу
     */
    function initScheduleFilter() {
        const filterForm = document.getElementById('scheduleFilter');
        if (!filterForm) return;
        
        const filterInputs = filterForm.querySelectorAll('input, select');
        const scheduleRows = document.querySelectorAll('.schedule-row');
        
        filterInputs.forEach(input => {
            input.addEventListener('change', applyFilters);
        });
        
        function applyFilters() {
            const selectedTrainer = document.getElementById('filterTrainer').value;
            const selectedClass = document.getElementById('filterClass').value;
            const selectedLevel = document.getElementById('filterLevel').value;
            
            scheduleRows.forEach(row => {
                let showRow = true;
            
                if (selectedTrainer && row.querySelector('.schedule-trainer').textContent.trim() !== selectedTrainer) {
                    showRow = false;
                }
                
                if (selectedClass && !row.querySelector('.schedule-class h3').textContent.includes(selectedClass)) {
                    showRow = false;
                }
                
                if (selectedLevel && row.querySelector('.schedule-level').textContent.trim() !== selectedLevel) {
                    showRow = false;
                }
                
                row.style.display = showRow ? 'flex' : 'none';
            });
            
            document.querySelectorAll('.schedule-tab').forEach(tab => {
                const visibleRows = tab.querySelectorAll('.schedule-row[style="display: flex"]').length;
                const noClasses = tab.querySelector('.no-classes');
                
                if (visibleRows === 0 && tab.querySelectorAll('.schedule-row').length > 0) {
                    if (!noClasses) {

                        const noClassesMsg = document.createElement('div');
                        noClassesMsg.className = 'no-classes';
                        noClassesMsg.innerHTML = '<p>Заняття не знайдені для заданих критеріїв фільтрації.</p>';
                        tab.appendChild(noClassesMsg);
                    } else {
                        noClasses.style.display = 'block';
                    }
                } else if (noClasses && visibleRows > 0) {
                    noClasses.style.display = 'none';
                }
            });
        }

        const resetButton = document.getElementById('resetFilter');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                filterForm.reset();
                
                scheduleRows.forEach(row => {
                    row.style.display = 'flex';
                });
                
                document.querySelectorAll('.no-classes').forEach(el => {
                    if (el.textContent.includes('Заняття не знайдені для заданих критеріїв фільтрації')) {
                        el.style.display = 'none';
                    }
                });
            });
        }
    }
})();
