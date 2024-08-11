import Category from "../model/Category.js";


export const createCategory = async (req, res) => {
    try {
      const _category = req.body;
      const image = req.file.path;
      const existingCategory = await Category.findOne({ title:_category.title });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      const newCategory = await Category.create({ ..._category, image });
      return res.status(201).json({ category: newCategory, message: 'Category created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

// Controller function to get all categories
export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Controller function to update a category
export const updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const _category = req.body;
      const image = req.file?.path;
      const existingCategory = await Category.findOne({ title: _category.title });
      
      if (existingCategory && existingCategory._id.toString() !== id) {
        return res.status(400).json({ message: 'Category with the same title already exists' });
      }
      
      const updatedCategory = await Category.findByIdAndUpdate(id, { ..._category, image }, { new: true });
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      return res.status(200).json({ category: updatedCategory, message: 'Category updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  
  

// Controller function to delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedColor = await Category.findByIdAndDelete(id);

    if (!deletedColor) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
