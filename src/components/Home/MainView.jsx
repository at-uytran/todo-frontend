import React from 'react';
import Login from './Login';
import store from '../../store';
import {connect} from 'react-redux';

const LOGGED_IN = false;

class MainView extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.state)
  }
  
  getAuthState(){
    console.log(store.getState().auth)
    return store.getState().auth && store.getState().auth.isAuthenticated;
  }

  componentDidMount() {
    console.log("this.isAuthenticated", this.isAuthenticated);
  }

  render() {
    if (this.props.isAuthenticated) {
      return(
        <div>MAIN VIEW</div>
      );
    } else {
      return(
        <Login />
      );
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  {}
)(MainView);
