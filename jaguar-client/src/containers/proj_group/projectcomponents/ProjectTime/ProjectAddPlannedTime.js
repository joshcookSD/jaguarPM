import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';
import { Mutation } from "react-apollo";
import decode from 'jwt-decode';
import moment from "moment/moment";
import gql from "graphql-tag";

const plannedtimebyproject = gql`
 query plannedtimebyproject($project: String!){
      plannedtimebyproject(project: $project) {
           _id
            time
        }
 }`;

const createPlannedTimeProject = gql`
mutation createPlannedTime($time: Float!, $date: Date, $createdBy: String, $project: String ) {
    createPlannedTime(time: $time, date: $date, createdBy: $createdBy,project: $project) {
        _id
        time
    }
}
`;

class ProjectAddPlannedTime extends Component {
    state = {
        plannedTime:'',
        plannedTimecomment: '',
    };

    render() {
        const {  selectedProject } = this.props;
        const { plannedTime, plannedTimecomment } = this.state;
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        const project = selectedProject;
        const today = moment(Date.now()).format('YYYY-MM-DD');
            return (
                <Mutation mutation={createPlannedTimeProject}>
                    {(createPlannedTimeProject, {loading}) => {
                        return (
                            <div>
                                <Form onSubmit={async e => {
                                    e.preventDefault();
                                    if (plannedTime != null) {
                                        await createPlannedTimeProject({
                                            variables: {
                                                project,
                                                date: today,
                                                time: plannedTime,
                                                timecomment: plannedTimecomment,
                                                createdBy: user._id
                                            },
                                            update: async (store, {data: newTime}) => {
                                                const data = store.readQuery({query: plannedtimebyproject, variables: {project: selectedProject}  });
                                                data.plannedtimebyproject.push(newTime.createPlannedTime);
                                                await store.writeQuery({
                                                    query: plannedtimebyproject,
                                                    variables: {project: selectedProject},
                                                    data: data
                                                });
                                            }
                                        });
                                        this.setState({plannedTime: ''});
                                        this.props.onClose()
                                    };
                                }}>
                                    <Form.Group style={{marginBottom: '2px'}} inline>
                                        <Form.Field width='six'>
                                            <Input
                                                size='mini'
                                                value={plannedTime}
                                                type='number'
                                                step='0.25'
                                                placeholder='planned time'
                                                onChange={e => this.setState({plannedTime: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Form.Field width='twelve'>
                                            <Input size='mini'
                                                   value={plannedTimecomment}
                                                   type='text'
                                                   placeholder='comment'
                                                   action={{icon: 'add circle'}}
                                                   onChange={e => this.setState({plannedTimecomment: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Button
                                            content='Plan Time!'
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
export default ProjectAddPlannedTime;
