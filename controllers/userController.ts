import { NextFunction, Request, Response } from "express"
import User, { checkPasswords, validatePassword } from "../models/users"
import jwt from 'jsonwebtoken'
import { secret } from "../config/environments"
import { StatusCodes } from 'http-status-codes'

export async function signup(req: Request, res: Response) {
  try {
    if (checkPasswords(req.body.password, req.body.passwordConfirmation)) {
      const user = await User.create(req.body)
      res.send(user)
    } else {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(
        { message: "Passwords don't match", errors: { password: "Passwords don't match" } }
      )
    }
  } catch (e: any) {
    console.log(e)
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    // .send({ errors: formatValidationError(e) })
  }
}

export async function sellerSignup(req: Request, res: Response){
  try {
    if (checkPasswords(req.body.password, req.body.passwordConfirmation)) {
      const user = await User.create(req.body)
      // user.isSeller = true
      // await user.save()
      res.send(user)
      
    } else {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(
        { message: "Passwords don't match", errors: { password: "Passwords don't match" } }
      )
    }
  } catch (e: any) {
    console.log(e)
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    // .send({ errors: formatValidationError(e) })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user);
    
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: "Login failed" })
    }

    const isValidPw = validatePassword(req.body.password, user.password)
    console.log(req.body.password);
    console.log(user.password);
    console.log(isValidPw);
    
    if (isValidPw) {
      const token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: '24h' }
      )
      res.status(StatusCodes.OK).send({ message: "Login successful", token })
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Login failed on if is valid pw" })
    }
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Login failed" })
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    res.status(StatusCodes.OK).send(req.currentUser)
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Request failed" })
  }
} 