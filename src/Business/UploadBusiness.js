import Service from "Config/Api/Service";
import { uploadCVURL } from "Config/Api/ConfigURL";

class UploadBusiness extends Service {
  UploadCV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    let result = await this.upload(uploadCVURL, formData);
    return result;
  };
}

const uploadBusiness = new UploadBusiness();

export default uploadBusiness;
