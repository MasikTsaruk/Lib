const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.logIn = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({
            email
        })
        if (!user){
            console.log("User was not found(")
            return res.status(400).send({message : "No!"})
        }
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass){
            return res.status(401).send({message : "Invalid Password!"})
        }
        const token = jwt.sign({ id: user._id, email, name: user.name }, 'secret_key', {
            expiresIn: 60*60
        })
        res.cookie('token', token)
        return res.json({status: 'ok', user: token})

    }catch (err){
        console.error(err)
    }
})

exports.register = asyncHandler(async  (req, res) => {
    const {email, password, name} = req.body
    const user = await User.findOne({name})
    if(user){
        return res.status(400).json({
            msg: "User with this email is signed up!"
        })
    }
    await User.create({
        name,
        email,
        password : await bcrypt.hash(password, 8)
    })
    res.send("User was created!")
})
