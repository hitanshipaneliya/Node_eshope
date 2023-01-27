const express=require("express");
const { Category } = require("../Models/category_schema");
const app=express();
const router=express.Router();

router.get(`/`, async (req, res) => { 
    const categoryList = await Category.find(); 
   
    if (!categoryList) { 
      res.status(500).json({ success: false }); 
    } 
    res.status(200).send(categoryList); 
  });
  
router.get("/:id",async(req,res)=>{
    const category=await Category.findById(req.params.id);

    if(!category)
    {
        res.status(500).json({messag:"the category with id was not found"})
    }
    res.status(200).send(category);
  });


router.put("/:id",async(req,res)=>{
    const category=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name,icon:req.body.icon,color:req.body.color,image:"images"},
    {new:true});

    if(!category)
        return res.status(400).send("the category can not be created");
        res.send(category)
    
  });

router.delete("/:id",async(req,res)=>{
    const category=await Category.findByIdAndRemove(req.params.id)
    .then((category)=>{
        if(category){
            return res.status(200).json({success:"category is deleted"});
        }
        else{
            return res.status(200).json({success:"category not found"});
        }
    })
    .catch((err)=>{
        return res.status(200).json({success:false,error:err});
    });
  });
  
router.post("/",async(req,res)=>{

    let category_data=new Category({
         
           name:req.body.name,
           color:req.body.color,
           icon:req.body.icon,
           image:"image"
    });

const category_insert= await category_data.save();
    if(!category_insert)return res.status(500).send("product can not be created");
    res.send(category_insert);
});

module.exports=router;

























// const bcrypt=require("bcrypt");

// const Categorydata={
//     Category:[
//         {
//            id:1,
//            name:"xyz",
//            color:"black",
//            icon:"@",
//            image:"abc@123/imagess",
//         }
//     ]
// }
// module.exports=Categorydata;