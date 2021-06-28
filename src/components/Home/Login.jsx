import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
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

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    msg: null,
  }

  constructor(props) {
    super(props);
  }
  
  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onFinish = (values) => {
    this.setState(values);
    var {email, password} = this.state;
    var loginInfo = {email, password};
    this.props.login(loginInfo);
  };

  render() {
    return(
      <div className="login-form">
        <Row justify="center">
          <Col span={24}>
            <h3>LOGIN FORM</h3>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Form {...layout}
              name="basic"
              initialValues={{}}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}>
              <Form.Item label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
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
  { login, clearErrors }
)(Login);
