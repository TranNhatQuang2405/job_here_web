import Service from "Config/Api/Service";
import { updateUserInfoURL, changePasswordURL } from "Config/Api/ConfigURL";

class UserBusiness extends Service {
  UpdateUserInfo = async (fullname, address, dateOfBirth, phone, gender) => {
    let params = {
      fullname: fullname,
      address: address,
      dateOfBirth: dateOfBirth,
      phone: phone,
      gender: gender,
    };
    let result = await this.post(updateUserInfoURL, params);
    return result;
  };

  ChangePassword = async (oldPassword, newPassword) => {
    let params = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    let result = await this.post(changePasswordURL, params);
    return result;
  };
}

const userBusiness = new UserBusiness();

export default userBusiness;
