import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CategoryPage } from "./mainpages/CategoryPage";
import { ProductDetail } from "./mainpages/ProductDetail";
import { MainPages } from "./mainpages/MainPages";
import { Cart } from "./mainpages/Cart";
import { Checkout } from "./mainpages/Checkout";
import { CallBack } from "./mainpages/CallBack";
import { SearchOrders } from "./mainpages/SearchOrders";
import { Order } from "./mainpages/Order";
import { Login } from "./mainpages/auth/Login";
import { NotFound } from "./NotFound";

const Pages = () => {

    // const location = useLocation();
    // const isPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {/* {isPage ? null : <Header />} */}
            <Routes>
                <Route path="/" element={<MainPages />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/callback" element={<CallBack />} />
                <Route path="/orders" element={<SearchOrders />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* {isPage ? null : <Footer />} */}
        </>
    );
}

export default Pages;