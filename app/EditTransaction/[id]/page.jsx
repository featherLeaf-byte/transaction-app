import UpdateTransaction from '@/app/Components/UpdateTransaction'
const getTransactionById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch transactions')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export default async function EditTransaction({ params }) {
  console.log(params)
  const { id } = params
  const { transaction } = await getTransactionById(id)
  const { date, merchantName, description, category, amount } = transaction
  return (
    <>
      <UpdateTransaction
        id={id}
        date={date}
        merchantName={merchantName}
        description={description}
        category={category}
        amount={amount}
      />
    </>
  )
}
