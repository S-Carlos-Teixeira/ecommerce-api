import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Cart from '../models/cart'
import Product from '../models/product'

export async function getCart(req: Request, res: Response) {

  const currentUser = req.currentUser._id

  if(!currentUser){
    return res
    .status(StatusCodes.UNAUTHORIZED)
    .send(ReasonPhrases.UNAUTHORIZED)
  }

  const cart = await Cart.find({user:[currentUser]})

  if(!cart){
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }

  res.send(cart)

}
export async function addCart(req: Request, res: Response) {
  try {
    // get current user
    const currentUser = req.currentUser._id

    // get product from param :productId on cart post route
    const productId = req.params.productId
    
    //check on db if the user has a cart linked to his acc.
    const hasCart = await Cart.find({user:currentUser})
    // console.log(hasCart);
    
    //check if user is logged in
    if (!currentUser) {
      return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED)
    }
    
    //check on db if product exists
    const product = await Product.findById(productId)

    //if product dont exists return not found
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }

    // if no cart created create one
    if (hasCart.length === 0) {
      const createCart = {
        user:[currentUser],
        products:{product:[product]}
      }
      const cart = await Cart.create(createCart)
      res.send(cart)
    } else {updateCart(req, res)} // if cart already exists update with new product

  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
export async function updateCart(req: Request, res: Response) {

  //get current user id
  const currentUser = req.currentUser._id

  // get product id
  const productId = req.params.productId

  //check on db if product exists
  const product = await Product.findById(productId)
  // console.log(product);
  

  // if user not logged in return unauthorized
  if (!currentUser) {
    return res
    .status(StatusCodes.UNAUTHORIZED)
    .send(ReasonPhrases.UNAUTHORIZED)
  }

  // if db has no product return product not found
  if(!product){
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }
  
  // get cart on db
  const cartToUpdate = await Cart.find({user:currentUser})
  // console.log(cartToUpdate);

  //loop through the cart and check if the cart already have a product
  const cartHasProduct = cartToUpdate[0].products.some((prod)=>{
    const product = String(prod.product[0]._id)
    const productIdString = String(productId)
      return product === productIdString 
  })

  if(cartHasProduct){
    return res.send(cartToUpdate)
  }

    //create product to update cart
    const productToUpdate = {product:[product]} as any
  cartToUpdate[0].products.push(productToUpdate)
  const savedCart = await cartToUpdate[0].save()
  res.send(savedCart)
  
}
export async function deleteCart(req: Request, res: Response) {

}


