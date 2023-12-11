import React, { useState, useEffect } from "react";
import Breadcrumb from '../Breadcrumb';
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressByUserId, addAddress, updateDefaultAddress, updateAddress, deleteAddress } from "../../../features/address/path-api";
import { Link, useNavigate } from "react-router-dom";
import { Empty, message, Button, Spin, Modal, Form, Input, Select } from "antd";
import { MenuProfile } from "./MenuProfile";
import { apiProvince } from '../../../api/api-province';


export const AddressProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [street, setStreet] = useState(null);
    const [addressId, setAddressId] = useState(null);
    const { profile } = useSelector(state => state.user);
    const { isAuth } = useSelector(state => state.login);
    const { address, loading } = useSelector(state => state.address);

    useEffect(() => {
        if (profile) {
            dispatch(fetchAddressByUserId());
        }
    }, [dispatch, profile]);

    // get all province

    useEffect(() => {
        const getProvince = async () => {
            try {
                const response = await apiProvince.getAllProvince();
                setProvinces(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProvince();
    }, []);

    // set field address when change province, district, ward
    const handleProvinceChange = (e) => {
        const provinceCode = e;
        setSelectedProvince(provinceCode);
        form.setFieldsValue({
            district: null,
            ward: null,
        });

    };

    const handleDistrictChange = (e) => {
        const districtCode = e;
        setSelectedDistrict(districtCode);
        form.setFieldsValue({
            ward: null,
        });
    };

    const handleWardChange = (e) => {
        setWard(e);
    };

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
    };

    // set default address
    const setDefaultAddress = (id) => {
        dispatch(updateDefaultAddress({ address_id: id }));
    };

    // update address
    const updateAddressById = (values) => {
        setIsModalOpen(true);
        setSelectedProvince(values.province);
        setSelectedDistrict(values.district);
        setWard(values.ward);
        setStreet(values.number_street);
        setAddressId(values._id);
        form.setFieldsValue({
            province: values.province,
            district: values.district,
            ward: values.ward,
            number_street: values.number_street,
        });
    };

    // delete address
    const deleteAddressById = (id) => {
        dispatch(deleteAddress({ id }));
    };

    // modal add address
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (values) => {
        if (addressId) {
            dispatch(updateAddress({ ...values, id: addressId }));
        }
        else {
            dispatch(addAddress(values));
        }
        form.resetFields();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setAddressId(null);
        setIsModalOpen(false);
    };

    if (!isAuth) {
        message.info("Vui lòng đăng nhập để xem thông tin tài khoản");
        navigate("/");
        return (
            <div className="profile_page">
                <h2 className="text-center mt-5">Vui lòng đăng nhập để xem thông tin tài khoản</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto w-full max-w-[1366px]">
            <div className="breadcrumb bg-gray-100 px-3 py-[2px] my-8">
                <Breadcrumb />
            </div>
            <div className="flex justify-between items-center items-stretch mb-8">
                <MenuProfile />
                <div className="flex-1 ml-4">
                    {
                        loading ?
                            <div className="flex justify-center items-center h-[300px]">
                                <Spin size="large" />
                            </div>
                            :
                            address?.length > 0 ?
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div className="font-semibold">Sổ địa chỉ</div>
                                        <Button type="primary" onClick={showModal} className="rounded bg-blue-500">Thêm địa chỉ</Button>

                                    </div>
                                    <div className="mt-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            {
                                                address?.map((item, index) => (
                                                    <div className="border border-gray-300 rounded p-4" key={index}>
                                                        <div className="text-sm">{item.number_street}, {item.ward}, {item.district}, {item.province}</div>
                                                        <div className="flex justify-between items-center mt-4">
                                                            <div>
                                                                {
                                                                    index === 0 ?
                                                                        <Button danger>Mặc định</Button>
                                                                        :
                                                                        <Button type="primary" ghost onClick={() => setDefaultAddress(item._id)} className="bg-blue-500">Đặt mặc định</Button>
                                                                }
                                                            </div>
                                                            <div>
                                                                {/* edit */}
                                                                <Button type="primary" onClick={() => updateAddressById(item)} className="rounded bg-blue-500">Sửa</Button>
                                                                {/* delete */}
                                                                <Button type="primary" danger onClick={() => deleteAddressById(item._id)} className="rounded ml-2">Xóa</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div className="font-semibold">Sổ địa chỉ</div>
                                        <Button type="primary" onClick={showModal} className="rounded bg-blue-500">Thêm địa chỉ</Button>
                                    </div>
                                    <div className="mt-4">
                                        <Empty description="Bạn chưa có địa chỉ nào" />
                                    </div>
                                </div>
                    }
                    <Modal title="Thêm địa chỉ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                        <Form
                            form={form}
                            name="addAddress"
                            layout='vertical'
                            onFinish={handleOk}
                        >
                            <div
                                className='flex items-center'
                            >

                                <Form.Item
                                    label="Tỉnh/Thành"
                                    name='province'
                                    className='w-1/2 mr-2'
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành!' }]}
                                >
                                    <Select
                                        name='province'
                                        onChange={handleProvinceChange}
                                        placeholder='Tỉnh/Thành'
                                        value={selectedProvince || ''}
                                        options={provinces.map((province) => (
                                            {
                                                key: province.code,
                                                label: province.name,
                                                value: province.name
                                            }
                                        ))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quận/Huyện"
                                    name='district'
                                    className='w-1/2'
                                    rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                                >
                                    <Select
                                        name='district'
                                        onChange={handleDistrictChange}
                                        placeholder='Quận/Huyện'
                                        value={selectedDistrict || ''}
                                        options={selectedProvince &&
                                            provinces
                                                .find((province) => province.name === selectedProvince)?.districts.map((district) => (
                                                    {
                                                        key: district.code,
                                                        label: district.name,
                                                        value: district.name
                                                    }
                                                ))
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div
                                className='flex items-center'
                            >
                                <Form.Item
                                    label="Phường/Xã"
                                    name='ward'
                                    className='w-1/2 mr-2'
                                    rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                                >
                                    <Select
                                        name='ward'
                                        onChange={handleWardChange}
                                        placeholder='Phường/Xã'
                                        value={ward}
                                        options={selectedDistrict &&
                                            provinces
                                                .reduce((prev, province) => prev.concat(province.districts), [])
                                                .find((district) => district.name === selectedDistrict)?.wards.map((ward) => (
                                                    {
                                                        key: ward.code,
                                                        label: ward.name,
                                                        value: ward.name
                                                    }
                                                ))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số nhà, tên đường"
                                    name='number_street'
                                    className='w-1/2'
                                    rules={[{ required: true, message: 'Vui lòng nhập số nhà, tên đường!' }]}
                                >
                                    <Input
                                        type="text"
                                        value={street}
                                        onChange={handleStreetChange}
                                        placeholder='Số nhà, tên đường'
                                    />
                                </Form.Item>

                            </div>
                            {/* submit and cancel button */}
                            <div className="flex justify-center items-center mt-4">
                                <Button onClick={handleCancel} className="mr-4">Hủy</Button>
                                {
                                    <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-500">
                                        {addressId ? "Sửa" : "Thêm"}
                                    </Button>
                                }
                            </div>
                        </Form>

                    </Modal>
                </div>
            </div>
        </div >
    );
};

export default AddressProfile;