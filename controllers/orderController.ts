import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Cart from "../models/cart"
import Order from "../models/order"
import Product from '../models/product'

export async function getOrder(req: Request, res: Response){
  const currentUser = req.currentUser._id

  if (!currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  }

  const order = await Order.find({user: [currentUser] }).populate('user').populate({path:'cart', populate:{path: 'products.product', model:'Product'}})
  
  // console.log(order);
  

  if (!order.length) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }

  res.send(order)
}
export async function addOrder(req: Request, res: Response){
  try {
    const cartId = req.params.cartId
    const body = req.body.amount
    const userId = req.currentUser._id
    
    const cart = await Cart.findById(cartId)

    
    
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }

    if (!body || !cart) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }

    if(cart.isCheckedOut){
      const order = Order.find({cart:cartId})
      res.send(order)
    }

    if (!cart.isCheckedOut && cart?.products.length > 0) {
    const createOrder = {user:userId, cart:cartId, amount:body}
    // console.log(createOrder, 'createOrder');
    const order = await Order.create(createOrder)
    const updateCart = await Cart.findByIdAndUpdate(cartId,{isCheckedOut:true})
    // console.log(order);
    res.send(order)}
    
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }

}