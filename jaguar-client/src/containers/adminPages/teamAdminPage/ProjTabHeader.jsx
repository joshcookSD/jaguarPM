import React from 'react';

import styled from 'styled-components';

const HeaderTitle = styled.span`
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    color: black
`;

const HeaderName = styled.span`
    font-size: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    color: black
`;

const ProjTabHeader = (props) => (

        <div className="orgHeader">
            <div>
                <HeaderTitle>Team Title: </HeaderTitle>
                <HeaderName>{props.teamTitle}</HeaderName>
            </div>
            <div className="orgDescrip">
                <HeaderTitle >Team Description:</HeaderTitle>
                <HeaderName>{props.teamdescription}</HeaderName>
            </div>
        </div>

    
);

export default ProjTabHeader;
