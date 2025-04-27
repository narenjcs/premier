
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import { cn } from "@/lib/utils";
import {  Site } from "@/types/models";
import { Button } from "@/components/ui-elements/button"
import { BsFillPlusCircleFill } from "react-icons/bs";


import { BsPencilFill } from "react-icons/bs";
import { STATUS_DROPDOWN } from "@/constants/AppConstant";

export function Sites({data, className, onEdit }: {data: Site[], className?: string; onEdit: (user: any) => void }) {

   
    
    return (<div
        className={cn(
            "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
            className
        )}
    >
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            Sites <div style={{float: "right"}}>
            <Button  size={"xsmall"} label={"Add Site"} icon={<BsFillPlusCircleFill/>} onClick={()=>{onEdit({})}}></Button> </div>
        </h2>
        
        <Table>
            <TableHeader>
                <TableRow className="border-none uppercase [&>th]:text-center">
                    <TableHead className="min-w-[120px] !text-left">Site Name</TableHead>
                   
                    <TableHead className="!text-right">Location</TableHead>
                    <TableHead className="!text-right">Status</TableHead>
                    <TableHead className="!text-right">Client</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((site: any, i: number) => (
                    <TableRow
                        className="text-center text-base font-medium text-dark dark:text-white"
                        key={site.name + i}
                    >
                        <TableCell className="flex min-w-fit items-center gap-3">
                            
                            <div className="">{site.name}</div>
                        </TableCell>

                       
                        <TableCell className="!text-right text-green-light-1">
                           Latitute: {site.location?._latitude}, Longitude: {site.location?._longitude}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {STATUS_DROPDOWN.find(status=>status.value === site.status)?.label}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {site.client?.name}
                        </TableCell>
                       
                        <TableCell className="xl:pl-14.5">
                            <div className="flex items-center justify-end gap-x-3.5">
                                <button className="hover:text-primary" onClick={() => onEdit(site)}>
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
