import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { Product } from "./Product";
import CategoryTree from './CategoryTree';
import { Empty, Pagination, Skeleton, Select, Slider } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../features/product/path-api';


export const CategoryPage = () => {
    const [sort, setSort] = useState('');
    const [priceGte, setPriceGte] = useState(0);
    const [priceLte, setPriceLte] = useState(5000000);
    const dispatch = useDispatch();
    const { products, productsByCategory, loading, currentPageCategories, pageSizeCategories, totalPagesCategories } = useSelector(state => state.product);
    const { id } = useParams();

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    useEffect(() => {
        if (id) {
            dispatch(fetchProductsByCategory({ id, currentPage: currentPageCategories, pageSize: pageSizeCategories, sort, priceGte, priceLte }));
        }
    }, [dispatch, id, pageSizeCategories, totalPagesCategories, sort]);

    const handlePageChange = (page, pageSize) => {
        console.log(sort)
        dispatch(fetchProductsByCategory({ id, currentPage: page, pageSize, sort, priceGte, priceLte }));
    };

    const onShowSizeChange = (current, pageSizeCategories) => {
        console.log(current, pageSizeCategories);
    };

    // Slider
    const onChange = (value) => {
        console.log('onChange: ', value);
    };
    const onChangeComplete = (value) => {
        // console.log('onChangeComplete: ', value);
        setPriceGte(value[0]);
        setPriceLte(value[1]);
        dispatch(fetchProductsByCategory({ id, currentPage: currentPageCategories, pageSize: pageSizeCategories, priceGte: value[0] + '', priceLte: value[1] + '', sort }));
    };


    return (
        <div className='container mx-auto px-3 2xl:px-20 mb-12'>
            <div className="breadcrumb bg-gray-100 my-6 px-3 py-[2px]">
                <Breadcrumb />
            </div>
            {/* filter */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <span className="font-semibold text-base mr-3">Sắp xếp theo</span>
                    <Select
                        defaultValue=""
                        bordered={false}
                        className="border border-gray-300 rounded-md w-36"
                        onChange={(value) => setSort(value)}>
                        <Select.Option value="">Mới nhất</Select.Option>
                        <Select.Option value="oldest">Cũ nhất</Select.Option>
                        <Select.Option value="-sold">Bán chạy nhất</Select.Option>
                        <Select.Option value="price">Giá thấp đến cao</Select.Option>
                        <Select.Option value="-price">Giá cao đến thấp</Select.Option>
                    </Select>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold text-base mr-3">Lọc theo giá tiền:</span>
                    <span className="font-light text-base mr-3">{VND.format(Number(priceGte))}</span>
                    <Slider
                        className='w-96'
                        range
                        step={10000}
                        defaultValue={[priceGte, priceLte]}
                        // onChange={onChange}
                        onAfterChange={onChangeComplete}
                        min={0}
                        max={5000000}
                    />
                    <span className="font-light text-base ml-3">{VND.format(Number(priceLte))}</span>
                </div>
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