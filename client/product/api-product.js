const productList = async (credentials, signal) => {
    try {
      let response = await fetch('/api/v1/products', {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const createProduct = async (product, credentials) => {
    try {
        let response = await fetch('/api/v1/products', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + credentials
          },
          body: JSON.stringify(product)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const updateProduct = async (params, credentials, product) => {
    try {
      let response = await fetch('/api/v1/products/' + params, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials
        },
        body: JSON.stringify(product)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const readProduct = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/v1/products/' + params, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  export { productList, createProduct, updateProduct, readProduct };