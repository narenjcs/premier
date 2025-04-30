export interface Client {
  id: string;
  client_id: number;
  name: string;
  status: true;
  email: string;
  contact_numbers: string[];
  users: User[];

  address: {
    street: string;
    line1: string;
    city: string;
    state: string;
    pincode: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  status: boolean;
}

export interface Site {
  id: string;
  name: string;
  location: {
    _latitude: number;
    _longitude: number;
  };
  client:Client,
  status: boolean;
}

export interface Maintenance {

  id: string;
  client: Client,
  site: Site,
  failure_datetime: string,
  restart_datetime: string,
  weg_type: string,
  weg_no: string,
  loc_no: string,
  service_type: string,
  complaint: string,
  work_performed: string,
  remarks: string,
  pwse_name: string,
  pwse_date: string,
  site_incharge_name: string,
  site_incharge_date: string,
  status: string;
}
export interface MaintenancePart {
  id: string;
  partNo: string;
  description: string;
  itemSlNo: string;
  qty: number;
  maintenance: Maintenance;
  client: string;
  site: string;
}

