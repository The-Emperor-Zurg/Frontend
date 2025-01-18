document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.header__menu-link');
    const currentPath = window.location.pathname;

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith('/' + linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
