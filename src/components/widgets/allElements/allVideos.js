import React from 'react';
import './allElements.css';
import Videos from '../videos/videos';



const AllVideos = () => {
    

    return(
        <div>
            <Videos
                type="card"
                start={0}
                amount={6}
                loadMore={true}
                title={false}
            />
        </div>
    )
}

export default AllVideos;