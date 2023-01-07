import express, { Request, Response } from 'express'

import {
  addCart,
  deleteCart,
  getCart,
  updateCart
} from '../controllers/cartController'
import {
  addComment,
  deleteComment,
  updateComment
} from '../controllers/commentsController'
import { getOrder } from '../controllers/orderController'
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from '../controllers/productController'
import {
  getCurrentUser,
  login,
  sellerSignup,
  signup
} from '../controllers/userController'
import secureRoute from '../middleware/secureRoute'

const router = express.Router()

router.route('/test').get((req: Request, res: Response) => {
  res.send('Test successfull')
  console.log('Test successfull')
})

//user endpoints

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/seller/signup').post(sellerSignup)
router.route('/user').get(secureRoute, getCurrentUser)

// product endpoints
router.route('/products').get(getProducts)
router
  .route('/product/:productId')
  .get(getProduct)
  .put(secureRoute, updateProduct)
  .delete(secureRoute, deleteProduct)
router.route('/addproduct').post(secureRoute, addProduct)

//comments endpoints
router.route('/product/:productId/comment').post(secureRoute, addComment)

router
  .route('/product/:productId/comment/:commentId')
  .put(secureRoute, updateComment)
  .delete(secureRoute, deleteComment)

//cart endpoints
router.route('/product/:productId/cart').post(secureRoute, addCart)

router.route('/user/:userId/cart').get(secureRoute, getCart)

router
  .route('/cart/:cartId/product/:productID/user/:userId')
  .put(secureRoute, updateCart)
  .delete(secureRoute, deleteCart)

// order endpoints

router.route('/order/:orderId').get(secureRoute, getOrder)

export default router
