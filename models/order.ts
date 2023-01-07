import mongoose, { Schema } from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    cart: { type: mongoose.Types.ObjectId, ref: 'Cart', required: true },
    amount: { type: Number, required: true },
    // address: { type: mongoose.Types.ObjectId, ref: 'Address', required: true },
    status: { type: String, default: 'pending' }
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
