import React from 'react';
import './FullPageLoading.sass';
import { Spin } from 'antd';

function FullPageLoading({ opacity = 1 }) {
    return (
        <div
            className="full-page-loading"
            style={{ backgroundColor: `rgba(255,255,255,${opacity})` }}
        >
            <Spin />
            {/* <ShopTwoTone spin style={{ fontSize: '100px' }}/> */}
        </div>
    );
}

export default FullPageLoading;
