const { Orderitems } =require("../Models/Orderitems_schema"); 
const express=require("express"); 
const { Product }=require("../Models/Products_schema"); 
const router=express.Router(); 
 
router.post("/",async(req,res)=>{ 

  let orderitem=new Orderitems({ 
        product:req.body.product, 
        quntity:req.body.quntity, 
    }); 
   const orderitem_insert=await orderitem.save(); 
 
    if(!orderitem_insert) { 
        return res.status(400).send("order item not create"); 
    } 
 
        res.send(orderitem_insert); 
     
}) 
module.exports=router;

