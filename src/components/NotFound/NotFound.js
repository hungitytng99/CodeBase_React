import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound(params) {
    return (
        <div id="colorlib-notfound">
            <div className="colorlib-notfound">
                <div className="colorlib-notfound-404">
                    <h1>404</h1>
                </div>
                <h2 id="colorlib_404_customizer_page_heading">
                    Oops! This page could not be found.
                </h2>
                <div id="colorlib_404_customizer_content" style={{ marginTop: '5px' }}>
                    Sorry but the page you are looking for does not exist, have been removed. Name
                    changed or is temporarily unavailable
                </div>
                <Link to="/" id="colorlib_404_customizer_button_text">
                    Go to home page
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
