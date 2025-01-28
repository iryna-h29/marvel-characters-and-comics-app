
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
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

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const content = comicsList.map((item, i) => {
        return (
            <ComicsItem key={i} item={item}/>
        )
    });
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                {content}
            </ul>
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
            <Link to={`/comics/${id}`}>
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{name}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </li>
    )
    

}
 
export default ComicsList;