import { Typography } from '@material-ui/core';
import { useEffect, useState } from "react";
import React from 'react';
import NavigationBar from '../src/components/NavigationBar.jsx';
import {productList, createProduct} from '../product/api-product.js';
import auth from '../auth/auth-helper';
import {Card, CardContent, Button } from '@material-ui/core'
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";


export default function AddProduct() {
    const [name, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImageURL] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [fuelType, setFuelType] = useState("");
    const [engineSize, setEngineSize] = useState("");
    const [transmission, setTransmission] = useState("");
    const [bodyType, setBodyType] = useState("");
    const [color, setColor] = useState("");

    const [page, setRedirect] = useState('')


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

      const AddProductButton = async () => {
        const jwt = auth.tryToGetToken();
        const token = jwt.token;

        try{
          const newProduct = {
            name,
            price,
            description,
            image,
            make,
            model,
            year,
            mileage,
            fuelType,
            engineSize,
            transmission,
            bodyType,
            color,
          };
      
          console.log("new product", newProduct);
          // Call the createProduct function to add the new product
          const result = await createProduct(newProduct, token);
    
          console.log(result); 
          // Optionally, clear the form fields after successful addition
          setProductName("");
          setPrice("");
          setDescription("");
          setImageURL("");
          setMake("");
          setModel("");
          setYear("");
          setMileage("");
          setFuelType("");
          setEngineSize("");
          setTransmission("");
          setBodyType("");
          setColor("");
      
          setRedirect('/listproducts');
      
        } catch (error) {
          // Handle errors (you can show an error message)
          console.error("Error adding product:", error);
        }
      };

      if (page.length != 0) {
        return (<Redirect to={page}></Redirect>)
      }

  return (
    <>
      <h1>Add a new product</h1>
      <form >
        <label> Product name: <input type="text" name="productName" style={inputBox} value={name} onChange={(e) => {setProductName(e.target.value)}}/></label><br/>
        <label> Price: <input type="number" name="price" style={inputBox} value={price} onChange={(e) => {setPrice(e.target.value)}}/></label><br/>
        <label> Description: <input type="text" name="description" style={inputBox} value={description} onChange={(e) => {setDescription(e.target.value)}}/></label><br/>
        <label> Image URL: <input name="imageURL" style={inputBox} value={image} onChange={(e) => {setImageURL(e.target.value)}}/></label><br/>
        <label> Make: <input type="text" name="make" style={inputBox} value={make} onChange={(e) => {setMake(e.target.value)}}/></label><br/>
        <label> Model: <input type="text" name="model" style={inputBox} value={model} onChange={(e) => {setModel(e.target.value)}}/></label><br/>
        <label> Year: <input type="number" name="year" style={inputBox} value={year} onChange={(e) => {setYear(e.target.value)}}/></label><br/>
        <label> Mile age: <input type="number" name="mileage" style={inputBox} value={mileage} onChange={(e) => {setMileage(e.target.value)}}/></label><br/>
        <label> Fuel type: <input type="text" name="fuelType" style={inputBox} value={fuelType} onChange={(e) => {setFuelType(e.target.value)}}/></label><br/>
        <label> Engine size: <input type="text" name="engineSize" style={inputBox} value={engineSize} onChange={(e) => {setEngineSize(e.target.value)}}/></label><br/>
        <label> Transmission: <input type="text" name="transmission" style={inputBox} value={transmission} onChange={(e) => {setTransmission(e.target.value)}}/></label><br/>
        <label> Body type: <input type="text" name="bodyType" style={inputBox} value={bodyType} onChange={(e) => {setBodyType(e.target.value)}}/></label><br/>
        <label> Color: <input type="text" name="color" style={inputBox} value={color} onChange={(e) => {setColor(e.target.value)}}/>{}</label><br/>
        <Button style={AddButton} onClick={AddProductButton}>Add Product</Button>
      </form>
    </>
  )
}