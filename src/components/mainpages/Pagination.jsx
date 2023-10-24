import React, { useState } from 'react';
import { Pagination as AntPagination } from 'antd';

const Paginations = ({ totalItems, onPageChange, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="pagination mt-5">
            <AntPagination
                current={currentPage}
                total={totalItems}
                pageSize={itemsPerPage}
                showSizeChanger={false}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default Paginations;