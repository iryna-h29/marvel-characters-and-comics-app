
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newList) => {
        let ended = false;
        if (newList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const renderItems = arr => {
        const items = arr.map((item, i) => {
            return (
                <ComicsItem key={i} item={item}/>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button className="button button__main button__long" 
                onClick={() => onRequest(offset)} 
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicsItem = ({item}) => {
    const {id, name, thumbnail, price} = item;

    return (    
        <li className="comics__item" tabIndex={0} >
            <Link to={`/marvel-characters-and-comics-app/comics/${id}`}>
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{name}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </li>
    )
    

}
 
export default ComicsList;