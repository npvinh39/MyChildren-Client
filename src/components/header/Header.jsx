import React, { useState, useEffect } from 'react';
import { Drawer, Empty, Spin } from 'antd';
import { RiPhoneFill, RiMapPinFill, RiSearchLine, RiMapPinUserFill, RiVipCrownLine, RiShoppingCart2Line, RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { GlobalStateContext } from "../../GlobalState";
import { ApiProduct } from "../../api/api-product";

export const Header = () => {
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const [loading, setLoading] = useState(true);
    const state = React.useContext(GlobalStateContext);
    const [cart, setCart] = state.cart;
    const [products, setProducts] = state.products;

    // get all product
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await ApiProduct.getAll();
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();

        // Lấy dữ liệu giỏ hàng từ localStorage khi component được tạo
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

    }, []);

    // on click close modal search
    const [isSearch, setIsSearch] = useState(false);
    const closeModalSearch = () => {
        setIsSearch(false);
    };

    const removeCartItem = (index) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            newCart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    // get quantity of cart
    const getQuantity = () => {
        let quantity = 0;
        cart.forEach(item => {
            quantity += item.quantity;
        });
        return quantity;
    };

    // get all product of cart
    const getProduct = () => {
        let product = [];
        cart.forEach(item => {
            products.forEach(productItem => {
                if (item._id === productItem._id) {
                    product.push(productItem);
                }
            });
        });
        return product;
    };
    const productCart = getProduct();

    // get total price of cart
    const getTotal = () => {
        let total = 0;
        cart.forEach(item => {
            products.forEach(productItem => {
                if (item._id === productItem._id) {
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
            if (item._id === id) {
                quantity = item.quantity;
            }
        });
        return quantity;
    };

    // search product
    const [search, setSearch] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const searchProduct = (e) => {
        e.preventDefault();
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const searchResult = products.filter(product => {
            return product.fields.product_name.toLowerCase().includes(searchValue);
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
                            <a className="text-sm text-white hover:text-red-500 font-bold transition-all flex items-center h-6 hidden sm:flex" href="/">
                                <span className="text-base pr-1">
                                    <RiMapPinFill />
                                </span>
                                Hệ thống 246 cửa hàng mykingdom
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
                            <Link to="/category">
                                <p className='py-1'>
                                    Hàng mới
                                </p>
                            </Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Sản phẩm
                                </p>
                            </Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Giới tính
                                </p>
                            </Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Độ tuổi
                                </p>
                            </Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Thương hiệu
                                </p>
                            </Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Khuyến mãi
                                </p>
                            </Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Chiến dịch
                                </p>
                                nổi bật</Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Ưu đãi
                                </p>
                                thành viên</Link>
                            <Link to="/category">
                                <p className='py-1'>
                                    Cẩm nang
                                </p>
                            </Link>
                        </Drawer>
                        <div className="logo">
                            <Link to="/">
                                <img className="h-[60px] hidden xl:block"
                                    src="https://u6wdnj9wggobj.vcdn.cloud/media/logo/stores/1/logo-254x76.png"
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
                                    <span className="font-bold text-xl text-red-500">
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
                                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                        ) : (
                                                            search.map((product, index) => (
                                                                <Link
                                                                    key={index}
                                                                    onClick={closeModalSearch}
                                                                    to={`/products/${product.id}`}
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
                                                                                <span>{VND.format(Number(product.fields.price_discount))}</span>
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

                        <div className="flex justify-end xl:justify-between xl:w-[420px] font-medium text-sm mr-2 lg:mr-0 xl:pr-16">
                            <Link to="/orders" className="vip-member flex items-center cursor-pointer hidden xl:flex">
                                <span className="text-3xl pr-1">
                                    <RiVipCrownLine />
                                </span>
                                <span className='uppercase'>Tra cứu</span>
                            </Link>

                            <div className="user flex items-center cursor-pointer hidden xl:flex">
                                <span className="text-3xl pr-1">
                                    <RiMapPinUserFill />
                                </span>
                                <span className='uppercase'>Tài Khoản</span>
                            </div>

                            <div className="cart group flex items-center badge cursor-pointer relative transition-all" data-count={getQuantity()}>
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
                                                cart.length === 0 ?
                                                    (
                                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
                                        <span className="text-xl text-red-500 font-semibold">{VND.format(getTotal())}</span>
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
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Hàng Mới
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Sản Phẩm
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Giới Tính
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Độ Tuổi
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Thương Hiệu
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Khuyến Mãi
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Chiến Dịch Nổi Bật
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Ưu Đãi Thành Viên
                            </Link>
                        </li>
                        <li className="inline-block px-2">
                            <Link to="/category" className="text-sm text-white hover:text-slate-200 font-bold transition-all">
                                Cẩm Nang
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}