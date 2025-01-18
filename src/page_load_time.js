(function () {
    window.addEventListener('load', () => {
        const loadTime = (performance.now() / 1000).toFixed(3);

        const loadTimeInfo = document.createElement('div');
        loadTimeInfo.style.textAlign = 'center';
        loadTimeInfo.style.fontSize = '0.9rem';
        loadTimeInfo.style.color = '#444';
        loadTimeInfo.innerHTML = `<strong>Время загрузки страницы: ${loadTime} секунд</strong>`;

        const footer = document.querySelector('.footer');
        if (footer) {
            footer.appendChild(loadTimeInfo);
        }
    });
})();
