import React from 'react';
import { Category } from './Category';

export const CategoryList = ({ title, category }) => {
    return (
        <div className="category-list px-3 2xl:px-0">
            <div className="category-heading-list">
                <h2 className="text-base xl:text-2xl font-bold uppercase py-6">{title}</h2>
            </div>
            <div className="category-wrap grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-3 gap-5">
                {category.map(data => (
                    <Category
                        key={data.id}
                        category={data}
                    />
                ))}
            </div>
        </div>
    );
}