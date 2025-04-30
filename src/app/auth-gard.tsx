'use client'

import React, { useEffect, useState } from 'react';

import { usePathname, useRouter, redirect } from 'next/navigation';
import { HOME, LOGIN } from '@/constants/RouteConstant';
import { NAV_DATA } from "@/components/Layouts/sidebar/data";
import { useUserStore } from '@/store/user.store';


interface Props {
    children: React.ReactNode
    session: any
}

export default function AuthGard({
    children,
    session
}: Props) {
    const pathname = usePathname();
    const router = useRouter()

    const [sessionState, setSession] = useState<any>(session);
    const { setUser } = useUserStore()
    const [readyToView, setReadyToView] = useState(true);
    useEffect(() => {
        setSession(session)
        setUser(session?.user)
    }, [session])
    useEffect(() => {
        setReadyToView(false)
        // (async () => {

        let session = sessionState

        if (pathname == LOGIN && session) {

            router.push(HOME);
            router.refresh();
        } else {
           
            let status =  NAV_DATA.every((section) => {
                return section.items.every((item) => {
                    let status = true
                    if (item.url === pathname) {
                        if (session && item.roles && !item.roles.includes(session.user.role)) {
                           
                            // router.push(HOME)
                            status = false

                        }
                    }
                    if(!status){
                        return false
                    }
                    status = item.items.every((subItem) => {
                        let status = true
                        if (subItem.url === pathname) {

                            if (session && subItem.roles && !subItem.roles.includes(session.user.role)) {

                                status = false

                            }

                        }
                        return status
                    });

                    return status
                }
                );
            });
            if (!status) {
                router.back()
            }
            
            setReadyToView(status)
            if (!session) {
                router.push(LOGIN);
                router.refresh();

            }
        }


    }, [pathname])

    if (pathname != LOGIN && !session || pathname == LOGIN && session) {

        return (<>
        </>)
    }

    return (
        <>
            {readyToView && children}
        </>


    );
}

