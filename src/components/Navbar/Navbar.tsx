import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../../img/logo.png';
import styles from './Navbar.module.scss';

const Navbar = () => {
    const ctx = useContext(AuthContext);
    return (
        <div className={styles.navbar}>
            <Link to='/'>
                <div className={styles.logo}>
                    <img src={Logo} alt="" />
                </div>
            </Link>
            <nav>
                <ul className={styles.links}>
                    <li><Link className={styles.link} to='/?cat=cats'>Cats</Link></li>
                    <li><Link className={styles.link} to='/?cat=dogs'>Dogs</Link></li>
                    <li><Link className={styles.link} to='/?cat=other'>Other</Link></li>
                </ul>
            </nav>
            {ctx?.currentUser
                ?
                <div className={styles.user}>
                    <span>{ctx.currentUser.username}</span>
                    <span className={styles.log} onClick={ctx.logout}>Logout</span>
                    <span className={styles.write}><Link to='/write'>Write</Link></span>
                </div>
                :
                <Link className={styles.log} to='/login'>Login</Link>
            }
        </div>
    )
}

export default Navbar