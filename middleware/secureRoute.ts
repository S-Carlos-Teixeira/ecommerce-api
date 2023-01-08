import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environments'
import Users from '../models/users'

interface JwtPayload {
  userId: string
}

export default function secureRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rawToken = req.headers.authorization

  if (!rawToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' })
  }

  const token = rawToken.replace('Bearer ', '')
  // console.log(token)

  jwt.verify(token, secret, async (err, payload) => {
    if (err || !payload) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized' })
    }

    const jwtPayload = payload as JwtPayload
    const user = await Users.findById(jwtPayload.userId)

    // ! Adding this code in case the user doesn't exist
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized' })
    }

    req.currentUser = user

    next()
  })
}
