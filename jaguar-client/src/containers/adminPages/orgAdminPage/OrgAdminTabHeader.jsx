import React from 'react';

const TabHeader = (props) => (

    <div className="orgHeader">
        <div>
            <span className="headerTitle " >Organization Title: </span>
            <span className="headerName">{props.orgTitle}</span>
        </div>
        <div className="orgDescrip">
            <span className="headerTitle" >Organization Description:</span>
            <span className="headerName">{props.orgDescription}</span>
        </div>
    </div> 
);

export default TabHeader;

