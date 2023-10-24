import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { Product } from "./Product";
import CategoryTree from './CategoryTree';
import Paginations from './Pagination';
import { Empty, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { GlobalStateContext } from "../../GlobalState";
import { ApiProduct } from '../../api/api-product';


export const CategoryPage = () => {
    const state = React.useContext(GlobalStateContext);
    const [products, setProducts] = state.products;
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const pageTitle = 'Trang danh mục';
        document.title = pageTitle;

        setLoading(true);
        const getProducts = async () => {
            try {
                const response = await ApiProduct.getByCategory(id);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };

        const getAllProducts = async () => {
            try {
                const response = await ApiProduct.getAll();
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };

        if (id) {
            getProducts();
        }
        else {
            getAllProducts();
        }

        return () => {
            document.title = "MYKINGDOM Vương Quốc Đồ Chơi | Đồ Chơi Giáo Dục Hàng Đầu Việt Nam";
        };
    }, [id]);


    //Pagination
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            currentProducts.length === 0 ? <Empty /> : (

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {
                                        currentProducts.map((product) => (
                                            <Product
                                                key={product.id}
                                                {...product}
                                            />
                                        ))
                                    }
                                </div>
                            )
                    }
                    {
                        loading ? '' :

                            currentProducts.length === 0 ? '' :
                                <div div className="flex justify-between items-end">
                                    <div
                                        className="text-center text-sm text-gray-500">
                                        Hiển thị {startIndex + 1} - {endIndex > products.length ? products.length : endIndex} trên tổng số {products.length} sản phẩm
                                    </div>
                                    <Paginations
                                        totalItems={products.length}
                                        onPageChange={handlePageChange}
                                        itemsPerPage={itemsPerPage}
                                    />
                                </div>

                    }
                </div>
            </div>
        </div >
    );
};