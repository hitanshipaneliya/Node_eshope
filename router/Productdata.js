const { Products }=require("../Models/Products_schema");
const express=require("express");
const { Category } = require("../Models/category_schema");
const app=express();
const router=express.Router();

router.get(`/`, async (req, res) => { 
    const productList = await Products.find(); 
   
    if (!productList) { 
      res.status(500).json({ success: false }); 
    } 
    res.send(productList); 
  }); 

router.post("/",async(req,res)=>{
    console.log(req.body.category);
    const category= await Category.findById(req.body.category);
    if(!category) return res.status(404).send("invalid category");


    let product=new Products({
       
           name:req.body.name,
          description:req.body.description,
           richDescription:req.body.richDescription,
           image:"image",
           images:"images",
           brand:req.body.brand,
           price:req.body.price,
           category:req.body.category,
           countinstock:req.body.countinstock,
           rating:req.body.rating,
           isfeatured:req.body.isfeatured
    });

    product= await product.save();
    if(!product)return res.status(500).send("product can not be created");
    res.send(product);
})

module.exports=router;


// const bcrypt=require("bcrypt");

// const Productdata={
//     Products:[
//         {
//            id:1,
//            name:"abc",
//            description:"xyz",
//            richDescription:"jhgdj",
//            image:"jkhsdjs",
//            images:"fjdhjk",
//            brand:"kljdilsjl",
//            price:123,
//            category:"63c7f5d8da6e1bcadfde621c",
//            countinstock:6778,
//            rating:567,
//            isfeatured:true,
//            datecreated:"12-6-2003",
           
//         },
//     ]
// }
// module.exports=Productdata;
    


