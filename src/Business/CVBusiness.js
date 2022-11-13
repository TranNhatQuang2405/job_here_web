import Service from "Config/Api/Service";
import { getListCVURL } from "Config/Api/ConfigURL";

class CVBusiness extends Service {
  GetListCV = async () => {
    let result = await this.get(getListCVURL);
    return result;
  };
}

const cvBusiness = new CVBusiness();

export default cvBusiness;
