import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/login/loginSlice'
import productSlice from '../features/product/productSlice'
import categorySlice from '../features/category/categorySlice'
import promotionSlice from '../features/promotion/promotionSlice'
import orderSlice from '../features/order/orderSlice'
import userSlice from '../features/user/userSlice'
import warehouseSlice from '../features/warehouse/warehouseSlice'
import revenueSlice from '../features/revenue/revenueSlice'
import ratedSlice from '../features/rated/ratedSlice'
import contactSlice from '../features/contact/contactSlice'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        product: productSlice,
        category: categorySlice,
        promotion: promotionSlice,
        order: orderSlice,
        user: userSlice,
        warehouse: warehouseSlice,
        revenue: revenueSlice,
        rated: ratedSlice,
        contact: contactSlice,
    },
})