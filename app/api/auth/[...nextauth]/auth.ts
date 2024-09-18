import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
    providers: [
      GithubProvider({
          clientId: process.env.GITHUB_ID ?? "",
          clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
      CredentialsProvider({
        name: 'Credenciales',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'Usuario' },
          password: { label: 'Password', type: 'password', placeholder: 'Contraseña' }
        },
        async authorize(credentials) {
          if (credentials?.username === 'IvanLatam' && credentials.password === '1234') {
            return { id: '1', name: 'IvanLatam', email: 'ivanlatam@example.com' }
          }
          return null
        }
      }),
    ]
  }