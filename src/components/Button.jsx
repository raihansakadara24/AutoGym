import React from 'react';
import SpinnerLoading from "./SpinnerLoading";

const Button = ({label, color, isLoading, onCLick, type}) => {
    const defaultClass = 'text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';

    return (
        <button
            type={type ? type : 'button'}
            className={defaultClass}
            onClick={onCLick}
            style={{backgroundColor: '#29a396'}}
        >
            {isLoading ? (
                <SpinnerLoading loadingColor="fill-teal-50"/>
            ) : (
                label
            )}
        </button>
    );
};

export default Button