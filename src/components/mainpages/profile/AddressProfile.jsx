import React from "react";
import Breadcrumb from '../Breadcrumb';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { MenuProfile } from "./MenuProfile";


export const AddressProfile = () => {
    const navigate = useNavigate();
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);

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
                    <div>Địa chỉ</div>
                </div>
            </div>
        </div >
    );
};

export default AddressProfile;