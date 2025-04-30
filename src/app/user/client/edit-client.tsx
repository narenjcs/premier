'use client';
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import '@ant-design/v5-patch-for-react-19';

import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { ROLE_CLIENT, ROLE_VENTOR } from "@/constants/AppConstant";
import { updateClient, getUsers, createClient } from "@/services/fetchapi.services";
import {
    Modal,

    Button,


} from "antd";


import { useEffect, useState } from "react";

import { Controller, useForm, useFieldArray } from 'react-hook-form';

interface EditUserModelProps {
    client: any, isOpen: boolean, selectedUsers: string[], onOpenChange: (isOpen: boolean) => void
}
export default function EditClientModel({ client, isOpen, selectedUsers, onOpenChange }: EditUserModelProps) {

    const {
        control,
        handleSubmit,
      
    } = useForm({ defaultValues: {...client, contact_numbers: client.contact_numbers || [' ']} });

    // const [contactNumber, setContactNumber] = useState(client?.contact_numbers || []);
   

    const [userList, setUserList] = useState<any[]>([]);

    const { fields : contactNumbers, append, remove } = useFieldArray({
        control,
        name: "contact_numbers",
      });


    useEffect(() => {

        (async () => {
            const data = await getUsers({ filter_field: 'role', filter_value: [ROLE_CLIENT, ROLE_VENTOR].join(","), filter_operator: 'in' });
            setUserList(data);
        }
        )();


    }, [])

    const submitForm = async (data: any) => {

        if (client.id) {
            const response = await updateClient(client.id, data);
            if (response) {
                onOpenChange(false);
            }
        } else {
            const response = await createClient(data);
            if (response) {
                onOpenChange(false);
            }
        }

    };





    return (
        <>

            {isOpen &&<Modal open={isOpen} onCancel={() => { onOpenChange(false) }} footer={null} width="75%" className="!rounded-2xl !p-0">

                <form onSubmit={handleSubmit(submitForm)} >

                    <ShowcaseSection title={<div className="flex min-w-fit items-center gap-3"> Edit Client</div>} className="!p-6.5">

                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState: { error } }) => <InputGroup
                                label="Name"
                                type="text"
                                placeholder="User Name"
                                className="mb-4.5"
                                handleChange={(e: any) => field.onChange(e.target.value)}
                                defaultValue={field.value}
                                error={error?.message} />
                            }

                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'This Field is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Enter valid Email' } }}
                            render={({ field, fieldState: { error } }) => <InputGroup
                                label="Email"
                                type="email"
                                placeholder="Email"
                                className="mb-4.5"

                                handleChange={(e: any) => field.onChange(e.target.value)}
                                defaultValue={field.value}
                                error={error?.message} />}
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-body-sm font-medium text-dark dark:text-white">Contact Numbers</label>
                            {contactNumbers.map((field, index: number) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <Controller
                                        name={`contact_numbers[${index}]`}
                                        control={control}
                                        rules={{ required: 'Contact number is required', pattern: { value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm, message: 'Enter valid Contact number' } }}
                                        render={({ field, fieldState: { error } }) =>
                                            <InputGroup
                                                label=""
                                                type="text"
                                                placeholder="Contact Number"
                                                className="mb-4.5"
                                                defaultValue={field.value}
                                                handleChange={(e: any) => {
                                                  
                                                    field.onChange(e.target.value);
                                                }}
                                                error={error?.message}
                                            />
                                        } />
                                    <Button danger onClick={() => remove(index)}  disabled={contactNumbers.length === 1}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button type="primary" onClick={()=>{append("")}}  className="w-50">
                                Add Contact Number
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-body-sm font-medium text-dark dark:text-white">Address</label>
                            <div className=" items-center gap-2">
                                <Controller
                                    name="address.street"
                                    control={control}
                                    render={({ field, fieldState: { error } }) =>
                                        <InputGroup
                                            label="Street"
                                            type="text"
                                            placeholder="Street"
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
                                    name="address.line1"
                                    control={control}
                                    render={({ field, fieldState: { error } }) =>
                                        <InputGroup
                                            label="address line 1"
                                            type="text"
                                            placeholder="address line 1"
                                            className="mb-4.5"
                                            defaultValue={field.value}
                                            handleChange={(e: any) => {

                                                field.onChange(e.target.value);
                                            }}
                                            error={error?.message}
                                        />
                                    }
                                />
                                <div className="flex items-center gap-2">
                                    <Controller
                                        name="address.city"
                                        control={control}
                                        render={({ field, fieldState: { error } }) =>
                                            <InputGroup
                                                label="City"
                                                type="text"
                                                placeholder="City"
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
                                        name="address.state"
                                        control={control}
                                        render={({ field, fieldState: { error } }) =>
                                            <InputGroup
                                                label="State"
                                                type="text"
                                                placeholder="State"
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
                                        name="address.pincode"
                                        control={control}
                                        render={({ field, fieldState: { error } }) =>
                                            <InputGroup
                                                label="Pincode"
                                                type="text"
                                                placeholder="pincode"
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

                            </div>

                            <Controller
                                name="users"
                                control={control}
                                rules={{}}
                                render={({ field, fieldState: { error } }) => <Select
                                    className="max-w-xs"
                                    label="Users"
                                    placeholder="Select Users"
                                    defaultValue={ field.value ? field.value : []}
                                    mode="multiple"
                                    // width={1000}
                                    inputClassName="w-lvh"
                                    items={userList.map((user) => (
                                        { label: user.name || user.email, value: user.id, disabled: selectedUsers.includes(user.id) }
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
           
 
            </Modal > }
        </>
    );
}
