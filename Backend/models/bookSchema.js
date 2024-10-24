import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    publicationYear: {
        type: Number,
        required: [true, "Publication Year is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
});

export const Book = mongoose.model("Book", bookSchema);
