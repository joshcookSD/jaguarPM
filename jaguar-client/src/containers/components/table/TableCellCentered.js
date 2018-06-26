import styled from 'styled-components';

const TableCellCentered = styled.td`
    border: none;
    padding: 0.5em 0.5em;
    line-height: 1.28571429em;
    text-align: centered;
    text-transform: none;
    color: rgba(0,0,0,.87);
    border-bottom: 1px solid rgba(34,36,38,.15);
    
    &:hover {
        background-color: rgb(230, 255, 241);
    }
`;

export default TableCellCentered;