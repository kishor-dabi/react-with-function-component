
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
// import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import rootReducerObj from './modules'
import thunk from "redux-thunk";
import * as History from 'history'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./utility/axios"
import { reducer as form } from 'redux-form';
import "./index.css"
const history = History.createBrowserHistory()
// history.push("/about-us")
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";

//
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#ffffff", // This is an orange looking color
//       "font-family": "Work Sans, sans-serif"
//     },
//     secondary: {
//       main: "#ffcc80" //Another orange-ish color
//     }
//   },
//   primary: 'purple',
//   secondary: 'green',
//   error: 'red',
//   // fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
// });


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ...rootReducerObj,
  // auth: authReducer,
  // dashboard: dashboardReducer,
  // users: userReducer,
  // doctorsList: doctors_list,
  // payment: paymentReducer,

  form: form

});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
      <App history={history} />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
