import './appHeader.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';

const AppHeader = () => {

    const location = useLocation();
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/characters'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink  
                        style={({ isActive }) => ({
                            color: location.pathname.startsWith("/characters") || isActive ? "#9F0013" : "inherit",
                        })}
                        to="/">Characters</NavLink>
                    </li>
                    /
                    <li>
                        <NavLink 
                        style={({ isActive }) => ({
                            color: isActive ? "#9F0013" : "inherit",
                        })}
                        to="/comics">Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;