const express=require("express");
const router=express.Router();
const checkAuth=require("../middleware/check-auth");
const CategoryController=require("../controllers/categories");

router.post("", CategoryController.createcategory);
router.put("/:id", CategoryController.updatecategory);
router.delete("/:id", CategoryController.deletecategory);
router.get("", CategoryController.getcategories);
router.get("/selectedcat", CategoryController.getselectcategories);
router.get("/:id", CategoryController.getcategory);
router.post("/findcat", CategoryController.findcategory);
module.exports=router;

