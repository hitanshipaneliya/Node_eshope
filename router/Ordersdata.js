const {Orders}=require("../Models/Orders_schema");
const express=require("express");
const { OrderItem } = require("../Models/Orderitems_schema");
// const { mongoose } = require("mongoose");
// const { Products } = require("../Models/Products_schema");
const router=express.Router();

router.post("/",async(req,res)=>{
    console.log("Post Order")
    const orderItemsIds=Promise.all(
        
        req.body.orderItems.map(async(orderitem)=>{

            let newOrderItem = new OrderItem({
                quantity:orderitem.quantity,
            product:orderitem.product,
            });

            newOrderItem=await newOrderItem.save();
            return newOrderItem._id;
            
        })
    );
    
// router.get(`/:id`,async(req,res)=>{ 
//     const order=await Order.findById(req.params.id) 
 
//         .populate("user","name") 
//         .populate({ 
//             path: "orderitems", 
//             populate: { 
//               path: "product", 
//               populate: "category", 
//             }, 
//           }); 
 
 
//     if(!order){ 
//         res.status(500).json({success:false}); 
//     } 
//     res.send(order); 
// })

const orderItemsIdsResolved=await orderItemsIds;
const totalPrices=await Promise.all(
    orderItemsIdsResolved.map(async(orderItemsId)=>{
        const orderItem=await orderitems.findById(orderItemsId).populate(
            "Product",
            "price"
        );
        const totalPrice=orderItem.product.price*orderItem.quantity;
        return totalPrice;
    })
);

const totalPrice=totalPrices.reduce((a,b)=>a+b,0);
let order=new Orders({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
});

order=await order.save();

if(!order) return res.status(400).send("the order cannot be created");
res.status(200).send(order);
});

module.exports=router;