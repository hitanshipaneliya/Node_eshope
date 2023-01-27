const mongoose=require("mongoose");

const OrderitemsSchema=new mongoose.Schema({
    // id:{type:String,require:true},
    product:{type:mongoose.Schema.Types.ObjectId,require:true},
    quantiy:{type:Number,require:true}

})

// OrderitemsSchema.virtual("id").get(function(){
//     return this._id.toHexstring;
// });
// OrderitemsSchema.set("toJSON",{
//     virtuals:true,
// });
exports.OrderItem=mongoose.model("OrderItem",OrderitemsSchema);


