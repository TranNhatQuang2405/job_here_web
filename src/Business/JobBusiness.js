import Service from "Config/Api/Service";
import {
  getJobInfoURL,
  getNewJobURL,
  getListJobInterestingURL,
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
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
