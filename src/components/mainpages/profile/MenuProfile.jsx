import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { SolutionOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Hồ sơ', 'sub1', <UserOutlined />, [
        getItem('Thông tin tài khoản', '1', <Link to='/profile/info'></Link>),
        getItem('Sổ địa chỉ', '2', <Link to='/profile/address'></Link>),
        getItem('Đổi mật khẩu', '3', <Link to='/profile/change-password'></Link>),

    ]),
    getItem('Đơn hàng', 'sub2', <SolutionOutlined />),
    {
        type: 'divider',
    },
    getItem('Cài đặt thông báo', 'sub3', <Link to='/profile/orders'><SettingOutlined /></Link>),
    getItem('Hành động', 'grp', null, [getItem('Đăng xuất', '4', <LogoutOutlined />)], 'group'),
];
export const MenuProfile = () => {
    const slug = window.location.pathname;
    const onClick = (e) => {
        console.log('click ', e.key);
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={[
                slug === '/profile/info' ? '1' : slug === '/profile/orders' ? 'sub2' : slug === '/profile/change-password' ? '3' : slug === '/profile/address' ? '2' : '1'
            ]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default MenuProfile;