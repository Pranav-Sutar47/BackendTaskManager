const UserModel = require("../Models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        console.log(user)
        if(user)
            return res.status(409).json({message : 'User is already exists',staus : 'false'})
        const userModel = new UserModel({name,email,password});
        // encrypt psw
        userModel.password = await bcrypt.hash(password,10); //password and salt
        await userModel.save();
        res.status(201).json({message : "SignUp Successfull",success : true,})
    }catch(err){
        res.status(500).json({message: 'SignUp Error',success : false,err})
    }
}
// VIMP Note always use return in if
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        const msg = "Invalid Email or Password"
        if(!user)
            return res.status(403).json({msg})

        const isPassEqual = await bcrypt.compare(password,user.password);

        if(!isPassEqual)
           return res.status(403).json({msg})

        //creting token
        const token = jwt.sign(
            {email: user.email,_id: user._id},
            process.env.JWTSECRET,
            {expiresIn : '24h'} 
        );

        res.status(200).json({msg:"Login Successful",success:true,token,name:user.name});

    }catch(err){
        res.status(500).send(err);
    }
}

module.exports = {
    signUp,
    login
}