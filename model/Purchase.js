import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item",required:true },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['processing', 'dispatched', 'delivered', 'returned', 'canceled', 'deleted'],
        default: 'processing'
    }
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
