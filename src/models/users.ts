import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  // ! required fields now override the default mongoose error message
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile is required'],
    unique: true,
    validate: {
      message: 'Please enter a valid number.',
      validator: (mobile: string) => validator.isMobilePhone(mobile, 'any')
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // ! Changed these validation functions to return a nice message.
    validate: {
      message: 'Please enter a valid email.',
      validator: (email: string) => validator.isEmail(email)
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // ! Multiple validators, for different types of error messages on the password
    validate: [
      {
        message: 'Password must be at least 8 characters in length.',
        validator: (password: string) => password.length >= 8
      },
      {
        message:
          'Password must contain at least 1 lowercase character, uppercase character, and symbol.',
        validator: (password: string) =>
          validator.isStrongPassword(password, {
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          })
      }
    ]
  },
  isSeller:{type: Boolean, default: false}
})

userSchema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

export function validatePassword(
  loginPassword: string,
  originalPassword: string
) {
  return bcrypt.compareSync(loginPassword, originalPassword)
}

export function checkPasswords(password: string, passwordConfirmation: string) {
  return password === passwordConfirmation
}

// ! Plugging in unique validator.
userSchema.plugin(uniqueValidator)
userSchema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } })
)

export default mongoose.model('User', userSchema)
