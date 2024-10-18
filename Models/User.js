const mongoose = require('mongoose');
const { authDB } = require('./db');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
//name of schema and schemamodel
const UserModel = authDB.model('users',UserSchema);
//const UserModel = mongoose.model('users',UserSchema);

module.exports = UserModel;