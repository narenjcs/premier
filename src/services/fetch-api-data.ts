


export async function getUsers(params?: any) {
  const queryParams = new URLSearchParams(params);
  
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

export async function getSites() {
  const res = await fetch("/api/sites", {
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

