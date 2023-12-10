import React, { useEffect } from "react";
import Breadcrumb from '../Breadcrumb';
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../features/user/path-api";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { MenuProfile } from "./MenuProfile";


export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                last_name: profile.last_name,
                first_name: profile.first_name,
                email: profile.email,
                phone: profile.phone,
            });
        }
    }, [form, profile]);

    const onFinish = (values) => {
        dispatch(updateProfile(values));
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
                    <div className="flex justify-start items-center mb-8">
                        <div>Tổng chi tiêu:</div>
                        <span className="bg-amber-300 rounded mx-1 p-3">{VND.format(Number(profile?.spending))}</span>
                        {
                            profile?.spending >= 10000000 ? <span className="">bạn được giảm giá 10% trên mỗi đơn hàng</span>
                                : profile?.spending >= 5000000 ? <span className="">bạn được giảm giá 5% trên mỗi đơn hàng</span>
                                    : profile?.spending >= 1000000 ? <span className="">bạn được giảm giá 2% trên mỗi đơn hàng</span>
                                        : <span className="">bạn chưa đạt mức giảm giá</span>
                        }
                    </div>
                    <div className="mt-4">
                        <Form
                            name="basic"
                            layout='vertical'
                            form={form}
                            // labelCol={{
                            //     span: 8,
                            // }}
                            // wrapperCol={{
                            //     span: 16,
                            // }}
                            onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >
                            <div className="flex">
                                <Form.Item
                                    label="Họ"
                                    name="last_name"
                                    className='w-1/2 mr-2'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Tên"
                                    name="first_name"
                                    className='w-1/2'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Email"
                                name="email"
                                disabled={true}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!',
                                    }
                                ]}
                            >
                                <Input disabled={true} />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                    {
                                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                        message: 'Số điện thoại không hợp lệ!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                className="text-center"
                            >
                                <Button type="primary" size="large" htmlType="submit" className="bg-blue-500">
                                    Cập nhật thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;