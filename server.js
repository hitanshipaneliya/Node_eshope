const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const authjwt = require("./helpers/jwt");
require("dotenv/config");


app.use(cors())
app.options("*", cors());

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authjwt)

const Productdata = require("./router/Productdata");
const Categorydata = require("./router/Categorydata");
const Userdata = require("./router/Userdata");
const Ordersdata = require("./router/Ordersdata");
// const order = require("./router/Ordersdata")


app.use("/products", Productdata);
app.use("/category", Categorydata);
app.use("/users", Userdata);
app.use("/orders",Ordersdata);

// app.use("/userorder",require("./router/Ordersdata"))
mongoose.connect(process.env.CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("database connected"))
    .catch((err) => {
        console.log(err);
    });


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server listning port ${PORT}`);
})


// app.post("/postcategory", (req, res) => {
//     console.log(Categorydata.Category);
//     const result = Category.insertMany(Categorydata.Category);
//     res.send(result);

// });
// app.get("/getcategory", (req, res) => {
//     Category.find({}, function (err, result) {
//         if (err) throw err;
//         else {
//             res.send(result);
//         }
//     });
// });


// app.post("/postproducts",(req,res)=>{
//     console.log(Productdata.Products);
//     const result=Products.insertMany(Productdata.Products); 
//     res.send(result);
// });

// app.get("/getproducts",(req,res)=>{
//     Products.find({},function(err,result){
//         if(err)throw err;
//         else{
//             res.send(result);
//         }
//     });
// });


// app.post("/postuserdata", (req, res) => {
//     console.log(Userdata.Users);
//     const result = Users.insertMany(Userdata.Users);
//     res.send(result);
// });

// app.get("/getuser", (req, res) => {
//     Users.find({}, function (err, result) {
//         if (err) throw err;
//         else {
//             res.send(result);
//         }
//     });
// });

// app.post("/postorders", (req, res) => {
//     console.log(Ordersdata.Orders);
//     const result = Orders.insertMany(Ordersdata.Orders);
//     res.send(result);

// });
// app.get("/getorders", (req, res) => {
//     Orders.find({}, function (err, result) {
//         if (err) throw err;
//         else {
//             res.send(result);
//         }
//     });
// });

// app.post("/postorderitems", (req, res) => {
//     console.log(Orderitemsdata.Orderitems);
//     const result = Orderitems.insertMany(Orderitemsdata.Orderitems);
//     res.send(result);

// });
// app.get("/getorderitems", (req, res) => {
//     Orderitems.find({}, function (err, result) {
//         if (err) throw err;
//         else {
//             res.send(result);
//         }
//     });
// });