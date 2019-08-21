document.addEventListener("DOMContentLoaded", function () {

    if (window.location.hash == "#/contacts") {

        document.querySelector('title').innerHTML = 'Контакты';

        var GoogleLink = "1jmh4h3IxVhJF1d9xqrjG7o83Mo9DUsiDMeU5oFlp-Pc";
        var UrlWithJSON = 'https://spreadsheets.google.com/feeds/list/' + GoogleLink + '/od6/public/values?alt=json';
        $.getJSON(
            UrlWithJSON,
            function (data) {

                data = data.feed.entry;

                var PageHTML = '';

                for (var i = 0; i < data.length; i++) {

                    if (data[i].gsx$titleicon.$t) {
                        var titleicon = data[i].gsx$titleicon.$t + ' ';
                    } else { var titleicon = ''; };

                    if (data[i].gsx$title.$t) {
                        var title = data[i].gsx$title.$t;
                    } else { var title = ''; };


                    if (data[i].gsx$phone1.$t) {
                        if (data[i].gsx$phone1title.$t) {
                            phone1title = data[i].gsx$phone1title.$t;
                        } else { phone1title = data[i].gsx$phone1.$t };
                        var phone1 =
                            '<a class="page__button" href="tel: ' + data[i].gsx$phone1.$t + '">' + phone1title + '</a>';
                    } else { var phone1 = ''; };


                    if (data[i].gsx$phone2.$t) {
                        if (data[i].gsx$phone2title.$t) {
                            phone2title = data[i].gsx$phone2title.$t;
                        } else { phone2title = data[i].gsx$phone2.$t };
                        var phone2 =
                            '<a class="page__button" href="tel: ' + data[i].gsx$phone2.$t + '">' + phone2title + '</a>';
                    } else { var phone2 = ''; };


                    if (data[i].gsx$text.$t) {
                        var text =
                            '<p style="text-align: center;">' + data[i].gsx$text.$t + '</p>';
                    } else { var text = ''; };

                    if (data[i].gsx$email.$t) {
                        var email =
                            '<a class="page__button" href="mailto: ' + data[i].gsx$email.$t + '">' + data[i].gsx$email.$t + '</a>';
                    } else { var email = ''; };

                    if (data[i].gsx$viber.$t) {
                        var viber =
                            '<a class="page__button--viber fab fa-viber" href="viber://add?number=' + data[i].gsx$viber.$t + '"></a>';
                    } else { var viber = ''; };

                    if (data[i].gsx$whatsapp.$t) {
                        var whatsapp =
                            '<a class="page__button--whats-app fab fa-whatsapp" href="https://api.whatsapp.com/send?phone=' + data[i].gsx$whatsapp.$t + '"></a>';
                    } else { var whatsapp = ''; };

                    if (data[i].gsx$skype.$t) {
                        var skype =
                            '<a class="page__button--skype fab fa-skype" href="skype:' + data[i].gsx$skype.$t + '?call"></a>';
                    } else { var skype = ''; };

                    PageHTML += '<div>'
                        + '<h2>' + titleicon + title + '</h2>'
                        + text
                        + '<div class="page__flex">' + phone1 + phone2 + email + '</div>'
                        + '<div class="page__flex">' + viber + whatsapp + skype + '</div>'
                        + '</div>' + '<hr/>';
                };
                $('.google_table').html(PageHTML);
            }
        );

    }

});