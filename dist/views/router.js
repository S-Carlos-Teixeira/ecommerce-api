"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const commentsController_1 = require("../controllers/commentsController");
const orderController_1 = require("../controllers/orderController");
const productController_1 = require("../controllers/productController");
const userController_1 = require("../controllers/userController");
const secureRoute_1 = __importDefault(require("../middleware/secureRoute"));
const router = express_1.default.Router();
router.route('/test').get((req, res) => {
    res.send('Test successfull');
    console.log('Test successfull');
});
//user endpoints
router.route('/signup').post(userController_1.signup);
router.route('/login').post(userController_1.login);
router.route('/seller/signup').post(userController_1.sellerSignup);
router.route('/user').get(secureRoute_1.default, userController_1.getCurrentUser);
// product endpoints
router.route('/products').get(productController_1.getProducts);
router
    .route('/product/:productId')
    .get(productController_1.getProduct)
    .put(secureRoute_1.default, productController_1.updateProduct)
    .delete(secureRoute_1.default, productController_1.deleteProduct);
router.route('/addproduct').post(secureRoute_1.default, productController_1.addProduct);
//comments endpoints
router.route('/product/:productId/comment').post(secureRoute_1.default, commentsController_1.addComment);
router
    .route('/product/:productId/comment/:commentId')
    .put(secureRoute_1.default, commentsController_1.updateComment)
    .delete(secureRoute_1.default, commentsController_1.deleteComment);
//cart endpoints
router.route('/product/:productId/cart').post(secureRoute_1.default, cartController_1.addCart);
router.route('/user/:userId/cart')
    .get(secureRoute_1.default, cartController_1.getCart)
    .delete(secureRoute_1.default, cartController_1.deleteCart);
router
    .route('/product/:productID/user/:userId/cart')
    .put(secureRoute_1.default, cartController_1.updateCart);
// order endpoints
router.route('/order/:orderId').get(secureRoute_1.default, orderController_1.getOrder);
exports.default = router;
