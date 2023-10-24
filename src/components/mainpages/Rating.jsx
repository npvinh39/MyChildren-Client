import React from 'react';
import { RiStarFill, RiStarHalfFill } from "react-icons/ri";

const Rating = ({ rating }) => {

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<RiStarFill key={i} className="text-red-500 text-lg" />);
        }
        return stars;
    };

    return (
        <div className="rating flex items-center">
            {renderStars(fullStars)}
            {hasHalfStar && <RiStarHalfFill className="text-red-500 text-lg" />}
        </div>
    );
};

export default Rating;