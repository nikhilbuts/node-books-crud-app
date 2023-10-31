const Book = require('../models/Book');

// List all books
exports.listBooks = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const searchQuery = req.query.q || '';

  try {
    const skip = (page - 1) * limit;

    const searchCriteria = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { author: { $regex: searchQuery, $options: 'i' } },
        { summary: { $regex: searchQuery, $options: 'i' } },
      ],
    };

    const books = await Book.find(searchCriteria)
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments(searchCriteria);

    const hasNextPage = (page * limit) < totalBooks;
    const hasPreviousPage = page > 1;

    res.status(200).json({
      books,
      pagination: {
        hasNextPage,
        hasPreviousPage,
        nextPage: hasNextPage ? page + 1 : null,
        previousPage: hasPreviousPage ? page - 1 : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while listing books' });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, summary } = req.body;
  if (!title || !author || !summary) {
    return res.status(400).json({ error: 'Title, author, and summary are required' });
  }

  try {
    const book = new Book({ title, author, summary });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating the book' });
  }
};

// Get details of a specific book by its ID
exports.getBook = async (req, res) => {
  const bookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  try {
    const book = await Book.findById(bookId);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while retrieving the book' });
  }
};

// Update a book's details
exports.updateBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the book' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (deletedBook) {
      res.status(204).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting the book' });
  }
};
