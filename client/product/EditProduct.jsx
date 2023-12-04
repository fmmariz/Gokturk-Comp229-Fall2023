// EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { updateProduct, productList, readProduct } from '../product/api-product';
import auth from '../auth/auth-helper';
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";

const EditProduct = (props) => {
//   console.log('props:', props.match.params.id);

  const productID = props.match.params.id;
//   const { productId } = useParams();
//   const [data, setProductData] = useState("");
  const [page, setRedirect] = useState('')
  const [product, setProduct] = useState({
    name: '',
    model: '',
    year: 0,
    price: 0,
    mileage: 0,
    fuelType: '',
    engineSize: '',
    transmission: '',
    bodyType: '',
    color: '',
    description: '',
  });

  const jwt = auth.tryToGetToken();
  const token = jwt.token;


  const loggedIn = auth.tryToGetToken();
  useEffect(() => {
    if (loggedIn) {}

    const abortController = new AbortController()
    const signal = abortController.signal
    const jwt = auth.tryToGetToken();
    const token = jwt.token;

    readProduct(productID, token, signal).then((data) => {
        if (data && data.error) {
            console.log("read data error:", data.error)
        } else {
            //Fill with obtained products
            setProduct(data.data.doc);
            console.log("data:", data);
        }
    })
    return function cleanup() {
        abortController.abort()
    }
}, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

  const handleUpdate = () => {
    updateProduct(productID, token, product).then((data) => {
      if (data && data.error) {
        console.log('data.error',data.error);
      } else {
        console.log('Product updated successfully!!!');
        setRedirect('/listproducts');
      }
    });
  };

  if (page.length != 0) {
    return (<Redirect to={page}></Redirect>)
  }

  const history = useHistory();
  const handleCancel = () => {
    history.push('/productsList'); 
  };

  const inputBox = {
    padding: '7px', 
    dislay: 'block', 
    border: '1px solid skyblue', 
    width: '300px', 
    margin: '20px'
}

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
    <div>
      <h2>Edit Product</h2>
      <form >
        <label> Product name: <input type="text" name="name" style={inputBox} value={product.name} onChange={handleChange}/></label><br/>
        <label> Price: <input type="number" name="price" style={inputBox} value={product.price} onChange={handleChange}/></label><br/>
        <label> Description: <input type="text" name="description" style={inputBox} value={product.description} onChange={handleChange}/></label><br/>
        <label> Image URL: <input name="image" style={inputBox} value={product.image} onChange={handleChange}/></label><br/>
        <label> Make: <input type="text" name="make" style={inputBox} value={product.make} onChange={handleChange}/></label><br/>
        <label> Model: <input type="text" name="model" style={inputBox} value={product.model} onChange={handleChange}/></label><br/>
        <label> Year: <input type="number" name="year" style={inputBox} value={product.year} onChange={handleChange}/></label><br/>
        <label> Mile age: <input type="number" name="mileage" style={inputBox} value={product.mileage} onChange={handleChange}/></label><br/>
        <label> Fuel type: <input type="text" name="fuelType" style={inputBox} value={product.fuelType} onChange={handleChange}/></label><br/>
        <label> Engine size: <input type="text" name="engineSize" style={inputBox} value={product.engineSize} onChange={handleChange}/></label><br/>
        <label> Transmission: <input type="text" name="transmission" style={inputBox} value={product.transmission}onChange={handleChange}/></label><br/>
        <label> Body type: <input type="text" name="bodyType" style={inputBox} value={product.bodyType} onChange={handleChange}/></label><br/>
        <label> Color: <input type="text" name="color" style={inputBox} value={product.color} onChange={handleChange}/>{}</label><br/>
        <Button style={AddButton} onClick={handleUpdate} >Update Product</Button>
      </form>
    </div>
  );
};

export default EditProduct;
