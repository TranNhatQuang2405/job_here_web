import Service from "Config/Api/Service";
import { getListMessage } from "Config/Api/ConfigURL";

class MessageBusiness extends Service {
    getListMessage = async () => {
        let result = await this.get(getListMessage);
        return result;
    };
}

const messageBusiness = new MessageBusiness();

export default messageBusiness;
