import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div className="stats-main">
            <div className="navbar-header">
                <h6 style={{color: 'black'}} className="navbar-header-oneshot"><Link to="/dashboard">OneShot.ai</Link></h6>
            </div>
        </div>
    )
}

export default Navbar;