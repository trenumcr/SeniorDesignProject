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
            posts: response.data.posts_made,
            components: response.data.component_knowledge,
            school: response.data.school,
            role: response.data.role,
            field: response.data.field_study,
            about: response.data.about_me,
          });
          console.log(this.state.username);
        })
        .catch(e => {
          this.setState({
            login: false,
          });
          console.log(e);
        });
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
      const isStudent = (this.state.role == "s")

      if (localStorage.getItem('username') == this.state.profile) {
        return (<Container component="main" maxWidth="lg">
        <Button variant="contained" className={classes.button}>
        <Link href="/edit-profile" variant="body2">
          {"Edit Profile"}
        </Link>
        </Button>
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
                    <List /*dense={dense}*/>
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
              <Typography variant="body1">{this.state.about}</Typography>
            </Grid>
            <Grid item sm={12}>
            {isStudent ? (<b></b>) : (
              <Button variant="contained" className={classes.button}>
              Contact me
              </Button>)}
                </Grid>
              </Grid>
              <Typography variant="h5" style={{paddingTop: 20}}>
                Posts Made
              </Typography>
              <Grid container spacing={3} style={{paddingTop: 20}}>
                {posts.map((post) => (
                <Grid item sm={2}>
                  <Card>
                    <CardHeader
                      title={post.componentName}
                      titleTypographyProps={{ align: 'center' }}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardContent}>
                        <Typography variant="subtitle1">
                          <b>Rating: {post.rating}</b>
                        </Typography>
                      </div>
                      <Typography variant="subtitle1" align="center">
                        {post.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>);
      }
      else {
        return (<Container component="main" maxWidth="lg">
        <Typography>View Profile</Typography>
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
                    <List /*dense={dense}*/>
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
              <Typography variant="body1">{this.state.about}
              </Typography>
            </Grid>
            <Grid item sm={12}> {isStudent ? (<b>Major:</b>) : (
              <Button variant="contained" className={classes.button}>
              Contact me
              </Button>)}
                </Grid>
              </Grid>
              <Typography variant="h5" style={{paddingTop: 20}}>
                Posts Made
              </Typography>
              <Grid container spacing={3} style={{paddingTop: 20}}>
                {posts.map((post) => (
                <Grid item sm={2}>
                  <Card>
                    <CardHeader
                      title={post.componentName}
                      titleTypographyProps={{ align: 'center' }}
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div className={classes.cardContent}>
                        <Typography variant="subtitle1">
                          <b>Rating: {post.rating}</b>
                        </Typography>
                      </div>
                      <Typography variant="subtitle1" align="center">
                        {post.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>);
      }
    }
  }

  export default withStyles(useStyles)(Profile)
