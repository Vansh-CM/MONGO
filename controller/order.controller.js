const Order = require("../model/order.model");
const Product = require("../model/product.model");


exports.addOrder = (req , res)=>{
       let orderData  = req.body;
       let order = new Order(orderData)
     let {err, orderRes} =  order.save()
     res.status(200).json({massage : "addede .." , order : orderRes})
}

exports.salesByProduct = async  (req, res) => {
  let sales = await Order.aggregate([
        {
            $unwind: '$products'  // Unwind the products array in the Order collection
        },
        {
            $lookup: {
                from: 'products',  // Lookup products collection
                localField: 'products.product',  // Use the product ID in the order's products array
                foreignField: '_id',  // Match to the _id field in the products collection
                as: 'productDetails'  // Store the result in productDetails field
            }
        },
        {
            $unwind: '$productDetails'  // Unwind the productDetails array from the lookup
        },
        {
            $group: {
                _id: '$products.product',  // Group by product ID
                totalQuantitySold: { $sum: '$products.quantity' },  // Sum the quantities sold
                totalRevenue: {
                    $sum: {
                        $multiply: ['$products.quantity', '$productDetails.price']  // Calculate total revenue for each product
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'products',  // Lookup the product name from the products collection
                localField: '_id',  // Use the product ID that was grouped in the previous step
                foreignField: '_id',  // Match with the _id field in the products collection
                as: 'product'  // Store the result in the product field
            }
        },
        {
            $unwind: '$product'  // Unwind the product field to get product name
        },
        {
            $project: {
                productName: '$product.name',  // Return the product name
                totalQuantitySold: 1,  // Return the total quantity sold
                totalRevenue: 1  // Return the total revenue
            }
        }
    ])
    .exec()
    
    // Execute the aggregation query
    res.status(200).json({ message: 'Success', data: sales });
    // .then(sales => {
    //     console.log(sales)
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server error' });
    // });
};
