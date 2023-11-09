import React, { useState, useEffect } from 'react';
import { Drawer, Empty, Spin, Dropdown, message, Modal } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { RiPhoneFill, RiSearchLine, RiUserLine, RiVipCrownLine, RiShoppingCart2Line, RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin, onLogout } from '../../features/login/path-api';
import { fetchProductsWithDescription } from '../../features/product/path-api';
import { fetchProfile } from '../../features/user/path-api';
import { addToCart, updateProductFromCart } from '../../features/cart/path-api';
import { getCart, getProductCart, getTotalPrice, getQuantityCart } from '../../features/cart/cartSlice';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export const Header = () => {
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const dispatch = useDispatch();
    const { products, loading, currentPage, pageSize, totalPages, sort } = useSelector(state => state.product);
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);
    const { cart, productCart, totalPrice, quantityCart } = useSelector(state => state.cart);

    // get id user from access token cookies
    const accessToken = Cookies.get('accessToken');
    let decode = '';
    let id = '';
    if (accessToken) {
        decode = jwtDecode(accessToken);
        id = decode.id;
    }

    // get profile user
    useEffect(() => {
        if (id) {
            dispatch(fetchProfile(id));
        }
    }, [dispatch, id]);


    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProductsWithDescription({ currentPage, pageSize: 999, sort }));
        }
    }, [dispatch, currentPage, pageSize]);


    useEffect(() => {
        // check if isAuth is true then get cart from profile user else get cart from local storage
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (isAuth) {
            // save cart to profile user
            if (savedCart) {
                dispatch(addToCart({ products: savedCart }));
                localStorage.removeItem('cart');
            }
            dispatch(getCart(profile?.cart.products));
        } else {
            // save cart to local storage
            if (savedCart) {
                dispatch(getCart(savedCart));
            }
        }
    }, [dispatch, isAuth, profile?.cart.products.length]);

    useEffect(() => {
        // get product from cart
        const productCart = [];
        if (Array.isArray(cart)) {
            cart?.forEach(item => {
                products.forEach(productItem => {
                    if (item.product_id === productItem._id) {
                        productCart.push(productItem);
                    }
                });
            });
        }
        // setProductCart(productCart);
        dispatch(getProductCart(productCart));
        dispatch(getTotalPrice(getTotal()));
        dispatch(getQuantityCart(getQuantity()));
    }, [cart, products, dispatch]);

    // Modal logout
    const navigate = useNavigate();
    const [modalText, setModalText] = useState('Bạn có chắc chắn muốn đăng xuất?');
    const [openModalLogOut, setOpenModalLogOut] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpenModalLogOut(true);
    };
    const handleOk = async () => {
        setModalText('Đang đăng xuất...');
        setConfirmLoading(true);
        await dispatch(onLogout());
        navigate('/');
        setOpenModalLogOut(false);
        setConfirmLoading(false);
        setModalText('Bạn có chắc chắn muốn đăng xuất?');
        window.location.reload();
    };
    const handleCancel = () => {
        setOpenModalLogOut(false);
    };

    // on click close modal search
    const [isSearch, setIsSearch] = useState(false);
    const closeModalSearch = () => {
        setIsSearch(false);
    };

    const removeCartItem = (index) => {
        const newCart = cart.filter((item, i) => i !== index);
        // setCart(newCart);
        dispatch(getCart(newCart));
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // get quantity of cart
    const getQuantity = () => {
        if (Array.isArray(cart)) {
            let quantity = 0;
            cart?.forEach(item => {
                quantity += item.quantity;
            });
            return quantity;
        }
        return 0;
    };

    // get total price of cart
    const getTotal = () => {
        if (Array.isArray(cart)) {
            let total = 0;
            cart?.forEach(item => {
                products?.forEach(productItem => {
                    if (item.product_id === productItem._id) {
                        total += Number(productItem.price_discount) * item.quantity;
                    }
                });
            });
            return total;
        }
        return 0;
    };

    // get quantity of product
    const getQuantityOfProduct = (id) => {
        if (Array.isArray(cart)) {
            let quantity = 0;
            cart?.forEach(item => {
                if (item.product_id === id) {
                    quantity = item.quantity;
                }
            });
            return quantity;
        }
        return 0;
    };

    // search product
    const [search, setSearch] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const searchProduct = (e) => {
        e.preventDefault();
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const searchResult = products.filter(product => {
            return product.name.toLowerCase().includes(searchValue);
        });
        setSearch(searchResult);
    };

    // open and close modal search
    useEffect(() => {
        if (searchValue.length > 0) {
            setIsSearch(true);
        } else {
            setIsSearch(false);

        }
    }, [search]);



    // fixed menu when scroll
    window.addEventListener("scroll", function () {
        const menuFooter = document.getElementById("menu-footer");
        const threshold = 124; //px;

        if (window.pageYOffset > threshold) {
            menuFooter.style.position = "fixed";
            menuFooter.style.top = "0";
            menuFooter.style.left = "0";
        } else {
            menuFooter.style.position = "static";
        }
    });
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <header className="block w-full">
            <div id="menu-info" className="bg-[#3e4999]">
                <div className="container mx-auto 2xl:px-20">
                    <ul className="flex justify-between px-1">
                        <li className="">
                            <a className="text-sm text-white font-bold uppercase flex items-center h-6" href="tel:19001208">
                                <span className="text-lg pr-1">
                                    <RiPhoneFill />
                                </span>
                                HOTLINE: 19001208
                            </a>
                        </li>
                        <li className="">
                            <a className="text-sm text-white hover:text-gray-200 font-bold transition-all flex items-center h-6 hidden sm:flex" href="/">
                                {
                                    isAuth ? (
                                        <span className="text-base pr-1">
                                            Xin chào, {profile?.last_name} {profile?.first_name}
                                        </span>
                                    ) : (
                                        <span className="text-base pr-1">
                                            Hàng chuẩn - Giá tốt - Giao nhanh
                                        </span>
                                    )
                                }
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <menu id="menu-body" className="block w-full h-16 xl:h-[100px] bg-[#ededed] xl:bg-white">
                <div className="container 2xl:px-20 mx-auto h-full">
                    <div className="flex justify-between items-center h-full xl:ml-11">
                        <div className="menu-mobile text-3xl ml-2 block xl:hidden" onClick={showDrawer}>
                            <RiMenuFill />
                        </div>
                        <Drawer title="Menu" placement="right" onClose={onClose} open={open}>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Hàng mới
                                </p>
                            </Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Sản phẩm
                                </p>
                            </Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Giới tính
                                </p>
                            </Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Độ tuổi
                                </p>
                            </Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Thương hiệu
                                </p>
                            </Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Khuyến mãi
                                </p>
                            </Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Chiến dịch
                                </p>
                                nổi bật</Link>
                            <Link to="/category/all">
                                <p className='py-1'>
                                    Ưu đãi
                                </p>
                                thành viên</Link>
                            <Link to="/orders">
                                <p className='py-1'>
                                    Tra cứu
                                </p>
                            </Link>
                        </Drawer>
                        <div className="logo">
                            <Link to="/">
                                <img className="h-[60px] hidden xl:block"
                                    src="https://res.cloudinary.com/npvinh/image/upload/v1698772003/MyChildren/logo-MyChildren_ctwqry.png"
                                    alt="logo" />
                                <img className="h-[40px] block xl:hidden mx-5"
                                    src="https://u6wdnj9wggobj.vcdn.cloud/media/favicon/stores/1/mkd-logo-mobile_1.png"
                                    alt="logo" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[580px] mx-6 lg:mx-0">
                            <form action="" className="flex shadow h-10 relative">
                                <input
                                    onChange={searchProduct}
                                    type="text"
                                    className="inline w-4/5 pl-4 text-sm flex-1 focus:outline-none"
                                    placeholder="Tìm kiếm sản phẩm..." />
                                <button type="submit" className="w-14 md:w-20 xl:w-[100px] bg-[#f7f9fa]">
                                    <span className="font-bold text-xl text-blue-500">
                                        <RiSearchLine className='w-full' />
                                    </span>
                                </button>
                                {/* modal search */}
                                {isSearch &&
                                    <div className="modal-search absolute top-11 left-0 w-full h-full z-[101]">
                                        <div className=" bg-white rounded-md">
                                            <div className="flex justify-between items-center p-3 border-b-[1px] w-full border-gray-300">
                                                <div className="text-sm font-semibold">
                                                    <span>Kết quả tìm kiếm</span>
                                                </div>
                                                <div
                                                    onClick={closeModalSearch}
                                                    className="cursor-pointer"
                                                >
                                                    <span className="text-2xl">
                                                        <RiCloseLine />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <div className="max-h-[50vh] w-full overflow-y-auto">
                                                    {
                                                        search.length === 0 ? (
                                                            <Empty description='Không tìm thấy sản phẩm' image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                        ) : (
                                                            search.map((product, index) => (
                                                                <Link
                                                                    key={index}
                                                                    onClick={closeModalSearch}
                                                                    to={`/products/${product._id}`}
                                                                    className="flex justify-between items-center gap-3 p-3 border-b-[1px] border-gray-300">
                                                                    <img
                                                                        className='w-[68px] h-[68px] object-cover'
                                                                        src={product.images[0].url}
                                                                        alt=""
                                                                    />
                                                                    <div className="flex-1 flex flex-col justify-between">
                                                                        <div className="font-semibold text-[13px]">
                                                                            <span>{product.name}</span>
                                                                            <div className="text-sm text-red-600 font-normal">
                                                                                <span>{VND.format(Number(product.price_discount))}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </form>
                        </div>

                        <div className="flex justify-end xl:justify-around xl:w-[420px] font-medium text-sm mr-2 lg:mr-0">
                            {/* <Link to="/orders" className="vip-member flex items-center cursor-pointer hidden xl:flex">
                                <span className="text-3xl pr-1">
                                    <RiVipCrownLine />
                                </span>
                                <span className='uppercase'>Tra cứu</span>
                            </Link> */}

                            {
                                isAuth ? (
                                    <div className="user flex items-center flex-col cursor-pointer hidden xl:flex">
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    {
                                                        key: '1',
                                                        label: 'Thông tin tài khoản',
                                                        icon: <UserOutlined />,
                                                        onClick: () => {
                                                            message.info('Thông tin tài khoản');
                                                        },
                                                    },
                                                    {
                                                        key: '2',
                                                        label: 'Đăng xuất',
                                                        icon: <LogoutOutlined />,
                                                        onClick: () => {
                                                            showModal();
                                                        },
                                                    },
                                                ],
                                            }}
                                            placement="bottomRight"
                                        >
                                            <div className='flex items-center flex-col'>
                                                <span className="text-3xl pr-1">
                                                    <RiUserLine />
                                                </span>
                                                <span className='uppercase'>Tài Khoản</span>
                                            </div>
                                        </Dropdown>
                                        <Modal
                                            title="Bạn chắc chứ"
                                            open={openModalLogOut}
                                            onOk={handleOk}
                                            confirmLoading={confirmLoading}
                                            onCancel={handleCancel}
                                            okText="Đăng xuất"
                                            okType='danger'
                                            cancelText="Hủy"
                                        >
                                            <p>{modalText}</p>
                                        </Modal>
                                    </div>
                                ) : (
                                    <Link to='/login' className="user flex items-center flex-col cursor-pointer hidden xl:flex">
                                        <span className="text-3xl pr-1">
                                            <RiUserLine />
                                        </span>
                                        <span className='uppercase'>Đăng Nhập</span>

                                    </Link>

                                )
                            }
                            {/* <Modal title="" width={600} open={isModalOpenLogin} footer={null} onOk={handleOkLogin} onCancel={handleCancelLogin}>
                                <div className="">
                                    <Form
                                        size='large'
                                        name="normal_login"
                                        className="w-full px-10"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <h1 className='text-center text-2xl pb-10  font-extrabold text-blue-600'>Chào mừng bạn đến với My Children</h1>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập vào email!',
                                                },
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                                placeholder="Email"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập vào mật khẩu!',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                        <div className='flex justify-between pb-5'>
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                            </Form.Item>

                                            <a className="login-form-forgot text-blue-400" href="#">
                                                Quên mật khẩu?
                                            </a>
                                        </div>

                                        <Form.Item>
                                            <Button type="primary" loading={loading} htmlType="submit" size='large' className="login-form-button bg-blue-600 w-full">
                                                Đăng nhập
                                            </Button>
                                            <Divider plain>Bạn chưa có tài khoản? <Link to="/register" className='text-blue-400'>Đăng ký ngay!</Link></Divider>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Modal> */}
                            <div className="cart group flex flex-col items-center badge cursor-pointer relative transition-all" data-count={quantityCart}>
                                <Link to="/cart" className="text-3xl pr-1">
                                    <RiShoppingCart2Line />
                                </Link>
                                <Link to="/cart" className='uppercase hidden xl:block'>Giỏ Hàng</Link>
                                <div className="cart-info absolute top-6 right-0 min-w-[400px] hidden group-hover:block z-20 bg-slate-50 transition-all">
                                    <div className="cart-list max-h-[30vh] overflow-y-auto m-3">
                                        {
                                            loading ? (
                                                <div className='text-center'>
                                                    <Spin />
                                                </div>
                                            ) : (
                                                cart && cart?.length === 0 ?
                                                    (
                                                        <Empty description='Giỏ hàng rỗng' image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                    )
                                                    :
                                                    productCart.map((product, index) => (
                                                        <div key={index} className="cart-list__item flex justify-between items-center gap-3 p-3">
                                                            <div className="cart-list__item__img">
                                                                <img
                                                                    className='w-[68px] h-[68px] object-cover'
                                                                    src={product.images[0].url}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="cart-list__item__info h-[68px] flex-1 flex flex-col justify-between">
                                                                <div className="cart-list__item__info__name font-semibold text-[13px]">
                                                                    <span>{product.name}</span>
                                                                </div>
                                                                <div className="cart-list__item__info__price text-sm text-slate-600 font-normal">
                                                                    <span>{getQuantityOfProduct(product._id)} x </span>
                                                                    <span>{VND.format(Number(product.price_discount))}</span>
                                                                </div>
                                                            </div>
                                                            <div className="cart-list__item__action">
                                                                <button
                                                                    onClick={() => removeCartItem(index)}
                                                                    className="hover:bg-red-500 hover:text-white transition-all rounded p-1"
                                                                >
                                                                    <RiCloseLine className='text-2xl' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                            )
                                        }

                                    </div>
                                    <div className="cart-price uppercase m-3 text-center  border-t-[1px] pt-4">
                                        <span className="text-xl text-slate-600 font-semibold">Tổng: </span>
                                        <span className="text-xl text-red-500 font-semibold">{VND.format(totalPrice)}</span>
                                    </div>
                                    <div className="cart-action mx-3 my-4 flex flex-col justify-between items-center gap-3">
                                        <Link to='/cart'
                                            className="bg-blue-500 border border-blue-500 text-center text-white w-full font-bold text-sm capitalize py-2 rounded-md hover:bg-white hover:text-gray-500 hover:border hover:border-gray-400 transition-colors duration-300 ease-in-out">
                                            Xem giỏ hàng
                                        </Link>
                                        <Link to='/checkout'
                                            className="bg-blue-500 border border-blue-500 text-center text-white w-full font-bold text-sm capitalize py-2 rounded-md hover:bg-white hover:text-gray-500 hover:border hover:border-gray-400 transition-colors duration-300 ease-in-out">
                                            Thanh toán
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </menu>
            <nav id="menu-footer" className="bg-blue-500 w-full h-[34px] z-[100] hidden xl:block">
                <div className="container mx-auto 2xl:px-20 h-full">
                    <ul className="flex justify-between items-center h-full uppercase">
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Hàng Mới
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Sản Phẩm
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Giới Tính
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Độ Tuổi
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Thương Hiệu
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Khuyến Mãi
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Chiến Dịch Nổi Bật
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Ưu Đãi Thành Viên
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category/all" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Cẩm Nang
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}