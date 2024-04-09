import { Link, useLocation } from 'react-router-dom'

function Header() {

    const location = useLocation()

    return (
        <header>
            <Link className={location.pathname === "/" ? "link active" : "link"} to="/">Home</Link>
            <Link className={location.pathname === "/trash" ? "link active" : "link"} to="/trash">Trash</Link>
        </header>
    )
}

export default Header
