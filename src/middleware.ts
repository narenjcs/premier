import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextRequest, NextResponse } from "next/server"


 
export const { auth } = NextAuth(authConfig)

const isApiCall = (str: string): boolean => {
    const regex = /^\/api\/(?!auth)/; // Starts with /api/ but not followed by auth
    return regex.test(str);
};

export async function middleware(request: NextRequest) {
    // Example function to validate auth
    const user = await auth()
    // if (isApiCall(request.nextUrl.pathname)) {
    //     if (!user){
    //         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    //     }
    //   }
 

    return NextResponse.next()
  }