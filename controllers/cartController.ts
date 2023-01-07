import { CallTracker } from 'assert'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Cart from '../models/cart'

export async function getCart(req: Request, res: Response) {}
export async function addCart(req: Request, res: Response) {
  try {
    const productId = req.params.productId
    const currentUser = req.currentUser
    req.body.user = currentUser
    req.body.product = productId
    const cart = await Cart.create(req.body)
    res.send(cart)
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
export async function updateCart(req: Request, res: Response) {}
export async function deleteCart(req: Request, res: Response) {}
