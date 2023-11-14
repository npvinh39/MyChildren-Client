import React from "react";
import Breadcrumb from '../Breadcrumb';
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../features/user/path-api";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { MenuProfile } from "./MenuProfile";


export const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);

    const onFinish = (values) => {
        dispatch(changePassword(values));
    };

    if (!isAuth) {
        message.info("Vui lòng đăng nhập để xem thông tin tài khoản");
        navigate("/");
        return (
            <div className="profile_page">
                <h2 className="text-center mt-5">Vui lòng đăng nhập để xem thông tin tài khoản</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto w-full max-w-[1366px]">
            <div className="breadcrumb bg-gray-100 px-3 py-[2px] my-8">
                <Breadcrumb />
            </div>
            <div className="flex justify-between items-center items-stretch mb-8">
                <MenuProfile />
                <div className="flex-1 ml-4">
                    <div>Đổi mật khẩu</div>
                    <div className="mt-4">
                        <Form
                            name="basic"
                            layout='vertical'
                            // labelCol={{
                            //     span: 8,
                            // }}
                            // wrapperCol={{
                            //     span: 16,
                            // }}
                            // initialValues={{
                            //     remember: true,
                            // }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Mật khẩu hiện tại"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu cũ!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
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
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Nhập lại mật khẩu mới"
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
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large" className="bg-blue-500">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChangePassword;