import { Link, useLocation } from 'react-router-dom'

function Header() {

    const location = useLocation()

    return (
        <header>
            <Link className={location.pathname === "/" ? "link active" : "link"} to="/">To Dos</Link>
            <Link className={location.pathname === "/pending" ? "link active" : "link"} to="/pending">In Progress</Link>
            <Link className={location.pathname === "/completed" ? "link active" : "link"} to="/completed">Completed</Link>
            <Link className={location.pathname === "/trash" ? "link active" : "link"} to="/trash">Trash</Link>
        </header>
    )
}

export default Header
