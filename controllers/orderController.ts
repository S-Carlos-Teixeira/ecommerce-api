import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Cart from "../models/cart"
import Order from "../models/order"

export async function getOrder(req: Request, res: Response){
  const currentUser = req.currentUser._id

  if (!currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  }

  const order = await Order.find({user: [currentUser] }).populate('cart').populate('user')
  console.log(order);
  

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
    
    const cart = Cart.findById(cartId)

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }

    if (!body || !cart) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
    }

    const createOrder = {user:userId, cart:cartId, amount:body}
    console.log(createOrder, 'createOrder');
    
  
    const order = await Order.create(createOrder)
    order.populate('cart')
    const savedOrder = await order.save()
    res.send(savedOrder)
    
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }


}