import React from "react";
import Breadcrumb from '../Breadcrumb';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByUser } from "../../../features/order/path-api";
import { Link, useNavigate } from "react-router-dom";
import { message, Card, Typography, Button, Badge } from "antd";
import { MenuProfile } from "./MenuProfile";

export const OrdersProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);
    const { orderByUser } = useSelector(state => state.order);
    console.log("ordersProfile", orderByUser);

    React.useEffect(() => {
        if (profile) {
            dispatch(fetchOrderByUser(profile._id));
        }
    }, [dispatch, profile]);

    if (!isAuth) {
        message.info("Vui lòng đăng nhập để xem thông tin tài khoản");
        navigate("/");
        return (
            <div className="profile_page">
                <h2 className="text-center mt-5">Vui lòng đăng nhập để xem thông tin tài khoản</h2>
            </div>
        );
    }

    // Mock data for order history
    const orderHistory = [
        { id: 1, date: "2022-01-01", status: "Giao hàng thành công", total: 100 },
        { id: 2, date: "2022-02-01", status: "Giao hàng thành công", total: 200 },
        { id: 3, date: "2022-03-01", status: "Giao hàng thành công", total: 300 },
    ];

    return (
        <div className="container mx-auto w-full max-w-[1366px]">
            <div className="breadcrumb bg-gray-100 px-3 py-[2px] my-8">
                <Breadcrumb />
            </div>
            <div className="flex justify-between items-center items-stretch mb-8">
                <MenuProfile />
                <div className="flex-1 ml-4">
                    <h2 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {orderHistory.map(order => (
                            <Card
                                key={order.id}
                                className="order-card"
                                title={
                                    <Typography.Title level={5}>
                                        Đơn hàng #{order.id}
                                    </Typography.Title>
                                }
                                extra={
                                    <Link to={`/profile/orders/${order.id}`}>
                                        <Button type="primary" className="bg-blue-500">Chi tiết</Button>
                                    </Link>
                                }
                            >
                                <p className="text-sm">Ngày đặt hàng: {order.date}</p>
                                <p className="text-sm">Trạng thái: <Badge status="success" text={order.status} /></p>
                                <p className="text-sm">Tổng tiền: {order.total}đ</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersProfile;