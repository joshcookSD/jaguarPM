import styled from 'styled-components';

const ProjGroupContentArea = styled.div`
        display: grid;
        grid-template-columns: (2, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px
`;

export {
    ProjGroupContentArea
};