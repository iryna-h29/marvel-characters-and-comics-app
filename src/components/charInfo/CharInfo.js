import { useEffect, useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import charContext from '../../context/context';
import './charInfo.scss';
import PropTypes from 'prop-types';

const CharInfo = () => {
    const [char, setChar] = useState(null);
    
    const {loading, error, getCharacter, clearError} = useMarvelService();

    const context = useContext(charContext);

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [context.selectedChar])

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }
   
    const updateChar = () => {
        // const {charId} = props;
        // if (!charId) {
        //     return;
        // }
        if (!context.selectedChar) {
            return;
        }
        clearError();
        // props.charId
        getCharacter(context.selectedChar)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const skeleton = char || loading || error ? null : <Skeleton/>;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}
const View = ({char}) => {
    const context = useContext(charContext);
    const {id, name, description, thumbnail, homepage, wiki, comics} = char;
    const imageAvailability = !thumbnail.includes('image_not_available') ? {'objectFit' : 'cover'} : {'objectFit' : 'contain'};
    return (
        <>
            <Helmet>
                    <meta
                        name="description"
                        content={`${name} character info`}
                        />
                    <title>{name} - character info</title>
            </Helmet>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imageAvailability}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    Array.isArray(comics) 
                    ? comics.map((item, i) => {
                        return (
                            <Link to={`/comics/${item.resourceURI.split('/').pop()}`} key={i} className="char__comics-item" onClick={context.OnBackToComics}>
                                {item.name}
                            </Link>
                        )
                    }) 
                    : comics
                }
            </ul>
        </>
    )
}

// CharInfo.propTypes = {
//     charId: PropTypes.number
// }
export default CharInfo;