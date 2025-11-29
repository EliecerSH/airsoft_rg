export async function getClientes() {
    const response = await fetch("https://cliente-service-arg.onrender.com/api/v1/clientes");
    if (!response.ok) {
        throw new Error("Error obteniendo clientes");
    }
    return response.json();
}

export async function registrarCliente(data) {
  const resp = await fetch("https://cliente-service-arg.onrender.com/api/v1/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error("Error al registrar cliente");
  }

  return resp.json();
}
