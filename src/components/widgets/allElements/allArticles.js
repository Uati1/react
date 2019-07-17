import React from 'react';
import './allElements.css';
import NewsSlider from "../newsSlider/slider"
import NewsList from "../newsList/list"


const AllArticles = () => {
    

    return(
        <div>
            <NewsSlider
                start={0}
                amount={3}
                type="featured"
                settings={{dots:false}}
            />
            <NewsList 
                start={3}
                amount={5}
                type="cardMain"
                loadMore="true"
            />
        </div>
    )
}

export default AllArticles;