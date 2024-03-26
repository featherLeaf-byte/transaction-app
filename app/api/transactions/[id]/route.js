import connectMongoDB from '@/libs/mongodb'
import Transaction from '@/models/transaction'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  const { id } = params
  const {
    newDate: date,
    newMerchantName: merchantName,
    newDescription: description,
    newCategory: category,
    newAmount: amount,
  } = await req.json()
  await connectMongoDB()
  await Transaction.findByIdAndUpdate(id, {
    date,
    merchantName,
    description,
    category,
    amount,
  })
  return NextResponse.json({ message: 'Transaction Updated' }, { status: 200 })
}
export async function GET(req, { params }) {
  const { id } = params
  await connectMongoDB()
  const transaction = await Transaction.findById(id)
  return NextResponse.json({ transaction }, { status: 200 })
}
