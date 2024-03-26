import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welo - Transaction App',
  description: 'Welo product',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div style={{ width: '100%', margin: '0' }}>{children} </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
