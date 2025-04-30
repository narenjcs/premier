export const ROLE_ADMIN = "admin"
export const ROLE_USER = "user"
export const ROLE_SUPER_ADMIN = "super-admin"
export const ROLE_SUPERVISOR = "supervisor"
export const ROLE_GUEST = "guest"
export const ROLE_CLIENT = "client"
export const ROLE_VENTOR = "vendor"
export const ROLE_DROPDOWN = [
    { label: "Admin", value: ROLE_ADMIN },
    { label: "User", value: ROLE_USER },
    { label: "Super Admin", value: ROLE_SUPER_ADMIN },
    { label: "Guest", value: ROLE_GUEST },
    { label: "Client", value: ROLE_CLIENT },
    { label: "Vendor", value: ROLE_VENTOR },
    { label: "Supervisor", value: ROLE_SUPERVISOR }
]

export const STATUS_ACTIVE = "active"
export const STATUS_INACTIVE = "inactive"
export const STATUS_DROPDOWN = [
    { label: "Active", value: STATUS_ACTIVE },
    { label: "Inactive", value: STATUS_INACTIVE }
]

export const MAINTENANCE_TYPE_BREAKDOWN = "Breakdown"
export const MAINTENANCE_TYPE_MINOR_CHECK = "Minor Check"
export const MAINTENANCE_TYPE_MAJOR_CHECK = "Major Check"
export const MAINTENANCE_TYPE_INSPECTION = "Inspection"
export const MAINTENANCE_TYPE_DROPDOWN = [
    { label: "Breakdown", value: MAINTENANCE_TYPE_BREAKDOWN },
    { label: "Inspection", value: MAINTENANCE_TYPE_INSPECTION },
    { label: "Minor Check", value: MAINTENANCE_TYPE_MINOR_CHECK },
    { label: "Major Check", value: MAINTENANCE_TYPE_MAJOR_CHECK },
  
]
export const MAINTENANCE_STATUS_PENDING = "Pending"
export const MAINTENANCE_STATUS_APPROVED = "Approved"
export const MAINTENANCE_STATUS_INFORMATION_SAVE = "information saved"
export const MAINTENANCE_STATUS_PARTS_SAVE = "parts saved"
export const MAINTENENCE_CHECKLIST_SAVE = "checklist saved"

export const MAINTENANCE_STATUS_DROPDOWN = [
    { label: "Pending", value: MAINTENANCE_STATUS_PENDING },
    { label: "Approved", value: MAINTENANCE_STATUS_APPROVED },
    { label: "Information Saved", value: MAINTENANCE_STATUS_INFORMATION_SAVE },
    { label: "Parts Saved", value: MAINTENANCE_STATUS_PARTS_SAVE },
    { label: "Checklist Saved", value: MAINTENENCE_CHECKLIST_SAVE },
]