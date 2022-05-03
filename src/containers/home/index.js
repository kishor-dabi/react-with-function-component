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
  checkAPIUser
} from '../../modules/auth'

// import history from "./../../utility/history";
import {Link, useNavigate} from 'react-router-dom';

function changePage(props){
  // const navigate = useNavigate();
// navigate("about-us", { replace: true });
 console.log(props);
 return <Link to="about-us"/>
 props.history.push("about-us")

};

function Home(props) {
  let navigate = useNavigate();

  async function changePage(event) {
    // event.history.push("about-us")
      navigate("/about-us", { replace: true });
    }
    useEffect(() => {
      console.log(props);
      props.checkAPIUser()

    }, [])

return  <div>
    <h1>Home</h1>
    <p>Count: {props.count}</p>

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
    </p>
  </div>
}

const mapStateToProps = ({counter}) => (
// console.log(counter)
  {
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
}
)

const mapDispatchToProps = dispatch =>

  bindActionCreators(
    {
      checkAPIUser,
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
