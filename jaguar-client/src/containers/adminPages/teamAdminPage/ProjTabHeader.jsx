import React from 'react';
import { Header, Card } from 'semantic-ui-react';

const ProjTabHeader = (props) => (
    <div className="orgHeade">

        <div className="orgHeader">
            <div>
                <span className="headerTitle " >Organization Title: </span>
                <span className="headerName">{props.teamTitle}</span>
            </div>
            <div className="orgDescrip">
                <span className="headerTitle" >Organization Description:</span>
                <span className="headerName">{props.teamdescription}</span>
            </div>
        </div> 

    </div>

    
);

export default ProjTabHeader;
