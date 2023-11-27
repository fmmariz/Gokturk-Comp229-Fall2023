import React from "react";
import { useState, useEffect } from "react";

import { read, update } from "./api-user";
import auth from "../auth/auth-helper";

import NavigationBar from "../src/components/NavigationBar";


import { Button, Card, CardActionArea, CardContent, TextField } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function EditProfile() {

    const [userData, setUserData] = useState({
        name : '',
        email : '',
        password : '',
        passwordConfirm : ''
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

    const clickUpdate = () => {
        const user = {
          name: userData.name || undefined,
          email: userData.email || undefined
        }
        
        const final = checkInfo(user)

        const jwt = auth.isAuthenticated();
        const token = jwt.token;
        const userId = jwt.data.user._id
        
        console.log(userId)
        console.log(token)
        console.log(user)
        update(userId, token, final).then((data) => {
          if (data.error) {
            // setValues({ ...values, error: data.error })
          } else {
            // setValues({ ...values, error: '', openDialog: true })
          }
        })
      }

      const checkInfo = (userInfo) =>{
        return userInfo
      }


    const handleChange = name => event => {
        setUserData({ ...userData, [name]: event.target.value })
      }
    
    return(
        <>
        <NavigationBar/>
        <Card>
            <CardContent>
                <TextField 
                label='Name' 
                value={userData.name} 
                variant="outlined"
                onChange={handleChange('name')}
                focused
                />
                <TextField 
                label='Email' 
                value={userData.email} 
                variant="outlined"
                onChange={handleChange('email')}
                focused
                />
                <TextField label='New Password' variant="outlined">

                </TextField>
                <TextField label='Confirm New Password' variant="outlined">

                </TextField>
            </CardContent>
                <Link to='./profile'><Button>Return to Profile</Button></Link>
                <Button onClick={clickUpdate}>Confirm Changes</Button>
        </Card>
        </>
    );
}