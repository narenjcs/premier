'use client'

import { Suspense, useCallback, useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

import { ClientsSkeleton } from "@/components/Tables/clients/skeleton"
import { Clients } from "@/components/Tables/clients"

import EditClientModel from "./edit-client"

import { getClients } from "@/services/fetchapi.services"

import { User } from "@/types/models"



export default function ClientPage() {

  const [openClientEditModal, setOpenClientEditModal] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [clients, setClients] = useState<any>([]);


  const [selectedUsers, setSelectedSUsers] = useState([])
  const [selectedAllUsers, setSelectedAllUsers] = useState([])

const fetchClients = useCallback(async () => {
    const data = await getClients();
    let sites: any = []
    let users: any = []
    data.forEach((client: any) => {
  
      if (client.users) {
        users = [...users, ...client.users?.map((user: any) => user.id)]
      }
    })
    
    setSelectedAllUsers(users)
    setClients(data);
}, [])
useEffect(() => {
  
    fetchClients()
  
 
    }, [ fetchClients])
  return (
    <>
      <Breadcrumb pageName="Clients" />

      <div className="space-y-10">

      

        <Suspense fallback={<ClientsSkeleton />}>
       
          <Clients data={clients} onEdit={function (client: any): void {
            let clientEdit = Object.assign({}, client);
            if(clientEdit.id) {
            clientEdit.users = client.users?.map((user: User)=>user.id || user);
          
            setSelectedSUsers(selectedAllUsers.filter(user=> !clientEdit.users?.includes(user)))
            }
            setClient(clientEdit);
            setOpenClientEditModal(true);
          } } ></Clients>

        </Suspense>

       {openClientEditModal &&  <EditClientModel 
          client={client}
          isOpen={openClientEditModal} 
  
          selectedUsers={selectedUsers}
          onOpenChange={(isOpen: boolean) => {
            
            if (!isOpen) {
              fetchClients()
            }
            setOpenClientEditModal(isOpen)}} 
        />}

      </div>
    </>
  )
}