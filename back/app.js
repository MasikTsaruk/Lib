const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const book = require('./routes/bookRoute')
const auth = require('./routes/userRoute')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');



mongoose.set("strictQuery", false);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(cors());


app.use('/', book)
app.use('/auth', auth)

async function start(){
    try {
        const url ='mongodb+srv://maximtsaruk1993:ZjbZz5I7rzR5PDUt@portcluster.wrzerpo.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(url, {useNewUrlParser: true})
        app.listen(8000)
    }catch (err){
        console.log(err)
    }
}

start()

