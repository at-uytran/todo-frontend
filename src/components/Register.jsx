import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import {API_URL} from '../config/constants';
import {connect} from 'react-redux';
import {register} from '../actions/authActions';
import {clearErrors} from '../actions/errorActions';
import PropTypes from 'prop-types';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Register extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  onFinish = (values) => {
    this.setState(values);
    var {userName, email, password} = this.state;
    var newUser = {userName, email, password};
    this.props.register(newUser);
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };


  render() {
    return(
      <div className="register-form">
        <Row justify="center">
          <Col span={24}>
            <h3>REGISTER FORM</h3>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Form {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}>
              <Form.Item label="UserName"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: 'Username',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Password',
                  },
                ]}>
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
