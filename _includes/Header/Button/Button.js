import './Button.sass';

document.addEventListener("DOMContentLoaded", function () {
    $('.headerButtonLink').on('click', function (e) {
        e.preventDefault;
        $(this).toggleClass('activ');
        $('.headerMenuMobile').toggleClass('headerMenuMobileOpen');
    });
});