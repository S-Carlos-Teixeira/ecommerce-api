import mongoose, { Schema } from 'mongoose'

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: Number, required: [true, 'Enter a valid card number'] },
    nameOnCard: { type: String, required: [true, 'Enter a valid name'] },
    expDate: {
      month: { type: String, required: [true, 'Enter a valid month'] },
      year: { type: String, required: [true, 'Enter a valid year'] }
    },
    flag: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

export default mongoose.model('Card', cardSchema)
