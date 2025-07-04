const fs = require('fs');
const PRODUCTS = require('./../../_data/DP_CTL_Items.json');

function replaceEndLine(str) {
    let result = '"' + `${str}`.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';

    return result;
}

async function main() {
    try {

        fs.mkdir('./../../_products', { recursive: true }, (err) => {
            if (err) {
                console.error('Ошибка при создании папки:', err);
                return;
            }
            console.log('Папка успешно создана');
        });

        for (let i = 0; i < PRODUCTS.length; i++) {
            const PRODUCT = PRODUCTS[i];
            const FILENAME = `${PRODUCT.dp_seoUrlSegment}` || `${PRODUCT.dp_id}`;
            const FILE_PATH = `./../../_products/${FILENAME}.html`;

            const FILE_TEXT = `---
layout: page-container

SEO_TITLE: ${replaceEndLine(PRODUCT.dp_seoTitle)}
SEO_DESCRIPTION: ${replaceEndLine(PRODUCT.dp_seoDescription)}
SEO_KEYWORDS: ${replaceEndLine(PRODUCT.dp_seoKeywords)}

product_id: ${replaceEndLine(PRODUCT.dp_id)}
product_name: ${replaceEndLine(PRODUCT.dp_seoTitle)}
product_brand: ${replaceEndLine(PRODUCT.dp_brand)}
product_barcodes: ${replaceEndLine(PRODUCT.dp_barcodes)}
product_photos: ${replaceEndLine(PRODUCT.dp_photos)}
product_vendors: ${replaceEndLine(PRODUCT.dp_vendorIds)}
---

{%
    include ProductPage.html
    product_id=page.product_id
    product_name=page.product_name
    product_brand=page.product_brand
    product_barcodes=page.product_barcodes
    product_photos=page.product_photos
    product_vendors=page.product_vendors
%}
`;

            await fs.promises.writeFile(FILE_PATH, FILE_TEXT);
        }
    }
    catch (exception) {
        console.error(exception);
    }
}

main();
