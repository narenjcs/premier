'use client'

import React, { useEffect, useState } from 'react';
import {getAuth} from '@/app/actions';
import { usePathname, useRouter } from 'next/navigation';
import { HOME, LOGIN } from '@/constants/RouteConstant';


interface Props {
    children: React.ReactNode
}

export default function AuthGard({
    children
}: Props) {
    const pathname = usePathname();
    const router = useRouter()
    const [readyView, setReadyView] = useState<boolean>(false);
    
    useEffect(() => {

        (async () => {
            setReadyView(false)
            let session: any = await getAuth()
           
            if(pathname == LOGIN && session){
                // setSession(true)
                router.push(HOME);
                router.refresh();
            }else{
                // setSession(session)
            if (!session) {
                router.push(LOGIN);
                router.refresh();

            }
            }
            setReadyView(true)
        })()
    }, [pathname])


    return (
        <>
            { readyView && children}
        </>


    );
}

