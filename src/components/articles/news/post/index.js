import React, {Component} from 'react';
import {firebaseDB, firebaseLooper, firebaseTeams, firebase} from '../../../../firebase';
import Header from './header';
import '../../articles.css';

class NewsArticle extends Component {
    
    state= {
        article:[],
        team:[],
        imgURL: '',
    }

    componentWillMount(){

        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild('id').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
                this.getimgURL(article.image)
            })
        })

        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        // .then(response =>{
        //     let article = response.data[0];

        //     axios.get(`${URL}/teams?id=${article.team}`)
        //     .then(response=>{
        //         this.setState({
        //             article,
        //             team:response.data
        //         })
        //     })
        // })
    }

    getimgURL = (name) =>{
        firebase.storage().ref('images').child(name).getDownloadURL()
        .then(url =>{
            this.setState({
                imgURL: url
            })
        })
    }

    render(){

        const article = this.state.article;
        const team = this.state.team;

        return(
            
            <div className="articleWrapper">
                <Header 
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className="articleBody">
                    <h1>{article.title}</h1>
                    <div className="articleImage"
                        style={{
                            background:`url('${this.state.imgURL}')`
                        }}
                    >
                    </div>
                    <div className="articleText"
                        dangerouslySetInnerHTML={{
                            __html:article.body
                        }}
                    >
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsArticle;