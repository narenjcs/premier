import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getDropDownList(data: any) {
  return data.map((item: any) => ({
    label: item.name,
    value: item.id
  }))
}
