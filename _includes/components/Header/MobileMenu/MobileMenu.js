import './MobileMenu.sass';

document.addEventListener("DOMContentLoaded", function () {
    $('.header__mobile-menu li').click(function (event) {
        $(this).children("ul").slideToggle();
        event.stopPropagation();
    });
});