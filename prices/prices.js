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

    function writePrice(data, series) {
        var PageHTML = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i].gsx$show.$t != 0 && data[i].gsx$series.$t == series) {
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

    function getGoogleTable(GoogleLink, series) {
        $.getJSON(
            'https://spreadsheets.google.com/feeds/list/' + GoogleLink + '/od6/public/values?alt=json',
            function (data) {
                data = data.feed.entry;
                $('.google_table').html(writePrice(data, series));
            }
        );
    };

    var GoogleTableToken = "1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0";
    const DE_PA_PRICE_BASE = "/prices/de-pa-electric/";
    switch (window.location.pathname) {
        case DE_PA_PRICE_BASE + "star-series/":
            getGoogleTable(GoogleTableToken, "Звезда"); break;
        case DE_PA_PRICE_BASE + "pearl-series/":
            getGoogleTable(GoogleTableToken, "Жемчужина"); break;
        case DE_PA_PRICE_BASE + "accessories/":
            getGoogleTable(GoogleTableToken, "Аксессуары"); break;
        case DE_PA_PRICE_BASE + "group-socket-and-plug/":
            getGoogleTable(GoogleTableToken, "Разветлители. Тройники"); break;
        case DE_PA_PRICE_BASE + "ip44-moisture-proof-series/":
            getGoogleTable(GoogleTableToken, "IP44 вагозащищенных накладных изделий");
        case DE_PA_PRICE_BASE + "surfase-mounted-socket-series/":
            getGoogleTable(GoogleTableToken, "Серия розеток накладных с заземлением"); break;
        case DE_PA_PRICE_BASE + "fuse-boxes/":
            getGoogleTable(GoogleTableToken, "Коробки под автомать"); break;
        case DE_PA_PRICE_BASE + "plastic-lighting-fixtures/":
            getGoogleTable(GoogleTableToken, "Потолочные светильники"); break;
    };
    GoogleTableToken = "";

});