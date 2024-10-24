import express from "express";
import connection from "./database/connection.js";
import cors from "cors";
import { Book } from "./models/bookSchema.js";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
await connection();


// to do - using router
app.get("/api/books", async (_, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
