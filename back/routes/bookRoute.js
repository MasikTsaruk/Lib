const express = require("express");
const router = express.Router();
const bookController = require('../controllers/bookControllers')


router.get('/getBooks', bookController.getBooks)
router.get('/getBook/:id', bookController.getBookById)
router.post('/addToFav/:bookId', bookController.addToFav)
router.get('/getFav/:userId', bookController.getFav)

module.exports = router;