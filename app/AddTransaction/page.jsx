'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddTransaction() {
  const [date, setDate] = useState('')
  const [merchantName, setMerchant] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  const router = useRouter()
  return (
    <>
      <div className="form-section">
        <form>
          <h2>Transaction Details</h2>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              onChange={(e) => {
                setDate(e.target.value)
                console.log(date)
              }}
            />
          </div>
          <div>
            <label htmlFor="merchant_name">Merchant Name</label>
            <input
              id="merchant_name"
              type="text"
              placeholder="Merchant Name"
              onChange={(e) => {
                setMerchant(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              placeholder="category"
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>{' '}
            <input
              id="amount"
              type="number"
              min={0.0}
              max={100000}
              step={0.01}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
            />
          </div>
          <button
            className="form-submit-btn"
            onClick={async (e) => {
              e.preventDefault()
              if (
                !date ||
                !merchantName ||
                !description ||
                !category ||
                !amount
              ) {
                alert('There are missing fields')
              }
              try {
                const res = await fetch(
                  'http://localhost:3000/api/transactions',
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      date,
                      merchantName,
                      description,
                      category,
                      amount,
                    }),
                  }
                )
                if (res.ok) {
                  router.push('/')
                } else {
                  throw new Error('Failed to add transaction')
                }
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Add transaction
          </button>
        </form>
      </div>
    </>
  )
}
