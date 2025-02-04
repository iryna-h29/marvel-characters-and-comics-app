import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import charContext from '../../context/context';
import decoration from '../../resources/img/vision.png';
import { func } from 'prop-types';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/mainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharPage = lazy(() => import("../pages/SingleCharPage"));
const SinglePage = lazy(() => import('../pages/SinglePage'));
// const decoration = lazy(() => import('../../resources/img/vision.png'));


const {Provider} = charContext;


const App = () => {

    const [charObj, setChar] = useState({
        selectedChar: null,
        limit: 9,
        changeChar: changeChar,
        changeLimit: changeLimit
    });

    
    function changeChar(newChar) {
        setChar(charObj => ({
            ...charObj,
            selectedChar: newChar
        }))
    }
    function changeLimit(num) {
        setChar(charObj => ({
            ...charObj,
            limit: num
        }))
    }
    function OnBackToComics() {
        setChar(charObj => ({
            ...charObj,
            selectedChar: charObj.selectedChar,
            backToComics: true
        }))
    }
    function OffBackToComics() {
        setChar(charObj => ({
            ...charObj,
            selectedChar: charObj.selectedChar,
            backToComics: false
        }))
    }

    return (
        <Router>
            <div className="app">
                <div className="container">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path='/' element={<MainPage/>}/>
                                <Route path='/:characterId' element={<MainPage/>}/>
                                <Route path='/comics' element={<ComicsPage/>}/>
                                <Route path='/comics/:id' element={<SinglePage Component={SingleComicPage} dataType='comic'/>}/>
                                <Route path="/characters/:id" element={<SinglePage Component={SingleCharPage} dataType='character'/>}/>
                                <Route path='*' element={<Page404/>}/>
                            </Routes>
                        </Suspense>
                    </main>
                </div>
                {/* {loadedMain ? <img className="bg-decoration" src={decoration} alt="vision"/>: null}  */}
            </div>
        </Router>
    )
}

export default App;