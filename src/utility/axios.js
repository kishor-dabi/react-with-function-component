import fetch from 'isomorphic-fetch'
import axios from "axios";


export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};


axios.interceptors.request.use(
  function(successfulReq) {
    const UserData = localStorage.getItem("authUserData") ? JSON.parse(localStorage.getItem("authUserData")) : {};
    const jwtToken = UserData.token;

    if (jwtToken) {
      successfulReq.headers['Authorization'] = 'Bearer ' + jwtToken
    }
    // successfulReq.headers['Content-Type'] = 'application/json';
    return successfulReq
  }, 
  function(error) {
    return Promise.reject(error);
  }
);

// import Config from '../config'

// const handleHTTPErrors = (res) => {
//   if (res.ok) return res
//   return res.json().then((err) => { throw err })
// }

//  export default ()=> {
//   let userData = localStorage.getItem("authUserData") ? JSON.parse(localStorage.getItem("authUserData")) : {};
//   const jwtToken = userData.token;
//   if (jwtToken) {
//     let authAddedOptions = {}
//     if (typeof options !== 'object') {
//       authAddedOptions = {}
//     }
//     if (typeof authAddedOptions.headers !== 'object') {
//       authAddedOptions.headers = {}
//     }
//     authAddedOptions.headers = {
//       ...authAddedOptions.headers,
//       Authorization: "bearer "+jwtToken,
//       Accept: 'application/json',
//       'Content-Type': "application/json"
//     }
//     return authAddedOptions;
//   } else {
//     let optionData = {
//       Accept: 'application/json',
//     }
//     return optionData;
//     // return axios.create({
//     //   baseURL: "http://localhost:8888",
//     //   // headers: {
//     //   //   Authorization : `Bearer ${localStorage.getItem("access_token")`
//     //   //   }
//     //   // }
//     // })
//     // return fetch(url, op).then(handleHTTPErrors)
//   }
// }
// module.exports = {getHeader}
//
// import * as data from "./reducers/auth"
//
// export const  Axios = axios.create({
//   baseURL: 'http://localhost:8888/api/',
//   timeout: 1200000,
//   headers: {'Authorization': localStorage.getItem('user') ? 'bearer '+ JSON.parse(localStorage.getItem('user')).token : null }
// });
//
// export const AxiosNoAUTH = axios.create({
//   baseURL: 'http://localhost:8888/api/',
//   timeout: 1200000,
//   // headers: {'Authorization': localStorage.getItem('user') ? 'bearer '+ JSON.parse(localStorage.getItem('user')).token : null }
// });
