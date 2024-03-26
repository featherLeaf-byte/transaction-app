'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
export default function NavBar() {
  const { status, data: session } = useSession()
  return (
    <nav>
      <div className="nav-item">
        <div className="nav-logo-img-container">
          <img
            className="nav-logo-img"
            src="./image-002.png"
            alt="logo image"
          />
        </div>
      </div>
      <div className="nav-item" id="profile">
        <div className="nav-profile-img-container">
          {status === 'authenticated' ? (
            <img
              className="nav-profile-img"
              src={session?.user?.image}
              alt="profile image"
            />
          ) : (
            ''
          )}
        </div>
        <div className="nav-profile-label">
          {status == 'authenticated' ? (
            <label>{session?.user?.name}</label>
          ) : (
            ''
          )}
          {status === 'authenticated' ? (
            <button
              onClick={() => {
                signOut()
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                signIn('google')
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
