import { Typography } from '@material-ui/core';
import { useEffect, useState } from "react";
import React from 'react';
import NavigationBar from '../src/components/NavigationBar.jsx';
import {productList} from '../product/api-product.js';
import auth from '../auth/auth-helper';
import {Card, CardContent, Button } from '@material-ui/core'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';
import EditProduct from './EditProduct.jsx';


export default function ProductsList() {

  //Original State is Empty
  const [productData, setProductData] = useState([])

  const loggedIn = auth.tryToGetToken();
  useEffect(() => {
    if (loggedIn) {}

    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.tryToGetToken();
    const token = jwt.token;

    productList(token, signal).then((data) => {
        if (data && data.error) {
            console.log(data.error)
        } else {
            //Fill with obtained products
            setProductData(data.data.doc);
            console.log("data:", data.data.doc);
        }
    })
    return function cleanup() {
        abortController.abort()
    }
}, [])

const history = useHistory();
const handleEditProduct = (productId) => {
  // Redirect to the EditProduct component with the product ID
  history.push(`/editProduct/${productId}`);
};

const AddButton = {
  background: 'white',
  color: 'green',
  border: 1,
  borderColor: 'green',
  '&:hover': {
    backgroundColor: 'green',
    boxShadow: 'none',
    border: 1,
    color: 'white'
  }
}
  return (
    <>
      <Link to='/addProduct'>
        <Button style={AddButton}>Add a new Product</Button>
      </Link>
      <h6>Product List</h6>
      <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: "wrap"}} >
          {productData.map((product) => 
            <Card style={{marginTop: '2em', marginRight: '2em'}}>
              <CardContent style={{alignItems:'center', justifyContent:'center', padding:1}}>
                <h3>{product.name}</h3>
                
                <img src={product.image} alt="" style={{width:'300px', height: '250px'}}/>
                <h5>Model: {product.model}</h5>
                <h5>Year: {product.year}</h5>
                <h5>Mileage: {product.mileage}</h5>
                <h5>Fuel Type: {product.fuelType}</h5>
                <h5>Engine Size: {product.engineSize}</h5>
                <h5>Transmission: {product.transmission}</h5>
                <h5>Body Type: {product.bodyType}</h5>
                <h5>Color: {product.color}</h5>
                <h5>Description: {product.description}</h5>
              </CardContent>
              {/* <Link to='/editProduct'> */}
                <Button onClick={() => handleEditProduct(product._id)}>Edit Product</Button>
              {/* </Link> */}
            </Card>
          )}
      </div>
    </>
  )
}


// <ul style={listStyle}>
//   {productData.map((product) =>
//           <Card style={listObjectStyle}>
//           {/* <Link to={'/users/'+user._id}> */}
//           <CardContent style={{alignItems:'center', justifyContent:'center', textAlign:'center', padding:1}} >
//                 <h5>{product.name}</h5>
//                 <h6>{product.price}</h6>
//             </CardContent>
//           {/* </Link> */}
//         </Card> 
//   )}
// </ul>