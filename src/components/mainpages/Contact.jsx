import React, { useState } from "react";
import { Form, Card, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Breadcrumb from './Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../../features/contact/path-api';

export const Contact = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.contact);

    const onFinish = (values) => {
        dispatch(createContact(values));
    };

    return (
        <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
            <div className="bg-gray-100 px-3 py-[2px] mb-6">
                <Breadcrumb />
            </div>
            <div className="flex justify-around items-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.512275336047!2d105.77506083786622!3d10.026919496777088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1702223784878!5m2!1svi!2s"
                    width="600"
                    height="480"
                    className="rounded-xl drop-shadow-2xl"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <Card bordered={false} className="drop-shadow-2xl text-center flex justify-center items-center md:px-12">
                    <h5 className="text-2xl font-semibold">Thông tin liên hệ</h5>
                    <p className="text-gray-500">Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                    <Form
                        className="mt-6"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ và tên!',
                                },
                            ]}
                        >
                            <Input placeholder="Họ và tên" className="rounded-full" />
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
                            <Input placeholder="Số điện thoại" className="rounded-full" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <Input placeholder="Email" className="rounded-full" />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề!',
                                },
                            ]}
                        >
                            <Input placeholder="Tiêu đề" className="rounded-full" />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập nội dung!',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Nội dung" className="rounded-2xl" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="rounded-full bg-blue-500 w-full" loading={loading} type="primary" htmlType="submit" icon={<SendOutlined />}>
                                Gửi
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default Contact;