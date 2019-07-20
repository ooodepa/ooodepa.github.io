function mobilemenu() {
    $('.header__mobile-menu li').click(function (event) {
        $(this).children("ul").slideToggle();
        event.stopPropagation();
    });
}

export default mobilemenu;