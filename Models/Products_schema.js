const mongoose=require("mongoose");

const ProductsSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    richDescription:{type:String,require:true},
    image:{type:String,require:true},
    images:{type:String,require:true},
    brand:{type:String,require:true},
    price:{type:Number,require:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category",require:true},
    countinstock:{type:Number,require:true},
    rating:{type:Number,require:true},
    isfeatured:{type:Boolean,require:true},
    datecreated:{type:Date,require:true,default:Date.now}
});

ProductsSchema.virtual("id").get(function(){
    return this._id.toHexstring;
});
ProductsSchema.set("toJSON",{
    virtuals:true,
});

exports.Products=mongoose.model("Products",ProductsSchema);

