const mongoose = require('mongoose')
const { taskDB } = require('./db')

const TaskSchema = new mongoose.Schema({
    userId:{
        type : String,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    status:{
        type : Boolean,
        required : true
    }
})

const TaskModel = taskDB.model('tasks',TaskSchema);

module.exports = TaskModel;