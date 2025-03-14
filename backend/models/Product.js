import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    images:{
        type:[String],
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    size:{
        type:[String],
        required:true,
        default:'L'
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }, 
    countInStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    }
    
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)

export default Product