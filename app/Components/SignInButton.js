'use client'
import { signIn } from 'next-auth/react'
export default function SignInButton() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
      }}
    >
      <button
        style={{
          width: '150px',
          height: '50px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: 'darkcyan',
          border: 'solid 2px #fff',
        }}
        onClick={() => {
          signIn('google')
        }}
      >
        Sign In
      </button>
    </div>
  )
}
