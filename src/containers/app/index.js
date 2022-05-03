import React, {Fragment, useEffect} from 'react'
import { Route, Link , BrowserRouter as Router, Routes, Navigate, Outlet} from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'

import {
  checkAuth, AuthUser, Logout
} from '../../modules/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import history from "./../../utility/history";


function requireAuth(props){

}

// const PrivateRoute = (Component ,props, rest)=>{
//   console.log(props);
//   return (
//    <Route {...rest} exact
//      render={(props) => (
//        true  ? (
//          <div>
//            <Component {...props} />
//          </div>
//        ) :
//          (
//            ""
//
//          )
//      )}
//    />
//  )
// }

function PrivateRoute(props) {
  console.log( props);
  const auth = props.isAuthenticated // && props.isAuthenticating //useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
}

function App(props){

  useEffect(() => {
    console.log(props);
    props.checkAuth()

  }, [])
  // // {props.message}

return (<>
 <div>



 {props.isAuthenticating ?  "true" : "false"} - {props.isAuthenticated ? <button onClick={props.Logout}>logout</button> :  <button onClick={props.AuthUser}>AUTH</button>}
<Router history={props.history}>

  <header>


  {props.isAuthenticated ? <> <Link to="/home">Home</Link> <Link to="/about-us">About</Link> <button onClick={props.Logout}>logout</button></> : <Link to="/">Login</Link>}

  </header>

  <main>
  <Fragment>
  <Routes history={props.history}>


  {
    props.isAuthenticating ?
    "loading ..." :

    <>
    <Route exact {...props} path="/"  element={<Login history={props.history} />} />
    <Route exact path='' element={<PrivateRoute {...props}/>}>
          <Route exact path='/about-us' {...props} element={<About history={props.history}/>}/>
        <Route exact {...props} path="/home" onEnter={requireAuth(props)} element={<Home history={props.history} />} />
      </Route>
      </>
  }

  {/*
    <PrivateRoute exact {...props} path="/about-us" component={About} element={<About history={props.history}/>} />

     <Route exact {...props} path="" component={Home} />
    <Route exact {...props} path="/about-us" component={About} />*/}

</Routes>
</Fragment>
  </main>
  </Router>
</div>
</>)
}


const mapStateToProps = ({auth}) => (
// console.log(counter)
  {
    isAuthenticated:auth.isAuthenticated,
    isAuthenticating:auth.isAuthenticating,
    message:auth.message

}
)


const mapDispatchToProps = dispatch =>

  bindActionCreators(
    {
      checkAuth, AuthUser,Logout,
      changePage: (props) => props.history.push("/about-us")
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
