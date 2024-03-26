'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import moment from 'moment'

export default function UpdateTransaction({
  id,
  date,
  merchantName,
  description,
  category,
  amount,
}) {
  const [newDate, setDate] = useState(date)
  const [newMerchantName, setMerchantName] = useState(merchantName)
  const [newDescription, setDescription] = useState(description)
  const [newCategory, setCategory] = useState(category)
  const [newAmount, setAmount] = useState(amount)
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
              value={moment(newDate).format('YYYY-MM-DD')}
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="merchant_name">Merchant Name</label>
            <input
              id="merchant_name"
              type="text"
              placeholder="Merchant Name"
              value={newMerchantName}
              onChange={(e) => {
                setMerchantName(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Description"
              value={newDescription}
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
              placeholder="Category"
              value={newCategory}
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
              value={newAmount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
            />
          </div>
          <button
            className="form-submit-btn"
            onClick={async (e) => {
              e.preventDefault
              try {
                const res = await fetch(
                  `http://localhost:3000/api/transactions/${id}`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      newDate,
                      newMerchantName,
                      newDescription,
                      newCategory,
                      newAmount,
                    }),
                  }
                )
                if (!res.ok) {
                  throw new Error('Failed to update transaction')
                }
                router.push('/')
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Update transaction
          </button>
        </form>
      </div>
    </>
  )
}
