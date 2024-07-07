export async function getVans(id) {
  const url = id
    ? `http://localhost:3000/vans/${id}`
    : " http://localhost:3000/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}

export async function getHostVans(id) {
  const url = id
    ? `http://localhost:3000/vans/${id}`
    : "http://localhost:3000/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch hostvans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  return res.json();
}
