import React from "react";
import Breadcrumb from '../Breadcrumb';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByUser } from "../../../features/order/path-api";
import { Link, useNavigate } from "react-router-dom";
import { message, Card, Typography, Button, Badge } from "antd";
import { MenuProfile } from "./MenuProfile";

export const OrdersProfile = () => {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);
    const { orderByUser } = useSelector(state => state.order);

    const formatDate = (date) => {
        return dayjs(date).format("DD-MM-YYYY HH:mm");
    };

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
                        {orderByUser.map((order, index) => (
                            <Card
                                key={order.id}
                                className="order-card"
                                title={
                                    <Typography.Title level={5}>
                                        Đơn hàng #{index + 1}
                                    </Typography.Title>
                                }
                                extra={
                                    <Link to={`/order/${order._id}`}>
                                        <Button type="primary" className="bg-blue-500">Chi tiết</Button>
                                    </Link>
                                }
                            >
                                <p className="text-sm">Ngày đặt hàng: {formatDate(order.createdAt)}</p>
                                <p className="text-sm">Trạng thái: <Badge status="success" text={order.status} /></p>
                                <p className="text-sm">Tổng tiền: {VND.format(order.final_total)}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersProfile;