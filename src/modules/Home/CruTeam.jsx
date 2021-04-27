/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Form, Input, Button, Spin, Alert,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from 'store/stats/actions';
import { Link } from 'react-router-dom';

const CruTeam = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
    setLoading(true);
    dispatch(createTeam(values));
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  return (
    <Spin spinning={loading}>
      { stats?.createTeamStatus?.status === 'error' && (
        <>
          <Alert
            message="Error"
            description={stats?.createTeamStatus?.message}
            type="error"
            showIcon
          />
          <br />
        </>
      )}
      { (typeof stats?.createTeamStatus === 'number') ? (
        <>
          <Alert
            message="Success"
            description={(
              <>
                <span>Team ID: </span>
                <Link to={`/team/${stats?.createTeamStatus}`}>{stats?.createTeamStatus}</Link>
              </>
            )}
            type="success"
            showIcon
          />
          <br />
        </>
      ) : (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          name="createTeam"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          <Form.Item
            label="Team Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Team Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Founder"
            name="founder"
            rules={[
              {
                required: true,
                message: 'Please input your team founder!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Team URL"
            name="url"
            rules={[
              {
                type: 'url',
                required: false,
                message: 'Please input your team URL!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Logo URL"
            name="logo"
            rules={[
              {
                type: 'url',
                required: false,
                message: 'Please input your team logo URL!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Create My Team
            </Button>
          </Form.Item>
        </Form>
      )}
    </Spin>
  );
};

export default CruTeam;
