import React from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImageGallery = ({ images }) => {
    return (

        <ImageGallery
            items={images}
            showThumbnails={true}
            showFullscreenButton={true}
            showPlayButton={false}
            showNav={true}
            showBullets={false}
            thumbnailPosition="bottom"
            lazyLoad={true}
        />

    );
};

export default ProductImageGallery;