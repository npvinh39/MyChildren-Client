import React, { useState, useEffect } from 'react';
import moment from 'moment';
import sha256 from 'js-sha256';
import Breadcrumb from './Breadcrumb';
import { isMobile } from 'react-device-detect';
import { Empty, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaHome, FaCreditCard, FaTruck, FaCheckSquare, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getProductCart } from '../../features/cart/cartSlice';
import { fetchProductsWithDescription } from '../../features/product/path-api';
import { apiProvince } from '../../api/api-province';
import { openPayment } from '../../api/paymentClient.ts';

export const Checkout = () => {
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const dispatch = useDispatch();
    const { cart, productCart } = useSelector(state => state.cart);
    const { products, loading, currentPage, pageSize, totalPages, sort } = useSelector(state => state.product);
    const [quantity, setQuantity] = useState(0);
    const [timeStamp, setTimeStamp] = useState('');
    const [windowType, setWindowType] = useState(0);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [ward, setWard] = useState('');
    const [street, setStreet] = useState('');

    const [infoOrder, setInfoOrder] = useState({
        orders: '',
        quantity: quantity,
        buyerEmail: '',
        buyerLastNm: '',
        buyerFirstNm: '',
        buyerPhone: '',
        buyerAddr: '',
        payment: '',
        delivery: '',
        items: JSON.parse(localStorage.getItem('cart')),
    });

    const updateQuantity = (newQuantity) => {
        setInfoOrder(prevInfoOrder => ({
            ...prevInfoOrder,
            quantity: newQuantity
        }));
    };



    useEffect(() => {
        const pageTitle = 'Thông Tin Thanh Toán';
        document.title = pageTitle;
        if (isMobile) {
            setWindowType(1);
        }

        return () => {
        };
    }, []);

    // get all product
    // useEffect(() => {
    //     dispatch(fetchProductsWithDescription({ currentPage, pageSize: 999, sort }));
    // }, [dispatch, currentPage, pageSize, sort]);



    // useEffect(() => {
    //     // Lấy dữ liệu giỏ hàng từ localStorage khi component được tạo
    //     const savedCart = localStorage.getItem('cart');
    //     if (savedCart) {
    //         setCart(JSON.parse(savedCart));
    //     }

    // }, [setCart]);

    useEffect(() => {
        // get quantity of cart
        const getQuantity = () => {
            let quantity = 0;
            cart?.forEach(item => {
                quantity += item.quantity;
            });
            setQuantity(quantity);
        };
        getQuantity();
        updateQuantity(quantity);
    }, [cart]);

    const removeCartItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        dispatch(getCart(updatedCart));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        const updatedCart = cart.map(cartItem =>
            cartItem.product_id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );

        dispatch(getCart(updatedCart));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // save info of order
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInfoOrder((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        setInfoOrder((prevValues) => ({
            ...prevValues,
            buyerAddr: `${street}, ${ward}, ${selectedDistrict}, ${selectedProvince}`,
        }));
    }, [street, ward, selectedDistrict, selectedProvince]);


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
        cart?.forEach(item => {
            if (item.product_id === id) {
                quantity = item.quantity;
            }
        });
        return quantity;
    };

    // get all province
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        const getProvince = async () => {
            try {
                const response = await apiProvince.getAllProvince();
                setProvinces(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProvince();
    }, []);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict(null);
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
    };

    const handleWardChange = (e) => {
        setWard(e.target.value);
    };

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
    };



    //get timestamp
    useEffect(() => {
        const formattedTimeStamp = moment().format('YYYYMMDDHHmmss');
        setTimeStamp(formattedTimeStamp);
    }, []);

    //random string
    const randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    };


    //payment
    const merchantKey = "rf8whwaejNhJiQG2bsFubSzccfRc/iRYyGUn6SPmT6y/L7A2XABbu9y4GvCoSTOTpvJykFi6b1G0crU8et2O0Q==";
    const merId = "EPAY000001";
    const invoiceNo = `MCO${randomString(8)}`;
    const merTrxId = `${merId}${randomString(6)}`;
    const amount = getTotal();
    const dataToHash = timeStamp + merTrxId + merId + amount + merchantKey;
    const merchantToken = sha256(dataToHash);


    // handle payment

    const handlePayment = async () => {
        const formattedTimeStamp = await moment().format('YYYYMMDDHHmmss');
        setTimeStamp(formattedTimeStamp);
        // save info order to localStorage
        localStorage.setItem('infoOrder', JSON.stringify(infoOrder));
        openPayment(1, "https://sandbox.megapay.vn/");
    };
    // const order = JSON.parse(localStorage.getItem('infoOrder'));
    // console.log("infoOrder: ", order)

    return (
        <>
            <img className="block w-full" src="https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/logo/brand-banner-new.jpg" alt="" />
            <div className='container mx-auto px-3 2xl:px-20 mt-8 mb-12'>
                <div className="breadcrumb bg-gray-100 px-3 py-[2px]">
                    <Breadcrumb />
                </div>
                <Link to="/" className="block w-full text-sm text-blue-500 my-5 pl-5">
                    Đã có tài khoản? <span className='font-semibold'>Đăng nhập</span>
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <form
                        id="megapayForm" name="megapayForm" method="POST"
                        className="py-2"
                    >
                        <input type="hidden" name="merId" value={merId} />
                        <input type="hidden" name="currency" value="VND" />
                        <input type="hidden" name="amount" value={amount} />
                        <input type="hidden" name="invoiceNo" value={invoiceNo} />
                        <input type="hidden" name="goodsNm" value="Test Payment" />
                        <input type="hidden" name="payType" value="NO" />
                        <input type="hidden" name="callBackUrl" value="http://localhost:3000/callback" />
                        <input type="hidden" name="notiUrl" value="http://localhost:3000/callback" />
                        <input type="hidden" name="reqDomain" value="http://localhost:3000/" />
                        <input type="hidden" name="fee" value="0" />
                        <input type="hidden" name="description" value="testsystem" />
                        <input type="hidden" name="userLanguage" value="VN" />
                        <input type="hidden" name="timeStamp" value={timeStamp} />
                        <input type="hidden" name="merTrxId" value={merTrxId} />
                        <input type="hidden" name="windowColor" value="#ef5459" />
                        <input type="hidden" name="windowType" value={windowType} />
                        <input type="hidden" name="merchantToken" value={merchantToken} />
                        <input
                            type="hidden"
                            name="buyerAddr"
                            value={`${street}, ${ward}, ${selectedDistrict}, ${selectedProvince}`}
                        />

                        <div className='flex items-center text-[22px]'>
                            <FaHome className="text-[26px]" />
                            <span className='ml-2'>Thông tin nhận hàng</span>
                        </div>
                        <div className="my-2">
                            <div className="w-full mb-8">
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name='buyerEmail'
                                    className="block w-full px-3 py-[10px] text-sm border border-gray-300 focus:border-black outline-none"
                                    placeholder='Email'
                                />
                                <span className="text-xs text-red-400 italic hidden">Đây là thông tin bắt buộc</span>
                            </div>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name='buyerLastNm'
                                    className="block w-full px-3 py-[10px] text-sm border border-gray-300 focus:border-black outline-none"
                                    placeholder='Họ'
                                />
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name='buyerFirstNm'
                                    className="block w-full px-3 py-[10px] text-sm border border-gray-300 focus:border-black outline-none"
                                    placeholder='Tên'
                                />
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="buyerPhone"
                                    className="block w-full px-3 py-[10px] text-sm border border-gray-300 focus:border-black outline-none"
                                    placeholder='Số điện thoại'
                                />
                                <select
                                    name='buyerCity'
                                    className="w-full border border-gray-300 focus:border-black px-2 py-3 text-sm text-gray-500 outline-none"
                                    onChange={handleProvinceChange}
                                    value={selectedProvince || ''}
                                >
                                    <option value="">Tỉnh/Thành</option>
                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.name}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="w-full border border-gray-300 focus:border-black px-2 py-3 text-sm text-gray-500 outline-none"
                                    onChange={handleDistrictChange}
                                    value={selectedDistrict || ''}
                                >
                                    <option value="">Quận/Huyện</option>
                                    {selectedProvince &&
                                        provinces
                                            .find((province) => province.name === selectedProvince)
                                            .districts.map((district) => (
                                                <option key={district.code} value={district.name}>
                                                    {district.name}
                                                </option>
                                            ))}
                                </select>
                                <select
                                    value={ward} onChange={handleWardChange}
                                    className="w-full border border-gray-300 focus:border-black px-2 py-3 text-sm text-gray-500 outline-none"
                                >
                                    <option value="">Phường/Xã</option>
                                    {selectedDistrict &&
                                        provinces
                                            .reduce((prev, province) => prev.concat(province.districts), [])
                                            .find((district) => district.name === selectedDistrict)
                                            .wards.map((ward) => (
                                                <option key={ward.code} value={ward.name}>
                                                    {ward.name}
                                                </option>
                                            ))}
                                </select>
                                <input
                                    type="text"
                                    value={street}
                                    onChange={handleStreetChange}
                                    className="block w-full px-3 py-[10px] text-sm border border-gray-300 focus:border-black outline-none"
                                    placeholder='Số nhà, tên đường'
                                />
                            </div>
                        </div>
                        <div className='flex items-center text-[22px] mt-10'>
                            <FaCreditCard className="text-[26px]" />
                            <span className='ml-2'>Phương thức thanh toán</span>
                        </div>
                        <div className="my-2">
                            <div className="flex">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment2"
                                    value={"Thanh toán trực tuyến"}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="payment2" className="block w-full px-3 py-[10px] text-base text-left">Thanh toán trực tuyến</label>
                            </div>
                            <div className="flex">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment1"
                                    value={"Thanh toán khi nhận hàng"}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="payment1" className="block w-full px-3 py-[10px] text-base text-left">Thanh toán khi nhận hàng</label>
                            </div>
                        </div>
                        <div className='flex items-center text-[22px]'>
                            <FaTruck className="text-[26px]" />
                            <span className='ml-2'>Hình thức giao hàng</span>
                        </div>
                        <div className="my-2">
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <td className="py-2 border text-center">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                id="delivery1"
                                                className='w-10'
                                                value={"Giao hàng tiêu chuẩn"}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className="py-2 border text-center">
                                            <span className="block w-full px-3 py-[10px] text-base">0đ</span>
                                        </td>
                                        <td className="py-2 border text-center">
                                            <span className="block w-full px-3 py-[10px] text-base">Free</span>
                                        </td>
                                        <td className="py-2 border text-center">
                                            <label htmlFor="delivery1" className="block w-full px-3 py-[10px] text-base">Giao hàng tiêu chuẩn</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border text-center">
                                            <input
                                                type="radio"
                                                name="delivery"
                                                id="delivery2"
                                                className='w-10'
                                                value={"Giao hàng nhanh"}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className="py-2 border text-center">
                                            <span className="block w-full px-3 py-[10px] text-base">40.000đ</span>
                                        </td>
                                        <td className="py-2 border text-center">
                                            <span className="block w-full px-3 py-[10px] text-base">Fast</span>
                                        </td>
                                        <td className="py-2 border text-center">
                                            <label htmlFor="delivery2" className="block w-full px-3 py-[10px] text-base">Giao hàng nhanh</label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="note mt-6">
                            <div className="flex items-center text-[13px] font-semibold">
                                <span className='ml-2'>Quý khách hàng có nhu cầu gói quà miễn phí, vui lòng điền vào phần ghi chú bên dưới</span>
                            </div>
                            <div className="my-2">
                                <textarea name="" id="" cols="30" rows="4" className="block w-full px-3 py-[10px] text-sm border border-gray-300 focus:border-black outline-none" placeholder='Ghi chú đơn hàng (không bắt buộc)' />
                            </div>
                        </div>
                    </form>
                    <div className="py-2">
                        <div className='flex items-center text-[22px]'>
                            <FaCheckSquare className="text-2xl" />
                            <span className='ml-2'>Thông tin đơn hàng</span>
                        </div>
                        <div className='flex items-center text-xl my-4'>
                            <span className='ml-2'>{quantity} Sản phẩm trong giỏ</span>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 text-right text-sm border-b-2 font-normal uppercase">Tên sản phẩm</th>
                                    <th className="py-2 text-right text-sm border-b-2 font-normal uppercase">Số lượng</th>
                                    <th className="py-2 text-right text-sm border-b-2 font-normal uppercase">Tổng tiền</th>
                                    <th className="py-2 text-right text-sm border-b-2 font-normal uppercase">Xóa</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="max-h-[300px] overflow-y-auto">
                            <table className="w-full">
                                <tbody>
                                    {
                                        loading ? (
                                            <tr>
                                                <td className='text-center'>
                                                    <Spin />
                                                </td>

                                            </tr>
                                        ) : (
                                            cart?.length === 0 ?
                                                (
                                                    <tr><td><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></td></tr>
                                                )
                                                :
                                                productCart.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="py-2 border-b-2 text-center w-80">
                                                            <div className="flex items-center">
                                                                <div className="w-[80px] h-[80px]">
                                                                    <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div className="mx-2 max-w-[220px]">
                                                                    <div className="text-sm font-semibold product-name__checkout">{product.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 border-b-2 text-center">
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
                                                        </td>
                                                        <td className="py-2 border-b-2 text-center">
                                                            <div className="text-sm font-bold text-red-500">{VND.format(Number(product.price_discount))}</div>
                                                            <div className="text-xs font-bold text-gray-600 line-through">{VND.format(Number(product.price))}</div>
                                                        </td>
                                                        <td className="py-2 border-b-2 text-center">
                                                            <div className="flex items-center justify-center">
                                                                <div
                                                                    onClick={() => removeCartItem(index)}
                                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer">
                                                                    <FaTrashAlt />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="py-2">
                            <div className="w-full flex items-center justify-between my-5">
                                <div className="text-sm">Tổng số lượng sản phẩm:</div>
                                <div className="text-sm">{quantity}</div>
                            </div>
                            <div className="w-full flex items-center justify-between my-5">
                                <div className="text-sm">Tổng tiền:</div>
                                <div className="text-sm">{VND.format(getTotal())}</div>
                            </div>
                            <div className="w-full flex items-center justify-between my-5">
                                <div className="text-sm">Giảm giá:</div>
                                <div className="text-sm">0đ</div>
                            </div>
                            <div className="w-full flex items-center justify-between my-5">
                                <div className="text-sm">Phí vận chuyển:</div>
                                <div className="text-sm">0đ</div>
                            </div>
                            <div className="w-full flex items-center justify-between my-5">
                                <div className="text-2xl font-medium text-red-500">Tổng thanh toán:</div>
                                <div className="text-2xl font-medium text-red-500">{VND.format(getTotal())}</div>
                            </div>
                            <div className="w-full flex items-center justify-between my-5">
                                <div className="text-sm w-1/3">Bạn có mã khuyến mãi?</div>
                                <div className='flex border border-gray-300 w-2/3'>
                                    <input className='border-none p-2 outline-none text-[13px] flex-1' type="text" placeholder='Nhập mã khuyến mãi' />
                                    <button className='bg-yellow-300 hover:bg-[#df494a] hover:text-white text-sm uppercase font-semibold px-3 py-1'>nhập</button>
                                </div>
                            </div>
                            <button
                                disabled={loading}
                                onClick={() => { handlePayment() }}
                                className="bg-blue-500 hover:border border-blue-500 text-center text-white font-semibold text-xl uppercase block w-full my-8 py-4 hover:bg-white hover:text-gray-600 border hover:border-gray-600 transition-colors duration-300 ease-in-out">
                                thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
