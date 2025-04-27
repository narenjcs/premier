"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";

import { Select as AntdSelect} from 'antd';

type PropsType = {
  label: string;
  items: { value: string; label: string, disabled?: boolean }[];
  prefixIcon?: React.ReactNode;
  className?: string;
  antdSelect?: boolean;
  mode?: undefined | "multiple";
  inputClassName?: string;
  error?:string
  width?: string|number;
  onChange?: (value: string | any[] | undefined) => void;
} & (
    | { placeholder?: string; defaultValue: string | string [] }
    | { placeholder: string; defaultValue?: string  | string []}
  );

export function Select({
  items,
  label,
  defaultValue,
  placeholder,
  prefixIcon,
  className,
  antdSelect,
 inputClassName,
  error,
  width,
  onChange,
  mode,
}: PropsType) {
  const id = useId();

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  return (
    <div className={cn("space-y-3", className)}>
      <label
        htmlFor={id}
        className="block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>

      <div className="relative">
        {prefixIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {prefixIcon}
          </div>
        )}

        {!antdSelect ? <>

          <select

            id={id}
            defaultValue={defaultValue || ""}
            onChange={(event) => { setIsOptionSelected(true), onChange && onChange(event.target.value || "") }}
            className={cn(
              "w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6",
              isOptionSelected && "text-dark dark:text-white",
              prefixIcon && "pl-11.5",
            )}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}

            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
        </> :

          // <HerouiSelect
          //   className={className}
          //   label={label}
            
          //   placeholder={placeholder}
          //   // defaultSelectedKeys={defaultValue}
          //   selectedKeys={defaultValue}
          //   disabledKeys={disabledKeys}
          //   selectionMode={mode}
          //   variant="bordered"
          //   onSelectionChange={(e) => {
             
          //     if (mode === "multiple") {
          //     onChange && onChange(Array.from(e));
          //     }
          //     else {
          //       const selectedValue = Array.from(e)
          //       if(selectedValue.length){
          //         onChange && onChange(String(selectedValue[0]));
          //       }else{
          //         onChange && onChange('');
          //       }
               
          //     }
          //   }}
          // >
          //   {items.map((item) => (
          //     <SelectItem key={item.value} >{item.label}</SelectItem>
          //   ))}
          // </HerouiSelect>
          <AntdSelect options={items}
            defaultValue={defaultValue}
            mode={mode}
            placeholder={placeholder}
            allowClear
            style={{ width: width||'100%' }}
            className={inputClassName}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            showSearch
            onChange={(value) => {
       
              onChange && onChange(value);
            }
            }
            >

          </AntdSelect>
          
          }

            {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
