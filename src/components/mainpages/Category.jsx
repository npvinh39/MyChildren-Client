import React from 'react';

export const Category = ({ category }) => {
    return (
        <div className="category-item overflow-hidden">
            <img className="rounded-lg"
                src={category.image} alt={category.name}
            />
            <div className="category-name text-[15px] font-medium text-center text-gray-700 py-2">
                {category.name}
            </div>
        </div>
    );
}