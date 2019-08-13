import './price-google-table.sass';

document.addEventListener("DOMContentLoaded", function () {


    
    function getPriceImg(data, i) {
        if (data[i].gsx$img.$t)
            return '<img src="' + data[i].gsx$img.$t + '" />';
        else
            return '';
    };

    function getPriceName(data, i) {
        if (data[i].gsx$name.$t)
            return data[i].gsx$name.$t;
        else
            return '';
    };

    function getPriceCode(data, i) {
        if (data[i].gsx$code.$t)
            return '<li>Модель: </li>' + '<li>' + data[i].gsx$code.$t + '</li>';
        else
            return '';
    };

    function getPriceCost(data, i) {
        if (data[i].gsx$cost.$t)
            return '<li>Цена за 1 ед. c НДС: </li>' + '<li>' + data[i].gsx$cost.$t + ' BYN</li>';
        else
            return '';
    };

    function getPriceOnBox(data, i) {
        if (data[i].gsx$onbox.$t)
            return '<li>В коробке, шт.: </li>' + '<li>' + data[i].gsx$onbox.$t + '</li>';
        else
            return '';
    };

    function writePrice(data) {
        var PageHTML = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i].gsx$show.$t != 0) {
                PageHTML += '<div class="price_card">'
                    + '<div class="price_card__img">' + getPriceImg(data, i) + '</div>'
                    + '<div class="price_card__title">' + getPriceName(data, i) + '</div>'
                    + '<ul>' + getPriceCode(data, i) + getPriceCost(data, i) + getPriceOnBox(data, i) + '</ul>'
                    + '</div>';
            };
        };
        return PageHTML;
    };

    function getGoogleTable(GoogleLink) {
        $.getJSON(
            'https://spreadsheets.google.com/feeds/list/' + GoogleLink + '/public/values?alt=json',
            function (data) {
                data = data.feed.entry;
                $('.google_table').html(writePrice(data));
            }
        );
    };

    switch (window.location.pathname) {

        case '/prices/mono-electric/':
            getGoogleTable('1bxCxmZZPz0vLmda8pp262ZQTrqtzmgeV4yBqrcPY1Ms/1');
            break;

        case '/prices/de-pa-electric/star-series/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/1');
            break;

        case '/prices/de-pa-electric/pearl-series/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/2');
            break;

        case '/prices/de-pa-electric/british-system-series/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/3');
            break;

        case '/prices/de-pa-electric/accessories/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/4');
            break;

        case '/prices/de-pa-electric/group-socket-and-plug/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/5');
            break;

        case '/prices/de-pa-electric/ip44-moisture-proof-series/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/6');
            break;

        case '/prices/de-pa-electric/surfase-mounted-socket-series/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/7');
            break;

        case '/prices/de-pa-electric/fuse-boxes/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/8');
            break;

        case '/prices/de-pa-electric/plastic-lighting-fixtures/':
            getGoogleTable('1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0/9');
            break;

    };



});