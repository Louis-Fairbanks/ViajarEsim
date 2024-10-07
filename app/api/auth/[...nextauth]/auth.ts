import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET_ID ?? ""
    }),
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Usuario' },
        password: { label: 'Password', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize(credentials) {
        if (credentials?.username === 'deviajeconlosrobertos' && credentials.password === 'ppch5.3>K9g9') {
          return { id: '2', name: 'deviajeconlosrobertos', email: '' }
        }
        if(credentials?.username === 'vivirviajando' && credentials.password === '0pP35120+M<S') {
          return { id: '3', name: 'vivirviajando', email: '' }
        }
        return null
      }
    }),
  ],
  pages: {
    signIn: '/usuario'
  },
  callbacks: {
    async jwt({ token, account, user }: { token: JWT, account: any, user: any }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any, token: JWT }) {
      if (session.user) {
        session.user.id = token.id
        session.accessToken = token.accessToken
        session.provider = token.provider
      }
      return session
    },
    async signIn({ account, profile }: { account: any, profile?: any }) {
      if (account.provider === "google") {
        return profile.email === "viajaresimoficial@gmail.com"
      }
      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}