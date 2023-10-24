import React from 'react';
import { Link } from 'react-router-dom';
import { RiHeartLine } from "react-icons/ri";
import { Skeleton } from 'antd';
// import slugify from 'slugify';


export const Product = (product) => {
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    if (product) {
        if (product.loading) {
            return (
                <div className="product-item block border-solid border-2 border-gray-100 rounded-md overflow-hidden relative">
                    <Skeleton.Image className='skeleton-product' style={{ width: '100%', height: '100%' }} />
                    <div className="product-info px-3 py-1">
                        <Skeleton active />
                    </div>
                </div>
            );
        }
        else {
            return (
                <Link to={`/products/${product._id}`} className="product-item block border-solid border-2 border-gray-100 rounded-md overflow-hidden relative">
                    <span
                        className="product-sale text-sm py-[2px] font-bold text-white bg-[red] px-1 absolute top-[10px]">
                        -30%
                    </span>
                    <div className="group relative">
                        <img src={product?.images[0].url} alt={product.name} className="product-image object-cover w-full block group-hover:hidden" />
                        <img src={product?.images[1].url} alt={product.name} className="product-image object-cover w-full hidden group-hover:block" />
                    </div>
                    <div className="product-info px-3 py-1">
                        <div className="product-name h-11">
                            <h3
                                className="text-sm font-semibold text-gray-700 hover:text-red-500 transition-all">
                                {product.name}
                            </h3>
                        </div>
                        <div className="product-description w-full flex justify-between items-center">
                            <p className="text-[9px] text-gray-700">
                                SKU: {product.product_id}
                            </p>
                            <div className="product-favorite">
                                <span className="text-lg text-red-400">
                                    <RiHeartLine />
                                </span>
                            </div>
                        </div>
                        <div className="product-special-offer">
                            <span className="text-red-500">
                                <i className="ri-gift-fill"></i>
                            </span>
                            <span className="text-xs py-2">
                                Sản phẩm có khuyến mãi
                                <span className="text-blue-500 hover:text-blue-300 transition-all ml-1">
                                    xem chi tiết
                                </span>
                            </span>
                        </div>
                        <div className="product-price w-full flex justify-between items-center pt-2">
                            <span className="text-[13px] font-bold text-red-400">{VND.format(Number(product.price))}</span>
                            <span className="text-[13px] font-semibold text-gray-700 line-through">{VND.format(Number(product.price_discount))}</span>
                        </div>
                    </div>
                </Link>
            );
        }
    }
}