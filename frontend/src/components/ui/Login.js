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
import{ Component } from "react";
import axiosInstance from "../../axiosApi";
import { Redirect } from 'react-router';
import Modal from '@material-ui/core/Modal';

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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      login: false,
      open: false,
      loginMessage: "",
    };
  }

  login = () => {
    var data = {
      password: this.state.password,
      username: this.state.username,
    }

    axiosInstance.post("accounts/auth/login/", data)
      .then(response => {
        this.setState({
          token: response.data.token,
          login: true,
        });
        localStorage.setItem('token', this.state.token)
        localStorage.setItem('username', this.state.username)
        console.log(this.state.token + " " + this.state.login);

        window.location.reload(false);
      })
      .catch(e => {
        this.setState({
          login: false,
          loginMessage: "*Incorrect username/password",
        });
        console.log(this.state.token + " " + this.state.login);
        console.log(e);
      });
  }

  _handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  _handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  _handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  _handlePasswordReset = (e) => {
    var data = {
      email: this.state.email,
    }

    var url = 'accounts/auth/password_reset/';

    axiosInstance.post(url, data)
      .then(response => {
        this.setState({

        });

        console.log(this.state.token + " " + this.state.login);
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

  _handleOpen = (e) => {
    this.setState({
      open: true,
    })
  }

  _handleClose = (e) => {
      this.setState({
        open: false,
      })
  }

  render() {
    const { classes } = this.props;

    if (this.state.login) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "/" }} />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography style={{ color: "#FF0000" }}>
            { this.state.loginMessage }
          </Typography>
          <form className={classes.form} onSubmit={this.login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={this._handleUsernameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this._handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={this._handleOpen} variant="body2">
                  Forgot password?
                </Link>

              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>

          <Modal
            open={this.state.open}
            onClose={this._handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
          <div className={classes.modal}>
            <h2 id="simple-modal-title">Reset password</h2>
            <p id="simple-modal-description">
              Enter the email address associated with your account and a link to reset your password will be sent to you.
            </p>
            <form className={classes.form} onSubmit={this._handlePasswordReset}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                onChange={this._handleEmailChange}
              />
              </form>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this._handlePasswordReset}
              >
                Reset password
              </Button>
            </div>
          </Modal>

        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(Login)
