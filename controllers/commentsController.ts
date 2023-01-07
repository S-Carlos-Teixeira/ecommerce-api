import { NextFunction, Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import Product from "../models/product"
import Users from "../models/users"

export async function addComment(req: Request, res: Response){
  try {
    // const productId = req.params
    const currentUser = req.currentUser
    console.log(currentUser, 'log');
    
    const productId = req.params.productId
    
    const product = await Product.findById(productId)
    console.log(product);
    
    if (!product){
      return res.send({message: 'Product not found'})
    }

    const comment = req.body
    comment.user = currentUser
    product.reviews.push(comment)
    const saveProduct = await product.save()
    res.send(saveProduct)
  } catch (error) {
    console.error(error)
    res.send({ message: "There was a problem commenting."})
    
  }
}
export async function updateComment(req: Request, res: Response){

}
export async function deleteComment(req: Request, res: Response){

}