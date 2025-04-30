import { Collapse } from "antd";
import React, { useState } from "react";
import {useForm} from "react-hook-form";

interface MaintenanceCheckListProps {
  maintenanceReport: any,
    setMaintenanceReport: (maintenanceReport: any) => void
    children: (isSubmitted: boolean, isDirty:boolean)=> React.ReactNode
  }

export default function MaintenanceCheckList({children}: MaintenanceCheckListProps) {
    const sections = [
        {
          title: "Generator",
          items: [
            "Generator Terminal Box",
            "Generator Bearing Noise Condition",
            "Generator Vibration Damper",
            "Generator Lock Bolt Condition",
            "Generator Lubrication",
            "Generator Coupling Bolt Nut Torque Condition",
            "Generator Coupling Fiber Disk and Arm Rubber",
            "Coupling Safety Cover Condition",
            "Generator Temperature Condition"
          ]
        },
        {
          title: "Gear Box",
          items: [
            "Gear Box Oil Condition & Oil Replacing Year",
            "Gear Box Noise Condition",
            "Gear Box Magnetic Stand",
            "Gear Box Torque Arm System",
            "Gear Box Oil Pumping Condition",
            "Gear Box Oil Filter Condition",
            "Gear Box Manifold Block Any Oil Leakage",
            "Gear Box Cooling System Radiators and Motors and Motor Bed",
            "Gear Box Bearing and Gear Visual Checkup in Inspection Door",
            "Gear Box Oil Level",
            "Gear Box Bearing Temperature"
          ]
        },
        {
          title: "Braking System",
          items: [
            "Brake Disk Condition",
            "Brake Pad Thickness and Condition (Approximation)",
            "Brake Caliper Condition (3 Nos)",
            "Brake Lining Hose Any Oil Leakage",
            "Brake Safety Covers Top and Bottom"
          ]
        },
        {
          title: "Hydraulic Pitch System",
          items: [
            "Hydraulic Pitch Cylinder Condition and Any Oil Leakage",
            "Hydraulic Hoses Any Oil Leakages A, B, C, D Port",
            "Hydraulic Oil Level",
            "Hydraulic Oil Condition",
            "Hydraulic Unit Vibration Damper Condition",
            "Hydraulic Unit All Tests Condition",
            "Hydraulic Unit Any Oil Leakages",
            "Hydraulic Motor Bearing and Cable Condition",
            "Hydraulic Pitch and Brake Accumulator N2 Gas Condition",
            "Hydraulic Pressure Holding Time",
            "Balluff Sensor – End and + End Value",
            "Hydraulic Unit Temperature Condition",
            "Hydraulic Unit Wiring Condition",
            "Pitch Bearing Lubrication",
            "Travers Rod Tightening Condition",
            "Carrying Tube Cover Condition"
          ]
        },
        {
          title: "Battery Box",
          items: [
            "12V Battery Volts Condition",
            "Battery Charger Condition",
            "Timer and Relay Working Condition",
            "Panel to Battery Box Connecting Cable Condition",
            "Battery Box Condition",
            "Power Failure Time Battery with Standing Voltage in 60 Sec"
          ]
        },
        {
          title: "Sensors",
          items: [
            "Generator RPM Sensor",
            "Rotor RPM and VOG Sensor Condition",
            "Wind Vane Board and Bearing and Cable Condition",
            "Anemometer Cable and Board and Bearing Condition"
          ]
        },
        {
          title: "Main Bearings",
          items: [
            "Main Bearing Lubrication",
            "Main Bearing Any Noise and Abnormal Sounds",
            "Main Bearing Seating Bolt Nut Torque",
            "Sling Disk Torque Condition and Visual Check",
            "Main Bearing Any Play in Visual Checkup"
          ]
        },
        {
          title: "Blade and Blade Bearings",
          items: [
            "Blade Bearing Lubrication",
            "Blade Bearing Bolt Torque Condition",
            "Blade Bearing Any Play and Noise",
            "Pitch Bolt Checking Condition",
            "Antirotation Device Soft Shoe Condition",
            "Blade Arm Bearing Condition",
            "Blade Any Crack and Damage and Noise"
          ]
        },
        {
          title: "Yaw System",
          items: [
            "Yaw Gear Left and Right Visual Checkup",
            "Yaw Gear Oil Level Condition",
            "Yawing Time Any Noise",
            "Yaw Motor Any Bearing Noise and Terminal Box and Cable Condition",
            "Yaw Bed Bolt Torque Condition",
            "Yawing Time Any Vibration and Any Noise",
            "Yaw Pad Condition",
            "Yaw Surface and Yaw Teeth Lubrication",
            "Yaw Sleeve Ring Bolt and Nut Torque",
            "Yaw Twist Sensor Condition"
          ]
        },
        {
          title: "Top Control Panel",
          items: [
            "Module S and Connector Condition",
            "All Motor Contactor and Overload Relays Condition",
            "VOG Box Condition",
            "Connectors and Cable Condition",
            "Proportional Valve Safety SMPS"
          ]
        },
        {
          title: "Nacelle Cover",
          items: [
            "Nacelle Front and Back Dampers Condition",
            "Top Sky Light Door Condition",
            "Lightning Spike and Earthing Condition",
            "Nacelle Cover Any Damages",
            "Tube Light Condition"
          ]
        },
        {
          title: "Cable Top and Bottom",
          items: [
            "Power Cable Condition",
            "Supply Cable 690V, 230V, 24V Condition",
            "Cable Tower Looping Condition"
          ]
        },
        {
          title: "Bottom Control Panels",
          items: [
            "Capacitor Condition",
            "Capacitor Contactor and Fuse Condition",
            "Modules and Connector Condition"
          ]
        },
        {
          title: "Breaker and Capacitor Panel",
          items: [
            "Thyristor Condition",
            "Generator Breaker and Mechanism System Condition",
            "Bypass Contactor Condition",
            "Air Circuit Breaker Condition",
            "Additional Power Factor Panel Capacitor and Contactor Condition"
          ]
        }
      ];
    const [current, setCurrent] = useState(0);
const [items, setItems] = useState(sections.map((section, index) => ({
    key: index.toString(),
    label: section.title,
    children: (
     <>
     {section.items.map((item, itemIndex) => (
          <div  key={itemIndex.toString()}>
            <p>{item}</p>
          </div>
        ))}
     </>
        
     
    )
  })));
const { register, handleSubmit, formState: { isSubmitted, isDirty } } = useForm();
      
const onSubmit = (data: any) => {
  console.log("Form Data:", data);
};


 return(<>
 <form onSubmit={handleSubmit(onSubmit)} className="min-h-[70vh] mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
 <div className="overflow-y-scroll max-h-[65vh]" >
 <Collapse items={items} defaultActiveKey={['1']} />
 </div >
 <div className="flex right-10 bottom-10 gap-2 absolute">
    {children(isSubmitted, isDirty)}
       
      </div>

</form>
 </>)
    }