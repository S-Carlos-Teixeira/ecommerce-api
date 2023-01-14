import mongoose, { Schema } from 'mongoose'
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products:[
      { product:{type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true},
        quantity: { type: Number,
          default: 1
        }}
      ],
    isCheckedOut:{type: Boolean, default: false}
  },
  { timestamps: true }
)

export default mongoose.model('Cart', cartSchema)
