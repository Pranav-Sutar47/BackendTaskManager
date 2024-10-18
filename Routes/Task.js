const express = require('express');
const { getTask, addTask, deleteTask, updateTask, updateStatus } = require('../Controllers/TaskController');
const { userValidation, addTaskValidation, updateStatusValidation, updateTaskValidation } = require('../MiddleWares/Validation');

const router = express.Router();

router.get('/alltask',userValidation,getTask);

//Route add Task
router.post('/addtask',userValidation,addTaskValidation,addTask);

router.delete('/deletetask/:id',userValidation,deleteTask);
//Route upate task
router.put('/updatetask/:id',userValidation,updateTaskValidation,updateTask);
//Route Update status of task
router.put('/updatestatus/:id',userValidation,updateStatusValidation,updateStatus);

module.exports = router;
