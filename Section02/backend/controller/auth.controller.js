const bcrypt = require('bcryptjs')
const userModel= require("../model/user.model")
const jwt = require("jsonwebtoken")
const secretCode =require("../config/token.config")


//logic to register user

exports.signUp = async (req, res)=>{
//  logic to create user

// 1. read the req body
const requestBody = req.body

// 2. insert data in the mongoDB users collection
const userObj ={
    name: requestBody.name,
    userId: requestBody.userId,
    email: requestBody.email,
    password:bcrypt.hashSync(requestBody.password, 8)
}
try{
    const userCreated = await userModel.create(userObj)
    // return the userObj
    const resObj ={
        name: userCreated.name,
        userId: userCreated.userId,
        email: userCreated.email,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
    res.status(201).send(resObj)

}catch(error){
    console.log(`Error while registering the user ${error}`);
        res.status(500).send({
            message: "Some error happened during registering the user"
        })
}
}


exports.signIn = async (req, res)=>{
    //check if userID present in the system
    const user =await userModel.findOne({userId:req.body.userId})

    if(user==null){
       return res.status(400).send({
            message: "userID passed it not a valid userID"
        })
    }

    //password is correct
    const isPasswordVallid = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordVallid){
       return res.status(401).send({
            message:"wrong password passed"
        })
    }

    //using jsw we will create the acess token with a given TTL(time to live) 

    const token = jwt.sign({id:user.userId},secretCode.code,{
        expiresIn:120
    })
    res.status(200).send({
        name:user.name,
        userID: user.userId,
        email:user.email,
        accessToken : token
    })

}