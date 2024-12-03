'use client'
import { signIn, signOut } from "next-auth/react"

const authentication = {
    signIn: () => signIn(),
    signOut: () => signOut()
}
export default authentication;