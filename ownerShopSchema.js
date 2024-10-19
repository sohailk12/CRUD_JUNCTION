import mongoose from "mongoose";

const Schema =mongoose.Schema;

const ownerShopSchema =new Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner',
        required:true
    },
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        required:true
    }
})

const OwnerShop = new mongoose.model('Ownershop',ownerShopSchema);
export default OwnerShop;