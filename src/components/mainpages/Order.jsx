import React, { useState, useEffect } from "react";
import moment from 'moment';
import Breadcrumb from './Breadcrumb';
import { Badge, Descriptions, Skeleton, Result, Button } from 'antd';
import { apiProduct } from "../../api/api-product";
import { apiOrder } from '../../api/api-order';
import { Link, useParams } from 'react-router-dom';


export const Order = () => {
    const [cartItems, setCartItems] = useState([]);
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const res = await apiOrder.get(id);
                setOrder(res.data.fields);
                const resProducts = await apiProduct.getAll();
                const products = resProducts.data;
                const cart = JSON.parse(res.data.fields.items);
                const updatedCartItems = cart.map(item => {
                    const product = products.find(product => product.id === item.id);
                    return { ...product, quantity: item.quantity };
                });
                setLoading(true);
                setCartItems(updatedCartItems);
            } catch (error) {
                setLoading(true);
                console.log(error);
            }
        })()
    }, [id]);

    const items = [
        {
            key: '1',
            label: 'Họ tên',
            children: order.customer,
        },
        {
            key: '2',
            label: 'Email',
            children: order.email,
        },
        {
            key: '3',
            label: 'Số điện thoại',
            children: order.phone,
        },
        {
            key: '4',
            label: 'Địa chỉ',
            children: order.shipping_address,
            span: 3,
        },
        {
            key: '5',
            label: 'Ngày mua',
            children: moment(order.created_at).format('DD/MM/YYYY HH:mm:ss'),
        },
        {
            key: '6',
            label: 'Ngày nhận hàng',
            children:
                order.status !== 'Đã giao'
                    ? 'Chưa giao hàng'
                    :
                    moment(order.updated_at).format('DD/MM/YYYY HH:mm:ss')
            ,
        },
        {
            key: '7',
            label: 'Hình thức vận chuyển',
            children: order.delivery_method,
        },
        {
            key: '8',
            label: 'Trạng thái',
            children: <Badge status="processing" text={order.status} />,
            span: 3,
        },
        {
            key: '9',
            label: 'Tổng tiền',
            children: VND.format(Number(order.total)),
        },
        {
            key: '10',
            label: 'Giảm giá',
            children: VND.format(Number(order.discount)),
        },
        {
            key: '11',
            label: 'Phí giao hàng',
            children: VND.format(Number(order.shipping)),
        },
    ];

    if (!loading) return <div className="container mx-auto px-3 2xl:px-20 mt-8 mb-12"><Skeleton active avatar /></div>
    if (cartItems.length === 0) return (
        <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
            <Result
                status="404"
                title="Hmm...Chúng tôi không tìm thấy đơn hàng của bạn."
                subTitle="Vui lòng kiểm tra lại mã đơn hàng."
                extra={<Link to='/orders'><Button type="primary" danger>Quay lại tra cứu</Button></Link>}
            />
        </div>
    );
    return (
        <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
            <Descriptions
                title={<Breadcrumb />}
                bordered
                items={items}
            />
            <div className="flex justify-between items-center text-center mt-3">
                <span className="text-base border py-2 w-1/12">Ảnh</span>
                <span className="text-base border py-2 w-7/12">Tên sản phẩm</span>
                <span className="text-base border py-2 w-3/12">Giá</span>
                <span className="text-base border py-2 w-1/12">Số lượng</span>
            </div>
            {
                cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-center border border-t-0">
                        <div className="w-1/12 flex justify-center items-center">
                            <img className="w-20 h-20 object-cover block" src={item.images[0].url} alt="" />
                        </div>
                        <Link to={`/products/${item.id}`} className="text-base border-x-2 border-r-0 w-7/12">{item.name}</Link>
                        <span className="text-base border-x-2 border-r-0 w-3/12">{VND.format(Number(item.price_discount))}</span>
                        <span className="text-base border-x-2 border-r-0 w-1/12">{item.quantity}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default Order;