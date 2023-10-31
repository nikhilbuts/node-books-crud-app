import { BookModel } from "../Models";

const BookController = {
  async doAddBookRecord(req, res, next) {
    const { title, author, summary } = req.body;
    if (!title || !author || !summary) {
      return res
        .status(400)
        .json({ error: "Title, author, and summary are required" });
    }

    try {
      const book = new BookModel({ title, author, summary });
      await book.save();

      // Exclude the __v field from the response
      res.status(201).json(book.toObject({ versionKey: false }));
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the book" });
    }
  },
  async getBookList(req, res, next) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.q || "";

    try {
      const skip = (page - 1) * limit;

      const searchCriteria = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { author: { $regex: searchQuery, $options: "i" } },
          { summary: { $regex: searchQuery, $options: "i" } },
        ],
      };

      const books = await BookModel.find(
        searchCriteria,
        { isDeleted: false },
        "-__v"
      )
        .skip(skip)
        .limit(limit);

      const totalBooks = await BookModel.countDocuments(searchCriteria);

      const hasNextPage = page * limit < totalBooks;
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
      res.status(500).json({ error: "An error occurred while listing books" });
    }
  },
  async dogetBook(req, res, next) {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    try {
      const book = await BookModel.findById(bookId);

      if (book) {
        // Exclude the __v field from the response
        res.status(200).json(book.toObject({ versionKey: false }));
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the book" });
    }
  },
  async doEditBookDetails(req, res, next) {
    const bookId = req.params.id;

    try {
      const updatedBook = await BookModel.findByIdAndUpdate(bookId, req.body, {
        new: true,
      });

      if (updatedBook) {
        // Exclude the __v field from the response
        res.status(200).json(updatedBook.toObject({ versionKey: false }));
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the book" });
    }
  },
  async doRemoveBook(req, res, next) {
    const bookId = req.params.id;

    try {
      const deletedBook = await BookModel.findByIdAndRemove(bookId);

      if (deletedBook) {
        res.status(204).json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the book" });
    }
  },
  async doSoftDelete(req, res, next) {
    const bookId = req.params.id;
    const bookRecord = await BookModel.findById({ _id: bookId });
    try {
      // const updatedBook = await BookModel.findByIdAndUpdate(bookId, {isDeleted:}, {
      //   new: true,
      // });

      bookRecord = bookRecord.isDeleted == true ? false : true;
      await bookRecord.save();
      if (updatedBook) {
        // Exclude the __v field from the response
        res.status(200).json(bookRecord.toObject({ versionKey: false }));
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the book" });
    }
  },
};

export default BookController;
