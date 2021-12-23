const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

// Auto Increment ID
Schema=mongoose.Schema;
var autoIncrement=require('mongoose-auto-increment');
const connection=mongoose.createConnection("mongodb+srv://vismay:T@nvi8758@cluster0.ikpvs.mongodb.net/rajan?retryWrites=true&w=majority",{useNewUrlParser:true});
autoIncrement.initialize(connection);

  


const categorySchema=mongoose.Schema({
  // id:{type:Number},  
  cat_id:{type:Number,ref: 'cat_id',required:true,unique:true},
name:{type:String,required:true},    
description:{type:String},
// unique_id:{type:String},
unique_id:{type:String,required:true,unique:true},
created_date:{type:Date,default:Date.now,required:true},
modified_date:{type:Date,default:null},  
delete_date:{type:Date,default:null},  
status:{type:Boolean,default:true,required:true},

});




categorySchema.plugin(uniqueValidator);
categorySchema.plugin(autoIncrement.plugin,{model:'Categories', field:'cat_id', startAt: 1,incrementBy: 1});
module.exports=mongoose.model("Category",categorySchema);