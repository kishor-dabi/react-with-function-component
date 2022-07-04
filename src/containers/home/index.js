import React, {useEffect} from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import {
  getUserList
} from '../../modules/auth'

// import history from "./../../utility/history";
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table'

function changePage(props){
  // const navigate = useNavigate();
// navigate("about-us", { replace: true });
 console.log(props);
 return <Link to="about-us"/>
 props.history.push("about-us")

};

let RenderuserList = ({userList}) => {
  console.log(userList, "______________________");
  let list = userList.map((list,i)=>{       
    return (

      <tr key={i}>
        <td>{list.user_id}</td>
        <td>{list.full_name}</td>
        <td>{list.email}</td>
        <td>{list.phone_number}</td>
      </tr>

    )       
  }) 

  return list
}

function Home(props) {
  let navigate = useNavigate();

  async function changePage(event) {
    // event.history.push("about-us")
      navigate("/about-us", { replace: true });
    }
    useEffect(() => {
      console.log(props, "+++++++++++++++++++++++++++++++");
      props.getUserList()

    }, [])

return  <div>
    <h1>Home</h1>


    {/* <p>Count: {props.count}</p>

    <p>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement}>Decrement</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => changePage(props)}>
        Go to about page via redux
      </button>
    </p> */}
   

<Table  bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>email</th>
      <th>Phone number</th>
    </tr>
  </thead>
  <tbody>
    {/* <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr> */}
     <RenderuserList {...props}/>
  </tbody>
</Table>
  </div>
}

const mapStateToProps = ({counter, auth}) => (
// console.log(counter, auth)
  {
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
  userList: auth.userList
}
)

const mapDispatchToProps = dispatch =>

  bindActionCreators(
    {
      getUserList,
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: (props) => props.history.push("/about-us")
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
