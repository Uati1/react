import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SideNav from './sidenav.js';
const Header = (props) => {

    const logo = () =>(

        <Link to ="/" className='logo'>
            <img alt="nba logo"src = "../images/nba_logo.png" />
        </Link>
    )

    const navBars = () =>(
        <div className='bars'>
            <FontAwesomeIcon
                icon={faBars}
                onClick={props.onOpenNav}
                style={{
                    color:'#dfdfdf',
                    cursor: 'pointer',
                    padding: '10px'
                }}
            />
        </div>
    )

    return (
        <header className='header'>
        <SideNav {...props} />
           <div className='headerOpt'>
                {navBars()}
                {logo()}
           </div>
        </header>
    )
}

export default Header;