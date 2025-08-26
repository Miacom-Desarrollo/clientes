import microservices from "../microservices";

const { apiauthmicroservice } = microservices;

export const getClientInvoices = async (clientId) => {
    try {
        const response = await apiauthmicroservice.get(`/api/app-clientes/invoices/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener facturas del cliente:', error);
        throw error;
    }
};
