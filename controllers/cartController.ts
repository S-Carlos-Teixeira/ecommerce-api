import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Cart from '../models/cart'
import Product, { productSchema } from '../models/product'

export async function getCart(req: Request, res: Response) {
  const currentUser = req.currentUser._id

  if (!currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  }

  const cart = await Cart.find({ user: [currentUser] }).populate({path:'products.product'})
  console.log(cart);
  
  // const populatingCart = cart[0].products.map((prod)=>{
  //   return prod.populate('product')
  // })

  if (cart.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }

  res.send(cart)
}
export async function addProductsToCart(req: Request, res: Response) {
  try {
    // get current user
    const currentUser = req.currentUser._id

    // get product from param :productId on cart post route
    const productId = req.params.productId

    //check on db if the user has a cart linked to his acc.
    const hasCart = await Cart.find({ user: currentUser })
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
    console.log(hasCart[0],'log hasCart');
    // if no cart created create one
    if (!hasCart[0]) {
      
      
      const createCart = {
        user: currentUser,
        products: { product:productId }
      }
      const cart = await Cart.create(createCart)
      cart.populate('product')
      res.send(cart)
    } else {
      console.log('update Product');
      // if cart already exists update with new product
      updateProductsToCart(req, res)
    } 
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
export async function updateProductsToCart(req: Request, res: Response) {
  try {
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
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }

    // get cart on db
    const cartToUpdate = await Cart.find({ user: currentUser })
    // console.log(cartToUpdate);

    //loop through the cart and check if the cart already have a product
    const cartHasProduct = cartToUpdate[0].products.some(prod => {
      return String(prod.product?._id) === productId
    })

    if (cartHasProduct) {
      return res.send(cartToUpdate)
    }

    //create product to update cart
    const productToUpdate = { product:productId } as any
    cartToUpdate[0].products.push(productToUpdate)

    //save cart and return updated cart
    const savedCart = await cartToUpdate[0].save()
    res.send(savedCart)
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
export async function deleteCartProducts(req: Request, res: Response) {
  try {
    const currentUser = req.currentUser._id
    const productId = req.params.productId
    const product = await Product.findById(productId)

    if (!currentUser) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED)
    }

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }
    const cart = await Cart.find({ user: [currentUser] })
    // console.log(cart);

    if (cart.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }

    const cartHasProduct = cart[0].products.length > 0

    if (cartHasProduct) {
      const productIndex = cart[0].products.findIndex(prod => {
        return String(prod.product?._id) === productId
      })
      console.log(productIndex)
      if (productIndex === -1) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: ReasonPhrases.NOT_FOUND, cart })
      }

      const productToRemove = cart[0].products[productIndex] as any
      productToRemove.remove()
      const savedCart = await cart[0].save()
      res.send(cart)
    } else {
      await Cart.findOneAndDelete({ user: currentUser })
      return res.send({ message: 'deleted', cart })
    }
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}

export async function deleteCart(req: Request, res: Response) {
  try {
    const cartId = req.params.cartId
    await Cart.findByIdAndDelete(cartId)
    return res.send({ message: 'deleted' })
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
