import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import{ Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: '#FFF'
    },
  },
  modal: {
    position: 'absolute',
    width: 400,
    background: theme.palette.common.white,
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});


class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
    }
  }

  _handleSubmit = (e) => {
    console.log(this.state);
    if (this.state.password1 == this.state.password2) {
      var data = {
        password: this.state.password1,
        token: this.state.token,
      }

      var url = 'accounts/auth/password_reset/confirm/';

      axiosInstance.post(url, data)
        .then(response => {
          this.setState({
            done: true,
          });
          window.location.reload(false);
        })
        .catch(e => {
          this.setState({
            login: false,
          });
          console.log(this.state.token + " " + this.state.login);
          console.log(e);
        });
      }
      else {
        this.setState({
          match: false,
        });
      }
  }

  _handlePassword1Change = (e) => {
    this.setState({
      password1: e.target.value,
      match: true,
    })
  }

  _handlePassword2Change = (e) => {
    this.setState({
      password2: e.target.value,
      match: true,
    })
  }

  render() {
    const { classes } = this.props;

    if (this.state.done) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "login/" }} />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <form className={classes.form} onSubmit={this.login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={this._handlePassword1Change}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Re-enter password"
              type="password"
              onChange={this._handlePassword2Change}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this._handleSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(PasswordReset)
