import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Cart from '../models/cart'

export async function getCart(req: Request, res: Response) {

}
export async function addCart(req: Request, res: Response) {
  try {
    const currentUser = req.currentUser
    
    const isCartCreated = await Cart.find({user:currentUser._id})
    console.log(isCartCreated);
    
    
    req.body.user = currentUser
    if (!currentUser._id) {
      return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED)
    }

    if (isCartCreated.length === 0) {
      const cart = await Cart.create(req.body)
      res.send(cart)
    } else {updateCart}

  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
export async function updateCart(req: Request, res: Response) {}
export async function deleteCart(req: Request, res: Response) {}
