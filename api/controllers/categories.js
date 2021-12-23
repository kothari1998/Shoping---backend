const Category=require("../models/categories");
const uniqid=require("uniqid");

exports.createcategory=(req,res,next)=>{
    console.log(req.body);
    const category=new Category({
        unique_id:uniqid(),
        name:req.body.name,
        description:req.body.description
    });
    category.save()
    .then(result=>{

        res.status(201).json({
            message:"Category added successfully",
            isSuccess:true
        });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            message:"Category insertion failed",
            isSuccess:false
        });
    });
  };


exports.updatecategory=(req,res,next)=>{
    const categories=new Category({
        _id: req.body.id,
        name:req.body.name,
        description:req.body.description
    });
    Category.updateOne({_id:req.params.id},categories)
    .then(result=>{
        console.log("result"+result);
        if(result.n>0)
        {
            res.status(200).json({message:"Category updated successfully"});
        }
        else
        {
            // Auth failed 
            res.status(401).json({message:"Category updatedation failed"});   
        }
    })
    .catch(error=>{
        console.log("error"+error);
        res.status(500).json({
            message:"Couldn't update category"
        });
    });
};

exports.deletecategory=(req,res,next)=>{
    Category.deleteOne({_id:req.params.id})
    .then(result=>{
        if(result.n>0)
        {
            res.status(200).json({message:"Category deleted successfully"});
        }
        else
        {   
            // Auth failed 
            res.status(401).json({message:"Category deletetion failed"});
        }
    }).
    catch(error=> {
        res.status(500).json({
            message:"Couldn't delete category"
        });
    });
};

exports.getcategories=(req, res, next) => {
    const pageSize= +req.query.pagesize;
    // const pageSize= 5;
    const currentPage= +req.query.page;
    const categoryQuery=Category.find();
    let fetchedCategory;
  if(pageSize && currentPage)
  {
    categoryQuery.skip(pageSize * (currentPage-1))
    .limit(pageSize);
  }
  categoryQuery.then(documents=>{
    fetchedCategory=documents;
    return Category.count();

  }).then(count=>{
    res.status(200).json({
      message: "Category fetched successfully!",
      categories: fetchedCategory,
      maxCategories:count,

    });
  })
  .catch(error=>{
    res.status(500).json({
      message:"Couldn't fetched category!"
      });
    });
  };    


  exports.getselectcategories=(req, res, next) => {
   
    const categoryQuery=Category.find();
    let fetchedCategory;
  
  categoryQuery.then(documents=>{
    console.log(documents);
    fetchedCategory=documents;
    return Category.count();

  }).then(count=>{
    res.status(200).json({
      message: "Category fetched successfully!",
      categories: fetchedCategory,
      maxCategories:count,

    });
  })
  .catch(error=>{
    res.status(500).json({
      message:"Couldn't fetched category!"
      });
    });
  };    
 

exports.getcategory=(req, res, next) => {
    Category.findById(req.params.id).then(category => {
        console.log(category);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found!" });
      }
    })
    .catch(error=>{
        console.log(error);
      res.status(500).json({
        message:"Couldn't fetched category!"
      });
    });
};

exports.findcategory=(req, res, next) => {
  console.log(req.body);
  // const pageSize= +req.body.pagesize;
  const pageSize= 5;
  const currentPage= +req.body.page;
    const searchtext=req.body.text;
    
    const categoryQuery=Category.find({
      $or: [
        {
            name: { $regex: new RegExp(searchtext, "i") }

        },
        {
            description: { $regex: new RegExp(searchtext, "i") }
        }
    ]
    });
    // console.log(productQuery);
    let fetchedcategory;
  if(pageSize && currentPage)
  {
    categoryQuery.skip(pageSize * (currentPage-1))
    .limit(pageSize);
  }
  categoryQuery.then(documents=>{
    console.log(documents);
    fetchedcategory=documents;
    return Category.count(categoryQuery);

  }).then(count=>{
    res.status(200).json({
      message: "Category fetched successfully!",
      categories: fetchedcategory,
      maxCategories:count,
    });
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      message:"Couldn't fetched category!"
      });
    });
};

