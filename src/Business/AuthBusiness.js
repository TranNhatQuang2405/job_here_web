import Service from "Config/Api/Service";
import { signInURL } from "Config/Api/ConfigURL";

class AuthBusiness extends Service {
  SignIn = (email, password) => {
    return new Promise((resolve, reject) => {
      let params = {
        email: email,
        password: password,
      };
      this.post(params, signInURL).then(resolve).catch(reject);
    });
  };
}

const authBusiness = new AuthBusiness();

export default authBusiness;
