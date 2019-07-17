import React from 'react';
import {Link} from 'react-router-dom';
import './footer.css';
import {CURRENT_YEAR} from '../../config';


const Footer = (props) => {


    return (
        <footer className='footer'>
            <Link to="/" className="logo">
                <img alt="nba logo"src = "../images/nba_logo.png" />
            </Link>
            
            <div className="right">
                @NBA {CURRENT_YEAR} All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;