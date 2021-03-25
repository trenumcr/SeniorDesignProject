import React from 'react';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Modal from '@material-ui/core/Modal';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { withStyles } from '@material-ui/core/styles';
import axiosInstance from "../../axiosApi";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardHeader: {
    backgroundColor: theme.palette.secondary.light,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(2),
  },
  button: {
    background: theme.palette.primary.light,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.primary.main,
    }
  },
  title: {
    paddingBottom: "20px",
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

  class EditProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        edited: false,
        deleted: false,
        match: true,
      };
    }

    componentDidMount = (e) => {
      var token = "Token " + this.state.token;
      var url = "accounts/auth/user/profile/" + this.state.username;

      axiosInstance.get(url, {
        headers: {
          'Authorization': token
        }}
      ).then(response => {
          this.setState({
            school: response.data.school,
            role: response.data.role,
            field: response.data.field_study,
            about: response.data.about_me,
            image: response.data.image,
            role: response.data.role,
            fname: response.data.firstname,
            lname: response.data.lastname,
            isUser: true,
          });
          if (this.state.about == 'null') {
            this.setState({
              about: '',
            });
          }
          console.log(this.state.token)
        })
        .catch(e => {
          this.setState({
            isUser: false,
          });
            console.log(e);
        });
    }

    submitChanges = (e) => {
      e.preventDefault();

      let data = new FormData();
      if (this.state.uploadedImage !== undefined) {
        data.append('image', this.state.uploadedImage, this.state.uploadedImage.name);
        data.append('school', this.state.school);
        data.append('field_study', this.state.field);
        data.append('role', this.state.role);
        data.append('lastname', this.state.lname);
        data.append('firstname', this.state.fname);
              console.log("Not undefined" + data);
      }
      else {
          data.append('school', this.state.school);
          data.append('field_study', this.state.field);
          data.append('role', this.state.role);
          data.append('lastname', this.state.lname);
          data.append('firstname', this.state.fname);
                console.log(data);
      }

      if (this.state.about !== undefined && this.state.about !== "") {
        data.append('about_me', this.state.about);
              console.log("Not undefined" + data);
      }
      else {
        data.append('about_me', null);
              console.log(data);
      }

      console.log(data);
      var url = "accounts/auth/user/profile/" + this.state.username +"/";
      var token = "Token " + this.state.token;

      axiosInstance.patch(url, data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        }})
        .then(response => {
          this.setState({
            edited: true,
          });
          window.location.reload(false);
                console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    deleteAccount = (e) => {
      var url = "accounts/auth/user/";
      var token = "Token " + this.state.token;

      axiosInstance.delete(url, {
        headers: {
          'Authorization': token
        }})
        .then(response => {
          this.setState({
            deleted: true,
          });
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          window.location.reload(false);
        })
        .catch(e => {
          console.log(e);
        });

        axiosInstance.delete(url, {
          headers: {
            'Authorization': token
          }})
          .then(response => {
            this.setState({
              deleted: true,
            });
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.reload(false);
          })
          .catch(e => {
            console.log(e);
          });
    }

    _handleSchoolChange = (e) => {
      this.setState({
        school: e.target.value
      });
    }

    _handleAboutMeChange = (e) => {
      this.setState({
        about: e.target.value
      });
    }

    _handleFieldChange = (e) => {
      this.setState({
        field: e.target.value
      });
    }

    _handleRoleChange = (e) => {
      console.log(e.target.value)
      this.setState({
        role: e.target.value
      });
      console.log(this.state.fname);
    }

    _handleLnameChange = (e) => {
      console.log(e.target.value)
      this.setState({
        lname: e.target.value
      });
      console.log(this.state.lname);
    }

    _handleFnameChange = (e) => {
      this.setState({
        fname: e.target.value
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

    _handlePasswordUpdate = (e) => {
      if (this.state.new_password1 == this.state.new_password2) {
        var data = {
          old_password: this.state.old_password,
          new_password: this.state.new_password1,
        }

        var url = 'accounts/auth/change-password/';
        var token = "Token " + this.state.token;

        axiosInstance.patch(url, data, {
          headers: {
            'Authorization': token
        }})
        .then(response => {
          this.setState({
            done: true,
          });
          window.location.reload(false);
        })
        .catch(e => {
          this.setState({
            match: false,
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

    _handlePasswordOpen = (e) => {
      this.setState({
        password_open: true,
      })
    }

    _handlePasswordClose = (e) => {
        this.setState({
          password_open: false,
        })
    }

    _handlePasswordMatchOpen = (e) => {
      this.setState({
        passwordmatch_open: true,
        match: true,
      })
    }

    _handlePasswordMatchClose = (e) => {
        this.setState({
          passwordmatch_open: false,
          match: true,
        })
    }

    _handleOldPasswordChange = (e) => {
      this.setState({
        old_password: e.target.value,
        match: true,
      })
    }

    _handleNewPassword1Change = (e) => {
      this.setState({
        new_password1: e.target.value,
        match: true,
      })
    }

    _handleNewPassword2Change = (e) => {
      this.setState({
        new_password2: e.target.value,
        match: true,
      })
    }

    _handleImageChange = (e) => {
      this.setState({
        uploadedImage: e.target.files[0]
      });
    }

    render() {
      const { classes } = this.props;
      const isStudent = (this.state.role == "s");
      const passwordMatch = (this.state.match);

      if (!this.state.isUser) {
        return (<Typography variant="h4" style={{padding: '20px'}}>Please login to edit your profile</Typography>)
      }

      if (this.state.edited) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/profile/" + this.state.username }} />;
      }

      if (this.state.deleted) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/" }} />;
      }

        return (
          <Container component="main" maxWidth="lg">
          <form className={classes.form} onSubmit={this.login}>
            <div className={classes.root}>
            <Grid container spacing={3} sm={12}>
              <Grid container spacing={3} sm={12} md={5} direction="row">
                <Grid item sm={12}>
                  <img src={this.state.image} alt="Profile Picture" width="250" height="250"></img>
                </Grid>
                <Grid item sm={12}>
                  <label for="myfile"><Typography variant="body1">Upload a new profile picture:</Typography></label>
                  <input type="file" id="myfile" name="myfile" onClick={(e) =>{e.target.value = ''}} onChange={this._handleImageChange}/>
                </Grid>
                <Grid item sm={6}>
                  <InputLabel htmlFor="filled-age-native-simple">Occupation</InputLabel>
                  <Select
                    native
                    value={this.state.role}
                    onChange={this._handleRoleChange}
                  >
                    <option aria-label="None" value="s">Student</option>
                    <option aria-label="None" value="p">Professor</option>
                  </Select>
                </Grid>
                <Grid item sm={11}>
                  <Typography variant="h3" className={classes.title}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="about"
                      value={this.state.about}
                      name="about"
                      label="Biography"
                      onChange={this._handleAboutMeChange}
                    />
                  </Typography>
                </Grid>
                <Grid item sm={5}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{background: "#918455", color: "#FFF"}}
                    className={classes.submit}
                    onClick={this._handleOpen}
                  >
                    Delete Account
                  </Button>
                </Grid>
                <Grid item sm={5}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this._handlePasswordOpen}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={3} sm={12} md={6}>
                <Grid item sm={12}>
                  <Card>
                    <CardHeader style={{paddingLeft: "50px"}}
                      title = {"Username: " + this.state.username}
                      className={classes.cardHeader}
                      />
                    <CardContent>
                      <div className={classes.cardContent}>
                        <List>
                        <ListItem>
                          <Typography variant="body1"><b>First name:</b>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fname"
                            value={this.state.fname}
                            name="fname"
                            autoFocus
                            onChange={this._handleFnameChange}
                          />
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1"><b>Last name:</b>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lname"
                            value={this.state.lname}
                            name="lname"
                            autoFocus
                            onChange={this._handleLnameChange}
                          />
                          </Typography>
                        </ListItem>
                          <ListItem>
                            <Typography variant="body1"><b>Location:</b>
                            <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="school"
                              value={this.state.school}
                              name="school"
                              autoFocus
                              onChange={this._handleSchoolChange}
                            />
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography variant="body1">
                            {isStudent ? (<b>Major:</b>) : (<b>Field:</b>)}
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="major"
                                value={this.state.field}
                                name="major"
                                autoFocus
                                onChange={this._handleFieldChange}
                              />
                            </Typography>
                          </ListItem>
                        </List>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={3} sm={10}  direction="row" justify="flex-end" alignItems="flex-end">
                <Grid item sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{background: "#668f72", color: "#FFF", marginTop: "20px"}}
                    color="primary"
                    className={classes.submit}
                    onClick={this.submitChanges}
                  >
                    Submit Profile Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            </div>
            </form>
            <div>
              <Modal
                open={this.state.open}
                onClose={this._handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div className={classes.modal}>
                  <Typography variant="h4" id="simple-modal-title">Delete account?</Typography>
                  <Typography variant="body1" style={{paddingBottom: "20px"}} id="simple-modal-description">
                    Clicking confirm will permanently delete your account.
                  </Typography>
                  <Grid container sm={12} spacing={3}>
                  <Grid item sm={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this._handleClose}
                    >
                      Cancel
                    </Button>
                    </Grid>
                    <Grid item sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        style={{background: "#918455", color: "#FFF"}}
                        color="primary"
                        className={classes.submit}
                        onClick={this.deleteAccount}
                      >
                        Confirm
                      </Button>
                      </Grid>
                      </Grid>
                </div>
              </Modal>
            </div>
            <div>
              <Modal
                open={this.state.password_open}
                onClose={this._handlePasswordClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
              <div className={classes.modal}>
                <Typography variant="h4" id="simple-modal-title">Change Password</Typography>
                <form className={classes.form} onSubmit={this._handlePasswordUpdate}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="old_password"
                    label="Current password"
                    type="password"
                    id="oldPassword"
                    onChange={this._handleOldPasswordChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="new_password1"
                    label="New password"
                    id="newPassword1"
                    onChange={this._handleNewPassword1Change}
                  />
                  <TextField
                    style={{paddingBottom: "20px"}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="new_password2"
                    label="Re-enter new password"
                    type="email"
                    id="newPassword2"
                    onChange={this._handleNewPassword2Change}
                  />
                </form>
                <Grid container sm={12} spacing={3}>
                  <Grid item sm={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this._handlePasswordClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this._handlePasswordUpdate}
                    >
                      Reset password
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Modal>
            <Modal
              open={!this.state.match}
              onClose={this._handlePasswordMatchClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.modal}>
                <Typography>Incorrect current password or new passwords do not match</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this._handlePasswordMatchClose}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </div>
        </Container>);
      }
    }

  export default withStyles(useStyles)(EditProfile)
