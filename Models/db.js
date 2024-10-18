const mongoose = require('mongoose')

const DBURL = process.env.DB_URL;

const authDB = mongoose.createConnection(DBURL)

authDB.on('connected',()=>{
    console.log('Auth db connected')
})

authDB.on('error',(err)=>{
    console.log('TaskDB error:',err)
})

const DBURL2 = process.env.DB_URL2;

const taskDB = mongoose.createConnection(DBURL2)

taskDB.on('connected',()=>{
    console.log('TaskDB connnected')
})

taskDB.on('error',(err)=>{
    console.log("TaskDB error:",err)
})


module.exports={
    authDB,
    taskDB
}