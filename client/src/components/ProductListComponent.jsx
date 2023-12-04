import * as React from 'react';
import ProductListRow from './ProductListRow';


function ProductListComponent({productList}) {
    const listStyle = {
        listStyleType: 'none'
    };

    return (
        <ul style={listStyle}>
            {productList.map((product) =>
                <ProductListRow product={product} key={product._id}/>
            )}
        </ul>
    );
}
export default ProductListComponent;