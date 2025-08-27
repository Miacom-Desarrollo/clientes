
import microservices from "../microservices";

const { apiauthmicroservice } = microservices;

export const getClientInvoices = async (clientId, page = 1) => {
  try {
    const response = await apiauthmicroservice.get(
      `/api/app-clientes/invoices/${clientId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener facturas del cliente:", error);
    throw error;
  }
};

