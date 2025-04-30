


export async function getUsers(params?: {filter_field:string[], filter_value:string[], filter_operator:string[]}) {
  const queryParams = new URLSearchParams(params as any);
  
  const res = await fetch(`/api/users?${queryParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function updateUserRole(id: string, role: string) {
  const res = await fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify({ id, role }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


export async function getClients() {
  const res = await fetch("/api/clients", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function createClient(data: any) {
  const res = await fetch("/api/clients", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function updateClient(id: string, data: any) {
  const res = await fetch("/api/clients", {
    method: "PUT",
    body: JSON.stringify({ id, ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getSites(params?: {filter_field:string[], filter_value:string[], filter_operator:string[]}) {
  const queryParams = new URLSearchParams(params as any);
  const res = await fetch(`/api/sites?${queryParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function createSite(data: any) {
  const res = await fetch("/api/sites", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function updateSite(id: string, data: any) {
  const res = await fetch("/api/sites", {
    method: "PUT",
    body: JSON.stringify({ id, ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMaintenanceReports(params?: {filter_field:string[], filter_value:string[], filter_operator:string[]}) {
  const queryParams = new URLSearchParams(params as any);
  
  const res = await fetch(`/api/maintanance-reports?${queryParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function createMaintenanceReport(data: any) {
  const res = await fetch("/api/maintanance-reports", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function updateMaintenanceReport(id: string, data: any) {
  const res = await fetch("/api/maintanance-reports", {
    method: "PUT",
    body: JSON.stringify({ id, ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function getMaintenanceReportParts(params?: {filter_field:string[], filter_value:string[], filter_operator:string[]}) {
  const queryParams = new URLSearchParams(params as any);
  
  const res = await fetch(`/api/maintanance-reports/parts?${queryParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function createMaintenanceReportParts(data: any) {
  const res = await fetch("/api/maintanance-reports/parts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function updateMaintenanceReportParts( data: any) {
  const res = await fetch("/api/maintanance-reports/parts", {
    method: "PUT",
    body: JSON.stringify({...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

