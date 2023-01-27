const mongoose=require("mongoose");

const OrdersSchema=new mongoose.Schema({
    orderitems:[{type:mongoose.Schema.Types.ObjectId,ref:"orderitem",require:true}],   //multiple values insert
    shippingAddress1:{type:String,require:true},
    shippingAddress2:{type:String,require:true},
    city:{type:String,require:true},
    zip:{type:String,require:true},
    Country:{type:String,require:true},
    phone:{type:Number,require:true},
    status:{type:String,require:true,default:"Pending"},
    totalPrice:{type:Number,require:true},
    user:{type:mongoose.Schema.Types.ObjectId,require:true,ref:"User"},
    dateOrdered:{type:Date,default:Date.now}
});
OrdersSchema.virtual("id").get(function(){
    return this._id.toHexstring;
});
OrdersSchema.set("toJSON",{
    virtuals:true,
});

exports.Orders=mongoose.model("Orders",OrdersSchema);

// orderitems:[
//     {
//         
//         orderitems:[
//     {
//         "quantity":3,
//         "product":"63c92c4e87cc9961916265fd"
//     },
//     {
//         "quantity":4,
//         "product":"63c937204c09af41654838eb"
//     },
//    ],
//         shippingAddress1:"surat",
//         shippingAddress2:"suratvarachha",
//         city:"surat",
//         zip:"gfjgkgy",
//         Country:"india",
//         phone:5678765456,
//         user:'63c93b30ea4766c3521b9535',     
//     },
// ]


