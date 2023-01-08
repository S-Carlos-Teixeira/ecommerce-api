import mongoose, { Schema } from 'mongoose'
import { productSchema } from './product'
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products:[
      {product:[productSchema],
      // { product:{type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true},
        quantity: { type: Number,
          default: 1
        }}
      ]
  },
  { timestamps: true }
)

export default mongoose.model('Cart', cartSchema)
