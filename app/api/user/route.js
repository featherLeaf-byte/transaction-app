import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { name, email, accountBalance } = await request.json()
  await connectMongoDB()
  if (!accountBalance === null) {
    await User.create({ name, email, accountBalance })
  }
  return NextResponse.json({ message: 'User is registered' }, { status: 201 })
}
