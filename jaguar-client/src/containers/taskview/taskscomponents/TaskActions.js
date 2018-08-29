import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import TaskCurrent from './TaskCurrent'

const style = {
    borderRadius: 3,
    opacity: 0.95,
    padding: '0.5em',
};

const ActionGroup = styled.div`
    float:right;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: rgb(230, 255, 241);
    line-height: 1em;
`;

const ActionButton = styled.button`
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
    margin: 0;
    padding: 0.3em;
    cursor: pointer;
    display: inline-block;
    min-height: 0.8em;
    outline: 0;
    border: none;
    vertical-align: baseline;
    line-height: 0.8em;
    text-align: center;
    text-decoration: none;
    transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
    align-items: flex-start;
    flex-basis: auto;
    flex-grow: 1;
    font-size: 11px;
    background-color: transparent;
    color: rgba(0,0,0,0.6);
    `;


const TaskActions = ({closeTime, openDetail, openComment, taskId, userId, currentTask, updateQuery, variables}) => (
    <ActionGroup>
        <Button.Group size='mini'>
            <Popup
                trigger={<ActionButton onClick={() => openDetail()}>
                    <Icon name='options' size='large' />
                </ActionButton>}
                content='details'
                position='top center'
                style={style}
                inverted
            />
            <Popup
                trigger={<ActionButton onClick={() => closeTime()}>
                    <Icon name='clock' size='large' />
                </ActionButton>}
                content='time'
                position='top center'
                style={style}
                inverted
            />
            <Popup
                trigger={<ActionButton onClick={() => openComment()}>
                    <Icon name='comments outline' size='large' floated='right' />
                </ActionButton>}
                content='comments'
                position='top center'
                style={style}
                inverted
            />
            <Popup
                trigger={<ActionButton>
                    <TaskCurrent
                        taskId={taskId}
                        userId={userId}
                        currentTask={currentTask}
                        updateQuery={updateQuery}
                        variables={variables}
                    />
                </ActionButton>}
                content='make current'
                position='top center'
                style={style}
                inverted
            />
        </Button.Group>
    </ActionGroup>
);

export default TaskActions;
