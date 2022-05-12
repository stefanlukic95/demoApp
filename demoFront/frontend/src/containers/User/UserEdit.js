import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../components/AppNavbar';


class UserEdit extends Component {

    emptyItem = {
        name: '',
        surname:'',
        password:'',
        email: '',
        adress:'',
        roles:['']
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const user = await (await fetch(`/userId/${this.props.match.params.id}`)).json();
            this.setState({item: user});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/userId' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/allUsers');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Register'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Surname</Label>
                        <Input type="text" name="surname" id="surname" value={item.surname || ''}
                               onChange={this.handleChange} autoComplete="surname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="oasswird">Password</Label>
                        <Input type="passwword" name="password" id="password" value={item.password || ''}
                               onChange={this.handleChange} autoComplete="password"/>
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="adress">Adress</Label>
                        <Input type="text" name="adress" id="adress" value={item.adress || ''}
                               onChange={this.handleChange} autoComplete="adress"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roles">Role</Label>
                        <Input type="text" name="roles" id="roles" value={item.roles || ''}
                               onChange={this.handleChange} autoComplete="roles"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/allUsers">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(UserEdit);

