import Service from "Config/Api/Service";
import {
  genderDropdownURL,
  industryDropdownURL,
  skillDropdownURL,
  cityDropdownURL,
  titleDropdownURL,
  jobtypeDropdownURL,
  unitDropdownURL,
  experienceDropdownURL,
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

  TitleDropdown = async () => {
    let result = await this.get(titleDropdownURL);
    return result;
  };

  JobtypeDropdown = async () => {
    let result = await this.get(jobtypeDropdownURL);
    return result;
  };

  SkillDropdown = async (skillId) => {
    let result = await this.get(`${skillDropdownURL}/${skillId}`);
    return result;
  };

  UnitDropdown = async () => {
    let result = await this.get(unitDropdownURL);
    return result;
  };

  ExperienceDropdown = async () => {
    let result = await this.get(experienceDropdownURL);
    return result;
  };
}

const dropdownBusiness = new DropdownBusiness();

export default dropdownBusiness;
