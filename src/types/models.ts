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


