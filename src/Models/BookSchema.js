import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    summary: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
