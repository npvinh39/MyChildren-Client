import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { ApiCategory } from '../../api/api-category';
import { GlobalStateContext } from "../../GlobalState";

export const CategoryTree = () => {
    const state = React.useContext(GlobalStateContext);
    const [category, setCategory] = state.category;
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);

    // get category
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await ApiCategory.getAll();
                setCategoryData(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch category list: ', error);
            }
        };
        getCategory();
    }, []);

    // set current category
    const setCategoryHandler = (id) => {
        const data = categoryData.find((category) => category.id === id);
        setCategory(data);
    };

    return (
        <Card
            title="DANH MỤC"
            className='text-sm font-bold uppercase md:mr-5 text-center'
        >
            {
                loading ? <Spin className='text-center' /> :
                    categoryData.map((item) => {
                        return (
                            <Link
                                to={`/category/${item._id}`}
                                onClick={() => setCategoryHandler(item._id)}
                                className='block text-left text-base font-normal uppercase cursor-pointer hover:text-red-500 py-2'
                                key={item._id}
                            >
                                {item.name}
                            </Link>
                        );
                    })
            }
        </Card>
    );
};
export default CategoryTree;