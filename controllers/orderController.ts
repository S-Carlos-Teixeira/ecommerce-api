import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Order from "../models/order"

export async function getOrder(req: Request, res: Response){
  const currentUser = req.currentUser._id

  if (!currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  }

  const order = await Order.find({ user: [currentUser] }).populate('cart')

  if (!order.length) {
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }

  res.send(order)
}
export async function addOrder(req: Request, res: Response){}