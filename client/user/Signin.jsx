import React from 'react';
import { useState } from 'react';
import NavigationBar from '../src/components/NavigationBar';
import Card from '@material-ui/core/Card';
import { Box, Button, CardContent, TextField, Typography } from '@mui/material';
import gokturkLogo from './../assets/images/gokturk_logo.jpg';


export default function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
        marginBottom: 1
    }

    const buttons = {
        marginTop: 3
    }

    return (
        <>
            <NavigationBar />
            <Box sx={boxStyle} >
                <Card>
                    <CardContent sx={cardStyle}>
                    <img src={gokturkLogo} 
                    alt="GOKTURK Logo"
                    style={{
                        maxWidth:"50%"}}/>
                        <TextField sx={textField} placeholder='E-mail'>

                        </TextField >
                        <TextField sx={textField} placeholder='Password'>

                        </TextField>
                        <Button sx={buttons}
                        variant="contained">
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
                <Typography sx={{ marginTop: 3 }}>
                    Don't have an account? Then
                </Typography>
                <Button sx={buttons}
                variant="contained">
                    Sign Up Now !
                </Button>
            </Box>

        </>
    );
}