import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import formatValidationError from "../errors/validation"
import Product from '../models/product'

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (e) {
    console.log(e)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'There was an error' })
  }
}
export async function getProduct(req: Request, res: Response) {
  // console.log(req.params, 'req.params')

  try {
    const productId = req.params.productId
    const product = await Product.findById({ _id: productId })
    res.send(product)
  } catch (e) {
    console.log(e)
    res.send({ message: 'There was an error' })
  }
}
export async function addProduct(req: Request, res: Response) {
  try {
    // console.log(req.currentUser.isSeller);

    if (!req.currentUser.isSeller) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED)
    } else {
      req.body.user = req.currentUser._id
      // console.log(req.body.user, 'req.body.user')
      // console.log(req.currentUser, 'req.currentUser._id')
      console.log(req.body);
      

      const product = await Product.create(req.body)
      res.send(product)
    }
  } catch (e) {
    console.log(e)
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ errors: formatValidationError(e) })
  }
}
export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = req.params.productId
    const body = req.body
    const productToUpdate = await Product.findById(productId)

    // console.log(req.currentUser._id)

    if (!req.currentUser.isSeller) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED)
    }
    if (!req.currentUser._id) {
      return res.send({ message: 'not loged in' })
    }

    if (!productToUpdate) {
      return res.send({ message: 'product not found' })
    }

    // console.log(
    //   'user that created the product',
    //   productToUpdate.user._id,
    //   'user loged in',
    //   req.currentUser._id
    // )

    if (!productToUpdate.user.equals(req.currentUser._id)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED)
    }

    const updatedProd = await Product.findByIdAndUpdate(productId, body, {
      new: true
    })
    res.send(updatedProd)
  } catch (error) {
    console.log(error)
    res.send({ message: `${error}` })
  }
}
export async function deleteProduct(req: Request, res: Response) {
  try {
    if (!req.currentUser.isSeller) {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    } else {
      const prodId = req.params.productId
      // console.log(prodId)
      await Product.deleteOne({ _id: prodId })
      res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT)
    }
  } catch (error) {
    console.log(error)
    res.send({ message: 'There was an error' })
  }
}
