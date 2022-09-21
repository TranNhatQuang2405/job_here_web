import axios from "axios";
import host from "./Host";

class Service {
    post = (params, suburl) => {
        return async (resolve, reject) => {
            let url = host + suburl;
            let result = await axios.post(url, { params: params });
            if (result.data.httpCode === 200) {
                resolve({
                    status: "success",
                    data: result.data,
                });
            } else {
                resolve({
                    status: "error",
                    data: "",
                });
            }
        };
    };
}

export default Service;
