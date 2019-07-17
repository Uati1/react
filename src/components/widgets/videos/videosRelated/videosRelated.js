import React from 'react';
import '../videos.css';
import VideosTemplate from '../videosTemplate';

const VideosRelated = (props) => (
    <div className="relatedWrapper">
        
        <VideosTemplate
            data={props.data}
            teams={props.teams}
        />
    </div>
)


export default VideosRelated;