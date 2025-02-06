import Spinner from "../components/spinner/Spinner";
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';
import { Component } from "react";

const setContent = (process, Component, data, func) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
            break;
        case 'loading':
            return <Spinner/>;
            break;
        case 'confirmed':
            return <Component data={data} func={func}/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;