import {Component, useState, useEffect, useContext, useRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import charContext from '../../context/context';
import './charList.scss';

const CharList = () => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        window.addEventListener('scrollend', onScroll);
        return () => {
            window.removeEventListener("scrollend", onScroll);
        }
    }, []);


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    const onCharLoaded = (newList) => {
        let ended = false;
        if (newList.length < 9) {
            ended = true;
        }


        setCharList(charList => [...charList, ...newList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onScroll = () => {
        if (offset < 219) return;
        if (newItemLoading) return;
        if (charEnded) window.removeEventListener("scrollend", onScroll);
     
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            onRequest(offset);
        }
    };

    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const content = charList.map(item => <CSSTransition key={item.id} timeout={500} classNames="char__item"><CharItem item={item}/></CSSTransition>);
    // charId={selectedChar}
    return (
        <div className="char__list">
                {spinner}
                {errorMessage}
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {content}
                </TransitionGroup>
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const CharItem = (props) => {
    
    const context = useContext(charContext);
    const myRef = useRef(null); 

    const {id, name, thumbnail} = props.item;
    const imageAvailability = !thumbnail.includes('image_not_available') ? {'objectFit' : 'cover'} : {'objectFit' : 'unset'};

    useEffect(() => {
        if (myRef?.current) {
            if (id === context.selectedChar) {
                myRef.current.focus();
            }
        }
      }, [myRef]);

    
    return (
        <li ref={myRef} className="char__item" tabIndex={0} onFocus={() => context.changeChar(id)}>
            <img src={thumbnail} alt={name} style={imageAvailability}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;