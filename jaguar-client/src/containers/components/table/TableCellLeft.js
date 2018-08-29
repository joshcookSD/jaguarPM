import styled from 'styled-components';

const TableCellLeft = styled.td`
    border: none;
    margin: calc(2rem - .14285714em) 0 1rem;
    padding: 0.5em 0;
    line-height: 1.28571429em;
    text-align: left;
    text-transform: none;
    color: rgba(0,0,0,.87);
    border-bottom: 1px solid rgba(34,36,38,.15);
    
    &:hover {
        background-color: rgb(230, 255, 241);
    }
`;

export default TableCellLeft;