// main.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const menuItems = document.querySelector('.menu-items');

    hamburger.addEventListener('click', function(event) {
        event.stopPropagation();
        this.classList.toggle('change');
        menuItems.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        const isClickInside = hamburger.contains(event.target) || menuItems.contains(event.target);
        
        if (!isClickInside && menuItems.classList.contains('show')) {
            hamburger.classList.remove('change');
            menuItems.classList.remove('show');
        }
    });

    menuItems.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});