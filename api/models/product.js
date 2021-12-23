const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

// Auto Increment ID
Schema=mongoose.Schema;
var autoIncrement=require('mongoose-auto-increment');
const connection=mongoose.createConnection("mongodb+srv://vismay:T@nvi8758@cluster0.ikpvs.mongodb.net/shoppingdemo?retryWrites=true&w=majority",{useNewUrlParser:true});
autoIncrement.initialize(connection);

  


const productSchema=mongoose.Schema({
  // id:{type:Number},  
  product_id:{type:Number,ref: 'product_id',required:true,unique:true},
name:{type:String,required:true},    
description:{type:String},
productunique_id:{type:String,required:true,unique:true},
image:{type:String, required:true},
// unique_id:{type:String},
quantity:{type:Number,required:true},
price:{type:Number,required:true},
discount:{type:String,required:true},
created_date:{type:Date,default:Date.now,required:true},
modified_date:{type:Date,default:null},  
delete_date:{type:Date,default:null},  
status:{type:Boolean,default:true,required:true},

});




productSchema.plugin(uniqueValidator);
productSchema.plugin(autoIncrement.plugin,{model:'Product', field:'product_id', startAt: 1,incrementBy: 1});
module.exports=mongoose.model("Product",productSchema);