const express = require('express')

const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

const bodyParser = require('body-parser');

const cors = require('cors')

// Middle Ware
app.use(bodyParser.json())

app.use(cors())

// connnect db
require('./Models/db') 

app.use('/auth',require('./Routes/Auth'));

app.use('/tasks',require('./Routes/Task'));

app.listen(PORT,()=>{
    console.log('Server started');
})

