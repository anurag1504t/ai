const express=require('express');
const {mongourl} = require("./config")
app=express();
const mongoose=require("mongoose")
const port= process.env.PORT || 5000
var cors = require('cors')
app.use(cors())

const connect = mongoose.connect(mongourl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

connect.then((db) => {
    console.log("Connected correctly to Database Server");
}, (err) => { console.log(err); });

const student=require('./models/student')
const college=require('./models/college')
app.use(express.json())
app.use('/api',require('./routes/college'))
app.use('/api',require('./routes/student'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(port,()=>{
    console.log("server is running");
})