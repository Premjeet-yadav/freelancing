const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    price:{type:String},
    name:{type:String},
    description:{type:String},
    imgurl:{type:String, required:true}
})

const ProductModel=mongoose.model('product', productSchema)

module.exports=ProductModel