const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const TaskModel = require('../Models/Tasks');
const UserModel = require('../Models/User');

const getTask = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            const { email, _id } = user;
            const allTask = await TaskModel.find({ userId: _id });
            res.status(200).send(allTask);
        } else
            return res.status(403).send({ message: 'Error in User authentication' })
    } catch (err) {
        console.log("GetTask :", err)
    }
}

const addTask = async (req, res) => {
    try {
        const user = req.user;
        //console.log(user);
        const {title, description ,status} = req.body;
        const userId = user._id;
        //console.log(typeof(userId));
        const result = await UserModel.findById(userId);
        if (result && result._id.equals(userId)) {
            let taskModel = null;
            if (description)
                taskModel = new TaskModel({ userId, title, description ,status})
            else
                taskModel = new TaskModel({ userId, title ,status})
            const addValue = await taskModel.save();
            //console.log(addValue)
            if (addValue){
                return res.status(200).send({addValue,message:'Task Added'});
            }else
                return res.status(403).send({ message: 'Error while adding task in db' });
        }else
            return res.status(403).send({message:'No user Found'});

    } catch (err) {
        console.log('Add task error', err)
    }
}


const deleteTask = async(req,res)=>{
    try{
        let result = await TaskModel.findById(req.params.id);//  req.params.id;
        //console.log(result)
        if(result){
            let deleteVal = await TaskModel.findByIdAndDelete(req.params.id);
            //console.log(deleteVal)
            if(deleteVal)
                return res.status(200).send({deleteVal,message:"Task deleted successfully"});
            else
                return res.status(401).send({message:"Unable to delete task"});
        }else
            return res.status(403).send({message:"Task not found"})
    }catch(err){
        console.log("Delete Task error",err);
    }
}

const updateTask = async(req,res) =>{
    try{
        let task = {}
        const {title,description,status} = req.body;
   
        if(title)
            task.title = title;
        if(description && description.trim().length>0)
            task.description = description; //if description is present then only update description
        else 
            task.$unset = {description : ""}; // if description is not given then remove description field
        
        task.status = status;
        let result = req.params.id;
        if(result){
            let updateVal = await TaskModel.findByIdAndUpdate(req.params.id,task,{new:true,runValidators:true});
            if(updateVal)
                return res.status(200).send({updateVal,message:"Task Status Updated"});
            else
                return res.status(401).send({message:'Unable to update task'})
        }else{
            return res.status(401).send({message:'Invalid Task Id'});
        }
    }catch(err){
        console.log("Update Task Error",err);
    }
}

const updateStatus = async(req,res)=>{
    try{
        let result = await TaskModel.findById(req.params.id);
        const {status} = req.body;
        let task ={}
        task.status = status;
        if(result){
            let updateStatusVal = await TaskModel.findByIdAndUpdate(req.params.id,task,{new:true,runValidators:true})
            if(updateStatusVal)
                return res.status(200).send({updateStatusVal,message:'Task Status Updated'})
            else
                return res.status(401).send({message:'Error while updating status'})
        }else
            return res.status(400).send({message:'Invalid param id'})
    }catch(err){
        console.log('Update Status error',err)
    }
}

module.exports = {
    getTask,
    addTask,
    deleteTask,
    updateTask,
    updateStatus
}