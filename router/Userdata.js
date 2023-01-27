const { User } = require("../Models/User_schema"); 
const express = require("express"); 
const bcrypt = require("bcryptjs"); 
const router = express.Router(); 
const jwt=require("jsonwebtoken");


router.get(`/`, async (req, res) => { 
  const userList = await User.find(); 
 
  if (!userList) { 
    res.status(500).json({ success: false }); 
  } 
  res.send(userList); 
}); 

router.post("/", async (req, res) => { 
  let userdata = new User({ 
    name: req.body.name, 
    email: req.body.email, 
    password:req.body.passwordHash,
    phone: req.body.phone, 
    isAdmin: req.body.isAdmin, 
    street: req.body.street, 
    apartment: req.body.apartment, 
    zip: req.body.zip, 
    city: req.body.city, 
    country: req.body.country, 
  }); 
  user_insert = await userdata.save(); 
  if (!user_insert) return res.status(400).send("the user cannot be created!"); 

  res.send(user_insert); 
}); 


router.post("/login",async(req,res)=>{
  const Userlogin= await User.findOne({email:req.body.email});
  const secret =process.env.secret;
  if(!Userlogin){
    return res.status(400).send("the user not found");
  }

  if(Userlogin&& bcrypt.compareSync(req.body.password,User.passwordHash))
  {
    const token=jwt.sign(
      {
        UserId:User.id,
        isAdmin:User.isAdmin,
      },
      secret,
      { expiresIn:"1d"}
      
    );
    res.status(200).send({User:User.email,token:token});
  }
  else{
    res.status(400).send("password is wrong");
  }
});
 
 
module.exports = router;


    