import { ReturnedUser, User} from "../../stores/type";

class AuthService {
  private initialized = false;
  private account?:User;
  public accessToken: string;

  public returnedForm = {
    user: {
      email: "ali58@gmail.com",
      name: "Ali",
      birthdate: "2024-12-12",
      totp_device: "iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAADEklEQVR4nO3aQXKzMAyGYc1wgB6Jq+dIHIAZNVj6LJOm8//BLLp4WaQQ/CgbjW3JNZ+5HgaHw+FwOBwO/0vc8lqe95sd3+32fLe4re3tlx93z++Ot3GtcPgkbw++LcfQ/fnuuFu3Nqo9mqJtiw8CDp/hbWhDbXx8HAO+2sceiRxDTNkMh9/E485yWhzGvzzC4XfxlqCVvvU4vIDD7+HtTxvVN4gxQfYVOfaG/1jf4fD/5yak+fLXDw2Fwyd5XdoM7npxytJM7n7B4dd5TZW2VuOlxzgqkpw+LWdTOHyaW//GtQWsxp9VbRJXxYXDr/O18nXTgOy5tAHZc379LTh8ils2+dresHea/VFbRa+Zc3/ZVcLhV7hixPjGxxg2SHeHw+d5G6AYNWku4wluzJyxQi8Oh89yFSM5XypaJmgi5avXBYdf51pzz0twz9xK5COQfgYOn+QtS1Xkttysu2i8VA73FiAcPsVV7uak6b3S3Uzp23/mzfoOh1/gNpa73tfhIXNdMVQRw+FTXEjFcEMtQddzjMjrIYfh8Dn+6MgsM3dowUTIX/o2cPgFXnPjqcln/V+mhuOOH9tCOPwC1xnt0mfJPkBNvrEigcNv4UPS9sx1rde5D9zz4GOVgcMnePVclLlKy2o8jz2X3haEw6/zXIcVaD23+3IfuOe2MPeGcPgUzyNb6+e2m2kL6Jo5Tb0ZRYPDb+Crj+NPhUfOksrm124hHP4515Ht8UpSOdwfow72rI3h8GnuGhU9l74ER6rq3wiGZozD4ZM8V9/sudjQglHIPP04B4fDJ3iUwJoRK4Z7tFuUtPFb0fiDwye5at6XBK3Cd+jNvDnGhcM/5nWl7I/Vbu6p+rZHDYd/ypWOStXqvni0YPYhm+Hwe3h8E3s+RYvpcyhLrB+y/dgWwuEX+JZr89hzMdNZhuW2MOMqEBx+D2+PKdvDbsrX3u57X8vA4Vf5udMXxfDqfW9oGShGwOEzfBivBF3rRbw1q3x9SVo4/HOe15LtvvMWUDPn3ldpVclw+HV+9YLD4XA4HA6H/xX+DfUe4h2r8RvdAAAAAElFTkSuQmCC"
    },
    message: "Registration successful. Please set up MFA using the provided QR code.For security reasons, you won't be able to access the QR code later."
  };
  login = async (loginRequest): Promise<void> => {
    console.log('loginRequest', loginRequest);
  };

  register = async (): Promise<ReturnedUser> => {
    return this.returnedForm;
  };

  initialize = async (): Promise<void> => {
    if (this.initialized) return;
    this.initialized = true;
  };

  logout = async (): Promise<void> => {
    console.log('user logged out');
  };

  getToken = async (): Promise<string> => {
    await this.initialize();
    // Try to grab account from storage if present
    if (!this.account) {
    }
    // If account found start auth process
    if (this.account) {
      // Acquiring token
    }
    return this.accessToken;
  };
}

export default new AuthService();
