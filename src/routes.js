import React from 'react';
import {  Switch } from 'react-router-dom';
import  Home  from './components/home/home';
import  NewsArticle  from './components/articles/news/post/index';
import  VideoPost  from './components/articles/videos/video/index';
import  AllArticles  from './components/widgets/allElements/allArticles';
import  AllVideos  from './components/widgets/allElements/allVideos';
import  Layout  from './hoc/layout/layout';
import SignIn from './components/signIn/signIn';
import Dashboard from './components/dashboard/dashboard';
import Public from './components/auth/public';
import Private from './components/auth/private';

const Routes = (props)=> {
        return (
            <Layout user={props.user}>
                <Switch>
                    <Public {...props} restricted={false} path="/" exact component={Home} />
                    <Public {...props} restricted={false} path="/articles/:id" exact component={NewsArticle} />
                    <Public {...props} restricted={false} path="/videos/:id" exact component={VideoPost} />
                    <Public {...props} restricted={false} path="/news" exact component={AllArticles} />
                    <Public {...props} restricted={false} path="/videos-feed" exact component={AllVideos} />
                    <Private {...props} path="/dashboard" exact component={Dashboard} />
                    <Public {...props} restricted={true} path="/sign-in" exact component={SignIn} />
                </Switch>
            </Layout>
           
        )
}

export default Routes;