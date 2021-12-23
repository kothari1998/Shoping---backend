const path=require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");



const categoryRoutes=require("./api/routes/categories");
const productRoutes=require("./api/routes/product");

const app=express();
<<<<<<< HEAD
mongoose.connect("mongodb+srv://vismay:T@nvi8758@cluster0.ikpvs.mongodb.net/rajan?retryWrites=true&w=majority",{useNewUrlParser:true})
=======
mongoose.connect("mongodb+srv://vismay:#password@cluster0.ikpvs.mongodb.net/#database?retryWrites=true&w=majority",{useNewUrlParser:true})
>>>>>>> 08e80cd61eb4baa06c6de2406733e05bf6f154a0
.then(()=>{
console.log("Connected to database");
})
.catch(()=>{
console.log("connection failed");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets/images", express.static(path.join("api/assets/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
// QuBqs0T45GDKPlIG

// autoIncrement.initialize(connection);

app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);

module.exports = app;
