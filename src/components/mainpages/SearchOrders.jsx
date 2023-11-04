import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Breadcrumb from './Breadcrumb';

export const SearchOrders = () => {
    const [orders, setOrders] = useState('');
    return (
        <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
            <div className="bg-gray-100 px-3 py-[2px] mb-6">
                <Breadcrumb />
            </div>
            <div className="flex justify-around items-center">
                <img className="hidden lg:block" src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270.png" alt="" />
                <Card bordered={false} className=" h-96 drop-shadow-2xl text-center flex justify-center items-center md:p-12">
                    <h5 className="text-2xl">Tra cứu thông tin đơn hàng</h5>
                    <Input
                        size="large"
                        className="text-xl my-4"
                        placeholder="Nhập vào mã đơn hàng"
                        prefix={<FileSearchOutlined />}
                        value={orders}
                        onChange={e => setOrders(e.target.value)}
                    />
                    <Link to={`/order/${orders}`}>
                        <Button type="primary" className="w-full text-xl h-12 bg-blue-500">Tiếp tục</Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
}

export default SearchOrders;