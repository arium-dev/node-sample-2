import mongoose from 'mongoose';

const safePaySchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item",required:true },
    currency: {
        type: String,
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SafePay = mongoose.model('SafePay', safePaySchema);

export default SafePay;
