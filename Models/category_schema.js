const mongoose=require("mongoose");

const CategorySchema=new mongoose.Schema({
    name:{type:String,require:true},
    color:{type:String,require:true},
    icon:{type:String,require:true},
    image:{type:String,require:true}

});
CategorySchema.virtual("id").get(function(){
    return this._id.toHexString();
});
CategorySchema.set("toJSON",{
    virtuals:true,
});
exports.Category=mongoose.model("Category", CategorySchema);
