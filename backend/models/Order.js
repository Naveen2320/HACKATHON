const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        menu_item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    delivery_address: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'preparing', 'out_for_delivery', 'delivered'] },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
