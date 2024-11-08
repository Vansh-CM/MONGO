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

exports.getCity= async (req, res)=>{

    const cityId =new  mongoose.Types.ObjectId(req.query.id);

 City.aggregate([
    {
        $match:{_id :cityId , name : "Indore"}
    },
    {
        $lookup:{
            from : "states",
            localField : "state",
            foreignField : "_id",
            as : "state"
        }
    },{
        $unwind:"$state"
    },
    {
        $lookup:{
            from:"countries",
            localField : "state.country",
            foreignField : "_id",
            as :  "country"
        }
    },{
        $unwind:"$country"
    }
     ]).exec()
      .then((data) => {
        console.log(data);
        res.status(200).json({ msg: "success ...", data: data });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Error", error: err });
      });
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

