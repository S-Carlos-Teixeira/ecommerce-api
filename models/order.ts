import mongoose, { Schema } from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    cart: { type: mongoose.Types.ObjectId, ref: 'Cart', required: true },
    amount: { type: Number, required: [true, 'Enter an amount.'] },
    // address: { type: mongoose.Types.ObjectId, ref: 'Address', required: true },
    status: { type: String, default: 'pending' }
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
