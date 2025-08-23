import CookieConfig from "@/lib/cookieconfig";
import { Login, Profile, Register, UpdateProfile } from "@/model/auth";
import { Languages } from "@/model/language";
import { Nanny } from "@/model/nany";

import axios, { AxiosResponse } from "axios";

//axios.defaults.baseURL = "https://zippy.elrincondsabor.com/api/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

axios.interceptors.request.use(
  async (config) => {
    const _cookieConfig = new CookieConfig();
    const cookie = await _cookieConfig.getToken("jwt");
    //const commonStore = new CommonStore();  //localStorage.getItem('jwt');
    //commonStore.getToken();
    config.headers["Authorization"] = `Bearer ${cookie}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) =>
    axios
      .get<T, AxiosResponse<T>>(url)
      .then(responseBody)
      .catch((error) => error.response?.data),

  getbyvalue: <T>(url: string, value: string) =>
    axios.get<T>(url + "?" + value).then(responseBody),

  post: <T>(url: string, body: object) =>
    axios
      .post<T, AxiosResponse<T>>(url, body)
      .then(responseBody)
      .catch((error) => error.response?.data),

  postForm: <T>(url: string, formData: FormData) =>
    axios
      .post<T, AxiosResponse<T>>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(responseBody)
      .catch((error) => error.response?.data),

  put: <T>(url: string, body: object) =>
    axios
      .put<T, AxiosResponse<T>>(url, body)
      .then(responseBody)
      .catch((error) => error.response?.data),

  putForm: <T>(url: string, formData: FormData) =>
    axios
      .put<T, AxiosResponse<T>>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(responseBody)
      .catch((error) => error.response?.data),
};

const Account = {
  login: (user: Login) => requests.post<Profile>("user/login", user),
  register: (register: Register) =>
    requests.post<Profile>("user/register", register),
  getProfile: () => requests.get<Profile>("user/profile"),
  updateProfile: (profile: UpdateProfile) =>
    requests.put<Profile>("user/update", profile),
};

const Location = {
  getLocations: () => requests.get<Location>("locations"),
};

const Language = {
  getLanguage: () => requests.get<Languages>("languages"),
};

const Nurse = {
  addNurseProfile: (profile: Nanny) => requests.post<Nanny>("nannies", profile),
  getNurseProfile: () => requests.get<Profile>("nurse/profile"),
};

const agent = {
  Account,
  Location,
  Language,
  Nurse,
};

export default agent;
