import mongoose, {Schema, SchemaTypes} from "mongoose";

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
}, {timestamps: true})

const Book = mongoose.model("Book", BookSchema);

export default Book;