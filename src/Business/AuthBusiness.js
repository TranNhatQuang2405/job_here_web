import Service from "Config/Api/Service";
import { signInURL } from "Config/Api/ConfigURL";

class AuthBusiness extends Service {
  SignIn = async (email, password) => {
    let params = {
      email: email,
      password: password,
    };
    return await this.post(params, signInURL);
  };
}

const authBusiness = new AuthBusiness();

export default authBusiness;
