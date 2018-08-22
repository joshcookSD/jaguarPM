import styled from 'styled-components';

const Section = styled.div`
    min-height: 400px
    min-width: 285px
    max-height: 450px
    max-width: 300px
    flex-grow: 1;
    display: flex;
`;



const TopSection = styled.div`
    min-height: 400px
    max-height: 450px
    width: 100%
`;

const BottomSection = styled.div`
    height: 100%
    width: 100%
    display: flex;
    justify-content: center;
`;

export {Section, TopSection, BottomSection};