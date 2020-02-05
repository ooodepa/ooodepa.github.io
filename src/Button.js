import $ from 'jquery'

document.addEventListener("DOMContentLoaded", function () {
    $('.headerButtonLink').on('click', function (e) {
        e.preventDefault;
        $(this).toggleClass('activ');
        $('.page__menu').toggleClass('page__menu--open');
    });
});