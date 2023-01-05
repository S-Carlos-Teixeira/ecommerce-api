"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cardSchema = new mongoose_1.default.Schema({
    cardNumber: { type: Number, required: [true, 'Enter a valid card number'] },
    nameOnCard: { type: String, required: [true, 'Enter a valid name'] },
    expDate: {
        month: { type: String, required: [true, 'Enter a valid month'] },
        year: { type: String, required: [true, 'Enter a valid year'] }
    },
    flag: { type: String },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Card', cardSchema);
