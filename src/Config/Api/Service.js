import axios from "axios";
import { HOST } from "./Host";
import { store } from "Config/Redux/store";
import { LogOut } from "Config/Redux/Slice/UserSlice";
class Service {
  post = async (suburl, params = {}, header = {}) => {
    let url = HOST + suburl;
    var headerStorage = localStorage.getItem("header");
    headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
    let result = await axios.post(url, params, {
      headers: {
        ...headerStorage,
      },
    });
    return result;
  };

  get = async (suburl, params = {}, header = {}) => {
    let url = HOST + suburl;
    var headerStorage = localStorage.getItem("header");
    headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
    let result = await axios.get(url, {
      params: { ...params },
      headers: {
        ...headerStorage,
      },
    });
    return result;
  };

  upload = async (suburl, params = {}, header = {}) => {
    let url = HOST + suburl;
    var headerStorage = localStorage.getItem("header");
    headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
    let result = await axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headerStorage,
      },
    });
    return result;
  };
}

export default Service;
