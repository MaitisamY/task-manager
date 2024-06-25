import '../styles/header.css'

import { Link, useLocation } from 'react-router-dom'

const Header = () => {

    const location = useLocation()

    return (
        <header>
            <Link 
                className={location.pathname === "/" ? "link active" : "link"} 
                to="/"
            >To Dos</Link>
            <Link 
                className={location.pathname === "/pending" ? "link active" : "link"} 
                to="/pending"
            >In Progress</Link>
            <Link 
                className={location.pathname === "/completed" ? "link active" : "link"} 
                to="/completed"
            >Completed</Link>
            <Link 
                className={location.pathname === "/expired" ? "link active" : "link"} 
                to="/expired"
            >Expired</Link>
            <Link 
                className={location.pathname === "/about" ? "link active" : "link"} 
                to="/about"
            >About</Link>
        </header>
    )
}

export default Header
