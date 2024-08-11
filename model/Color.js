import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Silver', 'Gold', 'Rose Gold'],
    required: true,
  },
});

const Color = mongoose.model('Color', colorSchema);

export default Color;
