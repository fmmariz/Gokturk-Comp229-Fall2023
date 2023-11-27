import * as React from 'react';
import UserListRow from './UserListRow';


function UserListComponent({userList}) {
    const listStyle = {
        listStyleType: 'none'
    };

    return (
        <ul style={listStyle}>
            {userList.map((user) =>
                <UserListRow user={user} key={user.email}/>
            )}
        </ul>
    );
}
export default UserListComponent;