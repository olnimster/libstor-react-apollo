import {useEffect, useState} from 'react';

export const useForm = (callback: () => void, initialState = {}) => {
    const [values, setValues]: any = useState(initialState);

    const onChange = (event: any) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        setValues({
            ...values,
            [name]: value
        });
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values
    };
};

function getWindowDimensions() {
    let {innerWidth: width, innerHeight: height} = window;
    if (width > 1200) {
        width = 1200
    }
    const cartOnView = Math.round(width / 210) - 1;
    return {
        width,
        height,
        cartOnView
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}