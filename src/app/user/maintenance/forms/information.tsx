import { Controller, useForm } from "react-hook-form";
import { Input, RadioInput, Textarea } from "../edit-maintenance";
import {MAINTENANCE_STATUS_INFORMATION_SAVE, MAINTENANCE_TYPE_DROPDOWN} from "@/constants/AppConstant";
import { Maintenance } from "@/types/models";
import { Select } from "@/components/FormElements/select";

import { use, useCallback, useEffect, useState } from "react";
import { createMaintenanceReport, getClients, getSites, updateMaintenanceReport } from "@/services/fetchapi.services";
import dayjs from "dayjs";
import { getDropDownList } from "@/lib/utils";
import { message } from "antd";


interface MaintenanceInformationFormProps {
    maintenanceReport: any,
    clients: any[],
    setServiceType: (serviceType: string) => void
    setMaintenanceReport: (maintenanceReport: any) => void
    children: (isSubmitted: boolean, isDirty:boolean)=> React.ReactNode
}

export default function MaintenanceInformationForm({maintenanceReport,clients, setServiceType, setMaintenanceReport, children }: MaintenanceInformationFormProps) {

    const [clientList, setClientList] = useState(clients)
    const [siteList, setSiteList] = useState([])
    const [maintenanceFormData, setMaintenanceFormData] = useState(maintenanceReport)

    const {  handleSubmit, control, getValues, watch, reset, setValue,formState: {  isDirty,isSubmitted, } } = useForm<any>({defaultValues: maintenanceReport});

   

//  const getClientList = useCallback(async () => {
//         message.info("Loading Client List")
//         const data = await getClients();
//         setClientList(getDropDownList(data));
//     }, [])

    useEffect(() => {
        setClientList(clients)

    },[
        clients
    ])
    const onSubmit = async(data: any) => {
        
        if(!maintenanceFormData.id){
            const maintenance = await createMaintenanceReport({...data, status: MAINTENANCE_STATUS_INFORMATION_SAVE})
            setMaintenanceReport(maintenance.data)
            data = maintenance.data;
            setMaintenanceFormData(maintenance.data);
            message.success("Maintenance Report Created Successfully")
        }else{
            await updateMaintenanceReport(maintenanceFormData.id,{...data, status: MAINTENANCE_STATUS_INFORMATION_SAVE})
            setMaintenanceReport({...data, status: MAINTENANCE_STATUS_INFORMATION_SAVE})
            message.success("Maintenance Report Updated Successfully")
        }
        
        setTimeout(() => {
            
            reset(data); 
          }, 100);
    };

    useEffect(() => {
        const { unsubscribe } = watch(() => {
          // setFormData(value as SectionData);
        });
        return () => unsubscribe();
      }, [watch()]);
    

    useEffect(() => {
        const serviceType = getValues("service_type");
        console.log("serviceType----", serviceType)
        setServiceType(serviceType);
        
      }, [getValues("service_type")]);


  

      useEffect(() => {
      
        const fetchSiteList = async () => {
            message.info("Loading Site List")
            const client = getValues("client")
           
            if (client) {
                const data = await getSites({filter_field: ["client"], filter_value: [client], filter_operator: ["=="]});
                setSiteList(getDropDownList(data));
              
            }
        };
        fetchSiteList();
        return () => {
            setSiteList([]);
        }
       
    
      }, [getValues("client")]);





    return (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-[70vh]  mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
                <Controller
                    name="client"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) => <Select required items={clientList} label="Client" inputClassName="min-h-[48px]" antdSelect placeholder="Select a Client" value={  field.value ? field.value : ''} onChange={(value)=>{
                        field.onChange(value)
                        // setClient(value)
                        setValue("site", '')
                    }} error={error?.message} ></Select>}
                />
                        
                    <Controller
                    name="site"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) => <Select required items={siteList} label="Site" inputClassName="min-h-[48px]" antdSelect placeholder="Select a Site" value={field.value} onChange={field.onChange} error={error?.message} ></Select>}
                />
                 <Controller
                    name="failure_datetime"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) => <Input label="Date & Time of Failure" value={field.value||''} max={getValues("restart_datetime") && dayjs(getValues('restart_datetime')) || dayjs()}  format="DD/MM/YYYY hh:mm A" showTime={{ use12Hours: true }} type="datetime-local" onChange={field.onChange} error={error?.message} required />
                    } />
                 <Controller
                    name="restart_datetime"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) => <Input label="Date & Time of Re-Starting" value={field.value||''} min={getValues("failure_datetime") && dayjs(getValues('failure_datetime')) } max={dayjs()} type="datetime-local"   format="DD/MM/YYYY hh:mm A" showTime={{ use12Hours: true }} onChange={field.onChange} error={error?.message} required />} />
               
               <Controller
                    name="weg_type"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) => <Input label="WEG Type" value={field.value||''}  onChange={field.onChange} error={error?.message} required  />} />
               
                    <Controller
                    name="weg_no"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) =>  <Input label="WEG No" value={field.value||''} onChange={field.onChange} error={error?.message} required  /> } />
                
                    <Controller
                    name="loc_no"
                    control={control}
                    rules={{ required: 'This Field is required'  }}

                    render={({ field, fieldState: { error } }) =>  <Input label="Loc. No" value={field.value||''} onChange={field.onChange} error={error?.message} required  /> } />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Type of Service  <span className="text-red">*</span></label>
                <div className="flex flex-wrap items-center space-x-4 mt-2">
                    <Controller
                        name="service_type"
                        control={control}
                        rules={{ required: 'This Field is required'  }}

                        render={({ field, fieldState: { error } }) => <RadioInput antdRadio items={MAINTENANCE_TYPE_DROPDOWN} value={field.value||''} onChange={field.onChange} error={error?.message} />}
                    />


                </div>
            </div>

            <Controller
                        name="complaint"
                        control={control}
                        rules={{ required: 'This Field is required'  }}

                        render={({ field, fieldState: { error } }) => <Textarea required value={field.value||''} label="Name of Complaint / Alarm log detail" onChange={field.onChange} error={error?.message}/>} />
            <Controller
                        name="work_performed"
                        control={control}
                        rules={{ required: 'This Field is required'  }}

                        render={({ field, fieldState: { error } }) =><Textarea required value={field.value||''} label="Work Performed" onChange={field.onChange} error={error?.message} /> } />



            <div className="flex right-10 bottom-10 gap-2 absolute" >
                {children(isSubmitted, isDirty)}

            </div>
        </form>
    );
}
