import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router'

import{ Component } from "react";
import axiosInstance from "../../axiosApi";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: '#FFF'
    }
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      registered: false,
    };
  }

  registerUser= () => {
    var data = {
      password: this.state.password,
      username: this.state.username,
      email: this.state.email,
    }

    console.log(data);

    axiosInstance.create("accounts/auth/register/", data)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,

          registered: true,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  _handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  _handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  _handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.registered) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "/login" }} />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className="avatar">
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  onChange={this._handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this._handleEmailChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this._handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.registerUser}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(SignUp)
