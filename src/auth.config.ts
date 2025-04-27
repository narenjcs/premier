import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google({
    allowDangerousEmailAccountLinking: true,
    profile(profile) {
     
      return {id: profile.email, email: profile.email, emailVerified: Date.now(), image: profile.picture, role: "user", name: profile.name }
    },
  })]
} satisfies NextAuthConfig