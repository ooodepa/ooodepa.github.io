<?php

include_once 'OzonProducts.php';
include_once 'OzonProductsAttrs.php';

function replaceEndLine($data) {
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}

function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return true;
    }

    if (!is_dir($dir)) {
        return unlink($dir);
    }

    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }

        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }

    return rmdir($dir);
}

(function() {
    try {
        $folder = "./temp";
        
        deleteDirectory($folder);

        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $PRODUCTS = OzonProducts::getProducts();

        file_put_contents(
            "$folder/ozon__v3_products_list.json",
            json_encode($PRODUCTS, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        );

        $PRODUCT_ID_ARRAY = array_map(function($element) {
            return $element['product_id'];
        }, $PRODUCTS);

        $PRODUCT_INFO_LIST = OzonProducts::getProductInfoList_byProductIdArray($PRODUCT_ID_ARRAY);

        file_put_contents(
            "$folder/ozon__v3_products_info_list.json",
            json_encode($PRODUCT_INFO_LIST, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        );

        $PRODUCT_INFO_ATTRIBUTE = OzonProducts::getProductInfoAttributes_byProductIdArray($PRODUCT_ID_ARRAY);

        file_put_contents(
            "$folder/ozon__v4_products_info_attribute.json",
            json_encode($PRODUCT_INFO_ATTRIBUTE, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        );

        $PRODUCT_ATTRS = OzonProductsAttrs::getAllAttributes_byProductInfoAttrArray($PRODUCT_INFO_ATTRIBUTE);

        file_put_contents(
            "$folder/ozon__v1_description-category_attribute.json",
            json_encode($PRODUCT_ATTRS, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        );

        $OZON_PRODUCTS = [];

        for ($i = 0; $i < count($PRODUCTS); $i++) {
            $PRODUCT = $PRODUCTS[$i];

            $data = [
                'product_id' => "-",
                'offer_id' => "-",
                'SEO_TITLE' => "-",
                'SEO_DESCRIPTION' => "-",
                'SEO_KEYWORDS' => "-",
                'name' => "-",
                'barcodes' => "-",
                'created_at' => "-",
                'updated_at' => "-",
                'vat' => "-",
                'primary_image' => "-",
                'images' => "-",
                'all_images' => "-",
                'color_image' => "-",
                'sku' => "-",
                'package_x' => "-",
                'package_y' => "-",
                'package_z' => "-",
                'package_g' => "-",
                'package_l' => "-",
                'attributes' => "-",
                'description_category_id' => "-",
                'type_id' => "-",
            ];

            $data['product_id'] = $PRODUCT['product_id'];
            $data['offer_id'] = $PRODUCT['offer_id'];
            $data['SEO_TITLE'] = $PRODUCT['offer_id'];
            $data['SEO_DESCRIPTION'] = $PRODUCT['offer_id'];
            $data['SEO_KEYWORDS'] = 'ozon ' . $PRODUCT['offer_id'];

            for ($j = 0; $j < count($PRODUCT_INFO_LIST); $j++) {
                $PRODUCT_INFO = $PRODUCT_INFO_LIST[$j];
                if ($PRODUCT['product_id'] == $PRODUCT_INFO['id']) {
                    $data['name'] = $PRODUCT_INFO['name'];
                    $data['SEO_TITLE'] = $PRODUCT_INFO['name'];
                    $data['SEO_DESCRIPTION'] = $PRODUCT_INFO['name'];
                    $data['barcodes'] = $PRODUCT_INFO['barcodes'];
                    $data['created_at'] = $PRODUCT_INFO['created_at'];
                    $data['updated_at'] = $PRODUCT_INFO['updated_at'];
                    $data['vat'] = $PRODUCT_INFO['vat'];
                    $data['primary_image'] = $PRODUCT_INFO['primary_image'];
                    $data['images'] = $PRODUCT_INFO['images'];
                    $data['all_images'] = array_merge(
                        $PRODUCT_INFO['primary_image'],
                        $PRODUCT_INFO['images'],
                    );
                    $data['color_image'] = $PRODUCT_INFO['color_image'];
                    $data['package_l'] = $PRODUCT_INFO['volume_weight'];
                    break;
                }
            }

            for ($j = 0; $j < count($PRODUCT_INFO_ATTRIBUTE); $j++) {
                $PRODUCT_INFO_ATTR = $PRODUCT_INFO_ATTRIBUTE[$j];
                if ($PRODUCT['product_id'] == $PRODUCT_INFO_ATTR['id']) {
                    $data['sku'] = $PRODUCT_INFO_ATTR['sku'];
                    $data['package_x'] = $PRODUCT_INFO_ATTR['depth'];
                    $data['package_y'] = $PRODUCT_INFO_ATTR['width'];
                    $data['package_z'] = $PRODUCT_INFO_ATTR['height'];
                    $data['package_g'] = $PRODUCT_INFO_ATTR['weight'];
                    $data['attributes'] = $PRODUCT_INFO_ATTR['attributes'];
                    $data['description_category_id'] = $PRODUCT_INFO_ATTR['description_category_id'];
                    $data['type_id'] = $PRODUCT_INFO_ATTR['type_id'];
                    break;
                }
            }

            $OZON_PRODUCTS []= $data;
        }

        for ($i = 0; $i < count($OZON_PRODUCTS); $i++) {
            $PRODUCT = $OZON_PRODUCTS[$i];

            $attrs = $PRODUCT['attributes'];
            for ($j = 0; $j < count($attrs); $j++) {
                $OZON_PRODUCTS[$i]['attributes'][$j]['_name'] = '-';

                for ($k = 0; $k < count($PRODUCT_ATTRS); $k++) {
                    if (
                        $PRODUCT_ATTRS[$k]['_description_category_id'] == $PRODUCT['description_category_id']
                        && $PRODUCT_ATTRS[$k]['_type_id'] == $PRODUCT['type_id']
                        && $PRODUCT_ATTRS[$k]['id'] == $attrs[$j]['id']
                    ) {
                        $OZON_PRODUCTS[$i]['attributes'][$j]['_name'] = $PRODUCT_ATTRS[$k]['name'];
                        break;
                    }
                }
            }
        }

        file_put_contents(
            "./../../_data/OzonProducts.json",
            json_encode($OZON_PRODUCTS, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        );

        $folder = "./../../_ozon_products/";

        deleteDirectory($folder);

        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        for ($i = 0; $i < count($OZON_PRODUCTS); $i++) {
            $OZON_PRODUCT = $OZON_PRODUCTS[$i];

            $FOLDER_PATH = $folder . $OZON_PRODUCT['offer_id'] . '/';

            if (!file_exists($FOLDER_PATH)) {
                mkdir($FOLDER_PATH, 0777, true);
            }

            $JEKYLL_PAGE = '---
layout: page-container

SEO_TITLE: ' . replaceEndLine($OZON_PRODUCT['SEO_TITLE']) . '
SEO_DESCRIPTION: ' . replaceEndLine($OZON_PRODUCT['SEO_DESCRIPTION']) . '
SEO_KEYWORDS: ' . replaceEndLine($OZON_PRODUCT['SEO_KEYWORDS']) . '

ozon_product_id: ' . replaceEndLine($OZON_PRODUCT['product_id']) . '
ozon_product_offer_id: ' . replaceEndLine($OZON_PRODUCT['offer_id']) . '
ozon_product_name: ' . replaceEndLine($OZON_PRODUCT['name']) . '
ozon_product_barcodes: ' . replaceEndLine($OZON_PRODUCT['barcodes']) . '
ozon_product_created_at: ' . replaceEndLine($OZON_PRODUCT['created_at']) . '
ozon_product_updated_at: ' . replaceEndLine($OZON_PRODUCT['updated_at']) . '
ozon_product_vat: ' . replaceEndLine($OZON_PRODUCT['vat']) . '
ozon_product_color_image: ' . replaceEndLine($OZON_PRODUCT['color_image']) . '
ozon_product_primary_image: ' . replaceEndLine($OZON_PRODUCT['primary_image']) . '
ozon_product_images: ' . replaceEndLine($OZON_PRODUCT['images']) . '
ozon_product_all_images: ' . replaceEndLine($OZON_PRODUCT['all_images']) . '
ozon_product_sku: ' . replaceEndLine($OZON_PRODUCT['sku']) . '
ozon_product_package_x: ' . replaceEndLine($OZON_PRODUCT['package_x']) . '
ozon_product_package_y: ' . replaceEndLine($OZON_PRODUCT['package_y']) . '
ozon_product_package_z: ' . replaceEndLine($OZON_PRODUCT['package_z']) . '
ozon_product_package_g: ' . replaceEndLine($OZON_PRODUCT['package_g']) . '
ozon_product_package_l: ' . replaceEndLine($OZON_PRODUCT['package_l']) . '
ozon_product_attributes: ' . replaceEndLine($OZON_PRODUCT['attributes']) . '
---

{%
    include OzonProductPage.html
%}
';

            file_put_contents(
                "$FOLDER_PATH/index.html",
                $JEKYLL_PAGE,
            );
        }
    } catch (Throwable $exception) {
        print_r($exception);
    }
})();
