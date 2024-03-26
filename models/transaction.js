import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema(
  {
    date: Date,
    merchantName: String,
    description: String,
    category: String,
    amount: Number,
  },
  {
    timestamps: true,
  }
)
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', transactionSchema)
export default Transaction
