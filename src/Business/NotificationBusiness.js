import Service from "Config/Api/Service";
import { countNotification, viewNotification, viewNotificationOfUser, getLastsNotificationOfUser } from "Config/Api/ConfigURL";

class NotificationBusiness extends Service {
    countNotification = async () => {
        let result = await this.get(countNotification);
        return result;
    };

    getLastsNotificationOfUser = async () => {
        let result = await this.get(getLastsNotificationOfUser);
        return result;
    }

    viewNotification = async (notiId) => {
        let result = await this.post(`${viewNotification}/${notiId}`);
        return result;
    }

    viewNotificationOfUser = async () => {
        let result = await this.post(`${viewNotificationOfUser}`);
        return result;
    }

}

const notificationBusiness = new NotificationBusiness();

export default notificationBusiness;
