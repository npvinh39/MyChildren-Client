import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { ProductsList } from "./ProductsList";
import { ProductsSaleList } from "./ProductsSaleList";
import { CategoryList } from "./CategoryList";
import { apiProduct } from "../../api/api-product";
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsWithDescription } from '../../features/product/path-api';

export const MainPages = () => {
    const { products, loading, currentPage, pageSize, totalPages, sort } = useSelector(state => state.product);


    const category = [
        {
            id: 1,
            name: 'Đồ chơi búp bê',
            image: 'https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/danh-muc-1.jpg'
        },
        {
            id: 2,
            name: 'Đồ chơi điều khiển',
            image: 'https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/danh-muc-2.jpg'
        },
        {
            id: 3,
            name: 'Đồ chơi trí tuệ',
            image: 'https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/danh-muc-3.jpg'
        },
        {
            id: 4,
            name: 'Xe đạp',
            image: 'https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/danh-muc-4.jpg'
        },
        {
            id: 5,
            name: 'Đồ chơi lắp ráp',
            image: 'https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/danh-muc-5.jpg'
        },
        {
            id: 6,
            name: 'Xe công trình',
            image: 'https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/danh-muc-6.jpg'
        },

    ];

    const lists = [
        {
            title: 'Đồ chơi lắp ráp',
        },
        {
            title: 'BÚP BÊ - ROBOTs',
        },
        {
            title: 'ĐỒ CHƠI THỜI TRANG',
        },
        {
            title: 'ĐỒ CHƠI MÔ PHỎNG',
        },
        {
            title: 'ĐỒ CHƠI SƯU TẬP',
        },
        {
            title: 'XE ĐẠP & SCOOTER',
        },
    ]

    return (
        <div>
            <Banner />
            <div id="main-pages" className="container mx-auto w-full max-w-[1366px]">
                {loading ?
                    <Skeleton
                        active
                        className="py-5"
                    />
                    :
                    <ProductsSaleList
                        title="Sản phẩm nổi bật"
                        products={products}
                        loading={loading}
                    />
                }
                <CategoryList
                    title="Danh mục đồ chơi nổi bật"
                    category={category}
                />
                {loading ? lists.map((item, index) => (
                    <Skeleton
                        active
                        key={index}
                        className="py-5"
                    />
                ))
                    :
                    lists.map((item, index) => (
                        <ProductsList
                            key={index}
                            title={item.title}
                            products={products}
                            loading={loading}
                        />
                    ))
                }
            </div>
        </div>
    )
}