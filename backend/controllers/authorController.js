import Author from "../models/Author.js";

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({authors});
    }
    catch (error) {
        console.error("Lỗi ở getAllAuthors", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createAuthor = async (req, res) => {
    try {
        const {name, yob, yod, work} = req.body;
        const author = new Author({name, yob, yod, work});
    
        const newAuthor = await author.save()
        res.status(200).json({newAuthor});
    }
    catch (error) {
        console.error("Lỗi ở createAuthor", error);
        res.status(500).json({message: "Internal server error"});
    }
}