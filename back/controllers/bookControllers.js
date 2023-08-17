const asyncHandler = require('express-async-handler')
const Book = require('../models/Book')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.getBooks = asyncHandler(async (req, res) => {
    try {
        let query = Book.find()

        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.limit) || 6
        const skip = (page - 1) * pageSize;
        const total = await Book.countDocuments()

        const pages = Math.ceil(total/ pageSize);

        query = query.skip(skip).limit(pageSize)

        if (page > pages){
            return res.status(404).json({
                status: 'fail',
                message: 'No page found'
            })
        }

        const result = await query

        res.status(200).json({
            status: 'success',
            count: result.length,
            page,
            pages,
            data: result
        })
    } catch (err){
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        })
    }
})

exports.getBookById = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        res.send(book)
    }catch(err){
        res.status(404).json({status: 'fail', msg: 'book was not found'})
    }
})

exports.addToFav = asyncHandler( async (req, res) => {
    try {
        const id = req.params.bookId
        const book = await Book.findById(id)
        const {token} = req.cookies
        const {id: userId} = jwt.verify(token, 'secret_key')
        const finded = await User.findById(userId)
        if(finded.fav.includes(id)){
            return res.status(400).json({
                msg: "Book is already in favorite!"
            })
        }else {
            finded.fav.push(book)
            finded.save()
            return res.send(`Book was added to ${finded.name}'s fav`)
        }
    } catch (err){
        console.error(err)
    }
})

exports.getFav = asyncHandler(async (req, res) => {
    try {
        const id = req.params.userId
        const user = await User.findById(id)
        const fav = user.fav
        res.send(fav)
    }catch (err){
        console.error(err)
    }
})
