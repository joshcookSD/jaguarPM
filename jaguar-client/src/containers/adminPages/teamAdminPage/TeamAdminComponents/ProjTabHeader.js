import React from 'react';
import {
    AdminPageHeaderWrapper
} from '../../../layout/AdminComponents.js'

const ProjTabHeader = (props) => (

        <AdminPageHeaderWrapper>
            <div>
                <span>Team Title: </span>
                <span>{props.teamTitle}</span>
            </div>
            <div className="orgDescrip">
                <span >Team Description:</span>
                <span>{props.teamDescription}</span>
            </div>
        </AdminPageHeaderWrapper>
    
);

export default ProjTabHeader;
