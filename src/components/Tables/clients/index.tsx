
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Client } from "@/types/models";
import { Button } from "@/components/ui-elements/button"
import { BsFillPlusCircleFill } from "react-icons/bs";


import { BsPencilFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";

export function Clients({ data, className, onEdit }: { data: Client[], className?: string; onEdit: (user: any) => void }) {

    const [tableData, setTableData] = useState(data);

    const [filterUserEmail, setFilterUserEmail] = useState("");

    const [filterClient, setFilterClient ]= useState("");

    useEffect(() => { 
        let filteredData = data;

        if (filterUserEmail) {
            filteredData = filteredData.filter((client: any) => client.users.filter((user: any)=>user.email.toLowerCase().includes(filterUserEmail.toLowerCase())).length > 0);
        }

        if (filterClient) {
            filteredData = filteredData.filter((client: any) => client.name.toLowerCase().includes(filterClient.toLowerCase()));
        }

        setTableData(filteredData);

    }, [data, filterUserEmail, filterClient]);

    return (<div
        className={cn(
            "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
            className
        )}
    >
        <div className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            <h2 >
                Clients
            </h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3.5">
                    <InputGroup
                        label="Client Name"
                        type="text"
                        placeholder="filter by Client Name"
                        className="mb-4.5"
                        defaultValue={filterClient}
                        inputClassName="text-xs p-2 w-32 h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        handleChange={(e: any) => {

                            setFilterClient(e.target.value)
                        }}

                    />

                    <InputGroup
                        label="User Email"
                        type="text"
                        placeholder="filter by User email"
                        className="mb-4.5"
                        defaultValue={filterUserEmail}
                        inputClassName="text-xs p-2 w-32 h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        handleChange={(e: any) => {

                            setFilterUserEmail(e.target.value)
                        }}

                    />
                </div>
            </div>
            <div style={{ float: "right" }}>
                <Button size={"xsmall"} label={"Add Client"} icon={<BsFillPlusCircleFill />} onClick={() => { onEdit({}) }}></Button> </div>
        </div>

        <Table>
            <TableHeader>
                <TableRow className="border-none uppercase [&>th]:text-center">
                    <TableHead className="min-w-[120px] !text-left">Client Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="!text-right">Contact Number</TableHead>
                    <TableHead className="!text-right">Address</TableHead>

                    <TableHead className="!text-right">users</TableHead>

                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {tableData.map((client: any, i: number) => (
                    <TableRow
                        className="text-center text-base font-medium text-dark dark:text-white"
                        key={client.name + i}
                    >
                        <TableCell className="flex min-w-fit items-center gap-3">

                            <div className="">{client.name}</div>
                        </TableCell>

                        <TableCell>{client.email}</TableCell>

                        <TableCell className="!text-right text-green-light-1">
                            {client.contact_numbers?.join(", ")}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {client.address?.street}, {client.address?.line1}, {client.address?.city}, {client.address?.state}, {client.address?.pincode}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            <div className="flex items-center justify-end gap-x-0">
                                {client?.users?.map((user: any) => <Image key={user.email}
                                    src={user.image}
                                    className="size-8 rounded-full object-cover"
                                    width={40}
                                    height={40}
                                    alt={user.name + " Logo"}
                                    role="presentation"
                                />)}
                            </div>
                        </TableCell>

                        <TableCell className="xl:pl-14.5">
                            <div className="flex items-center justify-end gap-x-3.5">
                                <button className="hover:text-primary" onClick={() => onEdit(client)}>
                                    <span className="sr-only">Edit</span>
                                    <BsPencilFill size={15} className="text-2xl" />
                                </button>


                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>)
}
