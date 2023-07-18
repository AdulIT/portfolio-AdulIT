import React from 'react'
import cl from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={cl.nav}>
            <h1>Adul<span className={cl.selectedWord}>IT</span></h1>
            <ul className={cl.menu}>
                <li className={cl.menuItem}><a href="#">About me</a></li>
                <li className={cl.menuItem}><a href="#">Projects</a></li>
                <li className={cl.menuItem}><a href="#">Experience</a></li>
                <li className={cl.menuItem}><a href="#">Contacts</a></li>
            </ul>
        </nav>
    )
}

export default Navbar