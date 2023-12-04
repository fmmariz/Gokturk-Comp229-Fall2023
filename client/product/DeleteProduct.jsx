import React, { useEffect } from "react";
import { Box, CardContent, Card, Button, Dialog, DialogTitle, DialogContentText, DialogContent } from "@mui/material";
import NavigationBar from "../src/components/NavigationBar";
import auth from "../auth/auth-helper";
import { removeProduct } from "./api-product";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom/cjs/react-router-dom";


export default function DeleteProduct(props) {
    const productID = props.match.params.id;
    console.log("delete user id:", productID)

    const [show, setShow] = useState({
        showDialog: false,
        dialogTitle: '',
        dialogText: ''
      })
    
      const [page, setRedirect] = useState('')
    
      const clickDelete = () => {
        const jwt = auth.tryToGetToken();
        const token = jwt.token;
    
        removeProduct(productID, token).then((data) => {
          if (data.error) {
            setShow({ showDialog: true, dialogTitle: 'Failed Deleting the Product!', dialogText: 'Could not delete the product at the moment, try again later.' })
            setTimeout(function () { //Start the timer
              setRedirect('/')
            }.bind(this), 2000)
          } else {
            // auth.clearJWT();
            setShow({ showDialog: true, dialogTitle: 'Product Permanently Deleted', dialogText: 'Redirecting you back to the Home Page...' })
            setTimeout(function () { //Start the timer
              setRedirect('/')
            }.bind(this), 2000)
          }
        })
      }
    
      if (page !== '') {
        return <Redirect to={page} />;
      }
      
    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 3,
        marginTop: 20
      }
    
    
      const warningCardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        backgroundColor: 'white',
        textAlign: 'center'
      }
    
      const warningTextStyle = {
        color: 'red',
        fontFamily: 'bold',
        fontSize: 30
      }
    
      const warningSubTextStyle = {
        color: 'red',
        fontSize: 15
      }
    
      const warningButton = {
        background: 'white',
        color: 'red',
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 10,
        width: "100%",
        border: 5,
        borderColor: 'red',
        '&:hover': {
          backgroundColor: 'red',
          boxShadow: 'none',
          border: 5,
          color: 'white'
        }
      }
    
      const back2ProfileButton = {
        background: 'white',
        color: 'blue',
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 1,
        width: "100%",
        border: 5,
        borderColor: 'blue',
        '&:hover': {
          backgroundColor: 'blue',
          boxShadow: 'none',
          border: 5,
          color: 'white'
        }
      }
    return(
        <>
             <Box sx={boxStyle}>
        <Card>
          <CardContent sx={warningCardStyle}>
            <h1 style={warningTextStyle}>Are you sure you want to delete this product permanently?</h1>
            <h2 style={warningSubTextStyle}>This action CANNOT be undone later.</h2>

            <Link to="/listproducts">
              <Button sx={back2ProfileButton}>
                Return to Product List
              </Button>
            </Link>
            <Button sx={warningButton}
              onClick={clickDelete}>
              Yes, delete this product permanently.
            </Button>
          </CardContent>
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
    )
}

// export default DeleteProduct;