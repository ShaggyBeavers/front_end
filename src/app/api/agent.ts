import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:8080";
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
  };
  
  const Account = {
    login: (values: { email: string; password: string }) => requests.post("api/auth/sign-in", values),
    register: (values: { firstName:string,lastName:string,email: string; password: string }) => requests.post("api/auth/sign-up", values),
    currentUser: () => requests.get("account/currentUser"),//prototype
    passwodRecovery: (values: any) =>
      requests.post("account/passwordRecovery", values),
    googleLogin: (values:any) => requests.post("account/google_login",values)//prototype
  };
  
  const agent = {
    Account,
  };

  export default agent;