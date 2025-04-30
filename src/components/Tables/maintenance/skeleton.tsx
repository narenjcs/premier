import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SitesSkeleton() {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Users
      </h2>

      <Table>
        <TableHeader>
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
                    <TableHead className="!text-right">PWSE Reparasantative</TableHead>
                    <TableHead className="!text-right">PWSE Date</TableHead>
                   

                    <TableHead className="!text-right">Status</TableHead>
            
                    <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell colSpan={100}>
                <Skeleton className="h-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
