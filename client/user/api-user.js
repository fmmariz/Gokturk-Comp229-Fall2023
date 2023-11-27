
const create = async (user) => {
    try {
        let response = await fetch('/api/v1/users/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  // Modified to also send authentication token of JWT
  const list = async (credentials, signal) => {
    try {
      let response = await fetch('/api/v1/users', {
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
  
  const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/v1/users/' + params, {
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
  
  const update = async (params, credentials, user) => {
    try {
      let response = await fetch('/api/v1/users/' + params, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/v1/users/' + params, {
        method: 'DELETE',
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
  
  // const stripeUpdate = async (params, credentials, auth_code, signal) => {
  //   try {
  //     let response = await fetch ('/api/stripe_auth/'+params.userId, {
  //       method: 'PUT',
  //       signal: signal,
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + credentials.t
  //       },
  //       body: JSON.stringify({stripe: auth_code})
  //     })
  //     return await response.json()
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }
  
  export {
    create,
    list,
    read,
    update,
    remove/*,
    stripeUpdate*/
  }
  