import styled from 'styled-components';

const TextInputCell = styled.input`
    border: none;
    line-height: 2em;
    text-align: left;
    text-indent: 0.5em;
    text-transform: none;
    color: rgba(0,0,0,.87);
    width: 100%;
    
    &:hover {
        background-color: rgb(230, 255, 241);
    }
`;

export default TextInputCell;