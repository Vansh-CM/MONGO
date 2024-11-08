const Product = require("../model/product.model");

exports.addProduct = (req, res )=>{
         let product = new Product(req.body);
         product.save((err, product) => {
            if(err){
                res.status(500).json({massage : "Error ..."})
            }
              else{
                res.status(201).json({data : product , massage : "Product Added Successfully..."})
              }
         })
}

exports.list = (req, res )=>{
     Product.find().then((product) => {
        res.status(200).json({data : product , massage : "Product List..."})
        }).catch((err) => {
            res.status(500).json({massage : "Error..."})
            })
}

exports.addProducts = (req, res )=>{
    // let product = new Product();
    let products = req.body.products
    Product.insertMany(products).then(data=>{
        res.status(201).json({data : data , massage : "Product Added Successfully..."})

    }).catch(err=>{
            console.log(err)
        res.status(500).json({massage : "Error ..." , err :err})
    })
    // product.save((err, product) => {
    //    if(err){
    //    }
    //      else{
    //      }
    // })
}

exports.out