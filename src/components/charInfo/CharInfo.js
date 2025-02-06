import { useCallback, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './charInfo.scss';
import PropTypes from 'prop-types';


const CharInfo = (props) => {

    const {characterId} = useParams();

    const [char, setChar] = useState(null);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();


    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId]);

   
    const updateChar = () => {
        const {charId} = props;
        if (!charId && !characterId) {
            return;
        }
        clearError();
        // props.charId
        getCharacter(charId || characterId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const closePopup = useCallback(() => {
        setProcess('waiting');
    }, []);


    return (
        <div className={'char__info-wrapper '}>
            <div className="char__info">
                {setContent(process, View, char, closePopup)}
            </div>
        </div>
    )
}


const View = ({data, func}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const imageAvailability = !thumbnail.includes('image_not_available') ? {'objectFit' : 'cover'} : {'objectFit' : 'contain'};
    const scrolledListStyles = Array.isArray(comics) && comics.length > 1 ? {'overflowY' : 'scroll'} : null;
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
                <div className="close">
                    <button className='close__btn' onClick={() => func()}>X</button>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list" style={scrolledListStyles}>
                {
                    Array.isArray(comics) 
                    ? comics.map((item, i) => {
                        return (
                            <Link to={`/marvel-characters-and-comics-app/comics/${item.resourceURI.split('/').pop()}`} key={i} className="char__comics-item">
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

CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;