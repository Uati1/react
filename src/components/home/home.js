import React from 'react';
import NewsSlider from '../widgets/newsSlider/slider';
import NewsList from '../widgets/newsList/list';
import Videos from '../widgets/videos/videos';





const Home = () => {
    return (

        <div >
            <NewsSlider
                type="featured"
                start={0}
                amount={5}
                settings={{
                    dots:false
                }}
            />
            <NewsList
                type="card"
                loadMore= {true}
                start={3}
                amount={3}
            />
            <Videos
                type="card"
                title={true}
                loadMore={true}
                start={0}
                amount={3}
            /> 
        </div>
        
    )
}

export default Home;