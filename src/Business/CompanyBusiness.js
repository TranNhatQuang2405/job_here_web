import Service from "Config/Api/Service";
import {
  getListCompanyURL,
  getCompanyInfoURL,
  getJobOfCompanyURL,
  getTopCompanyURL,
  getCompanyScore,
  getListComment,
  addComment
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

  GetListTopCompany = async () => {
    let result = await this.get(getTopCompanyURL);
    return result;
  };

  GetCompanyScore = async (companyId) => {
    let result = await this.get(`${getCompanyScore}/${companyId}`);
    return result;
  }

  GetListComment = async (companyId, page, size) => {
    let params = {
      companyId: companyId,
      page: page,
      size: size,
    };
    let result = await this.get(getListComment, params);
    return result;
  }

  AddComment = async (params) => {
    let result = await this.post(addComment, params);
    return result;
  }
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
