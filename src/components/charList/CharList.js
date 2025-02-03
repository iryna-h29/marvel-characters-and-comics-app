import {Component, useState, useEffect, useContext, useRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import charContext from '../../context/context';
import './charList.scss';

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


const CharList = () => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const context = useContext(charContext);
    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        window.addEventListener('scrollend', onScroll);
        return () => {
            window.removeEventListener("scrollend", onScroll);
        }
    }, []);

    useEffect(() => {
        context.changeLimit(charList.length); 
    }, [charList])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        const limit = initial ? context.limit : 9;
        getAllCharacters(offset, limit)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
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
    
    const renderItems = arr => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <CharItem item={item}/>
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
    }


    return (
        <div className="char__list">
            {setContent(process, () => renderItems(charList), newItemLoading)}
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
                myRef.current.classList.add('char__item-selected');
                myRef.current.focus();
            }
        }
      }, [myRef]);

    
    return (
        <li ref={myRef} 
            className="char__item" 
            tabIndex={0} 
            onClick={() => context.changeChar(id)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    context.changeChar(id)
                }
            }}>
            <img src={thumbnail} alt={name} style={imageAvailability}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;