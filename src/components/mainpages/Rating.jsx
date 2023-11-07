import React from 'react';
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

const Rating = ({ rating }) => {

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const renderStars = (count, icon) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(icon);
        }
        return stars;
    };

    return (
        <div className="rating flex items-center">
            {renderStars(fullStars, <RiStarFill key="full" className="text-red-500 text-lg" />)}
            {hasHalfStar && <RiStarHalfFill key="half" className="text-red-500 text-lg" />}
            {renderStars(emptyStars, <RiStarLine key="empty" className="text-red-500 text-lg" />)}
        </div>
    );
};

export default Rating;