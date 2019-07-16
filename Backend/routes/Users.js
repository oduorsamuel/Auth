const express=require('express');
const cors= require('cors');
const jwt= require('jsonwebtoken');
const users=express.Router();
const bcrypt= require('bcrypt');

const Data=require('../models/User');

users.use(cors());

process.env.SECRET_KEY='secret';

users.post('/register', (req, res)=>{
    const today= new Date();
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        created:today,
    }
    Data.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash
                User.create(userData)
                .then(user=>{
                    res.json({status:user.email + '  Registered successfully'})
                    })
                    .catch(err=>{
                        res.send('error' + err)
                })

            })
        }else{
            res.json({error:'User with the same email already exist'})
        }
    })
    .catch(err=>{
        res.send('error:' + err)
    })
})

users.post('/login', (req, res)=>{
    Data.findOne({
        email:req.body.email,
    })
    .then(user=>{
        if(user){
          if(bcrypt.compareSync(req.body.password, user.password)){
           const payload={
               _id:user._id,
               first_name:user.first_name,
               last_name:user.last_name,
               email:user.email,
               password:user.password

           }
           let token= jwt.sign(payload, process.env.SECRET_KEY,{
               expiresIn: 1440,
           })
           res.json({token:token})
          }
          else{
              res.json({error:'User does not exist'})
          }
        }
        else{
            res.json({error:'User does not exist'})
        }
    })
    .catch(err=>{
        res.send('err' + err)
    })
})

users.get('/profile',(req, res)=>{
    var decoded= jwt.verify(req.header['authorization'],process.env.SECRET_KEY)
    User.findOne(
        {
            _id:decoded._id
        })
        .then(user=>{
            if(user){
                res.json(user)
            }
            else{
                res.send('User does not exist')
            }
        })
        .catch(err=>{
            res.send('error' + err)
        })
})
module.exports=users