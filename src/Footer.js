import React from 'react'
import './Footer.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import HomeIcon from '@material-ui/icons/Home';

function Footer() {
    return (
        <div className="footer">
            <ul>
                <li><a href="http://www.instagram.com"><InstagramIcon /></a></li>
                <li><a href="http://www.facebook.com"><FacebookIcon /></a></li>
                <li><a href="#"><HomeIcon /></a></li>

            </ul>
            <p> 2020 &copy; Mihai Dornean's final project - Stargazing</p>
            
        </div>
    )
}

export default Footer;
