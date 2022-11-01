import Service from "Config/Api/Service";
import {
  genderDropdownURL,
  industryDropdownURL,
  skillDropdownURL,
  cityDropdownURL,
} from "Config/Api/ConfigURL";

class DropdownBusiness extends Service {
  GenderDropdown = async () => {
    let result = await this.get(genderDropdownURL);
    return result;
  };

  IndustryDropdown = async () => {
    let result = await this.get(industryDropdownURL);
    return result;
  };

  AllSkillDropdown = async () => {
    let result = await this.get(skillDropdownURL);
    return result;
  };

  CityDropdown = async () => {
    let result = await this.get(cityDropdownURL);
    return result;
  };
}

const dropdownBusiness = new DropdownBusiness();

export default dropdownBusiness;
