import { list } from './api-user.js'
import { useEffect, useState } from "react";
import React from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import NavigationBar from '../src/components/NavigationBar.jsx';
import auth from '../auth/auth-helper.js';
import UserListRow from '../src/components/UserListRow.jsx';
import UserListComponent from '../src/components/UserListComponent.jsx';

export default function UserList() {
  //Original State is Empty
  let [userList, setUserList] = useState([]);


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.tryToGetToken();
    const token = jwt.token;
    list(token, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        //Fill with obtained Users
        setUserList(data.data.doc);
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])


  return (
    <>
    <Box sx={{textAlign:'center'}}>
      <h1 style={{color:'orange'}}> Complete User List</h1>
      <UserListComponent userList={userList}/>
    </Box>

    </>
  )
}
