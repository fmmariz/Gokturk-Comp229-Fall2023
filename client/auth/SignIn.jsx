import React from 'react';
import { useState } from 'react';
import NavigationBar from '../src/components/NavigationBar';
import Card from '@material-ui/core/Card';
import { Box, Button, CardContent, TextField, Typography } from '@mui/material';
import gokturkLogo from './../assets/images/gokturk_logo.jpg';
import { MuiThemeProvider, createTheme } from '@material-ui/core';
import { signin } from './api-auth.js';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import auth from './auth-helper';


export default function SignIn(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        openDialog: false,
        redirectToReferrer: false
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }


    document.title = "GOKTURKS - Sign In"



    const attemptSignIn = () => {
        const credentials = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        var failLogin = false
        var emailMsg = ''
        var passwordMsg = ''
        if(credentials.email == undefined || !credentials.email.includes('@')){
            emailMsg = "Missing or Invalid e-mail"
            failLogin = true
        }
        if(credentials.password.length < 8 || credentials.password == undefined){
            passwordMsg = "Password is missing or shorter than 8 characters"
            failLogin = true
        }
        setErrors({password: passwordMsg, email: emailMsg})
        if(failLogin) return

        signin(credentials).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });

            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', openDialog: true })
                    setTimeout(function () { //Start the timer
                        setValues({ ...values, redirectToReferrer: true })
                    }.bind(this), 1000)
                })
            }
        });
    }

    const { from } = props.location.state || {
        from: {
            pathname: '/'
        }
    }
    const { redirectToReferrer } = values
    if (redirectToReferrer) {
        return (<Redirect to={from} />)
    }

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
    }

    const textField = {
        marginTop: 1,
        marginBottom: 1,
        color: "orange"
    }

    const buttons = {
        marginTop: 3,
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: 'grey',
            boxShadow: 'none',
            borderColor: 'white',
            color: 'orange'
        }
    }



    return (
        <>
            <NavigationBar />
            <Box sx={boxStyle}
            >
                <Card>
                    <CardContent sx={cardStyle}>
                        <img src={gokturkLogo}
                            alt="GOKTURKS Logo"
                            style={{
                                maxWidth: "50%"
                            }} />
                        <TextField label="E-Mail"
                            sx={textField}
                            placeholder='E-mail'
                            type="email"
                            value={values.email}
                            error={errors.email.length>0}
                            helperText={errors.email}
                            onChange={handleChange('email')}
                            color='secondary'>

                        </TextField >
                        <TextField
                            label="Password"
                            sx={textField}
                            placeholder='Password'
                            type='password'
                            value={values.password}
                            error={errors.password.length>0}
                            helperText={errors.password}
                            onChange={handleChange('password')}
                            color='secondary'
                        >

                        </TextField>
                        <Button sx={buttons}
                            variant="contained"
                            onClick={attemptSignIn}>
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
                <Typography sx={{ marginTop: 3 }}>
                    Don't have an account?
                </Typography>
                <Link to="/signup">
                    <Button sx={buttons}
                        variant="contained">
                        Sign Up Now !
                    </Button>
                </Link>
            </Box>
            <Dialog open={values.openDialog}>
                <DialogTitle>Welcome</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Successfully Logged in
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}