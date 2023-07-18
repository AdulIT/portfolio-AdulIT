import React from 'react'
import Navbar from '../UI/Navbar/Navbar'

import cl from './Header.module.css'

const Header = () => {
    return (
        <header className={cl.header}>
            <Navbar />
        </header>
    )
}

export default Header