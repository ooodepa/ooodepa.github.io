---
layout: Price-google-table/Price-google-table
title: Серия розеток накладных с заземлением DE-PA Electric
description: Серия розеток накладных с заземлением DE-PA Electric
permalink: prices/de-pa-electric/surfase-mounted-socket-series/
category: price-de-pa
---

<p style="text-align: center;">Online данные можно смотреть <a href="{{ site.baseurl }}/online/#/prices/de-pa-electric/surfase-mounted-socket-series">тут</a>. Если же страница не работает, то оставайтесь на этой.</p>

<div class="page__price">
    {% for i in site.data.prices.de-pa-electric.surfase-mounted-socket-series %}
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