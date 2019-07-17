import React, { Component } from 'react';
import './signIn.css';
import FormField from '../widgets/formfields/formFields';
import {firebase} from '../../firebase';

class SignIn extends Component {
   
    state= {
        registerE:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'mail_input',
                    type:'email',
                    placeholder:'Enter email'
                },
                validation:{
                    required: true,
                    email:true
                },
                valid:false,
                touched:false,
                valiMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'pass_input',
                    type:'password',
                    placeholder:'Enter password'
                },
                validation:{
                    required: true,
                    password:true
                },
                valid:false,
                touched:false,
                valiMessage:''
            }
        }
    }

    updateForm = (element)=>{
        const newformdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newformdata[element.id]
        }
        newElement.value = element.event.target.value;

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

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be valid email':''}`;
            error = !valid? [valid, message]: error
        }

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Password has to be longer than 5 characters':''}`;
            error = !valid? [valid, message]: error
        }

        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid? [valid, message]: error
        }

        return error;
    }

    submitForm = (event,type) =>{
        event.preventDefault();
        if(type !== null){
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
                    loading:true,
                    registerE: ''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch(error =>{
                        this.setState({
                            loading:false,
                            registerE: error.message
                        })
                    })
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                    .then(()=>{
                        this.props.history.push('/')
                    }).catch(error =>{
                        this.setState({
                            loading:false,
                            registerE: error.message
                        })
                    })
                }
            }
        }
    }

    submitButtton = ()=>(
        this.state.loading?
            'loading...'
        :
        <div>
            <button onClick = {(event) => this.submitForm(event,false)}>Register now</button>
            <button onClick = {(event) => this.submitForm(event,true)}>Log in</button>
        </div>
    )

    showError = () =>(
        this.state.registerE !== ''?
        <div className="error">{this.state.registerE}</div>
        :''
    )

   
    render() {
        return (
            <div className='logContainer'>
                <h2>Register/ Log in</h2>
                <form onSubmit={(event)=> this.submitForm(event,null)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=>this.updateForm(element)}
                    />

                    {this.submitButtton()}
                    {this.showError()}
                </form>
            </div>
           
        )
    }
}

export default SignIn;