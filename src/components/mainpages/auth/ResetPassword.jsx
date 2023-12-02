import React from "react";
import { Form, Input, Button, Divider, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../features/user/path-api";
import { Link, useParams, useNavigate } from "react-router-dom";


export const ResetPassword = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { message, loading, status } = useSelector((state) => state.user);
    const { token } = useParams();

    const onFinish = (value) => {
        dispatch(resetPassword({ ...value, token }))
        if (status === 'fulfilled') {
            navigate('/login')
        }
        else if (status === 'rejected') {
            navigate('/forgot-password')
        }
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
                            onFinish={onFinish}
                        // labelCol={{
                        //     span: 8,
                        // }}
                        // wrapperCol={{
                        //     span: 16,
                        // }}
                        >
                            <h1 className='text-center text-2xl pb-10  font-extrabold text-blue-600'>Đặt lại mật khẩu</h1>
                            <Form.Item
                                // label="Mật khẩu mới"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu mới!',
                                    },
                                    {
                                        min: 8,
                                        message: 'Mật khẩu phải có ít nhất 8 ký tự!'
                                    },
                                    {
                                        max: 32,
                                        message: 'Mật khẩu không được quá 32 ký tự!'
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
                                ]}
                            >
                                <Input.Password placeholder="Mật khẩu mới" />
                            </Form.Item>

                            <Form.Item
                                // label="Nhập lại mật khẩu mới"
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập lại mật khẩu mới!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu mới" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" loading={loading} htmlType="submit" size='large' className="login-form-button bg-blue-600 w-full">
                                    Đặt lại mật khẩu
                                </Button>
                                <Divider plain>Bạn đã có tài khoản? Hãy <Link to="/login" className='text-blue-400'>Đăng nhập!</Link></Divider>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default ResetPassword;