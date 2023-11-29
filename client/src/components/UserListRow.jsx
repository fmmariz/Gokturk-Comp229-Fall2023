import * as React from 'react';
import {Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom/cjs/react-router-dom';

function UserListRow({user}) {
    
      const listObjectStyle = {
        marginBottom : '10px',
      }

      const nameStyle = {
        fontSize:30,
        marginTop:3,
        marginBottom:0,
        marginRight: 0
      }

      const emailStyle = {
        fontSize:15,
        marginBottom:3,
        marginTop:3,
        color:'gray'
      }
    
    return (
        <Card  style={listObjectStyle}>
          <Link to={'/users/'+user._id}>
          <CardContent style={{alignItems:'center', justifyContent:'center', textAlign:'center', padding:1}} >
                <h5 style={nameStyle}>{user.name}</h5>
                <h6 style={emailStyle}>{user.email}</h6>
            </CardContent>
          </Link>

        </Card>
    );
}
export default UserListRow;