import React from "react";
import { Product } from "./Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export const ProductsSaleList = ({ title, products, loading }) => {
    return (
        <div className="product-sale-list">
            <div>
                <h2 className="text-base text-center xl:text-left xl:text-2xl font-bold uppercase py-6">{title}</h2>
            </div>
            <div
            // className="product-wrap grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5"
            >
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="w-full"
                    containerClass=""
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={true}
                    itemClass="px-3"
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={true}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={true}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {products.map((product) => (
                        product.featured_product === false ? null :
                            < Product
                                key={product._id}
                                {...product}
                                loading={loading}
                            />

                    ))}
                </Carousel>

            </div>
            <div className="load-more">
                <a href="/"
                    className="text-base font-medium text-red-500 hover:text-red-300 transition-all flex justify-end pt-2">
                    Xem thêm</a>
            </div>
        </div>
    );
}
