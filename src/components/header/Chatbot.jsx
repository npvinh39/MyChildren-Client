import React, { useState, useEffect, useRef } from 'react';
import { MessageOutlined, SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import { FloatButton, Badge, Form, Input, Button, Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatusChatbot, sendMessage } from '../../features/chatbot/path-api';

export const Chatbot = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const { messages, loading, status } = useSelector(state => state.chatbot);
    console.log("messages: ", messages);
    const [showChatbox, setShowChatbox] = useState(false);
    const chatContainerRef = useRef(null);

    const toggleChatbox = () => {
        setShowChatbox(!showChatbox);
    };

    useEffect(() => {
        dispatch(fetchStatusChatbot());
    }, [dispatch]);

    useEffect(() => {
        // Function to scroll chat to the bottom
        const scrollChatToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };

        // Scroll chat to bottom when messages change
        scrollChatToBottom();
    }, [messages]);

    const onFinish = (values) => {
        if (values.message !== undefined && values.message !== null && values.message !== '') {
            // console.log('Success:', { ...values, sender: 'Người dùng' });
            dispatch(sendMessage({ ...values, sender: 'Người dùng' }));
            form.resetFields();
        }
    }

    return (
        <div>
            <FloatButton
                shape="circle"
                type="primary"
                onClick={toggleChatbox}
                style={{
                    bottom: 64,
                }}
                icon={<MessageOutlined />}
            />
            <FloatButton.BackTop
                style={{
                    bottom: 16,
                }}
            />

            {showChatbox && (
                <div
                    className="w-96 fixed bottom-28 right-4 bg-white border border-gray-300 rounded-lg shadow-lg z-[999] overflow-hidden"
                >
                    <div className="bg-blue-500 p-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="px-4 py-3 rounded-full bg-gray-300">
                                    <RobotOutlined
                                        style={{
                                            color: "#1890ff",
                                        }}
                                    />
                                </div>
                                <div className="ml-2">
                                    <div className="text-sm font-semibold text-white uppercase">Chatbot</div>
                                    <Badge status="success" text="Online" style={{ color: "white" }} />
                                </div>
                            </div>
                            <div className="ml-auto">
                                <button onClick={toggleChatbox} className="text-gray-50 hover:text-gray-300 pr-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        status === 200 ? (
                            <div>
                                <div className="p-4 min-h-[300px] max-h-[360px] overflow-y-scroll" ref={chatContainerRef}>
                                    <div className="flex flex-col space-y-4">
                                        {
                                            messages.length > 0 ? messages.map((message, index) => (
                                                <div className="space-y-4">

                                                    <div className="flex items-center justify-end space-x-2">
                                                        <div className="max-w-[calc(100%-4rem)]">
                                                            <div className="bg-blue-500 rounded-lg p-2 w-auto">
                                                                <p className="text-sm text-white">{message.message}</p>
                                                            </div>
                                                        </div>
                                                        <div className="px-3 py-2 rounded-full bg-gray-300 flex-shrink-0">
                                                            <UserOutlined
                                                                style={{
                                                                    color: "#1890ff",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="px-3 py-2 rounded-full bg-gray-300">
                                                            <RobotOutlined
                                                                style={{
                                                                    color: "#1890ff",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="max-w-[calc(100%-4rem)]">
                                                            <div className="bg-gray-300 rounded-lg p-2">
                                                                <p className="text-sm">{message.text}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                                :
                                                (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="px-3 py-2 rounded-full bg-gray-300">
                                                            <RobotOutlined
                                                                style={{
                                                                    color: "#1890ff",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-1 max-w-[calc(100%-4rem)]">
                                                            <div className="bg-gray-300 rounded-lg p-2">
                                                                <p className="text-sm">Xin chào, tôi có thể giúp gì cho bạn?</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>
                                <div className="bg-gray-100 p-2">
                                    <Form
                                        form={form}
                                        layout="inline"
                                        onFinish={onFinish}
                                    >
                                        <div className='flex items-center w-full'>
                                            <Form.Item
                                                className="w-3/4"
                                                name="message"
                                            >
                                                <Input placeholder="Aa..." className="break-words" />
                                            </Form.Item>
                                            <Form.Item className='w-1/4'>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    className='bg-blue-500'
                                                    icon={<SendOutlined />}>
                                                    Gửi
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        ) :
                            (
                                <Result
                                    status="warning"
                                    title="Chatbot đang bận"
                                    subTitle="Vui lòng thử lại sau"
                                />
                            )
                    }
                </div>
            )}
        </div>
    );
};

export default Chatbot;