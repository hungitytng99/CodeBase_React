import React from 'react';

function FullPageLoading({ opacity = 1 }) {
    return (
        <div className="full-page-loading" style={{ backgroundColor: `rgba(255,255,255,${opacity})` }}>
            Loading...
        </div>
    );
}

export default FullPageLoading;
