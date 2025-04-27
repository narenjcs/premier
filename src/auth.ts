import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { FirestoreAdapter } from "@auth/firebase-adapter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user }) {
      // console.log("token", token)
      // console.log("user", user)
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      
      session.user.role = token.role
     
     
      return {...session,id : token.sub}
    }
  },
  ...authConfig
}) 