'use client';
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { updateUserRole } from "@/services/fetchapi.services";
import {
    Modal,
   
    Button,
    
} from "antd";
import Image from "next/image";
import { use, useEffect } from "react";

import { Controller, useForm } from 'react-hook-form';

interface EditUserModelProps {
    user: any, isOpen: boolean, roles: { label: string, value: string }[], onOpenChange: (isOpen: boolean) => void}
export default function EditUserModel({user,isOpen, roles, onOpenChange}: EditUserModelProps) {
  
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({defaultValues: user});

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const submitForm = async(data: any) => {
        console.log(data);
        const response = await updateUserRole(user.id, data.role);
        if (response) {
            onOpenChange(false);
        }
    };
   
    return (
        <>

           {isOpen&& <Modal open={isOpen} onCancel={()=>{onOpenChange(false)}} footer={null} width={600} className="!rounded-2xl">
               
                            <form onSubmit={handleSubmit(submitForm)} >
                          
                              <ShowcaseSection title={<div className="flex min-w-fit items-center gap-3">{user?.image && <Image
                                                               src={user.image}
                                                               className="size-8 rounded-full object-cover"
                                                               width={40}
                                                               height={40}
                                                               alt={user.name + " Logo"}
                                                               role="presentation"
                                                           />} Edit User</div>} className="!p-6.5">
                                   
                                        <InputGroup
                                            label="Name"
                                            type="text"
                                            placeholder="User Name"
                                            className="mb-4.5"
                                            disabled={true}
                                            defaultValue={user.name}
                                        />
                                        <InputGroup
                                            label="Email"
                                            type="text"
                                            placeholder="Email"
                                            className="mb-4.5"
                                            disabled={true}
                                            defaultValue={user.email}
                                        />
                                        <Controller
                                            name="role"
                                            control={control}
                                            render={({ field }) => {    
                                                console.log(field);
                                                return <Select items={roles} label="Role"  placeholder="Select a role" value={field.value||''} onChange={field.onChange} ></Select>
                                            }}
                                        />

                                       
                                   
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
