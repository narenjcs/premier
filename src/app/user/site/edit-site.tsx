'use client';
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";

import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { STATUS_DROPDOWN } from "@/constants/AppConstant";

import { createSite, getClients, updateSite } from "@/services/fetchapi.services";
import { Client } from "@/types/models";
import {
    Modal,
    
    Button,


} from "antd";



import {  useEffect, useState } from "react";

import { Controller,  useForm } from 'react-hook-form';

interface EditUserModelProps {
    site: any, isOpen: boolean, onOpenChange: (isOpen: boolean) => void
}
export default function EditClientModel({ site, isOpen, onOpenChange }: EditUserModelProps) {

    const {
        control,
        handleSubmit,
      
      
    } = useForm({ defaultValues: site });

    const [status] = useState<{label:string, value:string}[]>(STATUS_DROPDOWN);
    const [clientList, setClientList] = useState<Client[]>([]);
// console.log(selectedClients)

    useEffect(() => {
    
      
            (async () => {
                const data = await getClients();
                setClientList(data);
            }
            )()
    
        }, [])



    const submitForm = async (data: any) => {
        
        if(site.id){
            const response = await updateSite(site.id, data);
            if (response) {
                onOpenChange(false);
            }
        }else{
            const response = await createSite(data);
        if (response) {
            onOpenChange(false);
        }
        }
        
    };

   




    return (
        <>

          {isOpen &&  <Modal open={isOpen} onCancel={()=>{onOpenChange(false)}} footer={null} width="50%">
                
                            <form onSubmit={handleSubmit(submitForm)} >
                              
                                    <ShowcaseSection title={<div className="flex min-w-fit items-center gap-3"> Edit Site</div>} className="!p-6.5">

                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field, fieldState: { error } }) => <InputGroup
                                                label="Site Name"
                                                type="text"
                                                placeholder="Site Name"
                                                className="mb-4.5"
                                                handleChange={(e: any) => field.onChange(e.target.value)}
                                                defaultValue={field.value}
                                                error={error?.message} />
                                            }

                                        />
                                        
                                      
                                        <div className="flex flex-col gap-2">
                                            <label className="text-body-sm font-medium text-dark dark:text-white">Loaction</label>
                                            <div className=" items-center gap-2">
                                                <Controller
                                                    name="location._latitude"
                                                    control={control}
                                                    render={({ field, fieldState: { error } }) =>
                                                        <InputGroup
                                                            label="Latitude"
                                                            type="number"
                                                            placeholder="Latitude"
                                                            className="mb-4.5"
                                                            defaultValue={field.value}
                                                            handleChange={(e: any) => {

                                                                field.onChange(e.target.value);
                                                            }}
                                                            error={error?.message}
                                                        />
                                                    }
                                                />
                                                <Controller
                                                    name="location._longitude"
                                                    control={control}
                                                    render={({ field, fieldState: { error } }) =>
                                                        <InputGroup
                                                            label="Longitude"  
                                                            type="number"
                                                            placeholder="Langitude"
                                                            className="mb-4.5"
                                                            defaultValue={field.value}
                                                            handleChange={(e: any) => {

                                                                field.onChange(e.target.value);
                                                            }}
                                                            error={error?.message}
                                                        />
                                                    }
                                                />
                                              

                                            </div>
                                            
                                            <Controller
                                            name="status"
                                            control={control}
                                            rules={{ required: 'This Field is required'  }}
                                            
                                            render={({ field, fieldState: { error } }) =>  <Select items={status} label="Status" placeholder="Select a Status" value={site.status} onChange={field.onChange} error={error?.message} ></Select>}
                                        />
                                                <Controller
                                                name="client"
                                                control={control}
                                                rules={{}}
                                                render={({ field, fieldState: { error } }) => <Select
                                                    className="max-w-xs"
                                                    label="Client"
                                                    placeholder="Select a Client"
                                                    value={ field.value ? field.value : ''}
                                                
                                                  
                                                    items={clientList.map((client: any) => (
                                                        { label: client.name , value: client.id }
                                                    ))}
                                                    antdSelect={true}
                                                    onChange={(e) => {
                                                    
                                                        field.onChange(e);
                                                    }}
                                                >

                                                </Select>} />
                                        </div>

                                       



                                    </ShowcaseSection>
                               
                                    <div className="flex justify-end gap-2">
                        <Button onClick={() => { onOpenChange(false) }} className="!rounded-2xl !bg-gray-300 !text-gray-700 !px-4 !py-2">Cancel</Button>
                        <Button type="primary" htmlType="submit" className="!rounded-2xl !bg-blue-500 !text-white !px-4 !py-2">Save</Button>
                    </div>
                              
                            </form>
                      
            </Modal>}
        </>
    );
}
