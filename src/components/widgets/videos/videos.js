import React, {Component} from 'react';
import {firebaseVideos,firebaseLooper,firebaseTeams} from '../../../firebase'
import './videos.css'
import Button from '../buttons/button';
import VideosTemplate from './videosTemplate';
class Videos extends Component {
    
    state= {
        teams:[],
        videos:[],
        start:this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }
    
    

    renderTitle = (title) =>{
        return title ? 
            <h3><strong>NBA</strong> Videos</h3>
        :null
    }

    componentWillMount(){
        this.request(this.state.start,this.state.end)
    }

    request = (start,end) => {
        if(this.state.teams.length<1){
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })

            })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const videos = firebaseLooper(snapshot);
           this.setState({
               videos:[...this.state.videos, ...videos],
               start,
               end
           })
        })
        

        
    }

    renderVideos = () =>{
        let template = null;

        switch(this.props.type){
            case('card'):
                template = <VideosTemplate data={this.state.videos} teams={this.state.teams}/>
                break;
            default: 
                template=null;
        }
        return template;
    }

    loadMore = () =>{
        let end= this.state.end+ this.state.amount;
        this.request(this.state.end +1, end)
    }

    renderButton = () =>{
        return this.props.loadMore? 
            <Button 
                type='loadmore'
                loadMore={()=>this.loadMore()}
                cta= "Load more Videos"
                />
        :
            <Button type = 'linkTo' cta='More videos' linkTo="/videos"/>
    }

    render(){
        return(
            <div className="videos_wrapper">
                {this.renderTitle(this.props.title)}
                {this.renderVideos()}
                {this.renderButton(this.props.loadMore)}
            </div>
        )
    }
}

export default Videos;