import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
      // GoogleProvider({
      //     clientId: process.env.GITHUB_ID ?? "",
      //     clientSecret: process.env.GITHUB_SECRET ?? ""
      //   }),
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
          if (credentials?.username === 'deviajeconlosrobertos' && credentials.password === 'ppch5.3>K9g9') {
            return { id: '2', name: 'deviajeconlosrobertos', email: ''}
          }
          if(credentials?.username === 'vivirviajando' && credentials.password === '0pP35120+M<S') {
            return { id: '3', name: 'vivirviajando', email: ''}
          }
          return null
        }
      }),
    ],
    pages: {
      signIn: '/usuario'
    }
  }