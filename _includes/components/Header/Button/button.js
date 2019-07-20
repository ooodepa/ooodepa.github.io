function button() {
    $('.headerButtonLink').on('click', function(e) {
        e.preventDefault;
        $(this).toggleClass('activ');
        $('.headerMenuMobile').toggleClass('headerMenuMobileOpen');
    });
}

export default button;