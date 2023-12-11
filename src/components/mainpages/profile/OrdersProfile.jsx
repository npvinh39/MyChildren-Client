import React from "react";
import Breadcrumb from '../Breadcrumb';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByUser, cancelOrder } from "../../../features/order/path-api";
import { updateRegex } from "../../../features/order/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import { message, Button, Popconfirm, Badge, Table, Segmented } from "antd";
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
    const { orderByUser, regex, currentPage, pageSize, totalPages } = useSelector(state => state.order);
    const total = totalPages * pageSize;
    console.log(regex);

    const formatDate = (date) => {
        return dayjs(date).format("DD-MM-YYYY HH:mm");
    };

    React.useEffect(() => {
        if (profile) {
            dispatch(fetchOrderByUser({ user: profile._id, currentPage, pageSize, regex }));
        }
    }, [dispatch, profile, currentPage, pageSize, regex]);

    const getByStatus = (status) => {
        dispatch(updateRegex(status));
        // dispatch(fetchOrderByUser({ user: profile._id, currentPage, pageSize, regex }));
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'code_order',
            key: 'code_order',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => formatDate(date)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) =>
                <div>
                    {
                        status === 'pending' ?
                            <Badge status="default" text="Chờ xác nhận" /> :
                            status === 'processing' ?
                                <Badge status="processing" text="Đang xử lý" /> :
                                status === 'shipping' ?
                                    <Badge status="warning" text="Đang giao hàng" /> :
                                    status === 'delivered' ?
                                        <Badge status="success" text="Đã giao hàng" /> :
                                        status === 'cancelled' ?
                                            <Badge status="error" text="Đã hủy" /> :
                                            <Badge status="processing" text="Không xác định" />
                    }
                </div>

        },
        {
            title: 'Tổng tiền',
            dataIndex: 'final_total',
            key: 'final_total',
            render: (final_total) => VND.format(final_total)
        },
        {
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: (_id) => <>
                <Link to={`/order/${_id}`}><Button type="primary" className="bg-blue-500">Chi tiết</Button></Link>
                {
                    orderByUser.find(order => order._id === _id).status === 'pending' &&
                    <Popconfirm
                        title="Bạn có chắc muốn hủy đơn hàng này?"
                        okText="Đồng ý"
                        cancelText="Hủy"
                        onConfirm={() => dispatch(cancelOrder({ id: _id }))}
                    >
                        <Button type="primary" danger className="ml-2">Hủy đơn</Button>
                    </Popconfirm>
                }
            </>
        },
    ];

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
                    {/* filter by status */}
                    <div className="flex items-center justify-between py-3">
                        <h2 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>
                        <Segmented
                            options={[
                                { label: 'Tất cả', value: '' },
                                { label: 'Chờ xác nhận', value: 'pending' },
                                { label: 'Đang xử lý', value: 'processing' },
                                { label: 'Đang giao hàng', value: 'shipping' },
                                { label: 'Đã giao hàng', value: 'delivered' },
                                { label: 'Đã hủy', value: 'cancelled' },

                            ]}
                            defaultValue="Chờ xác nhận"
                            onChange={(value) => getByStatus(value)}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={orderByUser}
                        rowKey="_id"
                        pagination={{
                            current: currentPage,
                            pageSize,
                            total,
                            onChange: (page, pageSize) => dispatch(fetchOrderByUser({ user: profile._id, currentPage: page, pageSize, regex })),
                            showSizeChanger: true,
                            onShowSizeChange: (current, pageSize) => dispatch(fetchOrderByUser({ user: profile._id, currentPage: current, pageSize, regex })),
                            pageSizeOptions: ['5', '10', '15', '20'],
                            position: ['bottomCenter'],

                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrdersProfile;