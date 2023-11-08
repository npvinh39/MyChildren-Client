import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import slugify from 'slugify';
import { RiHeartLine, RiShoppingBag3Fill, RiShoppingCart2Fill, RiPhoneFill } from 'react-icons/ri';
import Breadcrumb from './Breadcrumb';
import ProductImageSlider from './ProductImageSlider';
import Rating from './Rating';
import { ProductsSaleList } from './ProductsSaleList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/product/path-api';
import { getCart, getProductCart } from '../../features/cart/cartSlice';
import { fetchTotalRating, fetchRatedByProductId, fetchRatedProductByUserId, createRated } from '../../features/rated/path-api';
import { Skeleton, Tabs, Input, Button, Rate, Form, message, Empty, Divider, Badge } from 'antd';
const { TextArea } = Input;


export const ProductDetail = ({ match }) => {
    const { id } = useParams();
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const dispatch = useDispatch();
    const { isAuth } = useSelector(state => state.login);
    const { profile } = useSelector(state => state.user);
    const { products, product, images, loading } = useSelector(state => state.product);
    const { cart, productCart } = useSelector(state => state.cart);
    const { ratedByProduct, ratedProductByUserId, totalRating, totalStar, currentPage, pageSize, totalPages, sort } = useSelector(state => state.rated);

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const formatDate = (date) => {
        return dayjs(date).format("DD-MM-YYYY HH:mm");
    };

    // get product by id
    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [id, dispatch]);

    // get rating product by user id
    useEffect(() => {
        if (profile) {
            dispatch(fetchRatedProductByUserId({ id, user_id: profile._id }));
        }
    }, [profile, id, dispatch]);

    // get rated by product id
    useEffect(() => {
        dispatch(fetchRatedByProductId({ id, currentPage, pageSize, sort, status: '1' }));
        dispatch(fetchTotalRating(id));
    }, [id, dispatch]);

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
            dispatch(getCart(JSON.parse(savedCart)));
        }
    }, []);

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === item._id);

        if (existingItemIndex !== -1) {
            const newCart = cart.map(cartItem =>
                cartItem.product_id === item._id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
            );
            dispatch(getCart(newCart));

            // Lưu giỏ hàng mới vào localStorage
            localStorage.setItem('cart', JSON.stringify(newCart));
        } else {
            const newItem = {
                product_id: item._id,
                quantity: quantity
            };

            const newCart = [...cart, newItem];
            dispatch(getCart(newCart));

            // Lưu giỏ hàng mới vào localStorage
            localStorage.setItem('cart', JSON.stringify(newCart));
        }

        message.success('Thêm vào giỏ hàng thành công');
    };

    const updateCartItem = (index, updatedItem) => {
        const oldCart = localStorage.getItem('cart');
        const newCart = JSON.parse(oldCart);
        newCart[index] = updatedItem;
        dispatch(getCart(newCart));
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeCartItem = (index) => {
        const oldCart = localStorage.getItem('cart');
        const newCart = JSON.parse(oldCart);
        newCart.splice(index, 1);
        dispatch(getCart(newCart));
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    //quantity
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (value) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + value));
    };

    // on submit comment and rating
    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(createRated(values));
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

                        <div className="product-detail__info__rating my-2 flex">
                            <Rating rating={totalStar} />
                            <div className="product-detail__info__rating__count text-sm text-gray-500 ml-2">
                                {
                                    totalRating == 0 ?
                                        <span className='text-red-500'>Chưa có đánh giá</span>
                                        :
                                        <span className='text-gray-500'>{totalStar} ({totalRating})</span>
                                }
                            </div>
                        </div>

                        <div className="product-detail__info__sku text-sm text-gray-500">
                            <span>
                                Đã bán: <Link className='text-blue-500'>{product.sold}</Link>
                            </span>
                            <span className='ml-9'>
                                <b>SKU: </b>{product.product_id}
                            </span>
                        </div>

                        <div className="product-detail__info__price mt-2">
                            <span className="product-detail__info__price__current text-2xl text-red-500 font-bold">{VND.format(Number(product.price_discount))}</span>
                            {
                                product.price_discount !== product.price &&
                                <span className="product-detail__info__price__old text-sm text-gray-500 line-through ml-2">{VND.format(Number(product.price))}</span>
                            }
                        </div>

                        <div className="product-detail__info__sale my-2">
                            <p className="text-[14px] text-red-500">
                                Giảm đến 10% khi tham gia hội viên
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
                                className="bg-blue-500 border border-blue-500 text-white text-center w-[45%] font-bold text-sm uppercase px-6 py-3 rounded-md hover:bg-white hover:text-gray-500 hover:border hover:border-gray-400 transition-colors duration-300 ease-in-out">
                                Mua Ngay
                            </Link>
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-blue-500 border border-blue-500 text-white text-center w-[45%] font-bold text-sm uppercase px-6 py-3 rounded-md hover:bg-white hover:text-gray-500 hover:border hover:border-gray-400 transition-colors duration-300 ease-in-out">
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
                    <Tabs
                        defaultActiveKey="1"
                        size='large'
                        type='card'
                        items={[
                            {
                                key: '1',
                                label: 'Mô tả sản phẩm',
                                children: <div dangerouslySetInnerHTML={{ __html: product.content }}></div>
                            },
                            {
                                key: '2',
                                label: 'Thông tin sản phẩm',
                                children: <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='font-semibold text-[13px] text-gray-500'>
                                                    Thương hiệu
                                                </p>
                                            </td>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='text-[15px]  text-gray-700'>
                                                    {product.description.brand}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='font-semibold text-[13px] text-gray-500'>
                                                    Sản xuất tại
                                                </p>
                                            </td>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='text-[15px]  text-gray-700'>
                                                    {product.description.made_in}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='font-semibold text-[13px] text-gray-500'>
                                                    Nguồn gốc
                                                </p>
                                            </td>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='text-[15px]  text-gray-700'>
                                                    {product.description.origin}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='font-semibold text-[13px] text-gray-500'>
                                                    Độ tuổi sử dụng
                                                </p>
                                            </td>
                                            <td className='border px-4 py-4 text-sm w-1/2'>
                                                <p className='text-[15px]  text-gray-700'>
                                                    {product.description.age_of_use}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            },
                            {
                                key: '3',
                                label: 'Đánh giá',
                                children: <div>
                                    {
                                        isAuth ?
                                            (
                                                ratedProductByUserId?.length > 0 ?
                                                    (
                                                        // show rating of user
                                                        <div>
                                                            <Divider>Đánh giá của Bạn</Divider>
                                                            <table className="table-auto border w-full">
                                                                <tbody>
                                                                    {
                                                                        ratedProductByUserId.map((rated, index) => (
                                                                            <tr className="border" key={index}>
                                                                                {/* start */}
                                                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                                                    <div className='flex justify-start items-center'>
                                                                                        <p className='uppercase font-semibold mr-4'>
                                                                                            {rated.name}
                                                                                        </p>
                                                                                        {
                                                                                            rated.status === 0 ?
                                                                                                <Badge status='processing' text='Đang chờ duyệt' />
                                                                                                :
                                                                                                rated.status === 1 ?
                                                                                                    <Badge status='success' text='Đã duyệt' />
                                                                                                    :
                                                                                                    <Badge status='error' text='Bị từ chối' />
                                                                                        }
                                                                                    </div>
                                                                                    <div className="product-detail__info__rating my-1">
                                                                                        <Rating rating={rated.rating} />
                                                                                    </div>
                                                                                    <p className='text-base  text-gray-600'>
                                                                                        {rated.comment}
                                                                                    </p>
                                                                                    <p className='text-xs  text-gray-600'>
                                                                                        {formatDate(rated.createdAt)}
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="product-detail__info__rating__box-comment mt-2">
                                                            <div className="product-detail__info__rating__box-comment__title flex justify-between items-center">
                                                                <h3 className="text-xl font-semibold capitalize">Đánh giá của bạn</h3>
                                                                <div className="product-detail__info__rating__box-comment__title__rating flex items-center">
                                                                    <Rating rating={totalStar} />
                                                                    <span className='text-sm text-gray-500 ml-2'>
                                                                        {totalStar} ({totalRating})
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="product-detail__info__rating__box-comment__form mt-2">
                                                                <Form
                                                                    name="basic"
                                                                    initialValues={{ remember: true }}
                                                                    onFinish={onFinish}
                                                                    onFinishFailed={() => { }}
                                                                >
                                                                    {/* fields product_id but hide interface */}
                                                                    <Form.Item
                                                                        name="product_id"
                                                                        initialValue={product._id}
                                                                        hidden
                                                                    >
                                                                        <Input />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name="rating"
                                                                        rules={[{ required: true, message: 'Vui lòng đánh giá sản phẩm!' }]}
                                                                    >
                                                                        <Rate tooltips={['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt']} />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name="comment"
                                                                        rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}
                                                                    >
                                                                        <TextArea rows={4} placeholder='Nhập bình luận của bạn (Lưu ý mỗi khách hàng chỉ có thể đánh giá một lần trên mỗi sản phẩm)' />
                                                                    </Form.Item>
                                                                    <Form.Item>
                                                                        <Button type="primary" size='large' htmlType="submit" className='bg-blue-500 font-bold text-sm uppercase float-right'>
                                                                            Gửi đánh giá
                                                                        </Button>
                                                                    </Form.Item>
                                                                </Form>
                                                            </div>
                                                        </div>)
                                            )
                                            :
                                            (
                                                <div className="product-detail__info__rating__box-comment mt-2">
                                                    <div className="product-detail__info__rating__box-comment__title flex justify-between items-center">
                                                        <h3 className="text-xl font-semibold capitalize">Đánh giá của khách hàng</h3>
                                                        <div className="product-detail__info__rating__box-comment__title__rating flex items-center">
                                                            <Rating rating={totalStar} />
                                                            <span className='text-sm text-gray-500 ml-2'>
                                                                {totalStar} ({totalRating})
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail__info__rating__box-comment__form mt-2">
                                                        <p className='text-sm text-gray-500'>
                                                            Hãy <Link to='/login' className='text-blue-500'>đăng nhập</Link> ngay để có thể đánh giá sản phẩm
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                    }

                                    {/* view rateds */}
                                    <div className="product-detail__info__rating__list mt-2">
                                        <Divider>Đánh giá của khách hàng</Divider>
                                        <table className="table-auto border w-full">
                                            <tbody>
                                                {
                                                    ratedByProduct?.length > 0 ?
                                                        ratedByProduct.map((rated, index) => (
                                                            <tr className="border" key={index}>
                                                                {/* start */}
                                                                <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                                    <div className='flex justify-start items-center'>
                                                                        <p className='uppercase font-semibold mr-4'>
                                                                            {rated.name}
                                                                        </p>
                                                                        {
                                                                            rated.status === 0 &&
                                                                            <Badge status='processing' text='Đang chờ duyệt' />

                                                                        }
                                                                    </div>
                                                                    <div className="product-detail__info__rating my-1">
                                                                        <Rating rating={rated.rating} />
                                                                    </div>
                                                                    <p className='text-base  text-gray-600'>
                                                                        {rated.comment}
                                                                    </p>
                                                                    <p className='text-xs  text-gray-600'>
                                                                        {formatDate(rated.createdAt)}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr className="border">
                                                            <td className='px-2 py-3 text-sm flex flex-col gap-1'>
                                                                <Empty description='Chưa có đánh giá' />
                                                            </td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            },
                        ]
                        }
                    />
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