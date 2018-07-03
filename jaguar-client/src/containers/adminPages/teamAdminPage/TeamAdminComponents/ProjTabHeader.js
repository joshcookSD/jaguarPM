import React from 'react';

const ProjTabHeader = (props) => (

        <div className="orgHeader">
            <div>
                <span>Team Title: </span>
                <span>{props.teamTitle}</span>
            </div>
            <div className="orgDescrip">
                <span >Team Description:</span>
                <span>{props.teamDescription}</span>
            </div>
        </div>
    
);

export default ProjTabHeader;
