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
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import axiosInstance from "../../axiosApi";

const axiosComponentInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

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
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
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

  class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        profile: this.props.match.params.username,
      };
    }

    componentDidMount = (e) => {
      var data = {
        profile: this.state.profile,
      }

      var url = "accounts/auth/view/profile/" + data.profile;

      console.log(data);

      axiosInstance.get(url, data)
        .then(response => {
          this.setState({
            profile: response.data.user.username,
            email: response.data.user.email,
            posts: response.data.posts_made,
            school: response.data.school,
            image: response.data.image,
            role: response.data.role,
            fname: response.data.firstname,
            lname: response.data.lastname,
            field: response.data.field_study,
            about: response.data.about_me,
            component: [],
          });

          this.state.posts.forEach(component =>
              axiosComponentInstance.get('/components/', {params:{_id:component}})
              .then(component => {
                this.setState(prevState => ({
                  component: [...prevState.component, component.data]
                }))
                console.log(this.state.component);
              })
          )
        })
        .catch(e => {
          this.setState({
            login: false,
          });
          console.log(e);
        });
    }

    getPosts = (e) => {
      this.state.posts.forEach(component =>
          axiosComponentInstance.get('/components/', {params:{_id:component}})
          .then(component => {
            this.setState({
              component: component.data,
            });
            console.log(this.state.component);
          })
      )
    }

    handleViewComponent = (e) => {
      window.location.href = "/component/" + this.state.component[e.currentTarget.id]._id.$oid;
      e.preventDefault();
    }

    _handleContactMe = (e) => {
      var data = {
        subject: this.state.subject,
        message: this.state.body,
        to: this.state.email,
      }

      var token = "Token " + this.state.token;
      var url = "accounts/email/";

      axiosInstance.post(url, data, {
        headers: {
          'Authorization': token,
        }})
        .then(response => {
          this.setState({
            open: false,
          })
        })
        .catch(e => {
          console.log(e);
          this.setState({
            open: false,
          })
        });
    }
    _handleSubjectChange = (e) => {
        this.setState({
          subject: this.state.value,
        })
    }

    _handleBodyChange = (e) => {
        this.setState({
          body: this.state.value
        })
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


    static getDerivedStateFromProps(nextProps, prevState) {
       if (nextProps.match.params.username !== prevState.profile){
         return {
            profile: nextProps.match.params.username
          }
      }
      return null;
    }

    render() {
      const { classes } = this.props;
      const isStudent = (this.state.role == "s");
      const hasPost = (this.state.posts && this.state.posts.length > 0);
      const aboutNotBlank = (this.state.about !== 'null');
      const loggedIn = (localStorage.getItem('username') == this.state.profile);

      return (<Container component="main" maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item>
              <img src={this.state.image} alt="Profile Picture" width="250" height="250"></img>
            </Grid>
            <Grid item sm={3}>
              <Card>
                  <CardHeader
                  title = {this.state.fname + " " + this.state.lname + "\n(" + this.state.profile + ")"}
                  className={classes.cardHeader}
                  />
                <CardContent>
                  <div className={classes.cardContent}>
                    <List /*dense={dense}*/>
                      {isStudent ? (
                        <ListItem>
                          <Typography variant="body1"><b>Occupation:</b> Student</Typography>
                        </ListItem>
                      ) : (
                        <ListItem>
                          <Typography variant="body1"><b>Occupation:</b> Professor</Typography>
                        </ListItem>
                      )}
                      <ListItem>
                        <Typography variant="body1"><b>Location:</b> {this.state.school}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1">
                        {isStudent ? (<b>Major:</b>) : (<b>Field:</b>)}
                        {this.state.field}</Typography>
                      </ListItem>
                    </List>
                  </div>
                  </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="h3" className={classes.title}>Biography</Typography>
              {aboutNotBlank ? (
                <Typography variant="body1">{this.state.about}</Typography>
              ) : (
                <Typography variant="body1">This user does not have a bio</Typography>
              )}
            </Grid>
            {loggedIn ? (
            <Grid item sm={2}>
              <Button variant="contained" className={classes.button}>
                <Link href="/edit-profile" className={classes.button}>
                  {"Edit Profile"}
                </Link>
              </Button>
            </Grid>
            ) : (
            <Grid item sm={2}>
              <Button variant="contained" className={classes.button} onClick={this._handleOpen}>
                Contact me
              </Button>
            </Grid>)}
          </Grid>
          <Typography variant="h5" style={{paddingTop: 20}}>
            Posts Made
          </Typography>
          {hasPost ? (
            <Grid container spacing={3} style={{paddingTop: 20}}>
              {this.state.component.map((post, index) => (
                  <Grid item md={4}>
                  <Card>
                    <CardHeader
                      title={post.name}
                      titleTypographyProps={{ align: 'center' }}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardContent}>
                        <Typography variant="subtitle1">
                          <b>{post.name}</b>
                        </Typography>
                      </div>
                          <Typography variant="subtitle1" align="center">
                            Rating:
                            <Rating
                              name="read-only"
                              value={post.avg_rating}
                              precision={0.5}
                              readOnly
                            />
                          </Typography>
                          <Typography variant="subtitle1" align="center">
                            Manufacturer: {post.manufacture_name == undefined ? "N/A" : post.manufacture_name}
                          </Typography>
                          <Typography variant="subtitle1" align="center">
                            Price: {post.price == undefined ? "N/A" : "$ " + post.price}
                          </Typography>
                          <Typography variant="subtitle1" align="center">
                            Hardware Category: {post.category == undefined ? "N/A" : post.category}
                          </Typography>
                          <Button  id={index} align="center" variant="contained" color="primary" onClick={this.handleViewComponent}>
                            View
                          </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (

            <Typography variant="h5" style={{paddingTop: 20}}>
            No posts yet
          </Typography>)
          }
        </div>
        <Modal
          open={this.state.open}
          onClose={this._handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Contact user</h2>
          <p id="simple-modal-description">
            Send this user an email
          </p>
          <form className={classes.form} onSubmit={this._handleContactMe}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="subject"
            label="Subject"
            type="subject"
            id="subject"
            onChange={this._handleSubjectChange}
          />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="body"
              label="Body"
              type="body"
              id="body"
              multiline
              onChange={this._handleBodyChange}
            />
            </form>
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
                  color="primary"
                  className={classes.submit}
                  onClick={this._handleContactMe}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Container>);
    }
  }

  export default withStyles(useStyles)(Profile)
