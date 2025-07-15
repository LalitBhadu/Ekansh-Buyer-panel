import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_VERSION;

export default function runAxiosSetup({ headers = {} }) {
  const authToken = Cookies.get("accessToken")

  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.headers = {
    Accept: "application/json",
    Authorization: authToken ? "Bearer " + authToken : undefined, // send the auth token the way backend handles
    ...headers,
  };

  axios.interceptors.response.clear();
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("error", error);
      var errorObject = {};
      if (error.response) {
        errorObject.message = error.response.data.message || "Server Error!!!";
        errorObject.code = error.response.data.code || "X_SERVER_ERROR";
        errorObject.type = error.response.status;
        errorObject.data = error.response.data;
      } else if (error.code === "ERR_NETWORK") {
        errorObject.message = "Network Error!!!";
        errorObject.code = "X_NETWORK_ERROR";
        errorObject.type = 0;
      } else {
        errorObject.message = "Unknown Error!!!";
        errorObject.code = "X_UNKNOWN_ERROR";
        errorObject.type = 0;
      }

      return Promise.reject(errorObject);
    }
  );
}
