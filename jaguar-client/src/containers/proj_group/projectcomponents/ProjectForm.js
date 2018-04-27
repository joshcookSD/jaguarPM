import React, {Component} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'


class ProjectForm extends Component {
    state = {
        newProject: "",
    };

    render() {

        return(
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Project Name' />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Project Description' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}




export default ProjectForm