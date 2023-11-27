import React from 'react';
import NavigationBar from '../src/components/NavigationBar';
import { Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


export default function Home() {
    document.title = "Welcome to Gokturks"

    let [toPage,redirectToPage] = useState('');

    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 3
    }
    const smallBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:2,
        marginLeft:2,
        marginRight:2
    }

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    }

    const buttons = {
        marginTop: 3,
        color:'black',
        padding:5,
        marginBottom: 2,
        fontSize: 50,
        fontFamily: 'bold',

        backgroundColor: 'orange',
        '&:hover': {
            backgroundColor: 'black',
            boxShadow: 'none',
            borderColor: 'white',
            borderWidth: 'thick',
            color: 'orange'
        }
    }
    const smallButtonStyle = {
        color:'orange',
        padding:2,
        marginBottom: 2,
        fontSize: 15,
        fontFamily: 'bold',
        borderColor: 'orange',
        marginTop:2,

        '&:hover': {
            borderColor: 'orange',
            backgroundColor: 'orange',
            color: 'black'
        }
    }


    const goldenTitle = {
        mr: 2,
        color: 'orange',
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'sans-serif',
        fontWeight: 700,
        fontSize: 50,
        textAlign: 'Left',
        letterSpacing: '.3rem',
        textDecoration: 'none',
    }

    const openSignUpPage = () => {
        redirectToPage('/signup')
    }

    const openSignInPage = () => {
        redirectToPage('/signin')
    }

    if(toPage.length > 0){
        return (<Redirect to={toPage}/>)
    }

    return (<>
        <NavigationBar />
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box sx={boxStyle}>
                    <CardContent sx={cardStyle}>
                        <Typography style={goldenTitle}
                        >
                            Welcome to Gokturks
                        </Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae egestas lorem, nec sagittis velit. Proin ligula dui, tincidunt non dolor in, rutrum placerat metus. Mauris venenatis, nibh ac efficitur ultrices, neque felis pellentesque ante, vitae elementum velit ipsum ac ipsum. Nunc sed diam eget nunc cursus cursus et nec enim. In elementum quam ac commodo scelerisque. Duis neque sapien, pharetra non eros sit amet, consequat sagittis lacus. Sed ultrices felis nunc, non hendrerit diam tincidunt vitae. Pellentesque magna sem, aliquam vitae ornare eget, fringilla vitae elit. Maecenas feugiat pellentesque dui, at accumsan metus volutpat non. Ut in mi nisl. Etiam ut nibh et mauris facilisis aliquam. Integer congue dolor nibh, ultrices pellentesque nisi elementum sed. <br />

     
                            
                        </Typography>

                    </CardContent>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={boxStyle}>
                    <Button sx={buttons} onClick={openSignUpPage}>JOIN NOW</Button>
                    <Box sx={smallBoxStyle}>
                        <Typography  style={{textAlign:'match-parent'}}>
                            Already a member? Then </Typography>
                    <Button onClick={openSignInPage} sx={smallButtonStyle} variant='outlined' >
                        SIGN IN
                        </Button>

                    </Box>
                </Box>

            </Grid>

        </Grid>
    </>
    );
}