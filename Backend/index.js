// Importing necessary modules and components
import express from "express"; // Express framework for building the server
import connection from "./database/connection.js"; // MongoDB connection function
import cors from "cors"; // CORS middleware to allow cross-origin requests
import { bookRoutes } from "./routes/books.js"; // Book-related API routes

// Define the server's port
const PORT = 5000;

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS to allow cross-origin requests (e.g., from frontend apps)
app.use(cors());

// Establish the connection to MongoDB
await connection(); // Ensures database is connected before the server starts

// Register routes for book-related operations under the "/api/books" endpoint
app.use("/api/books", bookRoutes);

/**
 * Start the server and listen on the specified port.
 * Logs the URL where the server is running for easy access.
 */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
