---
layout: Price-google-table/Price-google-table
title: Серия Звезда DE-PA Electric
description: Серия Звезда DE-PA Electric
permalink: products/de-pa-electric/star-series/
category: price-de-pa
---

<div class="page__price">
    {% for i in site.data.prices.de-pa-electric.star-series %}
    <div class="price_card">
        <div class="price_card__img">
            <img src="{{ i.Img }}" alt="">
        </div>
        <div class="price_card__title">
            {{ i.Name }}
        </div>
        <ul>
            <li>Модель:</li>
            <li>{{ i.Code }}</li>
            <li>Цена за 1 ед. c НДС:</li>
            <li>{{ i.Cost }} BYN</li>
            <li>В коробке, шт.:</li>
            <li>{{ i.OnBox }}</li>
        </ul>
    </div>
    {% endfor %}
</div>