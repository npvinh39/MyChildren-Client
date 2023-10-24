import * as React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <section className="h-screen flex justify-center items-center">
            <div className="h-full">
                {/* Left column container with background*/}
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample image"
                        />
                    </div>
                    {/* Right column container */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-6/12">
                        <Form
                            size='large'
                            name="normal_login"
                            className="w-full px-10"
                            initialValues={{
                                remember: true,
                            }}
                        // onFinish={onFinish}
                        >
                            <h1 className='text-center text-2xl pb-10  font-extrabold text-blue-600'>Welcome to My Children App</h1>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <div className='flex justify-between pb-5'>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot text-blue-400" href="#">
                                    Forgot password
                                </a>
                            </div>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" size='large' className="login-form-button bg-blue-600 w-full">
                                    Log in
                                </Button>
                                <Divider plain>You don't have an account? <Link to="/register" className='text-blue-400'>Register now!</Link></Divider>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

    )
};

export default Login;