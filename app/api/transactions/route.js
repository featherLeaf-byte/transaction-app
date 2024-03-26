import connectMongoDB from '@/libs/mongodb'
import Transaction from '@/models/transaction'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { date, merchantName, description, category, amount } = await req.json()
  await connectMongoDB()
  await Transaction.create({
    date,
    merchantName,
    description,
    category,
    amount,
  })
  return NextResponse.json({ message: 'Transaction created' }, { status: 201 })
}
export async function GET() {
  await connectMongoDB()
  const transactions = await Transaction.find()
  return NextResponse.json({ transactions })
}
export async function DELETE(req) {
  const transaction_id = req.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Transaction.findByIdAndDelete(transaction_id)
  return NextResponse.json({ message: 'Transaction Deleted' }, { status: 201 })
}
