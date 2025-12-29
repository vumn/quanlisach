import express from 'express'

import {getAllBooks, getBookById, createBook, updateBook, deleteBook} from '../controllers/bookController.js'
import upload from '../middleware/uploadMiddleware.js';

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post("/", upload.array('images', 2), createBook);

bookRouter.put("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);

export default bookRouter;