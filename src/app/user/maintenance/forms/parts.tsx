import { main } from "@/assets/logos";
import { MAINTENANCE_STATUS_PARTS_SAVE, MAINTENANCE_STATUS_INFORMATION_SAVE } from "@/constants/AppConstant";
import { getMaintenanceReports, getMaintenanceReportParts, createMaintenanceReportParts, updateMaintenanceReportParts, updateMaintenanceReport } from "@/services/fetchapi.services";
import { use, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";



interface MaintenancePartsFormProps {
  maintenanceReport: any,
    setMaintenanceReport: (maintenanceReport: any) => void
    children: (isSubmitted: boolean, isDirty:boolean)=> React.ReactNode
  }

export default function MaintenancePartsDetailsForm({maintenanceReport,setMaintenanceReport, children}:MaintenancePartsFormProps) {

  const [maintenanceParts, setMaintenancePart] = useState<any>({
    client: maintenanceReport.client,
    site:maintenanceReport.site,
    maintenance: maintenanceReport.id,
    parts: [{ partNo: "", description: "", itemSlNo: "", qty: "" }],
  })
    const { register, handleSubmit, control, reset,formState: { isSubmitted, isDirty } } = useForm({
      defaultValues: maintenanceParts,
    });
    
    useEffect(() => {
      (async()=>{

        if(maintenanceReport && maintenanceReport.id){
          let parts = await getMaintenanceReportParts({filter_field: ["maintenance"], filter_value: [maintenanceReport.id], filter_operator: ["=="]})
          if(parts && parts.length > 0){
           
            parts = parts.map((part:any) => {
              return {
                partNo: part.partNo,
                description: part.description,
                itemSlNo: part.itemSlNo,
                qty: part.qty,
              }
            })
            let maintenanceParts ={client:maintenanceReport.client, site:maintenanceReport.site, maintenance:maintenanceReport.id, parts: parts}
            setMaintenancePart(maintenanceParts)
            reset(maintenanceParts)
          }
        }


      })()
      
    },[maintenanceReport])
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: "parts",
    });
  
    const onSubmit = async(data: any) => {
    
       
        let part = await updateMaintenanceReportParts({
          ...data
        })
        if (maintenanceReport.status === MAINTENANCE_STATUS_INFORMATION_SAVE) {
          await updateMaintenanceReport(maintenanceReport.id, {status:MAINTENANCE_STATUS_PARTS_SAVE})
          setMaintenanceReport({ ...data, status: MAINTENANCE_STATUS_PARTS_SAVE });
        }
        setTimeout(() => {
            
          reset(); 
        }, 100);
     
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[70vh] mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
  
  
      <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">Details of Spare Parts Consumed / Replaced</label>
            <button
              type="button"
              onClick={() => append({ partNo: "", description: "", itemSlNo: "", qty: "" })}
              className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              + Add Part
            </button>
          </div>
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Sl. No</th>
                <th className="border p-2">Part No.</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Item Sl. No.</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input {...register(`parts.${index}.partNo`)} className="w-full p-1 border border-gray-300 rounded" />
                  </td>
                  <td className="border p-2">
                    <input {...register(`parts.${index}.description`)} className="w-full p-1 border border-gray-300 rounded" />
                  </td>
                  <td className="border p-2">
                    <input {...register(`parts.${index}.itemSlNo`)} className="w-full p-1 border border-gray-300 rounded" />
                  </td>
                  <td className="border p-2">
                    <input type="number" {...register(`parts.${index}.qty`)} className="w-full p-1 border border-gray-300 rounded" />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
                      disabled={fields.length === 1} // don't allow deleting if only 1 row
                    >
                      ✖ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      <div className="flex right-10 bottom-10 gap-2 absolute">
      {children(isSubmitted, isDirty)}
       
      </div>
    </form>
    );
  }