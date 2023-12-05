import React, { useState } from 'react'
import {Card, CardActions, CardContent,
  Button, TextField,Dialog, DialogActions,
DialogContent,DialogContentText,DialogTitle,
Box} from '@mui/material'
import { create } from '../user/api-user.js'
import { signin } from './api-auth.js'
import auth from './auth-helper.js'

import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js'

export default function SignUp({changeLogStatus}) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    openDialog: false,
    error: '',
    redirect: false
  })

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError : '',
    passwordConfirmError : '',
    networkError : ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      passwordConfirm: values.passwordConfirm || undefined,
    }
    console.log(user);

    if(values.password.length > 0 && values.password.length < 8){
      setErrors({...errors, passwordError: "Password must be at least 8 characters long"})
    }
    if(values.passwordConfirm.length >0 && values.passwordConfirm.length <8){
      setErrors({...errors, passwordConfirmError: "Password must be at least 8 characters long"})
    }
    if(values.password != values.passwordConfirm){
      setErrors({...errors, passwordConfirmError: "Passwords do not match", passWordError: "Passwords do not match"})
    }
    if(values.email.length == 0){
      setErrors({...errors, emailError: "Invalid email"})
    }
    if(values.name.length == 0){
      setErrors({... errors, nameError: "Missing name"})
    }
    
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', openDialog: true })
        signin(user).then((data) => {
          if (data.error) {
              setValues({ ...values, error: data.error });
          } else {
            changeLogStatus(true)
              auth.authenticate(data, () => {
                setTimeout(function() { //Start the timer
                  setValues({...values, redirect: true})
                }.bind(this), 2000)
              })
          }
        });

      }
    })
  }

  document.title = "GOKTURKS - Sign Up"

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

  const textField = {
    marginTop: 1,
    marginBottom: 1,
    color: "orange",
  }

  const buttons = {
    marginTop: 3,
    backgroundColor: 'black',
    color: 'white',
    fontSize: 17,
    paddingLeft: 50,
    paddingRight: 50,
    '&:hover': {
      backgroundColor: 'black',
      boxShadow: 'none',
      borderColor: 'white',
      color: 'orange'
    }
  }
  const smallBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2
  }
  const smallButtonStyle = {
    color: 'white',
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 2,
    fontSize: 15,
    fontFamily: 'bold',
    backgroundColor: 'black',
    marginTop: 2,
    '&:hover': {
      backgroundColor: 'black',
      boxShadow: 'none',
      borderColor: 'white',
      color: 'orange'
    }
  }

  const goldenTitle = {
    mr: 2,
    color: 'orange',
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'sans-serif',
    fontWeight: 700,
    fontSize: 40,
    textAlign: 'Left',
    letterSpacing: '.3rem',
    textDecoration: 'none',
  }

  

  if(values.redirect){
    return(<Redirect to='/'></Redirect>)
  }

  return (<div>
    <Box sx={boxStyle}>
      <h1 style={goldenTitle}>Sign Up</h1>
      <Card >
        <CardContent style={cardStyle}>
          <TextField style={textField}
            id="name"
            label="Name"
            variant='outlined'
            error={errors.nameError.length > 0}
            helperText={errors.nameError}

            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          /><br />
          <TextField style={textField}
            id="email"
            variant='outlined'
            type="email"
            label="Email"
            error={errors.emailError.length > 0}
            helperText={errors.emailError}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal" /><br />
          <TextField style={textField}
            variant='outlined'
            id="password"
            type="password"
            label="Password"
            error={errors.passwordError.length > 0}
            helperText={errors.passwordError}

            value={values.password}
            onChange={handleChange('password')}
            margin="normal" /><br />
          <TextField style={textField}
            id="passwordConfirm"
            type="password"
            variant='outlined'
            label="Confirm your Password"
            error={errors.passwordConfirmError.length > 0}
            helperText={errors.passwordConfirmError}

            value={values.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
            margin="normal" /><br />
        </CardContent>
        <CardActions style={{ alignItems: 'center', justifyContent: 'center', marginBottom:20 }}>
          <Button style={buttons}
            variant='contained'
            onClick={clickSubmit}>
            Create Account
          </Button>
        </CardActions>
      </Card>
      <Box sx={smallBoxStyle}>
        <div style={{ textAlign: 'match-parent' }}>
          Already a member? Then </div>
        <Button
         component={Link} 
         to={'/signin'} 
         style={smallButtonStyle} 
         variant='outlined'>SIGN IN</Button>

      </Box>
      <Dialog open={values.openDialog}>
        <DialogTitle>
          Account successfully created, enjoy your time in Gokturk!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </Box>

  </div>
  )
}