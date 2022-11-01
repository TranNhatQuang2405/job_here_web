import Service from "Config/Api/Service";
import { genderDropdownURL } from "Config/Api/ConfigURL";

class DropdownBusiness extends Service {
  GenderDropdown = async () => {
    let result = await this.get(genderDropdownURL);
    return result;
  };
}

const dropdownBusiness = new DropdownBusiness();

export default dropdownBusiness;
