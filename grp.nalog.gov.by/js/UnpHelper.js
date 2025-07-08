class UnpHelper {
  static onInputChange() {
    const DIV = document.getElementById("grp_nalog_gov_by_result");
    DIV.innerHTML = [
      `<div class="alert alert-warning" role="alert">`,
      `[${new Date().toJSON().slice(0, 19).replace("T", " ")}]: `,
      `Введите УНП и нажмите кнопку "Найти", чтобы увидеть данные`,
      `</div>`,
    ].join("");
  }

  static async onButtonClick() {
    const DIV = document.getElementById("grp_nalog_gov_by_result");
    try {
      const INPUT = document.getElementById("grp_nalog_gov_by_input");
      const UNP = INPUT.value;

      const DATA = await UnpHelper.getData_byUnp(UNP);

      let html = "";

      html += UnpHelper.getHtmlDivRowResult({
        key: "УНП",
        value: DATA.row.vunp,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Полное наименование",
        value: DATA.row.vnaimp,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Краткое наименование",
        value: DATA.row.vnaimk,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Адрес",
        value: DATA.row.vpadres,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Код ИМНС",
        value: DATA.row.nmns,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Наименование ИМНС",
        value: DATA.row.vmns,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Дата поставки на учет",
        value: DATA.row.dreg,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Состояние",
        value: DATA.row.vkods,
      });

      html += UnpHelper.getHtmlDivRowResult({
        key: "Дата изменения состояния",
        value: DATA.row.dlikv,
      });

      const XML_URL = `https://grp.nalog.gov.by/api/grp-public/data?unp=${UNP}&charset=UTF-8&type=xml`;

      html += UnpHelper.getHtmlDivRowResult({
        key: "XML",
        value: `<a target="_blank" href="${XML_URL}"><i style="font-size: 1.5em; color: gray;" class="bi bi-filetype-xml me-1"></i></a>`,
      });

      const JSON_URL = `https://grp.nalog.gov.by/api/grp-public/data?unp=${UNP}&charset=UTF-8&type=json`;

      html += UnpHelper.getHtmlDivRowResult({
        key: "JSON",
        value: `<a target="_blank" href="${JSON_URL}"><i style="font-size: 1.5em; color: gray;" class="bi bi-filetype-json me-1"></i></a>`,
      });

      html += `<hr class="mt-2 mb-2"><pre>${JSON.stringify(
        DATA,
        null,
        2
      )}</pre>`;

      DIV.innerHTML = html;
    } catch (exception) {
      console.error(exception);
      DIV.innerHTML = `<div class="alert alert-danger" role="alert">${exception}</div>`;
    }
  }

  static getFormatedDate(date) {
    const D = new Date(date);

    if (D == "Invalid Date") {
      return date;
    }

    const DD = `${D.getDate()}`.padStart(2, "0");
    const MM = `${D.getMonth() + 1}`.padStart(2, "0");
    const YYYY = `${D.getFullYear()}`;

    return `${DD}.${MM}.${YYYY}`;
  }

  static getHtmlDivRowResult(data) {
    return [
      `<hr class="mt-2 mb-2">`,
      `<div class="row">`,
      `<div class="col-sm-12 col-md-3 fw-bold">`,
      `${data["key"]}`,
      `</div>`,
      `<div class="col-sm-12 col-md-9">`,
      `${data["value"]}`,
      `</div>`,
      `</div>`,
    ].join("");
  }

  static async getData_byUnp(unp) {
    const URL_ = `https://de-pa.by/grp.nalog.gov.by/api/unp/?unp=${unp}`;

    const RESPONSE = await fetch(URL_);

    const HTTP_STATUS = RESPONSE.status;

    if (HTTP_STATUS !== 200) {
      const TEXT = await RESPONSE.text();
      throw new Error(`Ошибка ${HTTP_STATUS}\n${TEXT}`);
    }

    const JSON_ = await RESPONSE.json();

    return JSON_;
  }
}
