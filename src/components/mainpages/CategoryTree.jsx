import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/category/path-api';
import { resetCurrentPageCategories } from '../../features/product/productSlice';

export const CategoryTree = () => {
    const dispatch = useDispatch();
    const { categories, loading, currentPage, pageSize } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(fetchCategories({ currentPage, pageSize: 100 }));
    }, [dispatch]);

    return (
        <Card
            title="DANH MỤC"
            className='text-sm font-bold uppercase md:mr-5 text-center'
        >
            {
                loading ? <Spin className='text-center' /> :
                    <div>
                        <Link
                            to={`/category/all`}
                            className='block text-left text-base font-normal uppercase cursor-pointer hover:text-red-500 py-2'
                            key="all"
                        >
                            Tất cả sản phẩm
                        </Link>
                        {categories.map((item) => {
                            return (
                                <Link
                                    to={`/category/${item._id}`}
                                    onClick={() => dispatch(resetCurrentPageCategories())}
                                    className='block text-left text-base font-normal uppercase cursor-pointer hover:text-red-500 py-2'
                                    key={item._id}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
            }
        </Card>
    );
};
export default CategoryTree;