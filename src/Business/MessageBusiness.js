import Service from "Config/Api/Service";
import { chat, getListMessage, countUnreadMessage, viewAllMessage, deleteMessage } from "Config/Api/ConfigURL";

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

    countUnreadMessage = async () => {
        let result = await this.get(countUnreadMessage);
        return result;
    }

    viewAllMessage = async (messageId) => {
        let result = await this.post(`${viewAllMessage}/${messageId}`);
        return result;
    }

    deleteMessage = async (messageId) => {
        let result = await this.post(`${deleteMessage}/${messageId}`);
        return result;
    }
}

const messageBusiness = new MessageBusiness();

export default messageBusiness;
