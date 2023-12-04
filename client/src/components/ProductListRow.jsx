import * as React from 'react';
import { Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom/cjs/react-router-dom';

function ProductListRow({ product }) {

  const listObjectStyle = {
    marginBottom: '10px',
  }

  const nameStyle = {
    fontSize: 30,
    marginTop: 3,
    marginBottom: 0,
    marginRight: 0
  }

  const emailStyle = {
    fontSize: 15,
    marginBottom: 3,
    marginTop: 3,
    color: 'gray'
  }

  return (
    <Card style={listObjectStyle}>
      <CardContent style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 1 }} >
        <img src={product.image} alt="" style={{ width: '200px', height: 'auto'  }} />
        <h5 style={nameStyle}>{product.model} - {product.year}</h5>
        <h6 style={emailStyle}>{product.fuelType}</h6>
      </CardContent>
    </Card>
  );
}
export default ProductListRow;