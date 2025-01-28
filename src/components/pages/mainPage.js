import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearch/charSearchForm";
import ErrorBoundary from '../errorBoundar/ErrorBoundary';
// import charContext from "../../context/context";


const MainPage = () => {


    // const [selectedChar, setChar] = useState(null);

    // const onCharSelected = (id) => {
    //    setChar(id);
    // }


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList /> 
                    {/* onCharSelected={onCharSelected} */}
                </ErrorBoundary>
                <div className="char__content-sticky">
                    <ErrorBoundary>
                        <CharInfo />
                        {/* charId={selectedChar} */}
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}

export default MainPage;
