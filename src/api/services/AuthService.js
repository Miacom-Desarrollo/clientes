import microservices from "../microservices";

const { apiauthmicroservice } = microservices;

const AuthService = {
  loginThirdParty: async (credentials) => {
    try {
      const response = await apiauthmicroservice.post(`/api/login-thirdparty`, credentials);
      const { token, user } = response.data;

      // Guardar el token y el usuario en el local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      console.error('Error al iniciar sesión con terceros:', error);
      throw error;
    }
  },
};

export default AuthService;
