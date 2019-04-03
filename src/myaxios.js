import axios from "axios";
export default {
  install(Vue) {
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
    //Vue.prototype.$axios = axios;
    // Add a request interceptor
    axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent
        // console.log(config);
        config.headers.Authorization = window.sessionStorage.getItem("token");
        console.log(config);
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
          Vue.prototype.$message.success(response.data.meta.msg);
        } else {
          Vue.prototype.$message.warning(response.data.meta.msg);
        }
        return response;
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
    Vue.prototype.$axios = axios;
  }
};
