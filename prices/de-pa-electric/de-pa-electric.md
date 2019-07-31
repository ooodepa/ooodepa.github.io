---
layout: Page/Page
title: Продукция DE-PA Electric
description: Продукция DE-PA Electric
permalink: prices/de-pa-electric/
---

<div class="PageHTML">
    Чтобы отобразилась прайс, нужно чтобы был включен Java Script
</div>

<script>$('document').ready(function () {
        var GoogleLink = "1i5cv8kWgXYUnbdUoFf2RN6nTFQmKoFRzYcKDg9IVAj0";
        var UrlWithJSON = 'https://spreadsheets.google.com/feeds/list/' + GoogleLink + '/od6/public/values?alt=json';
        $.getJSON(
            UrlWithJSON,
            function (data) {
                data = data.feed.entry;
                let PageHTML = ''; for (let i = 0; i < data.length; i++) {
                    PageHTML +=
                    '<div class="PageHTML__item">'      
                            + '<p class="PageHTML__title">' + data[i].gsx$name.$t + '</p>'
                            + '<p><b>Код:</b> ' + data[i].gsx$code.$t + '</p>'
                            + '<p><b>Цена:</b> ' + data[i].gsx$cost.$t + '</p>'
                            + '<p><b>В коробке:</b> ' + data[i].gsx$onbox.$t + '</p>'
                        + '</div>';
                }
                $('.PageHTML').html(PageHTML);
            }
        );
});</script>
