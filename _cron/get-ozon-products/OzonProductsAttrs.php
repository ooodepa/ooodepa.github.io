<?php

include_once  'OzonFetch.php';

class OzonProductsAttrs {
    static function getAllAttributes_byProductInfoAttrArray($PRODUCT_INFO_ATTRIBUTE) {
        $PRODUCT_CATEGORY_ID_AND_TYPE_ARRAY = OzonProductsAttrs::getUnicCategoryIdAndTypeId_byProductInfoAttrArray($PRODUCT_INFO_ATTRIBUTE);
        $result = [];

        for ($i = 0; $i < count($PRODUCT_CATEGORY_ID_AND_TYPE_ARRAY); $i++) {
            $data = $PRODUCT_CATEGORY_ID_AND_TYPE_ARRAY[$i];

            $attrs = OzonProductsAttrs::getAttribute_byData($data);

            for ($j = 0; $j < count($attrs); $j++) {
                $attrs[$j]['_description_category_id'] = $data['description_category_id'];
                $attrs[$j]['_type_id'] = $data['type_id'];
                $attrs[$j]['_language'] = $data['language'];
                $result []= $attrs[$j];
            }
        }

        return $result;
    }

    static function getAttribute_byData($data) {
        $RESULT = OzonFetch::post("/v1/description-category/attribute", [
            'description_category_id' => $data['description_category_id'],
            'type_id' => $data['type_id'],
            'language' => $data['language'],
        ]);

        return $RESULT['result'];
    }

    static function getUnicCategoryIdAndTypeId_byProductInfoAttrArray($prodInfoAttrArray) {
        $unicIds = [];
        $result = [];

        for ($i = 0; $i < count($prodInfoAttrArray); $i++) {
            $prodInfoAttr = $prodInfoAttrArray[$i];
            $description_category_id = $prodInfoAttr['description_category_id'];
            $type_id = $prodInfoAttr['type_id'];
            $id = "$description_category_id-$type_id";

            if (in_array($id, $unicIds)) {
                continue;
            }

            $unicIds []= $id;
            $result []= [
                'description_category_id' => $description_category_id,
                'type_id' => $type_id,
                "language" => "DEFAULT",
            ];
        }

        return $result;
    }
}
