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
            <CardHeader>{invoice.name}</CardHeader>
            <CardContent>
              <p>
                <b>Estado:</b> {invoice.status}
              </p>
              <p>
                <b>Fecha:</b>{" "}
                {new Date(invoice.created_at).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardContent>
            <CardFooter>
              <span>Total</span>
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
