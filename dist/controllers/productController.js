"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProduct = exports.getProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const validation_1 = __importDefault(require("../errors/validation"));
const product_1 = __importDefault(require("../models/product"));
async function getProducts(req, res) {
    try {
        const products = await product_1.default.find();
        res.send(products);
    }
    catch (e) {
        console.log(e);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: 'There was an error' });
    }
}
exports.getProducts = getProducts;
async function getProduct(req, res) {
    // console.log(req.params, 'req.params')
    try {
        const productId = req.params.productId;
        const product = await product_1.default.findById({ _id: productId });
        res.send(product);
    }
    catch (e) {
        console.log(e);
        res.send({ message: 'There was an error' });
    }
}
exports.getProduct = getProduct;
async function addProduct(req, res) {
    try {
        // console.log(req.currentUser.isSeller);
        if (!req.currentUser.isSeller) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        else {
            req.body.user = req.currentUser._id;
            console.log(req.body.user, 'req.body.user');
            console.log(req.currentUser, 'req.currentUser._id');
            const product = await product_1.default.create(req.body);
            res.send(product);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send({ errors: (0, validation_1.default)(e) });
    }
}
exports.addProduct = addProduct;
async function updateProduct(req, res) {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const productToUpdate = await product_1.default.findById(productId);
        // console.log(req.currentUser._id)
        if (!req.currentUser.isSeller) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        if (!req.currentUser._id) {
            return res.send({ message: 'not loged in' });
        }
        if (!productToUpdate) {
            return res.send({ message: 'product not found' });
        }
        // console.log(
        //   'user that created the product',
        //   productToUpdate.user._id,
        //   'user loged in',
        //   req.currentUser._id
        // )
        if (!productToUpdate.user.equals(req.currentUser._id)) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }
        const updatedProd = await product_1.default.findByIdAndUpdate(productId, body, {
            new: true
        });
        res.send(updatedProd);
    }
    catch (error) {
        console.log(error);
        res.send({ message: `${error}` });
    }
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
