import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import { LockOutlined, UserOutlined, PhoneOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onRegister } from '../../../features/login/path-api';
import Cookies from 'js-cookie';

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, loading, key } = useSelector((state) => state.login);
    const onFinish = (values) => {
        dispatch(onRegister(values));
    };

    useEffect(() => {
        const access_Token = Cookies.get('accessToken')
        if (access_Token) {
            navigate('/')
        }
    }, [isAuth])

    // When key press enter button will submit form
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onFinish()
        }
    }

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
                            <h1 className='text-center text-2xl pb-10  font-extrabold text-blue-600'>Chào mừng bạn đến với My Children</h1>
                            {/* last name and first name two value*/}
                            <div className="flex justify-between">
                                <Form.Item
                                    className="w-1/2 mr-2"
                                    name="last_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ!',
                                        },
                                    ]}
                                >
                                    <Input allowClear={true} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ" />
                                </Form.Item>
                                <Form.Item
                                    className="w-1/2"
                                    name="first_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên!',
                                        },
                                    ]}
                                >
                                    <Input allowClear={true} placeholder="Tên đệm và tên" />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!',
                                    },
                                ]}
                            >
                                <Input allowClear={true} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                    {
                                        min: 8,
                                        message: 'Mật khẩu phải có ít nhất 8 ký tự!'
                                    },
                                    //password has to have at least one uppercase, one lowercase, one number and one special character
                                    {
                                        pattern: /^(?=.*[A-Z])/,
                                        message: 'Mật khẩu phải có ít nhất 1 chữ hoa!'
                                    },
                                    {
                                        pattern: /^(?=.*[a-z])/,
                                        message: 'Mật khẩu phải có ít nhất 1 chữ thường!'
                                    },
                                    {
                                        pattern: /^(?=.*\d)/,
                                        message: 'Mật khẩu phải có ít nhất 1 số!'
                                    },
                                    {
                                        pattern: /^(?=.*[^\da-zA-Z])/,
                                        message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt!'
                                    },
                                    // {
                                    //     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
                                    //     message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!'
                                    // },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập lại mật khẩu!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input allowClear={true} prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
                            </Form.Item>
                            {/* <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Địa chỉ" />
                            </Form.Item> */}

                            <Form.Item>
                                <Button type="primary" loading={loading} htmlType="submit" size='large' className="login-form-button bg-blue-600 w-full">
                                    Đăng ký
                                </Button>
                                <Divider plain>Bạn đã có tài khoản? <Link to="/login" className='text-blue-400'>Đăng nhập ngay!</Link></Divider>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Register;