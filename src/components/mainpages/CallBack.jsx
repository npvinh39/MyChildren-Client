import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Result, Spin, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { ApiOrder } from '../../api/api-order';
import queryString from 'query-string';
import { GlobalStateContext } from "../../GlobalState";

const infoOrder = JSON.parse(localStorage.getItem('infoOrder'));
export const CallBack = () => {
    const state = React.useContext(GlobalStateContext);
    const [cart, setCart] = state.cart;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = queryString.parse(location.search);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (!infoOrder) navigate('/');
            if (queryParams.resultMsg === 'SUCCESS' && infoOrder) {
                const order = {
                    code_order: queryParams.invoiceNo,
                    status: "Chờ xác nhận",
                    payment_status: "Đã thanh toán",
                    shipping: 0,
                    discount: 0,
                    total: parseInt(queryParams.amount),
                    delivery_method: "Hỏa tốc",
                    customer: infoOrder.buyerLastNm + ' ' + infoOrder.buyerFirstNm,
                    shipping_address: infoOrder.buyerAddr,
                    phone: infoOrder.buyerPhone,
                    email: infoOrder.buyerEmail,
                    items: JSON.stringify(infoOrder.items),
                    quantity: infoOrder.quantity
                };
                try {
                    setLoading(true);
                    await ApiOrder.add(order);
                    setLoading(false);
                    localStorage.removeItem('cart');
                    localStorage.removeItem('infoOrder');
                    setCart([]);
                } catch (error) {
                    console.log('error', error)
                    setLoading(false);
                }
            }
        })()
    }, []);


    const handleCopy = () => {
        const textToCopy = queryParams.invoiceNo;
        navigator.clipboard.writeText(textToCopy);
        message.success('Đã sao chép mã đơn hàng!');
    };
    if (loading) return (
        <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
            <div className='flex flex-col justify-center items-center'>
                <Spin />
                <span>Đơn hàng đang được xử lý, vui lòng không tải lại trang.</span>
            </div>
        </div>
    )
    else
        return (
            <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
                {
                    queryParams.resultMsg === 'SUCCESS' ? (
                        <Result
                            status="success"
                            title="Thanh toán đơn hàng thành công!"
                            subTitle={`Vui lòng lưu lại mã đơn hàng để kiểm tra trạng thái đơn hàng.`}
                            extra={[
                                <div className='mb-6 text-2xl relative'>
                                    <span
                                        onClick={handleCopy}
                                        className='cursor-pointer'
                                    >
                                        {queryParams.invoiceNo}
                                        <CopyOutlined className='ps-2 absolute top-1/2 translate-y-[-50%]' />
                                    </span>
                                </div>,
                                <br />,
                                <Button className='bg-blue-500' type="primary" key="console">
                                    <Link to='/orders'>Kiểm tra đơn hàng</Link>
                                </Button>,
                                <Button key="buy"><Link to='/'>Tiếp tục mua sắm</Link></Button>,
                            ]}
                        />
                    ) : (
                        <Result
                            status="error"
                            title="Thanh toán đơn hàng không thành công!"
                            subTitle={`Vui lòng kiểm tra lại phương thức thanh toán và thông tin đơn hàng.`}
                            extra={[
                                <div className='mb-6'>
                                    <span
                                    >
                                        Nguyên nhân: {queryParams.resultMsg}
                                    </span>
                                </div>,
                                <br />,
                                <Button className='bg-blue-500' type="primary" key="console">
                                    <Link to='/checkout'>Quay lại thanh toán</Link>
                                </Button>,
                                <Button key="buy"><Link to='/'>Tiếp tục mua sắm</Link></Button>,
                            ]}
                        />
                    )}
            </div>
        );
}

export default CallBack;