import Service from "Config/Api/Service";
import { chat, getListMessage } from "Config/Api/ConfigURL";

class MessageBusiness extends Service {
    getListMessage = async () => {
        let result = await this.get(getListMessage);
        return result;
    };

    getListChildMessage = async (messageId) => {
        let result = await this.get(`${getListMessage}/${messageId}`);
        return result;
    };

    chat = async (params) => {
        let result = await this.post(chat, params);
        return result;
    }
}

const messageBusiness = new MessageBusiness();

export default messageBusiness;
