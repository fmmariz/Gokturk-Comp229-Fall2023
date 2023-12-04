// EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { updateProduct, productList } from '../product/api-product';
import auth from '../auth/auth-helper';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    engineSize: '',
    transmission: '',
    bodyType: '',
    color: '',
    description: '',
  });

  const jwt = auth.tryToGetToken();
  const token = jwt.token;

  console.log("prodcut id -------:",productId )

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProduct = async () => {
      try {
        let response = await fetch(`/api/v1/products/${productId}`, {
          method: 'GET',
          signal: signal,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        let data = await response.json();
        if (data && data.error) {
          console.log('data error',data.error);
        } else {
          setProduct("existing data", data.data.doc); 
        }
      } catch (err) {
        console.log('error:',err);
      }
    };

    fetchProduct();

    return function cleanup() {
      abortController.abort();
    };
  }, [productId, token]);

  const handleChange = (name) => (event) => {
    setProduct({ ...product, [name]: event.target.value });
  };

  const handleUpdate = () => {
    updateProduct(productId, token, product).then((data) => {
      if (data && data.error) {
        console.log('data.error',data.error);
      } else {
        console.log('Product updated successfully!!!');
      }
    });
  };

  const history = useHistory();
  const handleCancel = () => {
    history.push('/productsList'); 
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form>
        <TextField
          label="Name"
          value={product.name}
          onChange={handleChange('name')}
          fullWidth
        />
        <TextField
          label="Model"
          value={product.model}
          onChange={handleChange('model')}
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Product
        </Button>
        <Button variant="contained" color="default" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
