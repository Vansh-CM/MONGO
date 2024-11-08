const User = require('../model/user.model')

exports.signup =async (req , res)=>{

   let user =  new User(req.body)
 let data =await  user.save()


res.status(200).json({msg : "success ...",data : data})
}

exports.login = async (req, res)=>{
  let data = await User.findOne({email : req.body.email ,  password : req.body.password})
  res.status(200).json({msg : "success ...",data : data})
}