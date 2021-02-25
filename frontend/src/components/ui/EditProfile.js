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
import { Redirect } from 'react-router'

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
});

  var posts = [
    {
    componentName: "IC Chip A",
    rating: "5/10",
    comment: "Had issues with A on..."
    },
    {
      componentName: "IC Chip B",
      rating: "5/10",
      comment: "Had issues with B on..."
    },
    {
      componentName: "IC Chip C",
      rating: "5/10",
      comment: "Had issues with C on..."
    },
  ]

  class EditProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        edited: false,
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
            isUser: true,
          });
          console.log(this.state.username);
        })
        .catch(e => {
          this.setState({
          isUser: false,
          });
          console.log(e);
        });
    }

    submitChanges = () => {
      var data = {
        school: this.state.school,
        field_study: this.state.field,
        about_me: this.state.about,
        role: this.state.role,
      }

      var url = "accounts/auth/user/profile/" + this.state.username +"/";
      var token = "Token " + this.state.token;
      console.log(token);
      console.log(data);
      console.log(url);

      axiosInstance.patch(url, data, {
        headers: {
          'Authorization': token
        }})
        .then(response => {
          this.setState({
            edited: true,
          });
          window.location.reload(false);
        })
        .catch(e => {
          console.log(e);
        });
    }

    deleteAccount = (e) => {
      //not done yet
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
      this.setState({
        role: e.target.value
      });
    }

    render() {
      const { classes } = this.props;
      const isStudent = (this.state.role == "s");
      console.log(this.state);

      if (!this.state.isUser) {
        return (<Typography>Please login to edit your profile</Typography>)
      }

      if (this.state.edited) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/profile/" + this.state.username }} />;
      }

        return (
          <Container component="main" maxWidth="lg">
          <form className={classes.form} onSubmit={this.login}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item>
                  <img src="https://3.bp.blogspot.com/-DVs1Ugx8LDQ/Uhx6Ol5NrRI/AAAAAAAAX9k/JPfLOUDRPgg/s1600/Mountains+Wallpapers.jpg" alt="Profile Picture" width="250" height="250"></img>
                </Grid>
              <Grid item sm={3}>
                <Card>
                    <CardHeader
                    title = {this.state.profile}
                    className={classes.cardHeader}
                    />
                  <CardContent>
                    <div className={classes.cardContent}>
                      <List>
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
              <Grid item sm={6}>
                <Typography variant="h3" className={classes.title}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="about"
                    value={this.state.about}
                    name="about"
                    autoFocus
                    onChange={this._handleAboutMeChange}
                  />
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <InputLabel htmlFor="filled-age-native-simple">University</InputLabel>
                <Select
                  native
                  value={this.state.role}
                  onChange={this._handleRoleChange}
                >
                  <option aria-label="None" value="s">Student</option>
                  <option aria-label="None" value="p">Professor</option>
                </Select>
              </Grid>
              <Grid item sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.deleteAccount}
                >
                  Delete Account
                </Button>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.submitChanges}
              >
                Submit
              </Button>
              </Grid>
            </div>
            </form>
          </Container>);
      }
    }

  export default withStyles(useStyles)(EditProfile)
