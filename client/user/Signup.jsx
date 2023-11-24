import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import { create } from './api-user.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link } from 'react-router-dom'
import NavigationBar from '../src/components/NavigationBar.jsx'

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      passwordConfirm: values.confirmPassword || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', open: true })
      }
    })
  }
  return (<div>
    <NavigationBar />
    <Card >
      <CardContent>
        <Typography variant="h6" >
          Sign Up
        </Typography>
        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange('name')}
          margin="normal" /><br />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal" /><br />
        <TextField id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal" /><br />
        <TextField id="confirmPassword"
          type="password"
          label="Confirm your Password"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          margin="normal" /><br />

      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
    <Dialog open={values.open}>
      <DialogTitle>New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          New account successfully created.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link to="/signin">
          <Button color="primary" autoFocus="autoFocus" variant="contained">
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  </div>
  )
}