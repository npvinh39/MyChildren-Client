import React from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryPage } from "./mainpages/CategoryPage";
import { ProductDetail } from "./mainpages/ProductDetail";
import { MainPages } from "./mainpages/MainPages";
import { Cart } from "./mainpages/Cart";
import { Checkout } from "./mainpages/Checkout";
import { CallBack } from "./mainpages/CallBack";
import { SearchOrders } from "./mainpages/SearchOrders";
import { Order } from "./mainpages/Order";
import { Login } from "./mainpages/auth/Login";
import { Register } from "./mainpages/auth/Register";
import { ForgotPassword, ResetPassword } from "./index";
import { Profile } from "./mainpages/profile/Profile";
import { OrdersProfile } from "./mainpages/profile/OrdersProfile";
import { AddressProfile } from "./mainpages/profile/AddressProfile";
import { ChangePassword } from "./mainpages/profile/ChangePassword";
import { NotFound } from "./NotFound";

const Pages = () => {


    return (
        <>
            <Routes>
                <Route path="/" element={<MainPages />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/callback" element={<CallBack />} />
                <Route path="/orders" element={<SearchOrders />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/profile/info" element={<Profile />} />
                <Route path="/profile/orders" element={<OrdersProfile />} />
                <Route path="/profile/address" element={<AddressProfile />} />
                <Route path="/profile/change-password" element={<ChangePassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default Pages;