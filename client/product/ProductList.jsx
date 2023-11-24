import { Typography } from '@material-ui/core';
import { useEffect, useState } from "react";
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NavigationBar from '../src/components/NavigationBar.jsx';


export default function UserList() {
  //Original State is Empty
  const [data, setData] = useState([])



  return (
    <>
    <NavigationBar/>
    <h6>Product List</h6>
    </>
  )
}

