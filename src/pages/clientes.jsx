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
  const [pagination, setPagination] = useState(null); // 🔹 guardamos metadata
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData(1); // primera página
  }, []);

  const fetchData = async (page = 1) => {
    try {
      const data = await getClientInvoices(user.id, page);

      if (data && data.invoices) {
        setInvoices(data.invoices.data); 
        setPagination({
          current_page: data.invoices.current_page,
          last_page: data.invoices.last_page,
        });
      }
    } catch (error) {
      console.error("Error cargando facturas del cliente:", error);
    }
  }
  const handleLogout = () => {
    // Eliminar el token y el usuario del local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirigir al login
    f7.views.main.router.navigate("/");
  };

  return (
    <Page>
      <Navbar title="Facturas del Cliente">
        <Button
          slot="right"
          fill
          color="red"
          onClick={handleLogout}
          style={{
            padding: "7px 11px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "#ff3b30",
            color: "white",
            border: "none",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i className="f7-icons" style={{ fontSize: "16px" }}>arrow_left</i>
        </Button>
      </Navbar>

      <BlockTitle style={{ marginTop: 50 }}>
        Bienvenido, {user?.name}
      </BlockTitle>

      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader>Numero factura {invoice.name}</CardHeader>
            <CardContent>
              <p>
                <b>Estado de la factura:</b> {invoice.status}
              </p>
              <p>
                <b>Transmision DIAN:</b>{" "}
                {invoice.transmitted_to_dian ? "Sí" : "No"}
              </p>
              <p>
                <b>Subtotal:</b>{" "}
                ${Number(invoice.subtotal).toLocaleString("es-CO")}
              </p>
              <p>
                <b>IVA (%):</b> {invoice.iva_percentage}
              </p>
              <p>
                <b>Creación de la factura:</b>{" "}
                {new Date(invoice.created_at).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <b>Última actualización:</b>{" "}
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

      {/* 🔹 Controles de paginación */}
      {pagination && (
        <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
          <Button
            fill
            disabled={pagination.current_page === 1}
            onClick={() => fetchData(pagination.current_page - 1)}
          >
            Anterior
          </Button>
          <span style={{ margin: "0 10px" }}>
            Página {pagination.current_page} de {pagination.last_page}
          </span>
          <Button
            fill
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => fetchData(pagination.current_page + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </Page>
  );
};

export default ClientePage;
