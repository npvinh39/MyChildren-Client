import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb'
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsWithDescription } from '../../features/product/path-api';
import { getCart, getProductCart } from '../../features/cart/cartSlice';

export const Cart = () => {

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    // const [cart, setCart] = useState([]);
    const dispatch = useDispatch();
    const { products, loading, currentPage, pageSize, totalPages, sort } = useSelector(state => state.product);
    const { cart, productCart } = useSelector(state => state.cart);

    useEffect(() => {
        const pageTitle = 'THÔNG TIN ĐƠN HÀNG';
        document.title = pageTitle;

        return () => {
        };
    }, []);

    // get all product
    useEffect(() => {
        dispatch(fetchProductsWithDescription({ currentPage, pageSize: 999, sort }));
    }, [dispatch, currentPage, pageSize, sort]);


    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage khi component được tạo
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            // setCart(JSON.parse(savedCart));
            dispatch(getCart(JSON.parse(savedCart)));
        }
    }, []);

    const removeCartItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        // setCart(newCart);
        dispatch(getCart(newCart));
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // get quantity of cart
    const getQuantity = () => {
        let quantity = 0;
        cart?.forEach(item => {
            quantity += item.quantity;
        });
        return quantity;
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        const updatedCart = cart.map(cartItem =>
            cartItem.product_id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );

        // setCart(updatedCart);
        dispatch(getCart(updatedCart));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // // get all product of cart
    // const getProduct = () => {
    //     let product = [];
    //     cart.forEach(item => {
    //         products.forEach(productItem => {
    //             if (item.product_id === productItem._id) {
    //                 product.push(productItem);
    //             }
    //         });
    //     });
    //     return product;
    // };
    // const productCart = getProduct();

    // get total price of cart
    const getTotal = () => {
        let total = 0;
        cart?.forEach(item => {
            products.forEach(productItem => {
                if (item.product_id === productItem._id) {
                    total += Number(productItem.price_discount) * item.quantity;
                }
            });
        });
        return total;
    };

    // get quantity of product
    const getQuantityOfProduct = (id) => {
        let quantity = 0;
        cart.forEach(item => {
            if (item.product_id === id) {
                quantity = item.quantity;
            }
        });
        return quantity;
    };


    return (
        <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-4 xl:mb-28'>
            <div className="breadcrumb bg-gray-100 px-3 py-[2px]">
                <Breadcrumb />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="py-2 w-full">
                    <h1 className='text-xl uppercase font-bold'>Thông tin đơn hàng <span className='normal-case'>({getQuantity()} sản phẩm)</span></h1>
                    <div className=" border-t-2 border-b-2 my-4 max-h-[50vh] overflow-y-auto">
                        {
                            productCart.map((product, index) => (
                                <div key={index} className="cart-list__item flex justify-between items-center gap-3 p-3 border-b-2">
                                    <div className="cart-list__item__img">
                                        <img
                                            className='w-24 h-24 object-cover rounded-lg'
                                            src={product.images[0].url}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="cart-list__item__info h-24 flex-1 flex flex-col justify-between">
                                        <div className="cart-list__item__info__name font-bold text-sm">
                                            <span>{getQuantityOfProduct(product._id)} x {product.name}</span>
                                        </div>
                                        <div className="text-sm flex justify-between">
                                            <div className="flex items-center justify-between w-28">
                                                <div
                                                    onClick={() => updateCartItemQuantity(product._id, Math.max(1, getQuantityOfProduct(product._id) - 1))}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer"
                                                >
                                                    <FaMinus />
                                                </div>
                                                <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer mx-2">{getQuantityOfProduct(product._id)}</div>
                                                <div
                                                    onClick={() => updateCartItemQuantity(product._id, getQuantityOfProduct(product._id) + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer"
                                                >
                                                    <FaPlus />
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => removeCartItem(index)}
                                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer">
                                                <FaTrashAlt />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-list__item__info__price text-sm text-slate-600 font-bold mr-6">
                                        <span className='block text-[13px] text-red-500'>{VND.format(Number(product.price_discount))}</span>
                                        <span className='block text-[13px] text-slate-600 line-through'>{VND.format(Number(product.price))}</span>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    <Link to='/'
                        className="hover:bg-blue-500 hover:border hover:border-blue-500 text-center hover:text-white font-bold text-[13px] capitalize block w-full lg:w-[30%] my-8 py-1 bg-white text-gray-600 border border-gray-600 transition-colors duration-300 ease-in-out">
                        Tiếp tục mua sắm
                    </Link>

                    <div className="flex justify-between items-center">
                        <span className='text-[13px] font-bold w-2/6'>Mã giảm giá / Quà tặng</span>
                        <div className='flex border border-gray-300 w-4/6'>
                            <input className='border-none p-2 outline-none text-[13px] flex-1' type="text" placeholder='Nhập mã khuyến mãi' />
                            <button className='bg-yellow-300 hover:bg-[#df494a] hover:text-white text-sm uppercase font-semibold px-3 py-1'>nhập</button>
                        </div>
                    </div>
                </div>
                <div className="py-2 lg:pl-24 w-full flex flex-col justify-center gap-3">
                    <h1 className='text-xl uppercase font-semibold text-gray-600'>Tóm tắt đơn hàng</h1>
                    <div className="flex justify-between items-center my-2">
                        <span className='text-sm uppercase font-semibold'>Tạm tính</span>
                        <span className='text-sm font-semibold'>{VND.format(getTotal())}</span>
                    </div>
                    <div className="flex justify-between items-center my-2">
                        <span className='text-sm uppercase font-light'>Giảm</span>
                        <span className='text-sm font-light'>0đ</span>
                    </div>
                    <div className="flex justify-between items-center my-2">
                        <span className='text-sm uppercase font-light'>VẬN CHUYỂN (GIAO HÀNG MIỄN PHÍ - FREE)</span>
                        <span className='text-sm font-light'>0đ</span>
                    </div>
                    <div className="border"></div>
                    <div className="flex justify-between items-center my-2">
                        <span className='text-xl uppercase font-bold'>Thành tiền</span>
                        <span className='text-xl font-bold'>{VND.format(getTotal())}</span>
                    </div>
                    <Link to='/checkout'
                        className="bg-blue-500 hover:border border-blue-500 text-center text-white font-semibold text-xl uppercase block w-full my-8 py-4 hover:bg-white hover:text-gray-600 border hover:border-gray-600 transition-colors duration-300 ease-in-out">
                        Tiến hành thanh toán
                    </Link>
                </div>
            </div>
        </div>
    )
}
