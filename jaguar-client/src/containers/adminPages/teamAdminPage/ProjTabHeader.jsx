import React from 'react';

const ProjTabHeader = (props) => (
    <div className="orgHeade">

        <div className="orgHeader">
            <div>
                <span className="headerTitle " >Team Title: </span>
                <span className="headerName">{props.teamTitle}</span>
            </div>
            <div className="orgDescrip">
                <span className="headerTitle" >Team Description:</span>
                <span className="headerName">{props.teamdescription}</span>
            </div>
            <div className="orgDescrip">
                <span className="headerTitle" >Default Project:</span>
                <span className="headerName">{props.defaultproject}</span>
            </div>
        </div> 

    </div>

    
);

export default ProjTabHeader;
