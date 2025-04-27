"use client";

import { useForm, useFieldArray } from "react-hook-form";

export default function MaintenanceRepairForm() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      customer: "",
      failure_datetime: "",
      restart_datetime: "",
      weg_type: "",
      weg_no: "",
      loc_no: "",
      service_type: "",
      complaint: "",
      work_performed: "",
      remarks: "",
      pwse_name: "",
      pwse_date: "",
      site_incharge_name: "",
      site_incharge_date: "",
      parts: [{ partNo: "", description: "", itemSlNo: "", qty: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts",
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* --- Top Fields --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Customer" {...register("customer")} />
        <Input label="Date & Time of Failure" type="datetime-local" {...register("failure_datetime")} />
        <Input label="Date & Time of Re-Starting" type="datetime-local" {...register("restart_datetime")} />
        <Input label="WEG Type" {...register("weg_type")} />
        <Input label="WEG No" {...register("weg_no")} />
        <Input label="Loc. No" {...register("loc_no")} />
      </div>

      {/* --- Type of Service --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Type of Service</label>
        <div className="flex flex-wrap items-center space-x-4 mt-2">
          {["Breakdown / Inspection", "Minor Check", "Major Check"].map((service) => (
            <label key={service} className="flex items-center">
              <input type="radio" {...register("service_type")} value={service} className="mr-2" />
              {service}
            </label>
          ))}
        </div>
      </div>

      <Textarea label="Name of Complaint / Alarm log detail" {...register("complaint")} />
      <Textarea label="Work Performed" {...register("work_performed")} />

      {/* --- Spare Parts Section --- */}
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
              <th className="border p-2 w-15">Sl. No</th>
              <th className="border p-2 w-50">Part No.</th>
              <th className="border p-2">Description</th>
              <th className="border p-2 w-50">Item Sl. No.</th>
              <th className="border p-2 w-25">Qty</th>
              <th className="border p-2 w-25">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2 text-center w-15">{index + 1}</td>
                <td className="border p-2">
                  <input {...register(`parts.${index}.partNo`)} className="w-50 p-1 border border-gray-300 rounded" />
                </td>
                <td className="border p-2">
                  <input {...register(`parts.${index}.description`)} className="w-full p-1 border border-gray-300 rounded" />
                </td>
                <td className="border p-2">
                  <input {...register(`parts.${index}.itemSlNo`)} className="w-50 p-1 border border-gray-300 rounded" />
                </td>
                <td className="border p-2">
                  <input type="number" {...register(`parts.${index}.qty`)} className="w-25 p-1 border border-gray-300 rounded" />
                </td>
                <td className="border p-2 text-center w-25">
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

      {/* --- Remarks and Signature Section --- */}
      <Textarea label="Remarks" {...register("remarks")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Signature - PWSE Representative</label>
          <Input placeholder="Name" {...register("pwse_name")} />
          <Input type="date" {...register("pwse_date")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Signature - Site Incharge</label>
          <Input placeholder="Name" {...register("site_incharge_name")} />
          <Input type="date" {...register("site_incharge_date")} />
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-gray-500">
        ORIGINAL FOR CUSTOMER (White) | DUPLICATE FOR SITE (Yellow) | TRIPLICATE FOR ACCOUNTS (Blue)
      </div>

      <div className="flex justify-center">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string };

function Input({ label,error, ...props }: InputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...props}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
      />

    </div>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string };

function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
      ></textarea>
    </div>
  );
}
