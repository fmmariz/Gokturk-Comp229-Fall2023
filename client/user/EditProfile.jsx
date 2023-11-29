import React from "react";
import { useState, useEffect } from "react";

import { read, update } from "./api-user";
import auth from "../auth/auth-helper";

import NavigationBar from "../src/components/NavigationBar";


import { Box, Button, Card, CardContent, TextField, Divider,
   Dialog ,DialogContent,DialogContentText,DialogTitle } from "@mui/material";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";

export default function EditProfile() {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const [show, setShow] = useState({
    showDialog: false,
    dialogTitle: '',
    dialogText: ''
  })

  const [page, setRedirect] = useState('')

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError : '',
    passwordConfirmError : ''
  })


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.isAuthenticated();
    const token = jwt.token;
    read(jwt.data.user._id, token, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUserData({
          name: data.data.doc.name,
          email: data.data.doc.email,
        });
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const clickUpdate = () => {
    const user = {
      name: userData.name || undefined,
      email: userData.email || undefined,
      password: userData.password || undefined,
      passwordConfirm: userData.passwordConfirm || undefined
    }

    console.log(user)
    if(!checkInfo()) return

    const jwt = auth.isAuthenticated();
    const token = jwt.token;
    const userId = jwt.data.user._id


    update(userId, token, user).then((data) => {
      if (data.error) {
        setShow({showDialog: true, dialogTitle:"Failed updating Profile",dialogText:"Try again later"})
        setTimeout(function() { //Start the timer
          setRedirect('/profile')
        }.bind(this), 2000)
      } else {
        setShow({showDialog: true, dialogTitle:"Profile Updated",dialogText:"Sending you back to profile"})
        setTimeout(function() { //Start the timer
          setRedirect('/profile')
        }.bind(this), 2000)
      }
    })
  }

  const checkInfo = () => {
    var isViable = true
    setErrors({nameError:'',emailError:'',passwordError:'', passwordConfirmError:''})
    var passwordString = '';
    var passwordConfirmString = '';
    var emailString = '';
    var nameString = '';
    if(userData.password != undefined && userData.password.length > 0 && userData.password.length < 8){
      passwordString = "Password needs to be at least 8 characters long";
      isViable = false;
    }
    if(userData.passwordConfirm != undefined && userData.passwordConfirm.length > 0 && userData.passwordConfirm.length < 8){
      passwordConfirmString = "Password needs to be at least 8 characters long";
      isViable = false;
    }
    if(userData.password != userData.passwordConfirm){
       passwordConfirmString = "Password does not match";
      isViable = false;
    }
    if(!userData.email.includes('@')){
      emailString = "Invalid E-mail";
      isViable = false;
    }
    if(userData.email != undefined && userData.email.length == 0){
      emailString = "Missing E-mail";
      isViable = false;
    }
    if(userData.name != undefined && userData.name.length == 0){
      nameString = "Missing Name";
      isViable = false;
    }
    setErrors({nameError:nameString, emailError:emailString,passwordError:passwordString,passwordConfirmError:passwordConfirmString });
    return isViable
  }

  if (page.length != 0) {
    return (<Redirect to={page}></Redirect>)
  }


  const handleChange = name => event => {
    setUserData({ ...userData, [name]: event.target.value })
  }

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

  const confirmButton = {
    background: 'orange',
    color: 'white',
    width: "100%",
    border: 1,
    borderColor: 'orange',
    '&:hover': {
      backgroundColor: 'darkorange',
      boxShadow: 'none',
      border: 1,
      borderColor:'darkorange',
      color: 'white'
    }
  }

  const backButton = {
    background: 'white',
    color: 'orange',
    width: "100%",
    border: 1,
    borderColor: 'orange',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
      border: 1,
      borderColor:'darkorange',
      color: 'darkorange'
    }
  }

  const dividerStyle = {
    marginTop:1,
    marginBottom:1
  }



  return (
    <>
      <NavigationBar />
      <Box sx={boxStyle}>
        <h1>Edit Profile Information</h1>
        <Card>
          <CardContent sx={cardStyle}>
          <Divider textAlign="left" sx={dividerStyle}>Update Name or Email</Divider>
            <TextField
              label='Name'
              value={userData.name}
              variant="outlined"
              onChange={handleChange('name')}
              error={errors.nameError != ''}
              helperText={errors.nameError}
              focused
            />
            <TextField
              label='Email'
              value={userData.email}
              sx={{marginTop:1}}

              variant="outlined"
              onChange={handleChange('email')}
              error={errors.emailError != ''}
              helperText={errors.emailError}
              focused
            />
            <Divider textAlign="left" sx={dividerStyle}>Update Password</Divider>
            <TextField 
            label='New Password' 
            variant="outlined"
            
            onChange={handleChange('password')}
            error={errors.passwordError != ''}
            helperText={errors.passwordError}
            >
            </TextField>
            <TextField 
              sx={{marginTop:1}}
    
            label='Confirm New Password' 
            onChange={handleChange('passwordConfirm')}
            error={errors.passwordConfirmError != ''}
            helperText={errors.passwordConfirmError}
            variant="outlined">
            </TextField>
          </CardContent>
          <Link to='./profile'><Button sx={backButton}>Return to Profile</Button></Link>
          <Button onClick={clickUpdate} sx={confirmButton}>Confirm Changes</Button>
        </Card>
        {show ?
          <Dialog open={show.showDialog}>
            <DialogTitle>
              {show.dialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {show.dialogText}
              </DialogContentText>
            </DialogContent>
          </Dialog> : <></>}
      </Box>
    </>
  );
}