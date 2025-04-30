
'use client'

import { Suspense, useCallback, useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

import { UsersSkeleton } from "@/components/Tables/users/skeleton"
import { Maintanance } from "@/components/Tables/maintenance"

import EditMaintenanceModel from "./edit-maintenance"

import { getClients, getSites, getMaintenanceReports } from "@/services/fetchapi.services"
import { Select } from "@/components/FormElements/select"
import InputGroup from "@/components/FormElements/InputGroup"
import { DatePicker } from "antd"
import { MAINTENANCE_TYPE_DROPDOWN } from "@/constants/AppConstant"



export default function MaintenanceReportPage() {

    const [openMaintenanceEditModal, setOpenMaintenanceEditModal] = useState(false);
    const [maintananceReports, setMaintenanceReports] = useState<any>([]);
    const [clients, setClients] = useState<any>([]);
    const [sites, setSites] = useState<any>([]);
    const [maintananceReport, setMaintenanceReport] = useState<any>(null);

    const [filterClient, setFilterClient] = useState<any>(null);
    const [filterSite, setFilterSite] = useState<any>(null);
    const [filterDate, setFilterDate] = useState<any>(null);
    const [filterServiceType, setFilterServiceType] = useState<any>(null);


    const getClientList = useCallback(async () => {
        const data = await getClients();
        setClients(data);
    }, [])
    const getSiteList = useCallback(async () => {
        const data = await getSites();
        setSites(data);
    }, [])


    const fetchMainanaceReport = useCallback(async () => {
        const filter: any = {
            filter_field: [],
            filter_value: [],
            filter_operator: []
        }
        if (filterClient) {
            filter.filter_field.push('client')
            filter.filter_value.push(filterClient)
            filter.filter_operator.push('in')
        }
        if (filterSite) {
            filter.filter_field.push('site')
            filter.filter_value.push(filterSite)
            filter.filter_operator.push('in')
        }
        if (filterDate) {
            filter.filter_field.push('date')
            filter.filter_value.push(filterDate)
            filter.filter_operator.push('==')
        }
        if (filterServiceType) {
            filter.filter_field.push('serviceType')
            filter.filter_value.push(filterServiceType)
            filter.filter_operator.push('==')
        }
        const data = await getMaintenanceReports(filter.filter_field.length > 0 ? filter : {});
        setMaintenanceReports(data);
    }, [])
    useEffect(() => {
        getClientList()
        getSiteList()
        fetchMainanaceReport()


    }, [fetchMainanaceReport])
    return (
        <>
            <Breadcrumb pageName="Mainatenance" />
         

            <div className="space-y-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                        <Select
                            label="Clients"

                            items={clients.map((client: any) => ({
                                label: client.name,
                                value: client.id,
                            }))}
                            defaultValue={filterClient}
                            mode="multiple"
                            antdSelect={true}

                            onChange={(e) => setFilterClient(e)}
                            placeholder="Select Client"
                        />

                        {/* <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
                    <select
                        id="client"
                        name="client"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={filterClient}
                        onChange={(e) => setFilterClient(e.target.value)}
                    >
                        <option value="">All Clients</option>
                        {clients.map((client: any) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select> */}
                    </div>
                    <div className="w-full md:w-1/4">

                        <Select
                            label="Sites"

                            items={sites.map((client: any) => ({
                                label: client.name,
                                value: client.id,
                            }))}
                            defaultValue={filterSite}
                            mode="multiple"
                            antdSelect={true}

                            onChange={(e) => setFilterSite(e)}
                            placeholder="Select Sites"
                        />
                    </div>


                    <div className="w-full md:w-1/6">
                        {/* <InputGroup
                            label="Date"
                            type="date"
                            defaultValue={filterDate}
                            handleChange={(e) => setFilterDate(e)}
                            className="w-50"
                            inputClassName="w-50" placeholder={""} /> */}
                             <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-3.5">Date</label>
                              <DatePicker onChange={(date)=>setFilterDate(date)} style={{ width:"100%"}}  />
                        {/* <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    /> */}
                    </div>
                    <div className="w-full md:w-1/4">
                        <Select
                            label="Service Type"
                            items={MAINTENANCE_TYPE_DROPDOWN}
                            defaultValue={filterServiceType}
                            mode="multiple"
                            antdSelect={true}
                            inputClassName="w-50"
                            onChange={(e) => setFilterServiceType(e)}
                            placeholder="Select Service Type"
                        />
                        {/* <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label> */}
                        {/* <select
                        id="serviceType"
                        name="serviceType"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={filterServiceType}
                        onChange={(e) => setFilterServiceType(e.target.value)}
                    >
                        <option value="">All Service Types</option>
                        <option value="Type 1">Type 1</option>
                        <option value="Type 2">Type 2</option>
                        <option value="Type 3">Type 3</option>
                       
                    </select> */}


                        <div className="flex justify-end">
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => {
                                    fetchMainanaceReport();
                                }}
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                                </div>
                                </div>

                    <Suspense fallback={<UsersSkeleton />}>

                        <Maintanance data={maintananceReports} onEdit={function (maintananceReport: any): void {
                            let maintananceReportNew = Object.assign({},maintananceReport)
                            maintananceReportNew.client = maintananceReport.client?.id
                            maintananceReportNew.site = maintananceReport.site?.id
                            setMaintenanceReport(maintananceReportNew);

                            setOpenMaintenanceEditModal(true);
                        }} ></Maintanance>

                    </Suspense>

                    <EditMaintenanceModel
                    clients={clients.map((client: any) => ({
                        label: client.name,
                        value: client.id,
                    }))}
                        maintenanceReport={maintananceReport}
                        isOpen={openMaintenanceEditModal}
                      
                        onOpenChange={(isOpen: boolean) => {
                            if (!isOpen) {
                                fetchMainanaceReport()
                            }
                            setOpenMaintenanceEditModal(isOpen)
                        }} roles={[]} />


               
                </>
                )
}




