var express = require('express');
var cors=require('cors');
var mongoose=require('mongoose');
var bodyPerser=require('body-parser');
var bcrypt= require('bcrypt');

var app=express();
var port=process.env.PORT || 3000
app.use(bodyPerser.json());
app.use(cors());
app.use(bodyPerser.urlencoded({extended:false}));
const mongoURI='mongodb://localhost:27017/meanLoginReg';
mongoose
.connect(mongoURI,{useNewUrlParser:true})
.then(()=>console.log('Mongodb Connected'))
.catch(err=>console.log(err))

var Users= require('./routes/Users');
app.use('/users', Users);
app.listen(port,function(){
    console.log('server is running at port 3000')
})