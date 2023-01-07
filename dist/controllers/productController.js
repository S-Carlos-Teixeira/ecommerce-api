"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProduct = exports.getProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const product_1 = __importDefault(require("../models/product"));
async function getProducts(req, res) {
    try {
        const products = await product_1.default.find();
        res.send(products);
    }
    catch (e) {
        console.log(e);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "There was an error" });
    }
}
exports.getProducts = getProducts;
async function getProduct(req, res) {
    console.log(req.params, 'req.params');
    try {
        const productId = req.params.productId;
        const product = await product_1.default.findById({ _id: productId });
        res.send(product);
    }
    catch (error) {
        console.log(error);
        res.send({ message: 'There was an error' });
    }
}
exports.getProduct = getProduct;
async function addProduct(req, res) {
    try {
        // console.log(req.currentUser.isSeller);
        if (!req.currentUser.isSeller) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        else {
            req.body.user = req.currentUser._id;
            console.log(req.body.user, "req.body.user");
            console.log(req.currentUser, "req.currentUser._id");
            const product = await product_1.default.create(req.body);
            res.send(product);
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: 'There was an error' });
    }
}
exports.addProduct = addProduct;
async function updateProduct(req, res) {
}
exports.updateProduct = updateProduct;
async function deleteProduct(req, res) {
    try {
        if (!req.currentUser.isSeller) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        else {
            const prodId = req.params.productId;
            console.log(prodId);
            await product_1.default.deleteOne({ _id: prodId });
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send(http_status_codes_1.ReasonPhrases.NO_CONTENT);
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: 'There was an error' });
    }
}
exports.deleteProduct = deleteProduct;
