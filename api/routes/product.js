const express=require("express");
const router=express.Router();
const checkAuth=require("../middleware/check-auth");
const extractFile=require("../middleware/file");
const ProductController=require("../controllers/product");

router.post("", extractFile,ProductController.createproduct);
router.put("/:id", extractFile,ProductController.updateproduct);
router.delete("/:id", ProductController.deleteproduct);
router.get("", ProductController.getproducts);
router.get("/:id", ProductController.getproduct);
router.post("/findproduct", ProductController.findproduct);
module.exports=router;