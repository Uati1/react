import React from 'react';
import  './header.css';
import {Link, withRouter} from 'react-router-dom';
import {firebase} from '../../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faClipboard, faVideo, faSignInAlt, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';


const SideNavItems = (props) => {
    const items = [
        {
            type: 'option',
            icon: faHome,
            text: ' Home',
            link: '/',
            login:''
        },{
            type: 'option',
            icon: faNewspaper,
            text: ' News',
            link: '/news',
            login:''
        },{
            type: 'option',
            icon: faVideo,
            text: ' Videos',
            link: '/videos-feed',
            login:''
        },{
            type: 'option',
            icon: faClipboard,
            text: ' Dashboard',
            link: '/dashboard',
            login: false
        },{
            type: 'option',
            icon: faSignInAlt,
            text: ' Sign in',
            link: '/sign-in',
            login: true
        },{
            type: 'option',
            icon: faSignOutAlt,
            text: ' Sign Out',
            link: '/sign-out',
            login: false
        }
    ]

    const element = (item,i) =>(
        <div key ={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesomeIcon icon = {item.icon}/>{item.text}
            </Link>
        </div>
    )
    const restricted = (item,i) =>{
        let template = null;

        if(props.user == null && item.login){
            template = element(item,i)
        }

        if(props.user !==null && !item.login){
            if(item.link === '/sign-out'){
                template = (
                    <div key ={i} 
                        className={item.type}
                        onClick = {()=>{
                            firebase.auth().signOut()
                            .then(()=>{
                                props.history.push('/')
                            })
                        }}
                    >
                            <FontAwesomeIcon icon = {item.icon}/>{item.text}
                    </div>
                )
            }else{
                template = element(item,i)
            }
        }


        return template;
    }
    

    const showItems = () =>{
        return items.map((item,i) => {
            return item.login !== ''?
                restricted(item,i)
            :element(item,i)

        })
    }

    return (
        
        <div>
            {showItems()}
        </div>
    )
}

export default withRouter(SideNavItems);