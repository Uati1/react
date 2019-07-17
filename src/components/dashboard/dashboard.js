import React, {Component} from 'react';
import FormField from '../widgets/formfields/formFields';
import './dashboard.css';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertFromRaw, convertToRow} from 'draft-js';
import {ststeToHTML, stateToHTML} from 'draft-js-export-html';
import {firebaseTeams, firebase, firebaseArticles} from '../../firebase';

import Uploader from '../widgets/fileUploader/fileUploader';



class Dashboard extends Component {
    state={
        editorState: EditorState.createEmpty(),
        postE:'',
        loading:false,
        formdata:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder:'Enter author'
                },
                validation:{
                    required: true
                },
                valid:false,
                touched:false,
                valiMessage:''
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder:'Enter title'
                },
                validation:{
                    required: true
                },
                valid:false,
                touched:false,
                valiMessage:''
            },
            body:{
                element:'texteditor',
                value:'',
                valid:true
            },
            team:{
                element:'select',
                value:'',
                config:{
                    name:'teams_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid:false,
                touched:false,
                valiMessage:''
            },
            image:{
                element:'image',
                value:'',
                valid:true
            }
        }
    }

    componentDidMount(){
        this.loadTeams()
    }

    loadTeams = ()=>{
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let team= [];
            snapshot.forEach((childSnapshot)=>{
                team.push({
                    id:childSnapshot.val().teamId,
                    name:childSnapshot.val().city,
                })
            })

            const newformdata = {...this.state.formdata};
            const newElement = {...newformdata['team']};

            newElement.config.options = team;
            newformdata['team'] = newElement;

            this.setState({
                formdata: newformdata
            })

        })
    }

    updateForm = (element,content = '')=>{
        const newformdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newformdata[element.id]
        }

        if(content===''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }

        

        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.valiMessage = validData[1];
        }

        newElement.touched = element.blur;

        newformdata[element.id] = newElement;

        this.setState({
            formdata: newformdata
        })

    }
    validate = (element)=>{
        let error = [true,''];

        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid? [valid, message]: error
        }

        return error;
    }

    submitButtton = ()=>(
        this.state.loading?
            'loading...'
        :
        <div>
            <button type="submit">Add post</button>
        </div>
    )

    submitForm= (event) => {

        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
        }
        for(let key in this.state.formdata){
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        

        if(formIsValid){
            this.setState({
                loading: true,
                postE: ''
            })

            firebaseArticles.orderByChild('id')
            .limitToLast(1).once('value')
            .then(snapshot=>{
                let artId= null;
                snapshot.forEach(childSnapshot=>{
                    artId = childSnapshot.val().id
                })

                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSubmit['id'] = artId+1;
                dataToSubmit['team'] = parseInt(dataToSubmit['team'],10)


                firebaseArticles.push(dataToSubmit)
                .then( article => {
                    this.props.history.push(`/articles/${article.key}`)
                }).catch(e=>{
                    this.setState({
                        postE: e.message
                    })
                })

            })
        }else{
            this.setState({
                postE : 'Something went wrong'
            })
        }

    }

    showError = () =>(
        this.state.postE !== ''?
        <div className="error">{this.state.postE}</div>
        :''
    )

    onEditorStateChange = (editorState)=>{

        let contentState = editorState.getCurrentContent();
        //let rawState = convertToRow(contentState);
        let html = stateToHTML(contentState)

        this.updateForm({id:'body'},html)

        this.setState({
            editorState
        })
    }

    storeFilename = (filename) =>{
        this.updateForm({id:'image'},filename)
    }

    render(){
        return (
            <div className='postContainer'>
                <form onSubmit={this.submitForm}>
                    <h2>Add post</h2>
                    <Uploader 
                        filename={(filename)=>this.storeFilename(filename)}
                    />
                    <FormField
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={(element)=>this.updateForm(element)}
                    />
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditorWrapper"
                        editorClassName="myEditor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <FormField
                        id={'team'}
                        formdata={this.state.formdata.team}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButtton()}
                    {this.showError()}
                </form>
                
            </div>
            
        )
    }
    
}

export default Dashboard;