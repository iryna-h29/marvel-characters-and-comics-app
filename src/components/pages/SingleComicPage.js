import { useEffect, useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { useParams, Link, useNavigate } from 'react-router-dom';


import './singleComicPage.scss';

const SingleComicPage = ({data}) => {
    const [back, setBack] = useState(false);
    const {title, description, pageCount, thumbnail, language, price} = data;
    let navigate = useNavigate();

    const goBack = () => {
        setBack(true);
    }
    
    useEffect(() => {
        if (back) {
            navigate(-1);
        }
    }, [back]);


    return (
        <div className="single-comic">
            <Helmet>
                    <meta
                        name="description"
                        content={`${title} comics book`}
                        />
                    <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={() => goBack()} className="single-comic__back">Back to all</button>
        </div>
    )
}
export default SingleComicPage;