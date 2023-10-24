import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { RiHeartLine, RiShoppingBag3Fill, RiShoppingCart2Fill, RiPhoneFill } from 'react-icons/ri';
import { Skeleton } from 'antd';
import Breadcrumb from './Breadcrumb';
import ProductImageSlider from './ProductImageSlider';
import Rating from './Rating';
import { ProductsSaleList } from './ProductsSaleList';
import { ApiProduct } from '../../api/api-product';
import { GlobalStateContext } from "../../GlobalState";
import { message } from 'antd';


export const ProductDetail = ({ match }) => {
    const state = React.useContext(GlobalStateContext);
    const [products, setProducts] = state.products;
    const [cart, setCart] = state.cart;
    const { id } = useParams();
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState(null);

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // get product by id
    useEffect(() => {
        const getProduct = async () => {
            const response = await ApiProduct.getById(id);
            // console.log('response', response)
            setProduct(response.data);
            const images = response.data.images.map(image => ({
                original: image.url,
                thumbnail: image.url,
            }));
            setImages(images);
        }
        getProduct();
    }, [id]);

    // change title to product name
    useEffect(() => {
        document.title = product ? product.name : 'Chi tiết sản phẩm';
        return () => {
            document.title = "MYKINGDOM Vương Quốc Đồ Chơi | Đồ Chơi Giáo Dục Hàng Đầu Việt Nam";
        };
    }, [product]);

    // cart
    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage khi component được tạo
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);

        if (existingItemIndex !== -1) {
            const newCart = cart.map(cartItem =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
            );
            setCart(newCart);

            // Lưu giỏ hàng mới vào localStorage
            localStorage.setItem('cart', JSON.stringify(newCart));
        } else {
            const newItem = {
                _id: item._id,
                quantity: quantity
            };

            const newCart = [...cart, newItem];
            setCart(newCart);

            // Lưu giỏ hàng mới vào localStorage
            localStorage.setItem('cart', JSON.stringify(newCart));
        }

        message.success('Thêm vào giỏ hàng thành công');
    };

    const updateCartItem = (index, updatedItem) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            newCart[index] = updatedItem;
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeCartItem = (index) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            newCart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    //quantity
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (value) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + value));
    };
    if (!product) {
        return (
            <div className='product-detail container mx-auto px-3 2xl:px-20 my-4'>
                <Skeleton
                    active
                    className="py-5"
                />
                <Skeleton
                    active
                    className="py-5"
                />
                <Skeleton
                    active
                    className="py-5"
                />
                <Skeleton
                    active
                    className="py-5"
                />
            </div>
        )
    }
    else {
        return (
            <div className='product-detail container mx-auto px-3 2xl:px-20 my-4'>
                <div className="breadcrumb bg-gray-100 px-3 py-[2px]">
                    <Breadcrumb />
                </div>

                <div className="product-detail__content flex flex-col md:flex-row gap-10 mt-8">
                    <div className="product-detail__image w-full md:w-6/12 lg:w-5/12">
                        <ProductImageSlider images={images} />
                    </div>

                    <div className="product-detail__info w-full md:w-6/12 lg:w-7/12">
                        <h1 className="product-detail__info__name text-xl font-semibold capitalize">{product.name}</h1>

                        <div className="product-detail__info__rating my-1">
                            <Rating rating={4.5} />
                        </div>

                        <div className="product-detail__info__sku text-sm text-gray-500">
                            <span>
                                Thương hiệu: <Link className='text-blue-500'>{product.product_id}</Link>
                            </span>
                            <span className='ml-9'>
                                <b>SKU: </b>{product.product_id}
                            </span>
                        </div>

                        <div className="product-detail__info__price mt-2">
                            <span className="product-detail__info__price__current text-2xl text-red-500 font-bold">{VND.format(Number(product.price))}</span>
                            <span className="product-detail__info__price__old text-sm text-gray-500 ml-2 line-through">{VND.format(Number(product.price_discount))}</span>
                        </div>

                        <div className="product-detail__info__sale my-2">
                            <p className="text-[14px] text-red-500">
                                Giảm thêm 5% khi là thành viên.
                            </p>
                        </div>

                        <div className="product-detail__info-table py-2">
                            <table className="table-auto border w-full xl:w-[80%]">
                                <tbody>
                                    <tr className="border">
                                        <td className='px-2 py-3 w-10'><RiShoppingBag3Fill className='text-2xl' /></td>
                                        <td className='px-2 py-3 text-sm'>Hàng chính hãng, chứng nhận an toàn</td>
                                    </tr>
                                    <tr className="border">
                                        <td className='px-2 py-3 w-10'><RiShoppingCart2Fill className='text-2xl' /></td>
                                        <td className='px-2 py-3 text-sm'>Miễn phí giao hàng toàn quốc <b>đơn trên 500K</b></td>
                                    </tr>
                                    <tr className="border">
                                        <td className='px-2 py-3 w-10'><RiPhoneFill className='text-2xl' /></td>
                                        <td className='px-2 py-3 text-sm'>Liên hệ hỗ trợ: 1900.1208</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="product-detail__info__quantity mt-2 flex justify-start items-center">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="border border-gray-200 bg-gray-200 font-bold text-xl text-gray-500 rounded-md px-[14px] py-[4px] mr-2"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="border border-gray-300 rounded-md px-2 py-2 w-10 text-center font-bold text-sm text-gray-500 outline-none"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="border border-gray-200 bg-gray-200 font-bold text-xl text-gray-500 rounded-md px-[14px] py-[4px] ml-2"
                            >
                                +
                            </button>
                        </div>

                        <div className="product-detail__info__add-to-cart mt-2 flex justify-between items-center gap-2 w-full xl:w-[80%]">
                            <Link to={'/checkout'}
                                onClick={() => addToCart(product)}
                                className="bg-[#df494a] border border-[#df494a] text-white text-center w-[45%] font-bold text-sm uppercase px-6 py-3 rounded-md hover:bg-white hover:text-gray-500 hover:border hover:border-gray-400 transition-colors duration-300 ease-in-out">
                                Mua Ngay
                            </Link>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-[#df494a] border border-[#df494a] text-white text-center w-[45%] font-bold text-sm uppercase px-6 py-3 rounded-md hover:bg-white hover:text-gray-500 hover:border hover:border-gray-400 transition-colors duration-300 ease-in-out">
                                Thêm vào giỏ hàng
                            </button>
                            <RiHeartLine
                                className=' w-[10%] text-[#df494a] text-4xl cursor-pointer hover:text-[#df494a] transition-colors duration-300 ease-in-out'
                            />
                        </div>
                        <div className="select-store">
                            <div className="select-store__title mt-4">
                                <h3 className="text-[15px] font-medium uppercase">Các cửa hàng còn sản phẩm (222)</h3>
                            </div>
                            <div className="select-store__list mt-2">
                                <div className="seselect-store__list-location flex justify-between items-center w-full xl:w-[80%] mt-2">
                                    <select className="select-store__list__select w-full border border-gray-300 px-2 py-3 text-sm text-gray-500 outline-none">
                                        <option value="1">Tỉnh/Thành</option>
                                    </select>
                                    <select className="select-store__list__select w-full border border-gray-300 px-2 py-3 text-sm text-gray-500 outline-none">
                                        <option value="1">Quận/Huyện</option>
                                    </select>
                                </div>
                                <div className="select-store__list__store w-full xl:w-[80%]">
                                    <table className="select-store__list__store__table block w-full max-h-[260px] overflow-y-auto">
                                        <tbody className='flex flex-col'>
                                            <tr className="border">
                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                    <p className='uppercase font-medium'>
                                                        MYKINGDOM 30-04 CẦN THƠ
                                                    </p>
                                                    <p className='text-xs  text-gray-600'>
                                                        52 Đường 30/4, Phường An Phú
                                                    </p>
                                                    <a href='tel:02923819709' className='text-xs text-gray-600 hover:text-red-500'>
                                                        (0292) 3819709
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="border">
                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                    <p className='uppercase font-medium'>
                                                        MYKINGDOM MẬU THÂN - CẦN THƠ
                                                    </p>
                                                    <p className='text-xs  text-gray-600'>
                                                        21B Mậu Thân, Phường Xuân Khánh
                                                    </p>
                                                    <a href='tel:(0292) 3730700' className='text-xs text-gray-600 hover:text-red-500'>
                                                        (0292) 3730700
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="border">
                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                    <p className='uppercase font-medium'>
                                                        MY KINGDOM VINCOM XUÂN KHÁNH
                                                    </p>
                                                    <p className='text-xs  text-gray-600'>
                                                        Tầng 3, Vincom Xuân Khánh số 209 đường 30 Tháng 4, Phường Xuân Khánh
                                                    </p>
                                                    <a href='tel:02923730899' className='text-xs text-gray-600 hover:text-red-500'>
                                                        02923730899
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="border">
                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                    <p className='uppercase font-medium'>
                                                        MYKINGDOM LOTTE CẦN THƠ
                                                    </p>
                                                    <p className='text-xs  text-gray-600'>
                                                        Tầng 1, Lotte Mart Cần Thơ, 84 Mậu Thân, Phường An Hòa
                                                    </p>
                                                    <a href='tel:(0292) 3822253' className='text-xs text-gray-600 hover:text-red-500'>
                                                        (0292) 3822253
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="border">
                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                    <p className='uppercase font-medium'>
                                                        MYKINGDOM GO! CẦN THƠ
                                                    </p>
                                                    <p className='text-xs  text-gray-600'>
                                                        Tầng Trệt Lô Số 1, Khu Dân Cư Hưng Phú 1, Phường Hưng Phú
                                                    </p>
                                                    <a href='tel:' className='text-xs text-gray-600 hover:text-red-500'>

                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-detail__description my-5">
                    <div className="product-detail__content">
                        <div className="product-detail__description__title">
                            <h3 className="text-lg font-semibold">Mô tả sản phẩm</h3>
                        </div>
                        <div className="product-detail__description__content mt-2">
                            <h3 className="text-xl font-semibold capitalize">{product.name}</h3>
                            <div className="text-sm text-gray-500 text-justify">
                                Không cần tìm kiếm "chú rồng huyền thoại" đâu xa, bé có thể gắn kết cùng rồng mỗi ngày. Đây chính là item cực chất phù hợp với sở thích gaming và thiết kế độc đáo giúp bé trở nên thời trang hơn.
                                <br />
                                <br />

                                Trọng lượng: 450g
                                <br />
                                Kích thước: 13x29x40 (cm)
                                <br />
                                - Chủ đề: Siêu rồng huyền thoại
                                <br />
                                Dòng balo đa năng Easy Go Dragon Gaming với những đặc điểm nổi bật như:
                                <br />
                                - Thiết kế độc quyền với hình ảnh trò chơi chú rồng hung hãn thét ra lửa và hiệp sĩ dũng cảm đang chiến đấu với nhau.
                                <br />
                                - Trọng lượng siêu nhẹ đi cùng chất liệu vải trượt nước, có thể dễ dàng vệ sinh.
                                <br />
                                - Kiểu dáng ba lô nhỏ gọn, thời trang với màu sắc năng động.
                                <br />
                                - Các ngăn chứa rộng rãi và phân bổ hợp lí, đựng vừa kích thước khổ A4. Có 2 ngăn hông có khóa kéo tiện dụng, dùng đựng bình nước hay các vật dụng nhỏ xinh của bé.
                                <br />
                                - Ba lô có phần bảng tên ở bên trong để bé "đánh dấu chủ quyền" balo của mình.
                                <br />
                                - Khóa kéo HKK chất lượng.
                                <br />
                                - Đây là một mẫu sản phẩm của Clever Hippo hiện đang được bán tại shop Clever Collection.
                                <br />
                                <br />

                                Sản phẩm thích hợp cho bé từ 6 tuổi trở lên.
                            </div>
                        </div>
                    </div>
                    <div className="product-detail__table mt-10">
                        <div className="product-detail__table__title">
                            <h3 className="text-lg font-semibold">Thông tin sản phẩm</h3>
                        </div>
                        <div className="product-detail__table__content mt-2">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Chủ đề
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                EASY GO
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Xuất xứ
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                Việt Nam
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Mã VT
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                BG0113/BLACK
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Tuổi
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                6 tuổi trở lên
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Thương hiệu
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                CLEVERHIPPO
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Xuất xứ thương hiệu
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                Việt Nam
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='font-semibold text-[13px] text-gray-500'>
                                                Giới tính
                                            </p>
                                        </td>
                                        <td className='border px-4 py-4 text-sm w-1/2'>
                                            <p className='text-[15px]  text-gray-700'>
                                                UNISEX
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="maybe-you-like">
                    <ProductsSaleList
                        title="Có thể bạn sẽ thích"
                        products={products}
                    />
                </div>
            </div>
        )
    };
};