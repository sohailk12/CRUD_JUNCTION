import Owner from "./ownerSchema.js";
import Shop from "./shopSchema.js";
import OwnerShop from "./ownerShopSchema.js";
import mongoose from "mongoose";
// import bcrypt from 'bcrypt';

//-------------------------------------------Owner
const addOwner = async (req, res) => {
    const {name,email} = req.body;
    try {
       const saltRounds = 10;
       const password = await bcrypt.hash(req.body.password,saltRounds);
       const owner = new Owner({name,email,password});
       await owner.save();
      res.status(201).json(owner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

const showOwners = async (req,res) => {
    try {
        const getOwners = await Owner.find({});
        return res.json(getOwners);
    } catch (error) {
        res.send(error.message);
    }
}

const showSingleOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const getOwner = await Owner.findById(ownerId);
    return res.json(getOwner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOwner = async (req,res)=>{
  const { ownerId } = req.params;
  try {
    const deleteOwner = await Owner.findByIdAndDelete(ownerId);
    return res.json(deleteOwner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const showOwnerShops = async (req,res)=>{
  const {ownerId} = req.params;
  try {
  const ownerShops = await OwnerShop.find({ ownerId }).populate('shopId');
  const shops = ownerShops.map(os => os.shopId);
  res.status(200).json(shops);
  } catch (error) {
      res.send(error.message);
  }
}
//---------------------------------------------------Shops
const addShops = async (req,res)=>{
    const {name,address} = req.body;
    try {
        const shop = new Shop({name,address});
        await shop.save();
        res.json(shop);
    } catch (error) {
        res.send(error.message);
    }
}

const showShops = async (req,res) =>{
    try {
        const getShops = await Shop.find({});
        return res.json(getShops);
    } catch (error) {
        res.send(error.message);
    }
}

const showSingleShop = async (req,res)=>{
const {shopId} = req.params;
  try {
    const getShops = await Shop.findById(shopId);
    return res.json(getShops);
} catch (error) {
    res.send(error.message);
}
}
const showShopOwners = async (req,res) => {
  const { shopId } = req.params;
try {
  const shopOwners = await OwnerShop.find({ shopId }).populate('ownerId');
  const owners = shopOwners.map(so => so.ownerId);
  res.status(200).json(owners);
} catch (error) {
  res.status(400).json({ error: error.message });
}
}

const deleteShop = async (req,res)=>{
  const {shopId} = req.params;
  try {
    const deleteShops = await Shop.findByIdAndDelete(shopId);
    return res.json(deleteShops);
} catch (error) {
    res.send(error.message);
}
}

//---------------------------------------------Junction Schema
const addOwnerShopIds = async (req,res)=>{
  const {ownerId,shopId} = req.body;
    try {
        const ownershop = new OwnerShop({ownerId,shopId});
        await ownershop.save();
        res.json(ownershop);
    } catch (error) {
        res.send(error.message);
    }
}

const showOwnerShopIds = async (req,res)=>{
  try {
    const ownerShopIds = await OwnerShop.find();
    res.json(ownerShopIds);
} catch (error) {
    res.send(error.message);
}
}
export {
    addOwner,
    showOwners,
    showSingleOwner,
    showOwnerShops,
    deleteOwner,
    addShops,
    showShops,
    showSingleShop,
    showShopOwners,
    deleteShop,
    addOwnerShopIds,
    showOwnerShopIds
}