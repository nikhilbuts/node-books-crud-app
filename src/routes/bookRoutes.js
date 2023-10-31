const express = require('express');
const { requireAuth } = require('../middlewares/authMiddleware.js');
const {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController.js');

const router = express.Router();

router.get('/books', listBooks);
router.get('/books/:id', getBook);
router.post('/books',  createBook);
router.put('/books/:id',  updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;
