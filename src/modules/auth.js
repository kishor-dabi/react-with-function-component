import * as axios from "axios";
// import getHeader from "../utility/axios.js";


export const AUTH_REQUESTED = 'auth/AUTH_REQUESTED'
export const IS_AUTHENTCATING = 'auth/IS_AUTHENTCATING'
export const AUTHENTCATE = 'auth/AUTHENTCATE'
export const LOGOUT = 'auth/LOGOUT'
export const IS_APICALL = 'auth/APICALL'
export const IS_APICALL_Success = 'auth/APICALL_Success'



const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  message:"",
  authUserData:null,
  userList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUESTED:
    console.log(localStorage.getItem("authUserData"));
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? JSON.parse(localStorage.getItem("authUserData")) : false,
      }
    case IS_AUTHENTCATING:

    // console.log(" ------ IS_AUTHENTCATING -----------", {data:getHeader()});
      return {
        ...state,
        isAuthenticating: true,
      }

    case AUTHENTCATE:
      console.log(action.data.response);
      localStorage.setItem("authUserData", JSON.stringify(action.data.response))
      return {
        ...state,
        isAuthenticating: false,
        message:action.data.message,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? JSON.parse(localStorage.getItem("authUserData")) : false,
      }
    case LOGOUT:
      localStorage.removeItem("authUserData")
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? JSON.parse(localStorage.getItem("authUserData")) : {},

      }
    case IS_APICALL_Success:
      console.log(action);
      return {
        ...state,
        userList:action.data ? action.data.response :[]
      }


    default:
      return state
  }
}

export const checkAuth = () => {
  return dispatch => {
    dispatch({
      type: IS_AUTHENTCATING
    })

    // setTimeout(()=>{
      dispatch({
        type: AUTH_REQUESTED
      }, 2000)
    // })

  }
};

export const checkAPI = () => {
  return dispatch => {
    dispatch({
      type: IS_APICALL
    })
  }
};

export const checkAPISuccess = (response, dispatch) => {
  console.log(dispatch);
  return dispatch => {
    let data = {
        type: IS_APICALL_Success,
        data: response.data
      }
      console.log({data});
    dispatch(data);
    // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
  };
}

export const loginSuccess = (response, dispatch) => {
  console.log(dispatch);
  return dispatch => {
    let data = {
        type: AUTHENTCATE,
        data: response.data
      }
      console.log({data});
    dispatch(data);
    // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
  };
}


export const getUserList = (data) => {
  console.log(fetch);
  return dispatch => {
    dispatch({
      type: IS_APICALL
    })
//     let header = getHeader()
// console.log(data, {data:getHeader()});
// let token = await getAuthToken()
axios.get('http://localhost:8888/api/user')
  .then(function (response) {
    console.log(response);
    dispatch({
      type: IS_APICALL_Success,
      data: response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
}
}

export const AuthUser = (data) => {
  console.log(fetch);
  return dispatch => {
    dispatch({
      type: IS_AUTHENTCATING
    })
// console.log(data, {data:getHeader()});
axios.post('http://localhost:8888/api/login', {
    ...data
  })
  .then(function (response) {
    console.log(response);
    dispatch({
      type: AUTHENTCATE,
      data: response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
  // let self = this;
  //
  // fetch(`http://localhost:8888/api/login`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // })
  // .then((res) => res.json())
  // .then((response) => {
  //   console.log({response}, dispatch);
  //
  //     return loginSuccess(response, dispatch)
  // // return  self.dispatch(d)
  //    // d;
  //
  // })
  // .catch((error) => {
  //   console.log(error);
  //   error = {
  //         message: 'Invalid mobile number!'
  //       }
  //  throw error
  // })


  }
}


export const Logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
  }
}


let getAuthToken = async ()=> {
  let tokenData = localStorage.getItem('authUserData');
  let token = "";
  if (tokenData) {
    console.log("________________________");
      token = JSON.parse(tokenData).token
  }
  return token;
}