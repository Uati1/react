import React, {Component} from 'react';
import SliderTemplates from './sliderTemplates';
import {firebaseArticles, firebaseLooper, firebase} from '../../../firebase';
class NewsSlider extends Component {
    
    state= {
        news:[]
    }
    
    componentWillMount(){
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news = firebaseLooper(snapshot)
            // news.forEach((item,i)=>{
            //     firebase.storage().ref('images')
            //     .child(item.image).getDownloadURL()
            //     .then(url =>{
            //         news[i].image = url;
            //         this.setState({
            //             news
            //         })
            //     })
            // })

            const asyncfun = (item, i, cb) =>{
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then(url =>{
                    news[i].image = url;
                    cb();
                })
            }

            let requests = news.map((item,i)=>{
                return new Promise((resolve)=>{
                    asyncfun(item,i, resolve)
                })
            })

            Promise.all(requests).then(()=>{
                this.setState({
                    news
                })
            })
        })
        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        // .then(response => {
        //     this.setState({
        //         news: response.data
        //     })
        // })
    }

    render(){
        return(
            <SliderTemplates data={this.state.news} type ={this.props.type} settings={this.props.settings}/>
        )
    }
}

export default NewsSlider;