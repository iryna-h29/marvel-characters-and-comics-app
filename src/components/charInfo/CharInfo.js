import { useEffect, useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import charContext from '../../context/context';
import setContent from '../../utils/setContent';
import './charInfo.scss';
import PropTypes from 'prop-types';

const CharInfo = () => {
    const [char, setChar] = useState(null);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

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
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    
    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;
    // const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}


const View = ({data}) => {
    const {id, name, description, thumbnail, homepage, wiki, comics} = data;
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
                            <Link to={`/comics/${item.resourceURI.split('/').pop()}`} key={i} className="char__comics-item">
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