import React from 'react';
import './formFields.css';

const FormFields = ({formdata,change,id})=> {

    const showError = () =>{
        let msg = null;

        if(formdata.validation && !formdata.valid){
            msg = (
                <div className ='labelError'>
                    {formdata.valiMessage}
                </div>
            )
        }

        return msg;
    }

    const renderTemplate = ()=>{
        let formTemplate= null;
        switch(formdata.element){
            case('input'):
                formTemplate =(
                    <div>
                        <input 
                            {...formdata.config}
                            value={formdata.value}
                            onChange={(event)=>change({event,id,blur:false})}
                            onBlur={(event)=>change({event,id,blur:true})}
                        />
                        {showError()}
                    </div>
                )
            break;
            case('select'):
                formTemplate =(
                    <div>
                        <select 
                            value={formdata.value}
                            name={formdata.config.name}
                            onChange={(event)=>change({event,id,blur:false})}
                            onBlur={(event)=>change({event,id,blur:true})}
                        >
                            {formdata.config.options.map((item,i)=>(
                                <option key={i} value = {item.id}>{item.name}</option>
                            ))}
                        </select>
                        
                    </div>
                )
            break;
            default:
                formTemplate= null;
        }
        return formTemplate;
    }

    return(
        <div>
            {renderTemplate()}
        </div>
    )

}

export default FormFields;