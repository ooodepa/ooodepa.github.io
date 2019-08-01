import './Rights.sass';

document.addEventListener("DOMContentLoaded", function () {
    var Data = new Date();
    var Year = Data.getFullYear();
    var Month = Data.getMonth();
    var fMonth = '';
    switch (Month) {
        case 0: fMonth = "Январь"; break;
        case 1: fMonth = "Февраль"; break;
        case 2: fMonth = "Март"; break;
        case 3: fMonth = "Апрель"; break;
        case 4: fMonth = "Май"; break;
        case 5: fMonth = "Июнь"; break;
        case 6: fMonth = "Июль"; break;
        case 7: fMonth = "Август"; break;
        case 8: fMonth = "Сентябрь"; break;
        case 9: fMonth = "Октябрь"; break;
        case 10: fMonth = "Ноябрь"; break;
        case 11: fMonth = "Декабрь"; break;
    }

    document.getElementById('footer__rights').innerHTML = `ООО "ДЕ-ПА"<br />Июнь 2017 - ${fMonth} ${Year}`;
});