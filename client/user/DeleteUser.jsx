
import React, { useEffect } from "react";
import { CardContent } from "@mui/material";
import NavigationBar from "../src/components/NavigationBar";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";

import {Card, Button} from "@mui/material";

export default function DeleteUser() {

    const clickDelete = () => {
        const jwt = auth.isAuthenticated();
        const token = jwt.token;
        const userId = jwt.data.user._id

        remove(userId, token).then((data) => {
          if (data.error) {
            // setValues({ ...values, error: data.error })
          } else {
            console.log(jwt.data.user.name+" account successfully deleted");
            auth.clearJWT();
            // setValues({ ...values, error: '', openDialog: true })
          }
        })
      }

    return (
        <>
        <NavigationBar/>
        <Card>
            <CardContent sx={{background:'red'}}>
                <h1 style={{color:'white', fontFamily:'bold'}}>Are you sure you want to delete your account permanently?</h1>
                <Button sx={{background:'white', color:'red'}}
                onClick={clickDelete}>
                    Yes, delete my account permanently.
                    </Button>
            </CardContent>
        </Card>
        </>
    )
}