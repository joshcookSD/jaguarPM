import styled from 'styled-components';

const DateInputCell = styled.input`
    border: none;
    line-height: 2em;
    text-transform: none;
    text-indent: 0.5em;
    color: rgba(0,0,0,.87);
    width: 100%;
    
    &:hover {
        background-color: rgb(230, 255, 241);
    }
`;

export default DateInputCell;