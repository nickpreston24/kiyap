import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    console.log('on admin page');
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();
        console.log('users obj:', usersObject);

        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
          users: usersList,
          loading: false,
        });
      });
  }

//   componentWillMount() {
//       this.loadUsers();
//   }

//   loadUsers() {
//     this.setState({ loading: true });
//     // console.log('firebase: ', !!this.props.firebase.users());

//     // this.props.firebase.listUsers(100)
//     // .then(result=>{
//     //     console.log(result)
//     // })
//     // this.props.firebase.users()


//     this.props.firebase.users().on('value', snapshot => {
//         console.log('i am called');
//         const usersObject = snapshot.val();
//         console.log('users obj:', usersObject);

//         const usersList = Object.keys(usersObject).map(key => ({
//           ...usersObject[key],
//           uid: key,
//         }));

//         this.setState({
//           users: usersList,
//           loading: false,
//         });
//       });
//   }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>
        {console.log('loading: ', loading, 'users:', users)}
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withAuthorization(condition),
    withFirebase,
)(AdminPage);
