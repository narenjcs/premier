
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import { cn } from "@/lib/utils";
import {  Maintenance } from "@/types/models";
import { Button } from "@/components/ui-elements/button"
import { BsFillPlusCircleFill } from "react-icons/bs";


import { BsPencilFill } from "react-icons/bs";
import { MAINTENANCE_STATUS_DROPDOWN } from "@/constants/AppConstant";
import dayjs from "dayjs";

export function Maintanance({data, className, onEdit }: {data: Maintenance[], className?: string; onEdit: (user: any) => void }) {

   
    
    return (<div
        className={cn(
            "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
            className
        )}
    >
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            Maintanance <div style={{float: "right"}}>
            <Button  size={"xsmall"} label={"Add Maintanance"} icon={<BsFillPlusCircleFill/>} onClick={()=>{onEdit({})}}></Button> </div>
        </h2>
        
        <Table>
            <TableHeader className="text-[10px] text-dark dark:text-white" >
                <TableRow className="border-none uppercase [&>th]:text-center">
                <TableHead className="min-w-[120px] !text-left">Client Name</TableHead>
                    <TableHead className="min-w-[120px] !text-left">Site Name</TableHead>
                    <TableHead className="!text-right">Type</TableHead>
                    <TableHead className="!text-right">Failure Date</TableHead>
                    <TableHead className="!text-right">Restart Date</TableHead>
                    <TableHead className="!text-right">Weg Type</TableHead>
                    <TableHead className="!text-right">Weg No</TableHead>
                    <TableHead className="!text-right">Location No</TableHead>
                    <TableHead className="!text-right">Complaint</TableHead>
                    <TableHead className="!text-right">Work Performed</TableHead>
                    <TableHead className="!text-right">Remarks</TableHead>
                    <TableHead className="!text-right">Reparasantative Name</TableHead>
                    <TableHead className="!text-right">Reparasantative Date</TableHead>
                   

                    <TableHead className="!text-right">Status</TableHead>
            
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody className="text-[10px]">
                {data.map((maintananceReports: Maintenance, i: number) => (
                    <TableRow
                        className="text-center text-base font-medium text-dark dark:text-white"
                        key={ i}
                    >
                        <TableCell className="flex min-w-fit items-center gap-3">
                            
                            <div className="">{maintananceReports.client?.name}</div>
                        </TableCell>

                       
                        <TableCell className="!text-right text-green-light-1">
                          {maintananceReports.site?.name}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.service_type}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                           
                            {maintananceReports.failure_datetime && dayjs(maintananceReports.failure_datetime).format("DD/MM/YYYY hh:mm A")}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                       
                            {maintananceReports.restart_datetime && dayjs(maintananceReports.restart_datetime).format("DD/MM/YYYY hh:mm A")}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.weg_type}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.weg_no}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.loc_no}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.complaint}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.work_performed}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.remarks}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.pwse_name}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {maintananceReports.pwse_date && new Date(maintananceReports.pwse_date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            })}
                        </TableCell>
                        <TableCell className="!text-right text-green-light-1">
                            {MAINTENANCE_STATUS_DROPDOWN.find((status) => status.value === maintananceReports.status)?.label}
                        </TableCell>
                       
                        <TableCell className="xl:pl-14.5">
                            <div className="flex items-center justify-end gap-x-3.5">
                                <button className="hover:text-primary" onClick={() => onEdit(maintananceReports)}>
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
