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
import AuthService from '../api/services/AuthService';

const Login = () => {
  const handleLogin = async () => {
    try {
      const credentials = {
        identification: document.querySelector('input[name="identificacion"]').value,
        password: document.querySelector('input[name="password"]').value,
      };
      

      const { token, user } = await AuthService.loginThirdParty(credentials);
      console.log('Login exitoso:', user);

      // Redirigir a clientes si el login es exitoso
      f7.views.main.router.navigate('/clientes');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      f7.dialog.create({
        title: 'Error de Autenticación',
        text: 'No se pudo iniciar sesión. Verifique sus credenciales.',
        buttons: [
          {
            text: 'Aceptar',
            bold: true,
            color: 'red',
          },
        ],
        cssClass: 'custom-dialog',
      }).open();
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
