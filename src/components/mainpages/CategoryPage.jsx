import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { Product } from "./Product";
import CategoryTree from './CategoryTree';
import { Empty, Pagination, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../features/product/path-api';


export const CategoryPage = () => {
    const [cart, setCart] = useState([]);
    const dispatch = useDispatch();
    const { products, productsByCategory, loading, currentPageCategories, pageSizeCategories, totalPagesCategories, sort } = useSelector(state => state.product);
    console.log(pageSizeCategories)
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductsByCategory({ id, currentPage: currentPageCategories, pageSize: pageSizeCategories, sort }));
        }
    }, [dispatch, id]);

    const handlePageChange = (page, pageSize) => {
        dispatch(fetchProductsByCategory({ currentPage: page, pageSize }));
    };

    const onShowSizeChange = (current, pageSizeCategories) => {
        console.log(current, pageSizeCategories);
    };


    return (
        <div className='container mx-auto px-3 2xl:px-20 mb-12'>
            <div className="breadcrumb bg-gray-100 my-6 px-3 py-[2px]">
                <Breadcrumb />
            </div>
            <div className="flex flex-wrap justify-between items-start mb-6">
                <div className="w-full md:w-4/12 lg:w-3/12 xl:w-1/5">
                    <CategoryTree />
                </div>
                <div className="w-full md:w-8/12 lg:w-9/12 xl:w-4/5 grid">
                    {
                        loading ? <Skeleton active /> :
                            productsByCategory.length === 0 ? <Empty description='Không tìm thấy sản phẩm nào' /> : (

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {
                                        productsByCategory.map((product) => (
                                            <Product
                                                key={product._id}
                                                {...product}
                                            />
                                        ))
                                    }
                                </div>
                            )
                    }
                    {
                        productsByCategory.length > 0 && (
                            <div className="mt-6">
                                <Pagination
                                    className='mt-5 flex justify-center'
                                    current={currentPageCategories}
                                    pageSize={pageSizeCategories}
                                    total={totalPagesCategories * pageSizeCategories}
                                    onChange={handlePageChange}
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    );
};