import React from 'react';
import {Link} from 'react-router-dom';
import './videos.css';
import CardInfo from '../cardinfo/cardInfo';


const VideosTemplate = (props) => {
    
    return props.data.map((item,i)=>{
        return <Link to={`/videos/${item.id}`} key={i}>
            <div className='videoList_wrapper'>
                <div className='lefty'
                    style={{
                        background: `url(/images/videos/${item.image})`
                    }}>
                        
                    <div >
                        
                    </div>
                </div>
                <div className='righty'>
                   
                    <CardInfo teams={props.teams}  teamId={item.team} date={item.date}/>
                    <h2>{item.title}</h2>
                </div>
            </div>
        </Link>
    })
}

export default VideosTemplate;