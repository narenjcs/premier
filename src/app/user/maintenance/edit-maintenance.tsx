"use client";


import '@ant-design/v5-patch-for-react-19';


import React, { useEffect, useMemo, useState } from 'react';
import { message, Steps, Modal, DatePicker, Radio } from 'antd';
import MaintenanceCheckList from "./forms/checklist";
import MaintenanceInformationForm from "./forms/information";
import MaintenancePartsDetailsForm from "./forms/parts";
import MaintenanceRemarkApproveForm from "./forms/approve";
import { MAINTENANCE_STATUS_INFORMATION_SAVE, MAINTENANCE_STATUS_PARTS_SAVE, MAINTENANCE_TYPE_BREAKDOWN, MAINTENANCE_TYPE_INSPECTION } from "@/constants/AppConstant";
import { Maintenance } from "@/types/models";
import dayjs from 'dayjs'


interface MaintenanceRepairFormProps {
  clients: any[], maintenanceReport: Maintenance, isOpen: boolean, roles: { label: string, value: string }[], onOpenChange: (isOpen: boolean) => void
}


const MaintenanceForm: React.FC<MaintenanceRepairFormProps> = ({ maintenanceReport, isOpen, clients, onOpenChange }: MaintenanceRepairFormProps) => {

 
  return (
    <>

      {isOpen && <Modal open={isOpen} onCancel={() => { onOpenChange(false) }} footer={null} width={"75%"} style={{ paddingTop: "10px" }} title="Maintenance" className="!rounded-2xl">
        <MaintenanceWized maintenanceReport={maintenanceReport} clients={clients}  />

      </Modal>}
    </>
  );
};

export default MaintenanceForm
interface MaintenanceWizedProps {
  clients: any[], maintenanceReport: Maintenance
}


const MaintenanceWized: React.FC<MaintenanceWizedProps> = ({ maintenanceReport,  clients }: MaintenanceWizedProps) => {



  const [current, setCurrent] = useState(0);
  const [serviceType, setServiceType] = useState<string>("")
  const [items, setItems] = useState<any[]>([])
  const [maintenanceReportData, setMaintenanceReportData] = useState<any>(maintenanceReport || {})

  useEffect(() => {
    
      setCurrent(0);
      setServiceType(maintenanceReport?.service_type || "")
      setMaintenanceReportData(maintenanceReport || {})
    
  }, [ JSON.stringify(maintenanceReport)])

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = useMemo(() => {
    let numberOfSteps = 3
    const navButtons = (disableStatus: string[], isSubmitted: boolean, isDirty: boolean) => {
      console.log("isDirty", maintenanceReportData.status)
      return (<>


        {current > 0 && (
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="button"
            style={{ margin: '0 8px' }}
            onClick={() => {

              if (isDirty && !isSubmitted) {
                message.error("Please save the form before moving to previous step")
              } else {
                prev()
              }
            }}
          >
            Previous
          </button>

        )}

        {current < numberOfSteps && (

          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="button"
            disabled={disableStatus.includes(maintenanceReportData.status || '')}
            onClick={() => {
              
              if (isDirty && !isSubmitted) {

                message.error("Please save the form before moving to next step")
              } else {
                next()
              }

            }}
          >
            Next
          </button>


        )}

        {<button
          className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="submit"
        // disabled={!(!isSubmitted && isDirty)}
        >
          Save
        </button>}
      </>)
    }

    let steps = [
      {
        title: 'Information',
        content: <MaintenanceInformationForm maintenanceReport={maintenanceReportData} clients={clients} setServiceType={setServiceType} setMaintenanceReport={setMaintenanceReportData}>
          {(isSubmitted, isDurty) => (<>{navButtons([""], isSubmitted, isDurty)}</>)}
        </MaintenanceInformationForm>,
      },
      {
        title: 'Part Details',
        content: <MaintenancePartsDetailsForm maintenanceReport={maintenanceReportData} setMaintenanceReport={setMaintenanceReportData} >
          {(isSubmitted, isDurty) => (<>{navButtons([MAINTENANCE_STATUS_INFORMATION_SAVE], isSubmitted, isDurty)}</>)}
        </MaintenancePartsDetailsForm>,
      },
      {
        title: 'Checklist',
        content: <MaintenanceCheckList maintenanceReport={maintenanceReportData} setMaintenanceReport={setMaintenanceReportData}>
          {(isSubmitted, isDurty) => (<>{navButtons([MAINTENANCE_STATUS_PARTS_SAVE], isSubmitted, isDurty)}</>)}

        </MaintenanceCheckList>,
        disabled: [MAINTENANCE_TYPE_INSPECTION, MAINTENANCE_TYPE_BREAKDOWN].includes(serviceType) || !serviceType
      },
      {
        title: 'Remark And Approval',
        content: <MaintenanceRemarkApproveForm maintenanceReport={maintenanceReportData} setMaintenanceReport={setMaintenanceReportData}>
          {(isSubmitted, isDurty) => (<>{navButtons([], isSubmitted, isDurty)}</>)}

        </MaintenanceRemarkApproveForm>,
      },
    ]
    console.log(steps,serviceType)
    steps = steps.filter(e => !e.disabled)
    numberOfSteps = steps.length
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    
    setItems(items)
    return steps[current]?.content
  }, [serviceType, current, clients, JSON.stringify(maintenanceReportData)]);



  return (
    <>

       <div style={{ marginTop: 24 }}>

        </div>
        <Steps current={current} items={items} />
        <div >{steps}</div>

    
    </>
  );
}





export function Input({ label, name, value, type = "text", placeholder = "", onChange, required, error, max, min, format, showTime }: any) {

  const renderElement = useMemo(() => {
    switch (type) {
      case 'text':
      case 'number':
      case 'email':
        return (<input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white" />)
      case 'datetime-local':
      case 'datetime':
      case 'date':

        return <DatePicker format={format} defaultValue={value && dayjs(value)} onChange={(value) => {
          onChange && onChange(value && value.unix() * 1000)
        }} style={{ height: '48px', width: "100%" }} maxDate={max} minDate={min} showTime={showTime} disabledTime={(date) => {
          if (!date ) return {};

          return {
            disabledHours: () => {
              const hours = [];
              if (min && date.isSame(min, 'day')) {
                for (let i = 0; i < min.hour(); i++) hours.push(i);
              }
              if (max && date.isSame(max, 'day')) {
                for (let i = max.hour() + 1; i < 24; i++) hours.push(i);
              }
              return hours;
            },
            disabledMinutes: () => {
              const minutes = [];
              if (min && date.isSame(min, 'hour')) {
                for (let i = 0; i < min.minute(); i++) minutes.push(i);
              }
              if (max && date.isSame(max, 'hour')) {
                for (let i = max.minute() + 1; i < 60; i++) minutes.push(i);
              }
              return minutes;
            },
            // You can add disabledMinutes/Seconds similarly if needed
          };
        }} />
    }
  }, [type, onChange, min, max, value])

  return (
    <div className="space-y-3">
      {label && <label className="block text-body-sm font-medium text-dark dark:text-white">{label} {required && <span className="text-red">*</span>}</label>}
      {renderElement}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

export function Textarea({ label, name, value, onChange, required, error }: any) {
  return (
    <div className="space-y-3">
      <label className="block text-body-sm font-medium text-dark dark:text-white">{label}  {required && <span className="text-red">*</span>} </label>
      <textarea
        name={name}
        rows={3}
        onChange={onChange}
        value={value}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white"
      ></textarea>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
export function RadioInput({ items, value, onChange, error }: any) {
 return  <>
  <Radio.Group
          name="radiogroup"
          defaultValue={value}
          options={items}
          onChange={(event)=>{
            onChange && onChange(event.target.value)
          }} />
          {error && (
            <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
          )}

</>}