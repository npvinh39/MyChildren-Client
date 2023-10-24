import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        slidesPerRow: 1,
    };
    return (
        <div className="banner w-full relative">
            <Slider {...settings}>
                <div>
                    <img
                        className="w-full"
                        src="https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/lego/LEGO-BUCKET-2020-_1920x750_.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="w-full"
                        src="https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/bechungtay/banner-new.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="w-full"
                        src="https://u6wdnj9wggobj.vcdn.cloud/media/mgs_blog/m/y/mykingdom-khoa-hoc-wedo-new_1.png"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="w-full"
                        src="https://u6wdnj9wggobj.vcdn.cloud/media/mgs_blog/f/l/flash-sale1---1004.jpg"
                        alt=""
                    />
                </div>
            </Slider>
        </div>
    );
}

export default Banner;