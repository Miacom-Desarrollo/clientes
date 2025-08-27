import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "framework7-react";
import { getClientInvoices } from "../api/services/ClienteService";

const ClientePage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientInvoices(1004);
        console.log(data, "data");
        if (data && data.invoices) {
          setInvoices(data.invoices);
        }
      } catch (error) {
        console.error("Error cargando facturas del cliente:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page>
      <BlockTitle>Listado de Facturas</BlockTitle>

      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader>Numero factura {invoice.name}</CardHeader>
            <CardContent>
              <p>
                <b>Estado de la factura:</b> {invoice.status}
              </p>
              <p>
                <b>Transmision DIAN:</b> {invoice.transmitted_to_dian ? "si" : "no"}
              </p>
              <p>
                <b>Subtotal:</b> ${Number(invoice.subtotal).toLocaleString("es-CO")}
              </p>
              <p>
                <b>IVA (%):</b> {invoice.iva_percentage}
              </p>
             
              <p>
                <b>Creacion de la factura:</b>{" "}
                {new Date(invoice.created_at).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <b>Ultima actualización:</b>{" "}
                {new Date(invoice.updated_at).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardContent>
            <CardFooter>
              <span>Total de la factura:</span>
              <b>${Number(invoice.total).toLocaleString("es-CO")}</b>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No hay facturas disponibles</p>
      )}
    </Page>
  );
};

export default ClientePage;
