"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const addressSchema = new mongoose_1.default.Schema({
    countryRegion: {
        type: String,
        required: [true, 'Country/ region is required']
    },
    fullName: { type: String, required: [true, 'Full name is required'] },
    phoneNumber: { type: String, required: [true, 'Phone is required'] },
    postcode: {
        type: String,
        required: [true, 'Post code is required'],
        validate: {
            message: 'Please enter a valid post code.',
            validator: (postcode) => validator_1.default.isPostalCode(postcode, 'any')
        }
    },
    addressLine1: { type: String, required: [true, 'Address is required'] },
    addressLine2: { type: String },
    townCity: { type: String, required: [true, 'Town / City is required'] },
    county: { type: String },
    deliveryInstructions: { type: String },
    isDefault: { type: Boolean },
    isBillingAddress: { type: Boolean },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.default = mongoose_1.default.model('Address', addressSchema);
