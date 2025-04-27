'use server'

import {auth,signOut, signIn} from '@/auth'


export const doSignIn = async(param: string)=>{
    return await signIn(param)
} 

export const doSignOut = async()=> {
    await signOut()
}

export const getAuth = async()=>{
    return await auth()
}



