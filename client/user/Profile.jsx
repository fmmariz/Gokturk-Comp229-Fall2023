import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import auth from "../auth/auth-helper";
import { read } from "./api-user";

import { useState, useEffect } from "react";
import NavigationBar from "../src/components/NavigationBar";

import { Box, Card, CardContent, Grid, Button, IconButton } from '@material-ui/core'
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
        marginTop: 10,
    }

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    }


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const jwt = auth.isAuthenticated();
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

    return (
        <>
            <NavigationBar />
            <h1>Profile Informations</h1>
            <Box sx={boxStyle}>
                <Card sx={cardStyle}>
                    <CardContent>
                        <Grid container >
                            <Grid item xs={10}>
                                <h2>{userData.name}</h2>
                            </Grid>
                            <Grid item xs={2}>
                                <Link to='/editprofile'>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <h3>{userData.email}</h3>
                            </Grid>
                            <Grid item xs={8}>
                            </Grid>
                            <Grid item xs={4}>
                                <Link to='/deleteaccount'>
                                    <Button>
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