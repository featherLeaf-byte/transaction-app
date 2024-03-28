import NavBar from './Components/NavBar'
import TransactionTable from './Components/TransactionTable'

async function getTransactions() {
  const res = await fetch(
    'https://welo-transaction.netlify.app/api/transactions',
    {
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export default async function Home() {
  const transactions = await getTransactions()

  return (
    <>
      <NavBar></NavBar>

      <main>
        <section className="transaction-history-section">
          <TransactionTable data={transactions} />
        </section>
      </main>
    </>
  )
}
