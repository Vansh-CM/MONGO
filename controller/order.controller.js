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
            $unwind: '$products'  
        },
        {
            $lookup: {
                from: 'products',  
                localField: 'products.product', 
                foreignField: '_id', 
                as: 'productDetails' 
            }
        },
        {
            $unwind: '$productDetails'  
        },
        {
            $group: {
                _id: '$products.product',  
                totalQuantitySold: { $sum: '$products.quantity' },  
                totalRevenue: {
                    $sum: {
                        $multiply: ['$products.quantity', '$productDetails.price']  
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'products',  
                localField: '_id',  
                foreignField: '_id', 
                as: 'product' 
            }
        },
        {
            $unwind: '$product'  
        },
        {
            $project: {
                productName: '$product.name',  
                totalQuantitySold: 1,  
                totalRevenue: 1 
            }
        }
    ])
    .exec()
    const orders = await Order.find().sort({ createdAt: -1 }).exec()
    // Execute the aggregation query
    res.status(200).json({ message: 'Success', data: orders });
    // .then(sales => {
    //     console.log(sales)
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server error' });
    // });
};

exports.totalSellAmount= async (req, res) => {
    let totalSell = await Order.aggregate([{
        $group :{
            _id : null , totalSell : {
                $sum : "$totalAmount"
            }
        }
    }])
    res.status(200).json({ message: 'Success', data: totalSell });

}
//   { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }

exports.topOrder=(req, res)=>{
        //  let topOrder= Order.aggregate([
        //    {
        //     $sort:{
        //         totalAmount : -1
        //     }
        //    },
        // //    {
        // //     $limit : 1
        // //    },
           
        // //    {
        // //     $lookup:{
        // //         from:"products",
        // //         localField:"products.product",
        // //         foreignField:"_id",
        // //         as : "productDetails"
        // //     }
        // //    },
          
        // //    {
        // //     $project :{ products : "productDetails" , total : "order.totalAmount"}
        // //    }
        //  ]).exec()
        //  res.send({topOrder : topOrder})
}

exports.topSell = async ( req, res) =>{
        let topSell = await Order.aggregate([
            { $unwind: "$products" },
            { $lookup: {
                from: "products",
                localField: "products.product",
                foreignField: "_id",
                as: "productDetails"
              }
            },
            { $unwind: "$productDetails" },
            { $project: { 
                orderId: "$_id", 
                productName: "$productDetails.name", 
                quantity: "$products.quantity", 
                price: "$productDetails.price" 
              }
            }
          ]);
        // await Order.aggregate([
        //     {$unwind : "$products"},
        //     {
        //         $group :{
        //                 _id : "$products.product" , 
        //                 totalQuantity :{
        //                     $sum : "$products.quantity"
        //                 }
        //         }
        //     }
        //     ,{
        //         $sort :{
        //              totalQuantity : -1
        //         }
        //     }]
        // )
        res.status(200).json({ message: 'Success', data: topSell });

        //   Order.aggregate([
        //     { $unwind: "$products" },
        //     { $group: { _id: "$products.product", totalQuantity: { $sum: "$products.quantity" } } },
        //     { $sort: { totalQuantity: -1 } } // Sort by totalQuantity in descending order
        //   ]);

        
}