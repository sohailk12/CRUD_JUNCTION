import express from 'express';
import cotroller from "./controller.js"
const router = express();

//-------------------------------------Owners_Routing
router.post('/owners',cotroller.addOwner);

router.get('/owners', cotroller.showOwners);

router.get('/owners/:ownerId', cotroller.showSingleOwner);

router.get('/owners/:ownerId/shops',cotroller.showOwnerShops);

router.delete('/owners/:ownerId',cotroller.deleteOwner);

//-------------------------------------Shops_Routing
router.post('/shops',cotroller.addShops);

router.get('/shops',cotroller.showShops);

router.get('/shops/:shopId',cotroller.showSingleShop);

router.get('/shops/:shopId/owners',cotroller.showShopOwners);

router.delete('/shops/:shopId',cotroller.deleteShop);

//-------------------------------------Junction Schema
router.post('/buy',cotroller.purchaseShop);

router.get('/ownershops',cotroller.getOwnersWithShops);

router.get('/shopowners',cotroller.getShopsWithOwners);

export default router;