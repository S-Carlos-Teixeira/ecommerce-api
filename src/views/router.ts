import express, { Request, Response } from 'express'

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
  .route('product/:productId/comment/:commentId')
  .put(secureRoute, updateComment)
  .delete(secureRoute, deleteComment)

//cart endpoints

router
  .route('cart/:cartId/user/:userId')
  .get(secureRoute, getCart)
  .post(secureRoute, addItemToCart)
  .put(secureRoute, updateCart)
  .delete(secureRoute, deleteCart)

// order endpoints

router.route('order/')

export default router
