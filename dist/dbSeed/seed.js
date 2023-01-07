"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("../models/users"));
const product_1 = __importDefault(require("../models/product"));
const environments_1 = require("../config/environments");
function getProductsData(user) {
    return [
        { name: '5600', price: 140, quantity: 1, category: 'CPU', user, reviews: [{ content: 'good performance', user }] },
        { name: '5600X', price: 170, quantity: 1, category: 'CPU', user },
        { name: 'RTX 3060', price: 380, quantity: 1, category: 'GPU', user },
        { name: 'RTX 3070', price: 560, quantity: 1, category: 'GPU', user }
    ];
}
const userData = {
    username: "carlos",
    email: "eu@eu.com",
    password: "1q2w3e4r5t6Y.",
    mobile: "07767668964",
    isSeller: true,
};
async function seed() {
    await mongoose_1.default.connect(environments_1.MONGODB_URI);
    console.log('connected');
    // await mongoose.connection.db.dropDatabase()
    const user = await users_1.default.create(userData);
    console.log(user);
    const productData = getProductsData(user._id);
    const products = await product_1.default.create(productData);
    console.log(products);
    await mongoose_1.default.disconnect();
    console.log('disconnected');
}
seed();
