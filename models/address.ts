import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

const addressSchema = new mongoose.Schema({
  countryRegion: {
    type: String,
    required: [true, 'Country/ region is required']
  },
  fullName: { type: String, required: [true, 'Full name is required'] },
  phoneNumber: { type: String, required: [true, 'Phone is required'] },
  postcode: {
    type: String,
    required: [true, 'Post code is required'],
    validate: {
      message: 'Please enter a valid post code.',
      validator: (postcode: string) => validator.isPostalCode(postcode, 'any')
    }
  },
  addressLine1: { type: String, required: [true, 'Address is required'] },
  addressLine2: { type: String },
  townCity: { type: String, required: [true, 'Town / City is required'] },
  county: { type: String },
  deliveryInstructions: { type: String },
  isDefault: { type: Boolean },
  isBillingAddress: { type: Boolean },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Address', addressSchema)
