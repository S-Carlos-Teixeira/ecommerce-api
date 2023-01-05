"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    cart: { type: mongoose_1.default.Types.ObjectId, ref: 'Cart', required: true },
    amount: { type: Number, required: true },
    // address: { type: mongoose.Types.ObjectId, ref: 'Address', required: true },
    status: { type: String, default: 'pending' }
}, { timestamps: true });
module.exports = mongoose_1.default.model('Order', orderSchema);
