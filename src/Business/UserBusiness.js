import Service from "Config/Api/Service";
import {
  updateUserInfoURL,
  changePasswordURL,
  getAppliedJobURL,
  saveCVURL,
  applyJobURL,
  findJobURL,
} from "Config/Api/ConfigURL";

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

  GetAppliedJob = async (month, year) => {
    let result = await this.get(`${getAppliedJobURL}?month=${year}-${month}`);
    return result;
  };

  SaveCV = async (cvUrl, cvName) => {
    let params = {
      cvUrl: cvUrl,
      cvName: cvName,
    };
    let result = await this.post(saveCVURL, params);
    return result;
  };

  ApplyJob = async (cvId, jobId, note) => {
    let params = {
      cvId: cvId,
      jobId: jobId,
      note: note,
    };
    let result = await this.post(applyJobURL, params);
    return result;
  };

  FindJob = async (page, size, keySearch, skillId, cityId, industryId) => {
    let result = await this.get(
      `${findJobURL}?page=${page}&size=${size}&keySearch=${keySearch}&skillId=${skillId}&cityId=${cityId}&industryId=${industryId}`
    );
    return result;
  };
}

const userBusiness = new UserBusiness();

export default userBusiness;
