import { NextFunction, Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import Product from "../models/product"


export async function addComment(req: Request, res: Response){
  try {
    const currentUser = req.currentUser
    // console.log(currentUser, 'log');
    
    const productId = req.params.productId
    
    const product = await Product.findById(productId)
    // console.log(product);
    
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "There was a problem commenting."})
    
  }
}
export async function updateComment(req: Request, res: Response){
    try {
    const commentData = req.body
    const currentUser = req.currentUser
    const { commentId, productId } = req.params

    const product = await Product.findById(productId).populate('user').populate('comments.user')

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Movie not found' })
    }

    const comment = product.reviews.id(commentId)

    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Comment not found' })
    }

    if (!comment.user.equals(currentUser._id)) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized' })
    }

    comment.set(commentData)

    const savedProduct = await product.save()

    res.send(savedProduct)

  } catch (err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "There was a problem updating this comment."})
  }
}
export async function deleteComment(req: Request, res: Response){
  try {
    const currentUser = req.currentUser
    const { commentId, movieId } = req.params
  
    const product = await Product.findById(movieId).populate('user').populate('comments.user')

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Movie not found' })
    }

    const comment = product.reviews.id(commentId)

    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Comment not found' })
    }

    if (!comment.user.equals(currentUser._id)) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized' })
    }

    comment.remove()

    const savedProduct = await Product.remove()

    res.send(savedProduct)

  } catch (err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "There was a problem updating this comment."})
  }
}