import Category from "../models/Category.js";
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({categories});
    }
    catch (error) {
        console.error("Lỗi ở getAllCategories", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createCategory = async (req, res) => {
    try {
        const {name, description, slug} = req.body;
        const category = new Category({name, description, slug});
    
        const newCategory = await category.save()
        res.status(200).json({newCategory});
    }
    catch (error) {
        console.error("Lỗi ở createCategory", error);
        res.status(500).json({message: "Internal server error"});
    }
}