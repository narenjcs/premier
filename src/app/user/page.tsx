'use client'

import { Suspense, useCallback, useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

import { UsersSkeleton } from "@/components/Tables/users/skeleton"
import { Users } from "@/components/Tables/users"

import EditUserModel from "./edit-user"
import { ROLE_DROPDOWN } from "@/constants/AppConstant"
import { getUsers } from "@/services/fetch-api-data"



export default function UserPage() {

  const [openUserEditModal, setOpenUserEditModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any>([]);

  const [roles] = useState(ROLE_DROPDOWN)

const fetchUsers = useCallback(async () => {
    const data = await getUsers();
    setUsers(data);
}, [])
useEffect(() => {
  
    fetchUsers()
  
 
    }, [ fetchUsers])
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="space-y-10">

        <Suspense fallback={<UsersSkeleton />}>

          <Users data={users} onEdit={function (user: any): void {
            setUser(user);
            setOpenUserEditModal(true);
          } } ></Users>

        </Suspense>

        <EditUserModel 
          user={user}
          isOpen={openUserEditModal} 
          roles={roles} 
          onOpenChange={(isOpen: boolean) => {
           if (!isOpen) {
            fetchUsers()
           }
            setOpenUserEditModal(isOpen)}} 
        />

      </div>
    </>
  )
}