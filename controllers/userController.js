const Person = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async(req,res)=>{
    try{
        const {email,name,password} = req.body
        const newUser = await Person.findOne({email})
        if (newUser) res.status(400).json({msg:"User already exists. Try to connect!"})
        else {
            const hashpwd = await bcrypt.hash(password,10)
            const createUser = await Person.create({email,name,password:hashpwd})
            const token = jwt.sign({id:createUser._id}, process.env.JWT_SECRET, {expiresIn:"30d"})
            res.status(201).json({msg:"User has been created successfully!" , token: token, person: createUser})
        }
    }
    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const existUser = await Person.findOne({email})
        if (!existUser) res.status(400).json({msg:"User does not exist! Try to register!"})
        else {
            const checkPw = await bcrypt.compare(password , existUser.password)
            if (!checkPw) res.status(400).json({msg:"Password does not match, please try again..."})
            const token = jwt.sign({id: existUser._id} , process.env.JWT_SECRET , {expiresIn:"30d"})
            res.status(201).json({msg:"Logged in successfully!" , token: token, person: existUser})
        }
    }
    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}

const getUser = async(req,res)=>{
    try{
        const user = await Person.findOne({_id : req.personId})
        if (!user) res.status(400).json({msg:"User doesn't exist! Try to register."})
        res.status(200).json({msg:"User info success" , person: user})
    }

    catch (error) {
        res.status(500).json({msg:"Something went wrong..." , error:error.message})
    }
}


module.exports={register,login,getUser}