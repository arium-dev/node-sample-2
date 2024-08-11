import Color from '../model/Color.js';

export const createColor = async (req, res) => {
  try {
    const { name } = req.body;
    const existingColor = await Color.findOne({ name });
    if (existingColor) {
      return res.status(400).json({ message: 'Color already exists' });
    }
    const newColor = await Color.create({ name });

    return res.status(201).json({ color: newColor, message: 'Color created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get all colors
export const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find();
    return res.status(200).json(colors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getColorByName = async (req, res) => {
  try {
    const { name } = req.params;
    const color = await Color.findOne({ name });
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    return res.status(200).json(color);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a color
export const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedColor = await Color.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedColor) {
      return res.status(404).json({ message: 'Color not found' });
    }

    return res.status(200).json({ color: updatedColor, message: 'Color updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a color
export const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedColor = await Color.findByIdAndDelete(id);

    if (!deletedColor) {
      return res.status(404).json({ message: 'Color not found' });
    }

    return res.status(200).json({ message: 'Color deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
