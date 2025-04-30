import { Controller, useForm } from "react-hook-form";
import { Input, Textarea } from "../edit-maintenance";
import { useEffect, useState } from "react";
import { getUsers, updateMaintenanceReport } from "@/services/fetchapi.services";
import { Select } from "@/components/FormElements/select";
import { MAINTENANCE_STATUS_PENDING } from "@/constants/AppConstant";
interface MaintenanceCheckListProps {
  maintenanceReport: any,
  setMaintenanceReport: (maintenanceReport: any) => void
  children: (isSubmitted: boolean, isDirty: boolean) => React.ReactNode
}
export default function MaintenanceRemarkApproveForm({ maintenanceReport, setMaintenanceReport, children }: MaintenanceCheckListProps) {
  const { reset, handleSubmit, control, formState: { isSubmitted, isDirty } } = useForm({
    defaultValues: {

      remarks: maintenanceReport.remarks,
      pwse_name: maintenanceReport.pwse_name,
      pwse_date: maintenanceReport.pwse_date||'',
      site_incharge_name: maintenanceReport.site_incharge_name,
      site_incharge_date: maintenanceReport.site_incharge_date||'',

    },
  });

  const [users, setUsers] = useState<{ label: string, value: string }[]>([])

  useEffect(() => {

    (async () => {
      const data = await getUsers();
      setUsers(data.map((user: any) => {
        return {
          label: user.name + " (" + user.email + ")",
          value: user.email
        }
      }));
    })();
  }, [])

  const onSubmit = (data: any) => {
    updateMaintenanceReport(maintenanceReport.id, {
      ...data,
      status: MAINTENANCE_STATUS_PENDING})

      setTimeout(() => {
            
        reset(); 
      }, 100);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-[70vh] mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">




      <Controller
        name="remarks"
        control={control}
        rules={{ required: 'This Field is required' }}

        render={({ field, fieldState: { error } }) => <Textarea required value={field.value || ''} label="Remarks" onChange={field.onChange} error={error?.message} />} />




      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid  gap-y-4">

          <div>
            <Controller
              name="pwse_name"
              control={control}
              rules={{ required: 'This Field is required' }}

              render={({ field, fieldState: { error } }) => <Select required items={users} label="PWSE Representative" inputClassName="min-h-[48px]" antdSelect placeholder="Select a Client" value={field.value ? field.value : ''} onChange={(value) => {
                field.onChange(value)
              }} error={error?.message} ></Select>}
            />
          </div>
          <div>
            <Controller
              name="pwse_date"
              control={control}
              rules={{ required: 'This Field is required' }}

              render={({ field, fieldState: { error } }) => <Input type="datetime-local" required  label="PWSE Representative Date" inputClassName="min-h-[48px]" antdSelect placeholder=" PWSE Representative Date" value={field.value ? field.value : ''} onChange={field.onChange} error={error?.message} ></Input>}
            />

          </div>
        </div>
        <div className="grid  gap-y-4">
          <div>
            <Controller
              name="site_incharge_name"
              control={control}
              rules={{ required: 'This Field is required' }}

              render={({ field, fieldState: { error } }) => <Select required items={users} label="Approve Site Incharge" inputClassName="min-h-[48px]" antdSelect placeholder="Select a Site Incharge" value={field.value ? field.value : ''} onChange={(value) => {
                field.onChange(value)
              }} error={error?.message} ></Select>}
            />
          </div>
          <div>
            <Controller
              name="site_incharge_date"
              control={control}
              rules={{ required: 'This Field is required' }}

              render={({ field, fieldState: { error } }) => <Input required type="datetime-local" label="Site Incharge Approve Date" inputClassName="min-h-[48px]" antdSelect placeholder=" Site Incharge Approve Date" value={field.value ? field.value : ''} onChange={field.onChange} error={error?.message} ></Input>}
            />

          </div>

        </div>
      </div>

      <div className="text-center mt-6 text-xs text-gray-500">
        ORIGINAL FOR CUSTOMER (White) | DUPLICATE FOR SITE (Yellow) | TRIPLICATE FOR ACCOUNTS (Blue)
      </div>

      <div className="flex right-10 bottom-10 gap-2 absolute">
        {children(isSubmitted, isDirty)}

      </div>
    </form>
  );
}