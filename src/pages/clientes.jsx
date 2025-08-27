import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
} from "framework7-react";
import { getClientInvoices } from "../api/services/ClienteService";
import { f7 } from "framework7-react";

const ClientePage = () => {
  const [invoices, setInvoices] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientInvoices(user.id);
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

  const handleLogout = () => {
    // Eliminar el token y el usuario del local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirigir al login
    f7.views.main.router.navigate("/");
  };

  return (
    <Page>
      <Navbar title="Facturas del Cliente" />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "32px 0" }}>
        <Card style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
          <CardContent>
            <h2 style={{ margin: 0 }}>¡Bienvenido, {user.name}!</h2>
          </CardContent>
        </Card>
      </div>
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
      <div style={{ padding: "16px" }}>
        <Button
          fill
          color="red"
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007aff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
    </Page>
  );
};

export default ClientePage;
