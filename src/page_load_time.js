(function () {
    // Подписываемся на событие полной загрузки страницы
    window.addEventListener('load', () => {
        // Получаем время окончания загрузки страницы
        const loadTime = (performance.now() / 1000).toFixed(3);

        // Создаём новый элемент для отображения информации
        const loadTimeInfo = document.createElement('div');
        loadTimeInfo.style.textAlign = 'center';
        loadTimeInfo.style.fontSize = '0.9rem';
        loadTimeInfo.style.color = '#444';
        loadTimeInfo.innerHTML = `<strong>Время загрузки страницы: ${loadTime} секунд</strong>`;

        // Находим футер и добавляем элемент в него
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.appendChild(loadTimeInfo);
        }
    });
})();
