import React from "react";
import { Product } from "./Product";
import Carousel from "react-multi-carousel";

export const ProductsList = ({ title, products, loading }) => {
    return (
        <div className="product-list py-4">
            <div className="product-list-top flex justify-start flex-col xl:flex-row items-center border border-[#f2f2f2] p-2 mb-5">
                <div className="product-heading-list relative pl-2 py-[6px] bg-[#f2f2f2] mr-4 hidden xl:block">
                    <h2 className="text-xl font-semibold uppercase">{title}</h2>
                </div>
                <div className="block xl:hidden">
                    <h2 className="text-xl font-semibold uppercase">{title}</h2>
                </div>
                <div className="product-list-category grid grid-cols-3 md:grid-cols-5 xl:ml-6 gap-1">
                    <span
                        className="text-xs xl:text-[13px] text-gray-600 font-bold uppercase bg-[#f2f2f2] rounded-md px-2 py-[6px]">
                        LEGO NINJAGO
                    </span>
                    <span
                        className="text-xs xl:text-[13px] text-gray-600 font-bold uppercase bg-[#f2f2f2] rounded-md px-2 py-[6px]">
                        LEGO CITY
                    </span>
                    <span
                        className="text-xs xl:text-[13px] text-gray-600 font-bold uppercase bg-[#f2f2f2] rounded-md px-2 py-[6px]">
                        LEGO TECHNIC
                    </span>
                    <span
                        className="text-xs xl:text-[13px] text-gray-600 font-bold uppercase bg-[#f2f2f2] rounded-md px-2 py-[6px]">
                        LEGO CLASSIC
                    </span>
                    <span
                        className="text-xs xl:text-[13px] text-gray-600 font-bold uppercase bg-[#f2f2f2] rounded-md px-2 py-[6px]">
                        LEGO FRIENDS
                    </span>
                </div>
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
                        <Product
                            key={product._id}
                            {...product}
                            loading={loading}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

