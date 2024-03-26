'use client'

import { HiDocumentSearch } from 'react-icons/hi'
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { CgAdd } from 'react-icons/cg'
import moment from 'moment'
import Modal from 'react-modal'
import { useSession } from 'next-auth/react'
import SignInButton from './SignInButton'
import PieChart from './PieChart'

Modal.setAppElement('body')
export default function TransactionTable({ data, search }) {
  const { status } = useSession()
  const columns = ['Date', 'Merchant Name', 'Description', 'Category', 'Amount']
  const router = useRouter()
  const { transactions } = data
  const [transactionData, setTransactionData] = useState(transactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [transaction, setTransaction] = useState([])
  //Viewing
  const [isOpen, setIsOpen] = useState(false)
  async function viewTransaction(transactionID) {
    const transaction = transactionData.find(
      (item) => item._id === transactionID
    )
    setTransaction([transaction])
    setIsOpen(true)
  }
  //Search
  function searchResults(transaction, search) {
    let found = false
    if (search.toUpperCase() == transaction.description.toUpperCase()) {
      found = true
    }
    if (search.toUpperCase() == transaction.merchantName.toUpperCase()) {
      found = true
    }
    if (search.toUpperCase() == String(transaction.amount).toUpperCase()) {
      found = true
    }
    if (search == transaction.date.toUpperCase()) {
      found = true
    }
    return found
  }
  //Sorting
  function sortAscendingOutput() {
    setTransactionData(
      [...transactionData].sort((a, b) => {
        let fa = a.category.toLowerCase(),
          fb = b.category.toLowerCase()

        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
    )
  }
  function sortDescendingOutput() {
    setTransactionData(
      [...transactionData].sort((a, b) => {
        let fa = a.category.toLowerCase(),
          fb = b.category.toLowerCase()

        if (fa > fb) {
          return -1
        }
        if (fa < fb) {
          return 1
        }
        return 0
      })
    )
  }
  return (
    <>
      {/*View Modal*/}
      <Modal isOpen={isOpen} contentLabel="Image Modal">
        <div className="modal-group">
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <div>
            {transaction.map((item) => {
              return (
                <div key={item._id}>
                  <h3>Date</h3>
                  <p>{item.date}</p>
                  <h3>Merchant Name</h3>
                  <p>{item.merchantName}</p>
                  <h3>Description</h3>
                  <p>{item.description}</p>
                  <h3>Category</h3>
                  <p>{item.category}</p>
                  <h3>Amount</h3>
                  <p>{item.amount}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
      {/*Table Information*/}
      {status === 'authenticated' ? (
        <div>
          <section>
            <div>
              <h2 style={{ textAlign: 'center', color: '#fff' }}>
                Expense Chart
              </h2>
              <PieChart transactions={transactions} />
            </div>
          </section>

          <div className="table-top-section">
            <div className="heading-label">
              <label>Transaction History</label>
            </div>

            <div className="search-area">
              <div className="search-bar">
                <BiSearch className="search-icon" />
                <input
                  type="search"
                  name=""
                  id="searchInput"
                  placeholder="Search..."
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="insert-transaction">
              <Link href="/AddTransaction" className="transaction-btn">
                <CgAdd /> Transaction
              </Link>
            </div>
          </div>
          <div className="sort-area">
            <button onClick={sortDescendingOutput} className="sort-btn">
              Sort Descending
            </button>
            <button onClick={sortAscendingOutput} className="sort-btn">
              Sorting Ascending
            </button>
          </div>
          <table>
            <thead>
              <tr>
                {' '}
                <th>Date</th>
                <th>Merchant Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {searchTerm == ''
                ? transactionData.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>
                        {moment(new Date(transaction.date)).format(
                          'YYYY-MM-DD'
                        )}
                      </td>
                      <td>{transaction.merchantName}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.amount}</td>
                      <td>
                        <div className="action-section">
                          <div className="action-button">
                            <div>
                              <HiDocumentSearch />
                            </div>
                            <div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  viewTransaction(transaction._id)
                                }}
                              >
                                View
                              </button>
                            </div>
                          </div>
                          <div className="action-button">
                            <div>
                              <GrUpdate />
                            </div>
                            <div>
                              <Link
                                href={`/EditTransaction/${transaction._id}`}
                              >
                                Update
                              </Link>
                            </div>
                          </div>
                          <div className="action-button">
                            <div>
                              <AiFillDelete />
                            </div>
                            <button
                              onClick={async (e) => {
                                e.preventDefault

                                const confirmDeletion = confirm(
                                  'Are you sure you want to delete the transaction?'
                                )
                                if (confirmDeletion) {
                                  const res = await fetch(
                                    `http://localhost:3000/api/transactions?id=${transaction._id}`,
                                    {
                                      method: 'DELETE',
                                    }
                                  )
                                  if (res.ok) {
                                    router.refresh()
                                  }
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : transactionData.map((transaction) =>
                    searchResults(transaction, searchTerm) ? (
                      <tr key={transaction._id}>
                        <td>
                          {moment(new Date(transaction.date)).format(
                            'YYYY-MM-DD'
                          )}
                        </td>
                        <td>{transaction.merchantName}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.amount}</td>
                        <td>
                          <div className="action-section">
                            <div className="action-button">
                              <div>
                                <HiDocumentSearch />
                              </div>
                              <div>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    viewTransaction(transaction._id)
                                  }}
                                >
                                  View
                                </button>
                              </div>
                            </div>
                            <div className="action-button">
                              <div>
                                <GrUpdate />
                              </div>
                              <div>
                                <Link
                                  href={`/EditTransaction/${transaction._id}`}
                                >
                                  Update
                                </Link>
                              </div>
                            </div>
                            <div className="action-button">
                              <div>
                                <AiFillDelete />
                              </div>
                              <button
                                onClick={async (e) => {
                                  e.preventDefault

                                  const confirmDeletion = confirm(
                                    'Are you sure you want to delete the transaction?'
                                  )
                                  if (confirmDeletion) {
                                    const res = await fetch(
                                      `http://localhost:3000/api/transactions?id=${transaction._id}`,
                                      {
                                        method: 'DELETE',
                                      }
                                    )
                                    if (res.ok) {
                                      router.refresh()
                                    }
                                  }
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ''
                    )
                  )}
            </tbody>
          </table>
        </div>
      ) : (
        <SignInButton />
      )}
    </>
  )
}
