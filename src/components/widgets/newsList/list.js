import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import Button from '../buttons/button';
import CardInfo from '../cardinfo/cardInfo';
import {firebaseTeams, firebaseArticles, firebaseLooper} from '../../../firebase';
import './list.css';
class NewsList extends Component {
    
    state= {
        items:[],
        teams:[],
        start:this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
        
    }
    
    componentWillMount(){
        this.request(this.state.start,this.state.end)
    }

    request = (start, end) =>{
        if(this.state.teams.length<1){
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })

            })
        //     axios.get(`${URL}/teams`)
        //     .then(response =>{
        //         this.setState({
        //             teams:response.data
        //         })
        //     })
         }
        
         firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
         .then((snapshot)=>{
             const articles = firebaseLooper(snapshot);
            this.setState({
                items:[...this.state.items, ...articles],
                start,
                end
            })
         })
        
        // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
        // .then(response => {
            
        //     this.setState({ 
        //         items:[...this.state.items, ...response.data],
        //         start,
        //         end
        //     })
        // })
    } 
    
    loadMore = () =>{
        let end = this.state.end + this.state.amount
        this.request(this.state.end+1,end)
    }

    renderNews = (type) =>{
        let template= null;

        switch(type){
            case('card'):
                template= this.state.items.map((item,i) => (
                    <CSSTransition
                        classNames={{
                            enter: 'newsList_wrapper',
                            enterActive: 'newsList_wrapper_enter'
                        }}
                        timeout={500}
                        key={i}
                    >
                        <div>
                        <div  className="newslist_item">
                            <Link to={`/articles/${item.id}`}>
                                <CardInfo teams={this.state.teams} teamId={item.team} date={item.date}/>
                                <h2>{item.title}</h2>
                            </Link>
                        </div>

                    </div>
                    </CSSTransition>
                    
                ))
                break;
            case('cardMain'):
                template= this.state.items.map((item,i) => (
                    <CSSTransition
                        classNames={{
                            enter: 'newsList_wrapper',
                            enterActive: 'newsList_wrapper_enter'
                        }}
                        timeout={500}
                        key={i}
                    >
                    <Link to={`/articles/${item.id}`}>
                        <div className="flexWrapper">
                            <div className="lef"
                                style={{
                                    background:`url(/images/articles/${item.image})`
                                }}
                            >
                                <div></div>
                            </div>
                            <div className="righ">
                                <CardInfo teams={this.state.teams} teamId={item.team} date={item.date}/>
                                <h2>{item.title}</h2>
                            </div>
                        </div>
                        
                    </Link>
                    </CSSTransition>
                    
                ))
                break;
            default:
                template= null;
        
        }
        return template;
    }
    

    render(){
        return(
            
            <div>
                <TransitionGroup
                    component="div"
                    className="list"

                >
                    {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Button
                    type="loadmore"
                    loadMore={(()=>this.loadMore())}
                    cta="Load more News"
                />

            </div>
        )
    }
}

export default NewsList;