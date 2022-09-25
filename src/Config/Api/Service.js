import axios from "axios";
import host from "./Host";

class Service {
    post = async (params, suburl) => {
        let url = host + suburl;
        let result = await axios.post(url, { params: params });
        if (result.data.httpCode === 200) {
            return {
                status: "success",
                data: result.data,
            };
        } else {
            return {
                status: "error",
                data: result.data.message,
            };
        };
    };
}

export default Service;
