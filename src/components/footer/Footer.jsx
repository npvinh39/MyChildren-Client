import React from "react";
import { RiMailSendLine, RiFacebookCircleFill, RiInstagramFill, RiYoutubeFill, RiMailLine } from "react-icons/ri";


export const Footer = () => {
    return (
        <footer className="bg-[#efefef] min-h-[300px]">
            <div className="footer-wrap container mx-auto px-4 sm:px-0 2xl:px-20 py-5 ">
                <div className="subscribe flex justify-center md:justify-between items-center w-full">
                    <div className="subscribe-email w-full md:w-[500px] lg:w-[550px]">
                        <div className="subscribe-title">
                            <h3 className="text-base font-bold text-gray-600 uppercase text-center md:text-left">Đăng ký nhận thông tin khuyến mãi</h3>
                        </div>
                        <div className="subscribe-form overflow-hidden rounded shadow h-[50px] w-full md:min-w-[480px] mt-4">
                            <form action="" className="flex h-full">
                                <input type="text" className="pl-4 text-lg flex-1 focus:outline-none"
                                    placeholder="Nhập địa chỉ email..." />
                                <button type="submit" className="w-[70px] bg-[#ffd400] hover:bg-red-500 transition-all">
                                    <span className="font-bold text-4xl text-white">
                                        <RiMailSendLine className="w-full" />
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="social-network-wrap hidden md:block">
                        <div className="social-network-title">
                            <h3 className="text-base font-bold text-gray-600 uppercase">Theo dõi chúng tôi</h3>
                        </div>
                        <div className="social-network flex justify-between mt-4">
                            <div className="facebook">
                                <a href="/" className="text-4xl text-blue-500 hover:text-blue-300 transition-all">
                                    <RiFacebookCircleFill />
                                </a>
                            </div>
                            <div className="instagram">
                                <a href="/" className="text-4xl text-pink-500 hover:text-pink-300 transition-all">
                                    <RiInstagramFill />
                                </a>
                            </div>
                            <div className="youtube">
                                <a href="/" className="text-4xl text-red-500 hover:text-red-300 transition-all">
                                    <RiYoutubeFill />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-menu">
                    <div className="footer-menu-list mt-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5">
                        <div className="footer-menu-contact col-span-1 md:col-span-3 md:text-center lg:col-span-1 lg:text-left">
                            <h4 className="text-base font-bold text-gray-600 uppercase hidden md:block">Hotline chăm sóc khách hàng</h4>
                            <div className="contact-description">
                                <a href="tel:0398033985" className="text-4xl font-bold text-[red] hidden md:block">0398 033 985</a>
                                <p className="text-base text-gray-600 italic">
                                    Từ thứ Hai đến thứ Bảy (08:00 - 17:00)
                                    <br />
                                    Chủ nhật (08:00 - 12:00)
                                </p>
                                <a href="mailto:hotro@mykingdom.com.vn" className="text-xl flex items-center">
                                    <RiMailLine className="mr-1" />
                                    <span className="text-[15px]">
                                        hotro@mychildren.com.vn
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="footer-menu-contact__mobile block md:hidden">
                            <h4 className="text-xs font-bold text-gray-600 uppercase">Hotline chăm sóc khách hàng</h4>
                            <a href="tel:0398033985" className="text-2xl font-bold text-[red]">0398033985</a>
                        </div>
                        <div className="footer-menu-policy">
                            <h4 className="text-base font-bold text-gray-600 uppercase">Điều khoản & chính sách</h4>
                            <div className="policy-description flex flex-col mt-2">
                                <a href="/" className="text-sm text-gray-600 hover:text-red-400 transition-all py-[5px]">
                                    - Chính sách giao hàng
                                </a>
                                <a href="/" className="text-sm text-gray-600 hover:text-red-400 transition-all py-[5px]">
                                    - Chính sách tích điểm
                                </a>
                                <a href="/" className="text-sm text-gray-600 hover:text-red-400 transition-all py-[5px]">
                                    - Chính sách điều kiện
                                </a>
                            </div>
                        </div>

                        <div className="footer-menu-support">
                            <h4 className="text-base font-bold text-gray-600 uppercase">Hỗ trợ khách hàng</h4>
                            <div className="support-description flex flex-col mt-2">
                                <a href="/" className="text-sm text-gray-600 hover:text-red-400 transition-all py-[5px]">
                                    - Chính sách bảo mật
                                </a>
                                <a href="/" className="text-sm text-gray-600 hover:text-red-400 transition-all py-[5px]">
                                    - Chính sách bảo hành đổi trả
                                </a>
                                <a href="/" className="text-sm text-gray-600 hover:text-red-400 transition-all py-[5px]">
                                    - Chính sách thanh toán
                                </a>
                            </div>
                        </div>

                        <div className="footer-menu-address md:col-span-1 col-span-2">
                            <h4 className="text-base text-center font-bold text-gray-600 uppercase">Địa chỉ cửa hàng</h4>
                            <a href="/" className=" block mt-4">
                                <img src="https://u6wdnj9wggobj.vcdn.cloud/media/wysiwyg/homepage/sub-banner-system-100.jpg"
                                    alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="footer-coppyright-content flex justify-center items-center mt-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Trường Đại học Cần Thơ (Can Tho University)
                            </p>
                            <p className="text-sm text-gray-600">
                                Địa chỉ: Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ. Điện thoại: 0398.033.985
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}