import Owner from "./ownerSchema.js";
import Shop from "./shopSchema.js";
import OwnerShop from "./ownerShopSchema.js";
import mongoose from "mongoose";

const checkID = (id)=>{
  return mongoose.Types.ObjectId.isValid(id)
}

export default  {
//-------------------------------------------Owner
   addOwner : async (req, res) => {
    const {name,email,password} = req.body;
    try {
       const owner = new Owner({name,email,password});
       await owner.save();
      res.status(201).json(owner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  showOwners : async (req,res) => {
    try {
        const getOwners = await Owner.find({});
        return res.json(getOwners);
    } catch (error) {
        res.send(error.message);
    }
   },
showSingleOwner : async (req, res) => {
  const { ownerId } = req.params;
  try {
    if(!checkID(ownerId)){
      return res.json({success:false,message:'404 Not Found Invalid ID'});
    }
    const getOwner = await Owner.findById(ownerId);
    res.json(getOwner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
deleteOwner : async (req,res)=>{
  const { ownerId } = req.params;
  try {
    const deleteOwner = await Owner.findByIdAndDelete(ownerId);
    return res.json(deleteOwner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
showOwnerShops : async (req,res)=>{
  const {ownerId} = req.params;
  try {
  const ownerShops = await OwnerShop.find({ ownerId }).populate('shopId');
  const shops = ownerShops.map(os => os.shopId);
  if(shops && shops.length>0){
  return res.status(200).json(shops);
  }
  res.json({success:false, message:'404 Not Found'})
  } catch (error) {
      res.send(error.message);
  }
},
//---------------------------------------------------Shops
addShops : async (req,res)=>{
    const {name,address} = req.body;
    try {
        const shop = new Shop({name,address});
        await shop.save();
        res.json(shop);
    } catch (error) {
        res.send(error.message);
    }
},
showShops : async (req,res) =>{
    try {
        const getShops = await Shop.find({});
        return res.json(getShops);
    } catch (error) {
        res.send(error.message);
    }
},
showSingleShop : async (req,res)=>{
const {shopId} = req.params;
  try {
    if(!checkID(shopId)){
      return res.json({success:false,message:'404 Not Found Invalid ID'});
    }
    const getShops = await Shop.findById(shopId);
    res.json(getShops);
} catch (error) {
    res.send(error.message);
}
},
showShopOwners : async (req,res) => {
  const { shopId } = req.params;
try {
  const shopOwners = await OwnerShop.find({ shopId }).populate('ownerId');
  const owners = shopOwners.map(so => so.ownerId);
  if(owners && owners.length>0){
    return res.status(200).json(owners);
    } 
  res.json({success:false, message:'404 Not Found'})
} catch (error) {
  res.status(400).json({ error: error.message });
}
},
deleteShop : async (req,res)=>{
  const {shopId} = req.params;
  try {
    const deleteShops = await Shop.findByIdAndDelete(shopId);
    return res.json(deleteShops);
} catch (error) {
    res.send(error.message);
}
},
//---------------------------------------------Junction Schema
purchaseShop : async (req,res)=>{
  const {ownerId,shopId} = req.body;
    try {
        if(!checkID(ownerId) || !checkID(shopId)){
         return res.json({success:false,message:'404 Not Found Invalid ID'});
        }
        const ownershop = new OwnerShop({ownerId,shopId});
        await ownershop.save();
        res.json(ownershop);
    } catch (error) {
        res.send(error.message);
    }
},
//----------------------------------------Showing all Owners along shops embeded in it
getOwnersWithShops : async (req,res)=>{
  try {
    const owners = await Owner.find().lean();
    for(let owner of owners){
      owner.shops = await OwnerShop.find({ownerId: owner._id}).populate('shopId');
    }
    res.json(owners);
  } catch (error) {
    res.json({error:error.message});
  }
},
//----------------------------------------Showing all Shops along owners embeded in it 
getShopsWithOwners : async(req,res)=>{
  try {
    const shops = await Shop.find().lean();
    for(let shop of shops){
      shop.owners = await OwnerShop.find({shopId : shop._id}).populate('ownerId');
    }
    res.json(shops);
  } catch (error) {
    res.json({error:error.message});
  }
}
}
