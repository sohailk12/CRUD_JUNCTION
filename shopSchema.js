import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});

const Shop = new mongoose.model('Shop',shopSchema);
export default Shop;