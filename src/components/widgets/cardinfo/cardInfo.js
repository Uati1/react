import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import "./cardInfo.css"
import moment from 'moment';




const CardInfo = (props) => {
    
    const teamName = (teams, team)=>{
        let data = teams.find((item)=>{
            return item.teamId=== team
        });
        if(data){
            return data.name
        }
    }
    const formatDate = (date)=>{
        return moment(date).format(' MM-DD-YYYY')
    }
    return (
        <div className="cardInfo">
            <span className="teamName">
                {teamName(props.teams,props.teamId)}
            </span>
            <span className="date">
                <FontAwesomeIcon 
                    icon={faClock}
                />
                {formatDate(props.date)}
            </span>
        </div>
        
    )
}

export default CardInfo;