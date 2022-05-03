import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { emailFieldValidation, Required, phoneNumberPattern } from "./../../utility/validation"
import {
  checkAuth, AuthUser, Logout
} from '../../modules/auth'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom';


var renderError = ({ error, touched }) => {
   if (error && touched) {
     return (<span className=""> {error} </span>)
   }
   return ''
 }

  var renderField = ({ input, label, name, type, meta, value }) => {

   return (<div>
     {/* <label>{label}</label> */}
     <div className='form-group'>

       {/* <TextField error={this.renderError(meta) == '' ? false : true} id="standard-error-helper-text" fullWidth={true}
         {...input} type={type} label={label} helperText={this.renderError(meta)}
       /> */}
       <input  {...input} type={type} className={meta.touched && meta.error ? 'is-invalid form-control' : 'form-control'} value={value} />
       {renderError(meta)}
     </div>
   </div>
   )
 }


const LoginForm = (props)=> {
//
// constructor(props){
//   super(props);
//   this.submit = this.submit.bind(this);
//
// }
  let navigate = useNavigate();


  useEffect(()=>{
    console.log(props);
    if (props.isAuthenticated && props.authUserData) {
      console.log("navigate from login");
      navigate("/home")
    }
  })

var submit = (e) => {
    props.AuthUser(e);
  }


  // render(){
    const { handleSubmit, reset, submitting } = props

    return (
      <form onSubmit={handleSubmit(submit)}>


             <Field
               name="email" validate={[emailFieldValidation, Required]}
               component={renderField}
               label="Email"
               type="text"
             />
             <Field
               name="password" validate={Required}
               component={renderField}
               label="Password"
               type="password"
             />
             <div>
               <button type="submit" className="btn btn-primary">
                 Login
               </button>

             </div>
           </form>)
         // }

}


const validate = val => {
  let errors = {}
  if (!val.email) {
    errors.email = "Email is required";
  }
  if (!val.first_name) {
    errors.first_name = "First Name is required";
  }
  if (!val.password) {
    errors.password = "Password is required";
  }


  return errors;
}


const mapStateToProps = ({auth}) => (
  {
    isAuthenticated:auth.isAuthenticated,
    isAuthenticating:auth.isAuthenticating,
    authUserData:auth.authUserData,
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

let Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate
})(Login)

// export default Login;
