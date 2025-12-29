import Book from "../models/Book.js";
import {v2 as cloudinary} from 'cloudinary'

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createAt: -1});
        res.status(200).json(books) 
    }
    catch (error) {
        console.error("Lỗi ở getAllBooks", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({message: "Không tìm thấy sách"});
        res.status(200).json({book})
    }
    catch (error) {
        console.error("Lỗi ở getBookById", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const createBook = async (req, res) => {
    try {
        const {name, author, publisher, publishedYear, category, quantity} = req.body;
        // upload images to cloudinary
        const uploadImages = req.files.map(async (file)=>{
            const response= await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })
        
        // Wait for all uploads to complete

        const images = await Promise.all(uploadImages);
        
        const book = new Book({name, author, publisher, publishedYear, category, quantity, images});
    
        const newBook = await book.save();
        res.status(200).json(newBook);
    }
    catch (error) {
        console.error("Lỗi ở createBook", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateBook = async (req, res) => {
    try {
        const {name, author, publisher, publishedYear, category, quantity} = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {name, author, publisher, publishedYear, category, quantityS}, {new: true})
        if (!updatedBook) return res.status(404).json({message: "Không tìm thấy sách"});
        res.status(200).json(updatedBook);

    }
    catch (error) {
        console.error("Lỗi ở updateBook", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({message: "Không tìm thấy sách"})
        res.status(200).json({message: "Xóa thành công"});
    }
    catch (error) {
        console.error("Lỗi ở deleteBook", error);
        res.status(500).json({message: "Internal server error"});
    }
}