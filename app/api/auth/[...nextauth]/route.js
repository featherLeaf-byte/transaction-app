import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callBacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { userName, emailAddress } = user
        try {
          await connectMongoDB()
          const exists = await User.findOne({ emailAddress })
          if (!exists) {
            const url = 'http://localhost:3000/api/user'
            const res = await fetch(url, {
              method: 'POST',
              header: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                userName,
                emailAddress,
              }),
            })
          }
          if (res.ok) {
            return user
          }
        } catch (error) {
          console.log(error)
        }
      }
      return user
    },
  },
}
const AuthHandler = NextAuth(authOptions)
export { AuthHandler as GET, AuthHandler as POST }
