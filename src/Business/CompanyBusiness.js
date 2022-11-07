import Service from "Config/Api/Service";
import {
  getListCompanyURL,
  getCompanyInfoURL,
  getJobOfCompanyURL,
} from "Config/Api/ConfigURL";

class CompanyBusiness extends Service {
  GetListCompany = async (page, size) => {
    let params = {
      page: page,
      size: size,
    };
    let result = await this.get(getListCompanyURL, params);
    return result;
  };

  GetCompanyInfo = async (companyId) => {
    let result = await this.get(`${getCompanyInfoURL}/${companyId}`);
    return result;
  };

  GetJobOfCompany = async (companyId) => {
    let result = await this.get(`${getJobOfCompanyURL}/${companyId}`);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
