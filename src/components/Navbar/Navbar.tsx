import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const ctx = useContext(AuthContext);
    console.log(ctx)
    return (
        <div>
            <div>
                <img src="" alt="" />
            </div>
            <nav>
                <ul>
                    <li>Cats</li>
                    <li>Dogs</li>
                    <li>Other</li>
                </ul>
            </nav>
            {ctx?.currentUser
                ?
                <div>
                    <span>{ctx.currentUser.username}</span>
                    <span onClick={ctx.logout}>Logout</span>
                    <span ><Link to='/write'>Write</Link></span>
                </div>
                :
                <Link to='/login'>Login</Link>
            }
        </div>
    )
}

export default Navbar