const Country = require('../model/country.model')
const State = require("../model/state.model")
const City = require("../model/city.model")
const { default: mongoose } = require('mongoose')

exports.addCountry =async (req , res)=>{

   let country =  new Country(req.body)
 let data =await  country.save()


res.status(200).json({msg : "success ...",data : data})
}


exports.addState =async (req , res)=>{

   let state =  new State(req.body)
 let data =await  state.save()


res.status(200).json({msg : "success ...",data : data})
}



exports.addCity =async (req , res)=>{

   let city =  new City(req.body)
 let data =await  city.save()


res.status(200).json({msg : "success ...",data : data})
}

exports.getAllCountryCity2 = async (req , res)=>{
    let allData = await Country.aggregate([ {
      $lookup:{
        from : "states",
        localField : "id",
        foreignField : "country",
        as : "states"
      }
      ,
      
    }
    ])
    res.status(200).json({msg : "success ...",data : allData})
}
exports.getAllCountryCity = async (req, res) => {
  try {
      const data = await Country.aggregate([
          {
              $lookup: {
                  from: "states", // The collection name for states
                  localField: "_id", // The field in the countries collection
                  foreignField: "country", // The field in the states collection that links to countries
                  as: "states",
                  pipeline: [
                      {
                          $lookup: {
                              from: "cities", // The collection name for cities
                              localField: "_id", // The field in the states collection
                              foreignField: "state", // The field in the cities collection that links to states
                              as: "cities"
                          }
                      },
                      {
                          $project: {
                              _id: 1,
                              name: 1,
                              cities: {
                                  _id: 1,
                                  name: 1
                              }
                          }
                      }
                  ]
              }
          },
          {
              $project: {
                  _id: 1,
                  name: 1,
                  states: 1
              }
          }
      ]);

      res.status(200).json({ msg: "success", data });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error fetching data", error: error.message });
  }
};
exports.getCity= async (req, res)=>{
    const data = await City.aggregate([
        {
          $lookup: {
            from: "states",
            localField: "state",
            foreignField: "_id",
            as: "state",
            pipeline: [
              { 
                $project: { 
                  _id: 1, 
                  name: 1, 
                  country: 1 
                } 
              },
              {
                $lookup: {
                  from: "countries",
                  localField: "country",
                  foreignField: "_id",
                  as: "country",
                  pipeline: [
                    { $project: { _id: 1, name: 1 } }
                  ]
                }
              },
              { $unwind: "$country" } // If you're sure there's only one country
            ]
          }
        },
        { $unwind: "$state" },
        { 
          $project: {
            _id: 1,
            name: 1,
            "state._id": 1,
            "state.name": 1,
            "state.country": 1
            
          }
        }
      ]);
      
      res.status(200).json({ msg: "success ...", data });
  

//  const data = await City.aggregate([

//     {
//         $lookup:{
//             from : "states",
//             localField : "state",
//             foreignField : "_id",
//             as : "state"
//         }
//     },{
//         $unwind:"$state"
//     },
//     {
//         $lookup:{
//             from:"countries",
//             localField : "state.country",
//             foreignField : "_id",
//             as :  "country"
//         }
//     },{
//         $unwind:"$country"
//     }
//      ])
//      res.status(200).json({msg : "success ...",data : data})
    //  .exec()
    //   .then((data) => {
    //     console.log(data);
    //     res.status(200).json({ msg: "success ...", data: data });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ msg: "Error", error: err });
    //   });
}


exports.getStateByCountry=async (req, res)=>{
    let  countryId = new mongoose.Types.ObjectId(req.query.id);
    let state = State.aggregate([
        {
            $match:{country : countryId}
        },
        {
            $lookup:{
                from :"cities",
                localField : "_id",
                foreignField : "state",
                as : "cities"
            }
        },
          {
            $project: {
              _id: 1,
              name: "$cities.name",
              id: "$cities._id",
            }
          }
       

    ])
    state.exec().then(data=>{
        console.log(data);
        res.status(200).json({ msg: "success ...", data: data });
    }).catch(err=>{
        res.status(500).json({ msg: "Error", error: err });
    })

}

