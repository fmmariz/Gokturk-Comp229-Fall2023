import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import auth from "../auth/auth-helper";
import { read } from "./api-user";

import { useState, useEffect } from "react";
import NavigationBar from "../src/components/NavigationBar";

import { Box, Card, CardContent, Grid, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'


export default function Profile() {

    let [userData, setUserData] = useState({
        name: undefined,
        email: undefined
    });

    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt = auth.tryToGetToken();
        const token = jwt.token;
        console.log(jwt.data.user._id)
        read(jwt.data.user._id, token, signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                //Fill with obtained Users
                console.log(data)
                setUserData({
                    name: data.data.doc.name,
                    email: data.data.doc.email
                });
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    
  const warningButton = {
    background: 'white',
    color: 'red',
    width: "100%",
    border: 1,
    borderColor: 'red',
    '&:hover': {
      backgroundColor: 'red',
      boxShadow: 'none',
      border: 1,
      color: 'white'
    }
  }

    return (
        <>
            <h1 style={{width:"100%", textAlign:'center', justifyContent:'center', color:'orange'}}>Profile Informations</h1>
            <Box sx={boxStyle}>
                <Card sx={cardStyle}>
                    <CardContent>
                        <Grid container >
                            <Grid item xs={10}>
                                <h2>{userData.name}</h2>
                            </Grid>
                            <Grid item xs={2} sx={{alignItems:'center', justifyContent:'center'}}>
                                <Link to='/editprofile'>
                                    <IconButton aria-label="edit" sx={{height:'100%', width:'100%'}}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <h3 style={{color:'grey'}}>{userData.email}</h3>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                            <Grid item xs={4}>
                                <Link to='/deleteaccount'>
                                    <Button sx={warningButton}>
                                        Delete Account
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}