import React, { useState, useEffect } from 'react';
import moment from 'moment';
import sha256 from 'js-sha256';
import Breadcrumb from './Breadcrumb';
import { isMobile } from 'react-device-detect';
import { Empty, Spin, Space, Form, Input, Button, Select, Radio, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCreditCard, FaTruck, FaCheckSquare, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getProductCart } from '../../features/cart/cartSlice';
import { updateProductFromCart, deleteProductFromCart } from '../../features/cart/path-api';
import { createOrder } from '../../features/order/path-api';
import { apiProvince } from '../../api/api-province';
import { openPayment } from '../../api/paymentClient.ts';

export const Checkout = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const dispatch = useDispatch();
    const { isAuth } = useSelector(state => state.login);
    const { profile } = useSelector(state => state.user);
    const { cart, productCart, totalPrice, quantityCart } = useSelector(state => state.cart);
    const { products, loading, currentPage, pageSize, totalPages, sort } = useSelector(state => state.product);
    const [quantity, setQuantity] = useState(0);
    const [timeStamp, setTimeStamp] = useState('');
    const [windowType, setWindowType] = useState(0);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [ward, setWard] = useState('');
    const [street, setStreet] = useState('');
    const [shipping, setShipping] = useState(0);

    const [infoOrder, setInfoOrder] = useState({
        // orders: '',
        cartId: '',
        buyerEmail: '',
        buyerLastNm: '',
        buyerFirstNm: '',
        buyerPhone: '',
        buyerAddr: '',
        paymentMethod: '',
        deliveryMethod: '',
        // items: JSON.parse(localStorage.getItem('cart')),
    });

    // get cart_id from profile
    useEffect(() => {
        if (profile) {
            setInfoOrder(prevInfoOrder => ({
                ...prevInfoOrder,
                cartId: profile.cart._id
            }));
        }
    }, [profile]);

    // check is logged in, if not, navigate to home page
    useEffect(() => {
        if (!isAuth) {
            message.info('Vui lòng đăng nhập để thanh toán!');
            navigate('/');
        }
    }, [isAuth]);


    const getSpending = () => {
        let discount = 0;
        if (profile?.spending >= 1000000) {
            discount = 0.1;
        }
        else if (profile?.speding >= 500000) {
            discount = 0.05;
        }
        else if (profile?.speding >= 100000) {
            discount = 0.02;
        }
        else {
            discount = 0;
        }
        return discount;
    };

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

    const removeCartItem = (index, id) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        // setCart(newCart);
        dispatch(getCart(newCart));
        if (isAuth) {
            dispatch(deleteProductFromCart({ id }));
        }
        else {
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        const updatedCart = cart.map(cartItem =>
            cartItem.product_id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );

        // setCart(updatedCart);
        dispatch(getCart(updatedCart));
        if (isAuth) {
            dispatch(updateProductFromCart({ products: updatedCart }));
        }
        else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
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

    // set fields value when is logged in
    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                buyerEmail: profile.email,
                buyerLastNm: profile.last_name,
                buyerFirstNm: profile.first_name,
                buyerPhone: profile.phone,
                buyerCity: profile.address[0]?.province,
                buyerDistrict: profile.address[0]?.district,
                buyerWard: profile.address[0]?.ward,
                buyerStreet: profile.address[0]?.number_street,
            });
            setInfoOrder(prevInfoOrder => ({
                ...prevInfoOrder,
                buyerEmail: profile.email,
                buyerLastNm: profile.last_name,
                buyerFirstNm: profile.first_name,
                buyerPhone: profile.phone,
                buyerAddr: `${profile.address[0]?.number_street}, ${profile.address[0]?.ward}, ${profile.address[0]?.district}, ${profile.address[0]?.province}`,
            }));
            setSelectedProvince(profile.address[0]?.province);
            setSelectedDistrict(profile.address[0]?.district);
            setWard(profile.address[0]?.ward);
            setStreet(profile.address[0]?.number_street);
        }
    }, [form, profile]);

    // set field address when change province, district, ward
    const handleProvinceChange = (e) => {
        const provinceCode = e;
        setSelectedProvince(provinceCode);
        form.setFieldsValue({
            buyerDistrict: '',
            buyerWard: '',
        });
        setInfoOrder(prevInfoOrder => ({
            ...prevInfoOrder,
            buyerAddr: '',
        }));
    };

    const handleDistrictChange = (e) => {
        const districtCode = e;
        setSelectedDistrict(districtCode);
        form.setFieldsValue({
            buyerWard: '',
        });
        setInfoOrder(prevInfoOrder => ({
            ...prevInfoOrder,
            buyerAddr: '',
        }));
    };

    const handleWardChange = (e) => {
        setWard(e);
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

    const handlePayment = async (values) => {
        // save info order to localStorage
        localStorage.setItem('infoOrder', JSON.stringify(infoOrder));

        if (values.paymentMethod === "Thanh toán trực tuyến") {
            const formattedTimeStamp = await moment().format('YYYYMMDDHHmmss');
            setTimeStamp(formattedTimeStamp);
            openPayment(1, "https://sandbox.megapay.vn/");
        }
        else {
            const order = {
                id: infoOrder.cartId,
                code_order: invoiceNo,
                customer: infoOrder.buyerLastNm + ' ' + infoOrder.buyerFirstNm,
                phone: infoOrder.buyerPhone,
                email: infoOrder.buyerEmail,
                shipping: infoOrder.deliveryMethod === 'Giao hàng nhanh' ? 40000 : 20000,
                payment_method: infoOrder.paymentMethod,
                payment_status: infoOrder.paymentMethod === 'Thanh toán khi nhận hàng' ? 'Chưa thanh toán' : 'Đã thanh toán',
                delivery_method: infoOrder.deliveryMethod,
                address: infoOrder.buyerAddr,
                total: parseInt(amount),
            };
            console.log("order: ", order)
            dispatch(createOrder(order));
            localStorage.removeItem('infoOrder');
            navigate('/');
        }
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
                {/* <Link to="/" className="block w-full text-sm text-blue-500 my-5 pl-5">
                    Đã có tài khoản? <span className='font-semibold'>Đăng nhập</span>
                </Link> */}
                <Form
                    form={form}
                    id="megapayForm" name="megapayForm" method="POST"
                    className="py-2"
                    onFinish={handlePayment}
                    layout='vertical'
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
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
                            <Form.Item
                                label="Email"
                                name="buyerEmail"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!',
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    onChange={handleInputChange}
                                    name='buyerEmail'
                                    placeholder='Email'
                                />
                            </Form.Item>
                            <div
                                className='flex items-center'
                            >

                                <Form.Item
                                    label="Họ"
                                    name="buyerLastNm"
                                    className='w-1/2 mr-2'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ!'
                                        }
                                    ]}
                                >
                                    <Input
                                        type="text"
                                        onChange={handleInputChange}
                                        name='buyerLastNm'
                                        placeholder='Họ'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Tên"
                                    name="buyerFirstNm"
                                    className='w-1/2'
                                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                >
                                    <Input
                                        type="text"
                                        onChange={handleInputChange}
                                        name='buyerFirstNm'
                                        placeholder='Tên'
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Số điện thoại"
                                name="buyerPhone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!'
                                    },
                                    {
                                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                                        message: 'Số điện thoại không hợp lệ!'
                                    }
                                ]}
                            >
                                <Input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="buyerPhone"
                                    placeholder='Số điện thoại'
                                />
                            </Form.Item>
                            <div
                                className='flex items-center'
                            >

                                <Form.Item
                                    label="Tỉnh/Thành"
                                    name='buyerCity'
                                    className='w-1/2 mr-2'
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành!' }]}
                                >
                                    <Select
                                        name='buyerCity'
                                        onChange={handleProvinceChange}
                                        placeholder='Tỉnh/Thành'
                                        value={selectedProvince || ''}
                                        options={provinces.map((province) => (
                                            {
                                                key: province.code,
                                                label: province.name,
                                                value: province.name
                                            }
                                        ))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quận/Huyện"
                                    name='buyerDistrict'
                                    className='w-1/2'
                                    rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                                >
                                    <Select
                                        name='buyerDistrict'
                                        onChange={handleDistrictChange}
                                        placeholder='Quận/Huyện'
                                        value={selectedDistrict || ''}
                                        options={selectedProvince &&
                                            provinces
                                                .find((province) => province.name === selectedProvince)?.districts.map((district) => (
                                                    {
                                                        key: district.code,
                                                        label: district.name,
                                                        value: district.name
                                                    }
                                                ))
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div
                                className='flex items-center'
                            >
                                <Form.Item
                                    label="Phường/Xã"
                                    name='buyerWard'
                                    className='w-1/2 mr-2'
                                    rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                                >
                                    <Select
                                        name='buyerWard'
                                        onChange={handleWardChange}
                                        placeholder='Phường/Xã'
                                        value={ward}
                                        options={selectedDistrict &&
                                            provinces
                                                .reduce((prev, province) => prev.concat(province.districts), [])
                                                .find((district) => district.name === selectedDistrict)?.wards.map((ward) => (
                                                    {
                                                        key: ward.code,
                                                        label: ward.name,
                                                        value: ward.name
                                                    }
                                                ))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số nhà, tên đường"
                                    name='buyerStreet'
                                    className='w-1/2'
                                    rules={[{ required: true, message: 'Vui lòng nhập số nhà, tên đường!' }]}
                                >
                                    <Input
                                        type="text"
                                        value={street}
                                        onChange={handleStreetChange}
                                        placeholder='Số nhà, tên đường'
                                    />
                                </Form.Item>

                            </div>
                            {/* <Form.Item
                            label="Ghi chú"
                            name='buyerNote'
                        >
                            <Input.TextArea
                                name=""
                                id=""
                                cols="30"
                                rows="4"
                                placeholder='Ghi chú đơn hàng (không bắt buộc)'
                            />
                        </Form.Item> */}
                            <Form.Item
                                label="Phương thức thanh toán"
                                name='paymentMethod'
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                            >
                                <Radio.Group
                                    onChange={handleInputChange}
                                    name="paymentMethod"
                                >
                                    <Radio value={"Thanh toán trực tuyến"}>Thanh toán trực tuyến</Radio>
                                    <Radio value={"Thanh toán khi nhận hàng"}>Thanh toán khi nhận hàng</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Hình thức giao hàng"
                                name='deliveryMethod'
                                rules={[{ required: true, message: 'Vui lòng chọn hình thức giao hàng!' }]}
                            >
                                <Radio.Group
                                    onChange={handleInputChange}
                                    name="deliveryMethod"
                                >
                                    <Radio
                                        value={"Giao hàng tiêu chuẩn"}
                                        onClick={() => setShipping(20000)}
                                    >
                                        Giao hàng tiêu chuẩn
                                    </Radio>
                                    <Radio
                                        value={"Giao hàng nhanh"}
                                        onClick={() => setShipping(40000)}
                                    >
                                        Giao hàng nhanh
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className="py-2">
                            <div className='flex items-center text-[22px]'>
                                <FaCheckSquare className="text-2xl" />
                                <span className='ml-2'>Thông tin đơn hàng</span>
                            </div>
                            <div className='flex items-center text-xl my-4'>
                                <span className='ml-2'>{quantityCart} Sản phẩm trong giỏ</span>
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
                                                                {
                                                                    product.price_discount === product.price ?
                                                                        <div className="text-sm font-bold text-red-500">{VND.format(Number(product.price_discount))}</div>

                                                                        :
                                                                        <div>
                                                                            <div className="text-sm font-bold text-red-500">{VND.format(Number(product.price_discount))}</div>
                                                                            <div className="text-xs font-bold text-gray-600 line-through">{VND.format(Number(product.price))}</div>
                                                                        </div>

                                                                }
                                                            </td>
                                                            <td className="py-2 border-b-2 text-center">
                                                                <div className="flex items-center justify-center">
                                                                    <div
                                                                        onClick={() => removeCartItem(index, product._id)}
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
                                    <div className="text-sm">{quantityCart}</div>
                                </div>
                                <div className="w-full flex items-center justify-between my-5">
                                    <div className="text-sm">Tổng tiền:</div>
                                    <div className="text-sm">{VND.format(totalPrice)}</div>
                                </div>
                                <div className="w-full flex items-center justify-between my-5">
                                    <div className="text-sm">
                                        Giảm giá ({getSpending() * 100}%):
                                    </div>
                                    <div className="text-sm">
                                        {
                                            profile ?
                                                VND.format(getSpending() * totalPrice)
                                                :
                                                VND.format(0)
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between my-5">
                                    <div className="text-sm">Phí vận chuyển:</div>
                                    <div className="text-sm">
                                        {
                                            shipping === 0 ?
                                                VND.format(0)
                                                :
                                                VND.format(shipping)
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between my-5">
                                    <div className="text-2xl font-medium text-red-500">Tổng thanh toán:</div>
                                    <div className="text-2xl font-medium text-red-500">{VND.format(totalPrice - (getSpending() * totalPrice) + shipping)}</div>
                                </div>
                                {/* <div className="w-full flex items-center justify-between my-5">
                                    <div className="text-sm w-1/3">Bạn có mã khuyến mãi?</div>
                                    <div className='flex border border-gray-300 w-2/3'>
                                        <input className='border-none p-2 outline-none text-[13px] flex-1' type="text" placeholder='Nhập mã khuyến mãi' />
                                        <button className='bg-yellow-300 hover:bg-[#df494a] hover:text-white text-sm uppercase font-semibold px-3 py-1'>nhập</button>
                                    </div>
                                </div> */}
                                <Form.Item>
                                    <button
                                        disabled={loading}
                                        type='primary'
                                        htmlType='submit'
                                        className="bg-blue-500 hover:border border-blue-500 text-center text-white font-semibold text-xl uppercase block w-full my-8 py-4 hover:bg-white hover:text-gray-600 border hover:border-gray-600 transition-colors duration-300 ease-in-out"
                                    >
                                        Thanh toán
                                    </button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}