
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ROLE_DROPDOWN } from "@/constants/AppConstant";

import { cn } from "@/lib/utils";
import Image from "next/image";


import { BsPencilFill } from "react-icons/bs";

export function Users({data, className, onEdit }: {data:any, className?: string; onEdit: (user: any) => void }) {

   
    
    return (<div
        className={cn(
            "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
            className
        )}
    >
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            Top users
        </h2>

        <Table>
            <TableHeader>
                <TableRow className="border-none uppercase [&>th]:text-center">
                    <TableHead className="min-w-[120px] !text-left">User Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="!text-right">Role</TableHead>
                  
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((user: any, i: number) => (
                    <TableRow
                        className="text-center text-base font-medium text-dark dark:text-white"
                        key={user.name + i}
                    >
                        <TableCell className="flex min-w-fit items-center gap-3">
                            <Image
                                src={user.image}
                                className="size-8 rounded-full object-cover"
                                width={40}
                                height={40}
                                alt={user.name + " Logo"}
                                role="presentation"
                            />
                            <div className="">{user.name}</div>
                        </TableCell>

                        <TableCell>{user.email}</TableCell>

                        <TableCell className="!text-right text-green-light-1">
                            {ROLE_DROPDOWN.find((role) => role.value === user.role)?.label}
                        </TableCell>

                       
                        <TableCell className="xl:pl-14.5">
                            <div className="flex items-center justify-end gap-x-3.5">
                                <button className="hover:text-primary" onClick={() => onEdit(user)}>
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
