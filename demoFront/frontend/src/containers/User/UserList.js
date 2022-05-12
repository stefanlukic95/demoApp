import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

import { Link } from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar';


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/allUsers')
            .then(response => response.json())
            .then(data => this.setState({users: data}));
            
    }
    
    async remove(id) {
        await fetch(`/userId/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            
            }
        }).then(() => {
            let updatedUsers = [...this.state.users].filter(i => i.id !== id);
            this.setState({users: updatedUsers});
        });
    }
    
    render() {
        const {users, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const userList = users.map(user => {
            return <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
               
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/userId/" + user.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div>
                        <Button size="sm" color="success" tag={Link} to="/allUsers/new">Register</Button>
                    </div>
                    <h3>Users</h3>
                    <Table>
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Surname</th>
                            <th width="30%">Email</th>
                            <th width="30%">Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default UserList;