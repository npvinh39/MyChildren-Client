import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../features/user/path-api';


export const ForgotPassword = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { message, loading } = useSelector((state) => state.user);

    const onFinish = (value) => {
        // console.log(value);
        dispatch(forgotPassword(value))
    };

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
                            onFinish={onFinish}
                        >
                            <h1 className='text-center text-2xl pb-10  font-extrabold text-blue-600'>Đặt lại mật khẩu</h1>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập vào email!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" loading={loading} htmlType="submit" size='large' className="login-form-button bg-blue-600 w-full">
                                    Gửi email xác nhận
                                </Button>
                                <Divider plain>Bạn đã có tài khoản? Hãy <Link to="/login" className='text-blue-400'>Đăng nhập!</Link></Divider>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;