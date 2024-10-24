// Import the Express framework to create routes
import express from "express";

// Import the Book model to interact with the MongoDB collection
import { Book } from "../models/bookSchema.js";

// Create a new router instance for book-related routes
const router = express.Router();

/**
 * CREATE: Add a new book to the collection
 * - Route: POST /api/books
 * - Request Body: JSON containing book details (title, author, etc.)
 * - Response: The saved book or an error message
 */
router.post("/", async (req, res) => {
    const { title, author, publicationYear, category, price, rating } =
        req.body;

    // Manual validation of request body
    if (!title || typeof title !== "string") {
        return res
            .status(400)
            .json({ message: "Title is required and must be a string" });
    }
    if (!author || typeof author !== "string") {
        return res
            .status(400)
            .json({ message: "Author is required and must be a string" });
    }
    if (!publicationYear || typeof publicationYear !== "number") {
        return res.status(400).json({
            message: "Publication Year is required and must be a number",
        });
    }
    if (!category || typeof category !== "string") {
        return res
            .status(400)
            .json({ message: "Category is required and must be a string" });
    }
    if (!price || typeof price !== "number" || price <= 0) {
        return res.status(400).json({
            message: "Price is required and cannot be zero or  negative",
        });
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
        return res
            .status(400)
            .json({ message: "Rating is required, must be between 1 and 5" });
    }

    try {
        const savedBook = await Book.create(req.body); // Create and save book
        res.status(201).json(savedBook); // Send the saved book as a response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

/**
 * READ: Get all books from the collection
 * - Route: GET /api/books
 * - Response: An array of all books or an error message
 */
router.get("/", async (_, res) => {
    try {
        const books = await Book.find({}); // Fetch all books
        res.status(200).json(books); // Send books as JSON response
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books", // Handle server errors
            error: error.message,
        });
    }
});

/**
 * READ: Get a single book by ID
 * - Route: GET /api/books/:id
 * - Response: The requested book or a 404 error if not found
 */
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Find book by ID
        if (!book) {
            return res.status(404).json({ message: "Book not found" }); // If not found, respond with 404
        }
        res.status(200).json(book); // Send the found book as JSON
    } catch (error) {
        res.status(500).json({
            message: "Error fetching book", // Handle server errors
            error: error.message,
        });
    }
});

/**
 * UPDATE: Update a book by ID
 * - Route: PUT /api/books/:id
 * - Request Body: JSON containing the updated fields
 * - Response: The updated book or a 404 error if not found
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, // Book ID from the route parameters
            req.body, // Fields to update
            { new: true, runValidators: true } // Return the updated document and run validations
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" }); // If not found, respond with 404
        }
        res.status(200).json(updatedBook); // Send the updated book as JSON
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

/**
 * DELETE: Remove a book by ID
 * - Route: DELETE /api/books/:id
 * - Response: A success message or a 404 error if not found
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id); // Find and delete book by ID
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" }); // If not found, respond with 404
        }
        res.status(200).json({ message: "Book deleted successfully" }); // Send success message
    } catch (error) {
        res.status(500).json({
            message: "Error deleting book", // Handle server errors
            error: error.message,
        });
    }
});

// Export the router to be used in the main server file
export { router as bookRoutes };
