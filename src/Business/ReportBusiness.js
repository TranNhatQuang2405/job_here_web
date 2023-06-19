import Service from "Config/Api/Service";
import { getTotalJobByIndustry } from "Config/Api/ConfigURL";

class ReportBusiness extends Service {
    getTotalJobByIndustry = async (params) => {
        let result = await this.get(getTotalJobByIndustry, params);
        return result;
    }
}

const reportBusiness = new ReportBusiness();

export default reportBusiness;
