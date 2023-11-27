import { list } from './api-user.js'
import { useEffect, useState } from "react";
import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import NavigationBar from '../src/components/NavigationBar.jsx';
import auth from '../auth/auth-helper.js';

export default function UserList() {
  //Original State is Empty
  let [userList, setUserList] = useState([]);


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated();
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

  const listStyle = {
    listStyleType : 'none'
  };

  const listObjectStyle = {
    marginBottom : '5px'
  }


  return (
    <>

    <NavigationBar />
    <ul style={listStyle}>
      {userList.map((user) =>
      <Card key={user.email} style={listObjectStyle}>
      <CardContent >
          {user.name} 
      </CardContent>
    </Card>)}
    </ul>

    </>
  )
}
