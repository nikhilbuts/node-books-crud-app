import express from "express";
import { BookController } from "../Controllers";
import isUserAuthenticated from "../Middleware/isAuthenticated";
const router = express.Router();

router.get("/books", BookController.getBookList);
router.get("/books/:id", BookController.dogetBook);

/* 
Protected Routes 
*/
router.post("/books", isUserAuthenticated, BookController.doAddBookRecord);
router.put("/books/:id", isUserAuthenticated, BookController.doEditBookDetails);
router.delete("/books/:id", isUserAuthenticated, BookController.doRemoveBook);

export default router;
