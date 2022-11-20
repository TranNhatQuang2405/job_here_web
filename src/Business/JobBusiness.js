import Service from "Config/Api/Service";
import {
  getJobInfoURL,
  getNewJobURL,
  getListJobInterestingURL,
  saveJobURL,
  unsavedJobURL,
  getSavedJobURL,
  getAllSavedJobId,
} from "Config/Api/ConfigURL";

class JobBusiness extends Service {
  GetJobInfo = async (jobId) => {
    let result = await this.get(`${getJobInfoURL}/${jobId}`);
    return result;
  };

  GetNewJob = async () => {
    let result = await this.get(getNewJobURL);
    return result;
  };

  GetListJobInteresting = async (page, size) => {
    let result = await this.get(`${getListJobInterestingURL}?page=${page}&size=${size}`);
    return result;
  };

  SaveJob = async (jobId) => {
    let result = await this.post(`${saveJobURL}/${jobId}`);
    return result;
  };

  UnsaveJob = async (jobId) => {
    let result = await this.post(`${unsavedJobURL}/${jobId}`);
    return result;
  };

  GetSavedJob = async (page, size) => {
    let result = await this.get(`${getSavedJobURL}?page=${page}&size=${size}`);
    return result;
  };

  GetAllSavedJobId = async () => {
    let result = await this.get(getAllSavedJobId);
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
