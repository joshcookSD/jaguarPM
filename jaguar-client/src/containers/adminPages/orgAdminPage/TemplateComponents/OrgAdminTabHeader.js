import React from 'react';
import {
    AdminPageHeaderWrapper
} from '../../../layout/AdminComponents.js'

const TabHeader = (props) => (

    <AdminPageHeaderWrapper>
        <div>
            <span className="headerTitle " >Organization Title: </span>
            <span className="headerName">{props.orgTitle}</span>
        </div>
        <div className="orgDescrip">
            <span className="headerTitle" >Organization Description:</span>
            <span className="headerName">{props.orgDescription}</span>
        </div>
    </AdminPageHeaderWrapper>
);

export default TabHeader;

