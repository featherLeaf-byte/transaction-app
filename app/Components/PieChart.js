'use client'
import Chart from 'chart.js/auto'
import { useRef, useEffect } from 'react'

const PieChart = (transactions) => {
  const transactionsData = transactions.transactions
  function sumExpensesByCategories(transactions) {
    const totals = transactions.reduce((sum, transaction) => {
      sum[transaction.category] =
        sum[transaction.category] || 0 + transaction.amount
      return sum
    }, {})

    return totals
  }
  const expensesData = sumExpensesByCategories(
    transactionsData.map((transaction) => {
      return { amount: transaction.amount, category: transaction.category }
    })
  )
  let expensesArray = []
  for (const category in expensesData) {
    const amount = expensesData[category]
    const randomColor = () => {
      var alphNumRange = '0123456789ABCDEF'
      var hexColor = '#'
      for (let i = 0; i < 6; i++)
        hexColor += alphNumRange[Math.floor(Math.random() * 16)]
      return hexColor
    }
    const color = randomColor()
    expensesArray.push({ category, amount, color })
  }

  const pieChartData = expensesArray
  const cRef = useRef(null)
  useEffect(() => {
    const canvas = cRef.current
    let exists = Chart.getChart(canvas)
    if (exists) {
      exists.destroy()
    }
    const data = pieChartData.map((item) => item.amount)
    const labels = pieChartData.map((item) => item.category)
    const colors = pieChartData.map((item) => item.color)
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
          },
        ],
      },
    })
  }, [])
  return (
    <div
      style={{
        maxWidth: '200px',
        backgroundColor: '#fff',
        marginBottom: '20px',
        padding: '20px',
        borderRadius: '20px',
      }}
    >
      <canvas ref={cRef}></canvas>
    </div>
  )
}
export default PieChart
