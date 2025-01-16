const Product = require("../model/product.model");

exports.addProduct =async (req, res )=>{
         let product = new Product(req.body);
       let result = await  product.save()
        //     (err, product) => {
        //     if(err){
        //         res.status(500).json({massage : "Error ..."})
        //     }
        //       else{
        //         res.status(201).json({data : product , massage : "Product Added Successfully..."})
        //       }
        //  })
        res.status(201).json({data : result , massage : "Product Added Successfully..."})
}

exports.list = (req, res )=>{
     Product.find().then((product) => {
        res.status(200).json({data : product , massage : "Product List..."})
        }).catch((err) => {
            res.status(500).json({massage : "Error..."})
            })
}

exports.addProducts = (req, res )=>{

    let products = req.body.products
    console.log(products)
    Product.insertMany(products).then(data=>{
        res.status(201).json({data : data , massage : "Product Added Successfully..."})

    }).catch(err=>{
            console.log(err)
        res.status(500).json({massage : "Error ..." , err :err})
    })
    
}
 exports.update =  async (req, res) => {
    try {
      const productId = req.params.id;
      const { title, price, description, category, rating } = req.body;
      
      // Check if an image is uploaded
      const image = req.file ? `/uploads/${req.file.filename}` : undefined;
      
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        title,
        price,
        description,
        category,
        rating,
        image
      }, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
exports.out