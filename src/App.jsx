import './App.css';
import React from 'react';
import Home from './components/Home';
import Register from './components/Register.jsx';
import Login from './components/Home/Login';
import axios from 'axios';
import { Button, DatePicker, Layout, Menu, Row, Col } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

const {Header, Content, Footer} = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    store.dispatch(loadUser());
  }

  handleRegister = (e) => {
    console.log("Register", e)
  }
  handleLogin = (e) => {
    console.log("Login", e)
  }
  handleLogout = (e) => {
    console.log("Logout", e)
  }
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Router>
            <Header>
              <Row>
                <Col span={6} offset={20}>
                  <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item onClick={this.handleRegister}>
                      <Link to={{pathname: "/register", search: "?sort=name", hash: "#register"}}>
                        Register
                      </Link>
                    </Menu.Item>
                    <Menu.Item onClick={this.handleLogin}>
                      <Link to={{pathname: "/login", search: "?sort=name", hash: "#login"}}>
                        Login
                      </Link>
                    </Menu.Item>
                    <Menu.Item onClick={this.handleLogout}>Logout</Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Content>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
            </Content>
            <Footer>Footer</Footer>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default App;
