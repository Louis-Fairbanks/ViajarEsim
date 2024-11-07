import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
})


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
        password: { label: 'Password', type: 'password', placeholder: 'Contraseña' },
        userType: { label: 'Tipo de usuario', type: 'text', placeholder: 'Tipo de usuario' }
      },
      async authorize(credentials) {

        if (!credentials?.username || !credentials?.password || !credentials?.userType) {
          return null
        }

        let tableName;
        if (credentials?.userType === 'admins') {
          tableName = 'admins';
        } else if (credentials?.userType === 'influencers') {
          tableName = 'influencers';
        } else {
          return null;
        }
        try {
          const client = await pool.connect();
          const queryText = `SELECT * FROM ${tableName} WHERE nombre = $1`;
          const result = await client.query(queryText, [credentials?.username]);
          client.release();
      
          if (result.rows.length === 0) {
            return null;
          }
      
          const user = result.rows[0];
          const isValid = await bcrypt.compare(credentials?.password, user.contrasena);
      
          if (isValid) {
            return {
              id: user.id.toString(),
              name: user.nombre,
              ...(user.nivel_acceso && { access: user.nivel_acceso })
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during database authentication:', error);
          return null;
        }
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
        token.id = user.id;
        if (user.access) {
          token.access = user.access;
        }
      }
      return token
    },
    async session({ session, token }: { session: any, token: JWT }) {
      if (session.user) {
        session.user.id = token.id
        session.accessToken = token.accessToken
        session.provider = token.provider
        if (token.access) {
          session.user.access = token.access;
        }
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