import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    yob: { // year of birth
        type: Number,
        required: true
    },
    yod: { // year of death
        type: Number
    },
    work: {
        type: Array,
        required: true
    }

}, {timestamps: true})

const Author = mongoose.model("Author", authorSchema);

export default Author;