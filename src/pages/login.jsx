import React from 'react';
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
} from 'framework7-react';
import { f7 } from 'framework7-react';

const Login = () => {
  const handleLogin = () => {
    console.log("Intentando redirigir a /clientes");
    if (f7 && f7.views && f7.views.main) {
      console.log("Enrutador principal disponible, redirigiendo...");
      f7.views.main.router.navigate('/clientes');
    } else {
      console.error("El enrutador principal no está disponible.");
    }
  };

  return (
    <Page loginScreen>
      <LoginScreenTitle>Bienvenido</LoginScreenTitle>
      <List form>
        <ListInput
          label="Identificación"
          type="text"
          name="identificacion"
          placeholder="Ingrese su identificación"
          clearButton
        />
        <ListInput
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          clearButton
        />
      </List>
      <List>
        <ListButton onClick={handleLogin}>Iniciar Sesión</ListButton>
      </List>
      <BlockFooter>
        <p>Usa tus credenciales para ingresar</p>
      </BlockFooter>
    </Page>
  );
};

export default Login;
