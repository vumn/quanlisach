import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    slug: {
        type: String
    }

}, {timestamp: true})

const Category = mongoose.model("Category", categorySchema);

export default Category;