import './prices.sass';
document.addEventListener("DOMContentLoaded", function () {
    function getPriceImg(data, i) {
        if (data[i].gsx$img.$t) {
            var img =
                '<img src="' + data[i].gsx$img.$t + '" />';
        } else { var img = ''; };
        return img;
    };

    function getPriceName(data, i) {
        if (data[i].gsx$name.$t) {
            var name = data[i].gsx$name.$t;
        } else { var name = ''; };
        return name;
    };

    function getPriceCode(data, i) {
        if (data[i].gsx$code.$t) {
            var code = '<li>Модель: </li>' + '<li>' + data[i].gsx$code.$t + '</li>';
        } else { var code = ''; };
        return code;
    };

    function getPriceCost(data, i) {
        if (data[i].gsx$cost.$t) {
            var cost = '<li>Цена за 1 ед. c НДС: </li>' + '<li>' + data[i].gsx$cost.$t + ' BYN</li>';
        } else { var cost = ''; };
        return cost;
    };

    function getPriceOnBox(data, i) {
        if (data[i].gsx$onbox.$t) {
            var onbox = '<li>В коробке, шт.: </li>' + '<li>' + data[i].gsx$onbox.$t + '</li>';
        } else { var onbox = ''; };
        return onbox;
    };

    function writePrice(data) {
        var PageHTML = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i].gsx$show.$t != 0) {
                var img = getPriceImg(data, i);
                var name = getPriceName(data, i);
                var code = getPriceCode(data, i);
                var cost = getPriceCost(data, i);
                var onbox = getPriceOnBox(data, i);
                PageHTML += '<div class="price_card">'
                    + '<div class="price_card__img">' + img + '</div>'
                    + '<div class="price_card__title">' + name + '</div>'
                    + '<ul>' + code + cost + onbox + '</ul>'
                    + '</div>';
            }
        }
        return PageHTML;
    };

    function getGoogleTable(GoogleLink) {
        $.getJSON(
            'https://spreadsheets.google.com/feeds/list/' + GoogleLink + '/od6/public/values?alt=json',
            function (data) {
                data = data.feed.entry;
                $('.google_table').html(writePrice(data));
            }
        );
    };

    if (window.location.pathname == "/prices/de-pa-electric/") {
        getGoogleTable("1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0");
    }

});