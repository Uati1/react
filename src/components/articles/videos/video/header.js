import React from 'react';
import '../../articles.css';
import TeamInfo from '../../elements/teamInfo';



const Header = (props) => {
    
    const teamInfo = (team) =>{
        return team?(
            <TeamInfo team={team}/>
        ):null;
    }

    return(
        <div>
            {teamInfo(props.teamData)}
        </div>
    )
}

export default Header;