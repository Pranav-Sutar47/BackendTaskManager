const joi = require('joi');
const jwt = require('jsonwebtoken')

const objectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/).message("Invalid ObjectId");

const signUpValidation = (req,res,next) =>{
    const schema = joi.object({
        name : joi.string().min(3).max(50).required(),
        password : joi.string().min(4).max(10).required(),
        email : joi.string().email().required()
    })     
    console.log(req.body);
    const {error} = schema.validate(req.body);
    if(error)
        return res.status(400).json(error);
    next();
}

const loginValidation = (req,res,next) =>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(4).max(10).required()
    })

    const {error} = schema.validate(req.body);

    if(error)
        return res.status(400).json(error)
    next();
}

const userValidation = (req,res,next) =>{
    try{
        const token = req.headers['authorization']?.split(' ')[1];

        if(!token)
            return res.status(403).send({message:'Token Required'});
    
        jwt.verify(token,process.env.JWTSECRET,(err,decoded)=>{
            if(err)
                return res.status(401).send({message:'Invalid Token'})
            else{
                req.user = decoded; // adding user info into request
                next(); // when token is valid transfer control to taskController
            }  
        })

    }catch(err){
        console.log("User Validation",err);
    }
}

const taskValidation = (req,res,next) =>{
    try{
        const schema = joi.object({
            title : joi.string().min(3).required(),
            description : joi.string(),
            status : joi.boolean().required()
        })
        const {error} = schema.validate(req.body);
        if(error)
            return res.status(400).send({message:error});
        next();
    }catch(err){
        console.log('Task Validation',err)
    }
}

const updateTaskValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            title: joi.string().min(3).required(),
            description:joi.string()
        })

        const {error} = schema.validate(req.body);
        if(error)
            return res.status(400).send({message : "Validation Error at UpdateTaskValidation",error})
        next();
    }catch(err){
        console.log("Update task validation",err);
    }
}

const addTaskValidation = (req,res,next)=>{
    try{
        //let id = req.params.id;

        const schema = joi.object({
            title : joi.string().min(3).required(),
            description : joi.string(),
            status : joi.boolean().required() 
        })
    
        const {error} = schema.validate({...req.body});
    
        if(error)
            return res.status(400).send({message : "Validation Error at AddTaskValidation",error})
        next();
    }catch(err){
        console.log("AddTaskValidation error",err)
    }
}

const updateStatusValidation = (req,res,next) =>{
    try{
        let result = req.params.id;
        //console.log(result)
        const schema = joi.object({
            status : joi.boolean().required(),
            result : objectIdSchema.required()
        });
        let {error} = schema.validate({...req.body,result});

        if(!error)
            next()
        else
            return res.status(400).send({message:'Provide param parameter or Invalid body parameter',error});
    }catch(err){
        console.log('UpdateStatusValidation',err)
    }
}

module.exports = {
    signUpValidation,
    loginValidation,
    userValidation,
    taskValidation,
    addTaskValidation,
    updateStatusValidation,
    updateTaskValidation
}