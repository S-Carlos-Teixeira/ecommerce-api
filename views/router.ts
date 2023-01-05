import express, { Request, Response } from 'express'

import secureRoute from '../middleware/secureRoute'
import {signup, login, sellerSignup, getCurrentUser} from '../controllers/userController'
import {getProducts, getProduct, updateProduct, deleteProduct, addProduct} from '../controllers/productController'
import {addComment, getComment, updateComment, deleteComment} from '../controllers/commentsController'
import {addCart, getCart, updateCart, deleteCart} from '../controllers/cartController'
import {getOrder} from '../controllers/orderController'

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
router.route('/product/:productId/comment')
  .post(secureRoute, addComment)
  .get(getComment)
router.route('product/:productId/comment/:commentId')
  .put(secureRoute, updateComment)
  .delete(secureRoute, deleteComment)

//cart endpoints
router.route('product/:productId/user/:userId').post(secureRoute, addCart)

router.route('cart/:cartId/user/:userId')
  .get(secureRoute, getCart)

router.route('cart/:cartId/product/:productID/user/:userId')
  .put(secureRoute, updateCart)
  .delete(secureRoute, deleteCart)

// order endpoints

router.route('order/:orderId').get(secureRoute, getOrder)

export default router
