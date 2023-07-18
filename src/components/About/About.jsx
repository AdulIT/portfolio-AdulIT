import React from 'react'
import cl from './About.module.css'
import meUrl from '../../assets/me.jpg'

const About = () => {
    return (
        <section className={cl.about}>
            <img src={meUrl} className={cl.aboutImg} />
            <div className={cl.aboutText}>
                Hello, there ✌🏻 <br />
                My name is <span>Allazhar Bekzhan </span>
                I build things for web 🕸️
            </div>
        </section>
    )
}

export default About