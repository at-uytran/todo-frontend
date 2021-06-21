import React from 'react';
import axios from 'axios';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import {API_URL} from '../../config/constants';

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
const onFinish = (values) => {
  let api = `${API_URL}/api/auth/sign_in`;
  axios.post(api, values).then((res) => {
    var token = res.data.accessToken;
  }).catch(err => {console.log(err.response)})
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

class Login extends React.Component {
  
  constructor(props) {
    super(props);
  }

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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
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

export default Login;
