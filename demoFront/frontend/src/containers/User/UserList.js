import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from '../../services/authentication/auth-service';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [],
                        isAdmin: false};
        this.remove = this.remove.bind(this);
    }
    
    handleShow = ()=>{
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({
              currentUser: user,
              isAdmin: user.user.roles.includes("ADMIN"),
            });
          }
    }
    componentDidMount() {
        fetch('/allUsers')
            .then(response => response.json())
            .then(data => this.setState({users: data}));    
            
            this.handleShow();
    }

    async remove(id) {
        const user = authService.getCurrentUser();

        await fetch(`/userId/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token

            
            }
        }).then(() => {
            let updatedUsers = [...this.state.users].filter(i => i.id !== id);
            this.setState({users: updatedUsers});
        });
    }

    
    render() {
        const {users , isAdmin} = this.state;  

        const userList = users.map(user => {
        
            return <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
            
                <td>
                   
                  {isAdmin && (
                    <ButtonGroup>
                        <Button size="sm"  color="primary" tag={Link} to={"/userId/" + user.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
                    </ButtonGroup>
                  )}
                </td>
            </tr>
        });
    
    
        return (
            <div> 
                <Container fluid>
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