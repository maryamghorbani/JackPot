import {LoginBody, ReturnedUser} from "../../stores/type";

class AuthService {
  public registerReturnedForm = {
    user: {
      email: "ali58@gmail.com",
      name: "Ali",
      birthdate: "2024-12-12",
      totp_device: "iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAADEklEQVR4nO3aQXKzMAyGYc1wgB6Jq+dIHIAZNVj6LJOm8//BLLp4WaQQ/CgbjW3JNZ+5HgaHw+FwOBwO/0vc8lqe95sd3+32fLe4re3tlx93z++Ot3GtcPgkbw++LcfQ/fnuuFu3Nqo9mqJtiw8CDp/hbWhDbXx8HAO+2sceiRxDTNkMh9/E485yWhzGvzzC4XfxlqCVvvU4vIDD7+HtTxvVN4gxQfYVOfaG/1jf4fD/5yak+fLXDw2Fwyd5XdoM7npxytJM7n7B4dd5TZW2VuOlxzgqkpw+LWdTOHyaW//GtQWsxp9VbRJXxYXDr/O18nXTgOy5tAHZc379LTh8ils2+dresHea/VFbRa+Zc3/ZVcLhV7hixPjGxxg2SHeHw+d5G6AYNWku4wluzJyxQi8Oh89yFSM5XypaJmgi5avXBYdf51pzz0twz9xK5COQfgYOn+QtS1Xkttysu2i8VA73FiAcPsVV7uak6b3S3Uzp23/mzfoOh1/gNpa73tfhIXNdMVQRw+FTXEjFcEMtQddzjMjrIYfh8Dn+6MgsM3dowUTIX/o2cPgFXnPjqcln/V+mhuOOH9tCOPwC1xnt0mfJPkBNvrEigcNv4UPS9sx1rde5D9zz4GOVgcMnePVclLlKy2o8jz2X3haEw6/zXIcVaD23+3IfuOe2MPeGcPgUzyNb6+e2m2kL6Jo5Tb0ZRYPDb+Crj+NPhUfOksrm124hHP4515Ht8UpSOdwfow72rI3h8GnuGhU9l74ER6rq3wiGZozD4ZM8V9/sudjQglHIPP04B4fDJ3iUwJoRK4Z7tFuUtPFb0fiDwye5at6XBK3Cd+jNvDnGhcM/5nWl7I/Vbu6p+rZHDYd/ypWOStXqvni0YPYhm+Hwe3h8E3s+RYvpcyhLrB+y/dgWwuEX+JZr89hzMdNZhuW2MOMqEBx+D2+PKdvDbsrX3u57X8vA4Vf5udMXxfDqfW9oGShGwOEzfBivBF3rRbw1q3x9SVo4/HOe15LtvvMWUDPn3ldpVclw+HV+9YLD4XA4HA6H/xX+DfUe4h2r8RvdAAAAAElFTkSuQmCC"
    },
    message: "Registration successful. Please set up MFA using the provided QR code.For security reasons, you won't be able to access the QR code later."
  };

  public loggedUser ={
    token: {
      access: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5ODQyNzYwLCJpYXQiOjE3Mjk4NDE4NjAsImp0aSI6IjU4NzA3YjAwMTUyNDQ5MmNiOGEyOGY2OWNmMzc0NWY4IiwidXNlcl9pZCI6NTJ9.Ko5OxuxrOxcMsa_1U9UB0OSctSWF-4rH9dPoh9CU5nLXoKuQQ92yCO2Cma83KY4oIi620TRy5Rsuu1nMIwk8lBF9l2q2id2k6D53wh-Bit8AfW5cqPDjfLIIT9n06_YbuLrfSQa8PV4MtCyRxEd8NQEbVukYQEZVzzGMkMfw87NQgVahF4OPk3az7Dr9CP9xu21bZMPaZihu8yjDKiJCouL5MGncENuy6GWZr66Y3Pkn_95h242ErduD1XR9oYqq1Iuyt48mIFF7x1Oq2ryzh71HqbU5LDwO3_78NeqcXt5EClaJl3xBIuiJEfSnEPBKsRjBQdSyHMI5tVOPBuZULA",
      refresh: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyOTkyODI2MCwiaWF0IjoxNzI5ODQxODYwLCJqdGkiOiJjYWViMGU4NmQzZDU0YzFiOWIyNTNkOTQ2N2I4ZjBjMSIsInVzZXJfaWQiOjUyfQ.bL-qIBYhDSwQQO849fMKoMjmSVDG9GHrYDW5zpAav2sf-px5W9dTjqgeV05uMrG5dLH4djERRxTkhl6UJp9Rl4_ZcTnt6N3KBKWqehqfLaGfH5E2-4tWeE-BQkRu5206npTr7cAxwu3DAYMJ-X6ZeM5njgAoumIhsVg0PvrmRwC8NTD1oQxTXCtL5nXL0gWHXktxLjMmeQ7HXSJm9o6h4WB3kN_HFIAeU26josc1-FHhug37NbrSGLqhQfXSoqIfBYhHB559Z-cVJKM3PfTdzUAX5p6IezH4hN1abNidh_pUsl5ww-WdNyl_dfY0R0CbFwbPqIrQAiWIW7QoFIk-CQ"
    },
    user: {
      email: "ali58@gmail.com",
      name: "Ali",
      birthdate: "2024-12-12"
    }
  };

  public tokenBalance = {
    balance: 100,
    updated_at: "2024-10-25T07:14:01.279002Z"
  };

  login = async (): Promise<LoginBody> => {
    return this.loggedUser;
  };

  register = async (): Promise<ReturnedUser> => {
    return this.registerReturnedForm;
  };

  logout = async (): Promise<void> => {
    console.log('user logged out');
  };

  getTokenBalance = async (): Promise<Record<string, string|number>> => {
    return this.tokenBalance;
  };
}

export default new AuthService();
