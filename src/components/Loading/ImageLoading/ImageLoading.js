import React, { useEffect, useRef, useState } from 'react';
import './ImageLoading.sass';
import LoadingSpinner from 'assets/images/Spinner-1s-200px.svg';
import noImageFound from 'assets/images/no-image-found.png';

function ImageLoading(props) {
    const image = useRef(null);
    const [srcImage, setSrcImage] = useState(LoadingSpinner);

    function preloadImage(imgSrc) {
        var objImagePreloader = new Image();
        objImagePreloader.src = imgSrc;
        if (objImagePreloader.complete) {
            setSrcImage(objImagePreloader.src);
            objImagePreloader.onload = function () {};
        } else {
            objImagePreloader.onload = function () {
                setSrcImage(objImagePreloader.src);
                objImagePreloader.onload = function () {};
            };
            objImagePreloader.onerror = (e) => {
                setSrcImage(noImageFound);
                objImagePreloader.onload = function () {};
            };
        }
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            preloadImage(props.src);
        }
        return () => {
            isMounted = false;
        };
    }, []);
    return <img ref={image} {...props} src={srcImage} onError={() => {}}></img>;
}

export default React.memo(ImageLoading);
