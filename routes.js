import express from 'express';
import { addOwner, addOwnerShopIds, addShops, deleteOwner, deleteShop, showOwners, showOwnerShopIds, showOwnerShops, showShopOwners, showShops, showSingleOwner, showSingleShop } from "./controller.js"
const router = express();

//-------------------------------------Owners_Routing
router.post('/owners',addOwner);

router.get('/owners',showOwners);

router.get('/owners/:ownerId', showSingleOwner);

router.get('/owners/:ownerId/shops',showOwnerShops);

router.delete('/owners/:ownerId',deleteOwner);

//-------------------------------------Shops_Routing
router.post('/shops',addShops);

router.get('/shops',showShops);

router.get('/shops/:shopId',showSingleShop);

router.get('/shops/:shopId/owners',showShopOwners);

router.delete('/shops/:shopId',deleteShop);

//-------------------------------------Junction Schema
router.post('/links',addOwnerShopIds);

router.get('/links',showOwnerShopIds);

export default router;