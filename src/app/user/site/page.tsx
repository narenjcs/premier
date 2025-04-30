'use client'

import { Suspense, useCallback, useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

import { SitesSkeleton } from "@/components/Tables/sites/skeleton"
import { Sites } from "@/components/Tables/sites"

import EditClientModel from "./edit-site"

import {  getSites } from "@/services/fetchapi.services"






export default function SitesPage() {

  const [openClientEditModal, setOpenClientEditModal] = useState(false);
  const [site, setSite] = useState<any>(null);
  const [sites, setSites] = useState<any>([]);


const fetchSites = useCallback(async () => {
    const data = await getSites();

  let clients: any = [] 
  data.forEach((site: any) => {
    if (site.client) {
      clients = [...clients, ...site.client.id]
    }
  })

      
    setSites(data);
}, [])
useEffect(() => {
 
    fetchSites()
  
 
    }, [fetchSites])
  return (
    <>
      <Breadcrumb pageName="Sites" />

      <div className="space-y-10">

      

        <Suspense fallback={<SitesSkeleton />}>
       
          <Sites data={sites} onEdit={function (site: any): void {
            let siteEdit = Object.assign({}, site);
            if(siteEdit.client) {
            siteEdit.client = site.client?.id || site.client;
          
            }

            setSite(siteEdit);
            setOpenClientEditModal(true);
          } } ></Sites>

        </Suspense>

       {openClientEditModal &&  <EditClientModel 
          site={site}
          isOpen={openClientEditModal} 
       
          onOpenChange={(isOpen: boolean) => {
            if (!isOpen) {
              fetchSites()
            }
            setOpenClientEditModal(isOpen)}} 
        />}

      </div>
    </>
  )
}