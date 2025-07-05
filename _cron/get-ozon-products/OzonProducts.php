<?php

include_once  'OzonFetch.php';

class OzonProducts {
    static function getProductInfoAttributes_byProductIdArray($productIdArray) {
        $RESULT = OzonFetch::post("/v4/product/info/attributes", [
            'filter' => [
                'product_id' => $productIdArray,
            ],
            'limit' => 1000,
        ]);

        return $RESULT['result'];
    }

  static function getProductInfoList_byProductIdArray($productIdArray) {
        $RESULT = OzonFetch::post("/v3/product/info/list", [
            'product_id' => $productIdArray,
        ]);

        return $RESULT['items'];
  }

  static function getProducts() {
        $NOT_ARCHIVED_PRODUCTS = OzonProducts::getNotArchivedProducts();
        $ARCHIVED_PRODUCTS = OzonProducts::getArchivedProducts();
        return array_merge($NOT_ARCHIVED_PRODUCTS, $ARCHIVED_PRODUCTS);
  }

  static function getNotArchivedProducts() {
        $RESULT = OzonFetch::post("/v3/product/list", [
            'filter' => [
                'visibility' => 'ALL',
            ],
            'limit' => 1000,
        ]);

        return $RESULT['result']['items'];
  }

    static function getArchivedProducts() {
        $RESULT = OzonFetch::post("/v3/product/list", [
            'filter' => [
                'visibility' => 'ARCHIVED',
            ],
            'limit' => 1000,
        ]);

        return $RESULT['result']['items'];
    }
}
