// Similar to the ones provided within the slides of WEEK 9 
const signin = async (user) => {
    try {
        let response = await fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)

    }
}

const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {signin, signout};