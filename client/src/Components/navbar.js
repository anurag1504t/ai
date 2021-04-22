import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div className="stats-main">
            <Link to="/dashboard">
            <div className="navbar-header">
                <h6 style={{color: 'floralwhite'}} className="navbar-header-oneshot">OneShot.ai</h6>
            </div>
            </Link>
        </div>
    )
}

export default Navbar;