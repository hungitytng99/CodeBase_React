import React from 'react';
import './FullProgressLoading.sass';
import { Progress } from 'antd';

function FullProgressLoading({ opacity = 1, percent = 0 }) {
    return (
        <div
            className="full-page-loading"
            style={{ backgroundColor: `rgba(255,255,255,${opacity})` }}
        >
            <Progress type="circle" percent={percent} />
            {/* <ShopTwoTone spin style={{ fontSize: '100px' }}/> */}
        </div>
    );
}

export default FullProgressLoading;
