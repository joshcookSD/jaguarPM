import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import decode from 'jwt-decode';
import moment from "moment/moment";
import gql from "graphql-tag";

const createProjectTime = gql`
mutation createProjectTime($time: Float!, $timecomment: String, $date: Date, $user: String, $project: String) {
    createProjectTime(time: $time, timecomment:$timecomment, date: $date, user: $user, project: $project) {
        _id
        time
    }
}
`;

const timeByProject = gql`
 query timeByProject($project: String!){
      timeByProject(project: $project) {
           _id
            time
        }
 }
 `;

class ProjectAddTime extends Component {
    state = {
        actualtime: '',
        plannedTime:'',
        comment: '',
        plannedTimecomment: '',
    };

    render() {
        const {  selectedProject } = this.props;
        const { actualtime, comment } = this.state;
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const project = selectedProject;
        const today = moment(Date.now()).format('YYYY-MM-DD');
        return (
            <Mutation mutation={createProjectTime}>
                {(createProjectTime) => {
                    return (
                        <div>
                            <Form onSubmit={async e => {
                                e.preventDefault();
                                if (actualtime != null) {
                                    await createProjectTime({
                                        variables: {
                                            user: user._id,
                                            project,
                                            date: today,
                                            time: actualtime,
                                            timecomment: comment
                                        },
                                        update: async (store, {data: newTime}) => {
                                            const data = store.readQuery({query: timeByProject, variables: {project: selectedProject}  });
                                            data.timeByProject.push(newTime.createProjectTime);
                                            await store.writeQuery({
                                                query: timeByProject,
                                                variables: {project: selectedProject},
                                                data: data
                                            });
                                        }
                                    });
                                    this.setState({actualtime: '', comment: ''});
                                    this.props.onClose()
                                }
                            }}>
                                <Form.Group style={{marginBottom: '2px'}} inline>
                                    <Form.Field width='six'>
                                        <Input
                                            size='mini'
                                            value={actualtime}
                                            type='number'
                                            step='0.25'
                                            placeholder='time'
                                            onChange={e => this.setState({actualtime: e.target.value})}
                                        />
                                    </Form.Field>
                                    <Form.Field width='twelve'>
                                        <Input
                                            size='mini'
                                            value={comment}
                                            type='text'
                                            placeholder='comment'
                                            action={{icon: 'add circle'}}
                                            onChange={e => this.setState({comment: e.target.value})}
                                        />
                                    </Form.Field>
                                    <Button
                                        content='New Time!'
                                        type='submit'
                                        size='tiny'
                                        basic color='green'
                                        floated='right'
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}
export default ProjectAddTime;
