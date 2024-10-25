class AuthService {
  login = async (loginRequest): Promise<void> => {
    console.log('loginRequest', loginRequest);
  };

  register = async (registerForm): Promise<void> => {
    console.log('registerForm', registerForm);
  };

  logout = async (): Promise<void> => {};
}

export default new AuthService();
