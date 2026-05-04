import Spinner from "../components/spinner/Spinner";
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';
import { Component } from "react";

const setContent = (process, Component, data, func, errorMsg) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data} func={func}/>;
        case 'error':
            return <ErrorMessage message={errorMsg || "Something went wrong"}/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;