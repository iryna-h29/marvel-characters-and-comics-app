import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [loadingNewItems, setLoadingNewItems] = useState(false);

    
    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true, false);
        // eslint-disable-next-line
    }, []);


    const onRequest = (offset, initial, loadingbtnclicked) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        loadingbtnclicked ? setLoadingNewItems(true) : setLoadingNewItems(false);
        getAllCharacters(offset)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = async(newList) => {
        let ended = false;
        if (newList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newList]);
        setNewItemLoading(false);
        // setLoadingNewItems(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    // const onScroll = () => {
    //     if (offset < 219) return;
    //     if (newItemLoading) return;
    //     if (charEnded) window.removeEventListener("scrollend", onScroll);
     
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //         onRequest(offset);
    //     }
    // };

    
    const renderItems = (arr) => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <CharItem item={item} onCharSelected={props.onCharSelected} loadingNewItems={loadingNewItems}/>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    };

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset, false, true)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const CharItem = ({item, onCharSelected, loadingNewItems}) => {
    
    const myRef = useRef(null); 
    const {characterId} = useParams();

    const {id, name, thumbnail} = item;
    const imageAvailability = !thumbnail.includes('image_not_available') ? {'objectFit' : 'cover'} : {'objectFit' : 'unset'};

    useEffect(() => {
        // console.log(loadingNewItems);
        if (characterId == id) {
            if (!myRef?.current.classList.contains('char__item-selected')) {
                myRef?.current.classList.add('char__item-selected');
                if (!loadingNewItems) {
                    myRef?.current.focus();
                }
            }
        } else {
            myRef?.current.classList.remove('char__item-selected');
        }
    }, [characterId]);


    const selectOnItem = () => {
        // setLoadingNewItems(false);
        if (!myRef?.current.classList.contains('char__item-selected')) {
            myRef?.current.classList.add('char__item-selected');
            myRef?.current.focus();
        }
    }

    
    return (
        <li
            ref={myRef}
            id={id} 
            className="char__item" 
            tabIndex={0} 
            onClick={() => {
                onCharSelected(id);
                selectOnItem();
            }}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    onCharSelected(id);
                    selectOnItem();
                }
            }}>
            <Link to={`/${id}`} 
                tabIndex={-1}
                className='char__link'>
                <img src={thumbnail} alt={name} style={imageAvailability} tabIndex={-1}/>
                <div className="char__name" tabIndex={-1}>{name}</div>
            </Link>   
        </li>
    )
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
export default CharList;