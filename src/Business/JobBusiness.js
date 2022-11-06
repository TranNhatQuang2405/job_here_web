import Service from "Config/Api/Service";
import { getJobInfoURL } from "Config/Api/ConfigURL";

class JobBusiness extends Service {
  GetJobInfo = async (jobId) => {
    let result = await this.get(`${getJobInfoURL}/${jobId}`);
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
