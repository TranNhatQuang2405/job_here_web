import Service from "Config/Api/Service";
import { getListCVURL, getListCVTemplate, getCVTemplate, createCV, getCVContent } from "Config/Api/ConfigURL";

class CVBusiness extends Service {
  GetListCV = async () => {
    let result = await this.get(getListCVURL);
    return result;
  };

  getListCVTemplate = async (param) => {
    let result = await this.get(getListCVTemplate, param)
    return result;
  }

  getCVTemplate = async (templateId) => {
    let result = await this.get(`${getCVTemplate}/${templateId}`)
    return result;
  }

  createCV = async (data) => {
    let result = await this.post(createCV, data)
    return result;
  }

  getCVContent = async (cvId) => {
    let result = await this.get(`${getCVContent}/${cvId}`)
    return result;
  }
}

const cvBusiness = new CVBusiness();

export default cvBusiness;
