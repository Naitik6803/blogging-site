// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv= require('dotenv');

const app = express();
app.use(express.json());
dotenv.config({path:'../config.env'});

const port=process.env.PORT;
// connect db
require('./db');
//

// auth page
app.use(require('./auth'));
//

// posts
app.use(require('./Posts'));
//


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
