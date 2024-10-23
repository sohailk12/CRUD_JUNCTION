import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    }
});

ownerSchema.pre('save',async function (next){
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const Owner = new mongoose.model('Owner',ownerSchema);

export default Owner;