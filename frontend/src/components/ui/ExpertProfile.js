import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.grey[200],
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: theme.palette.grey[200],
    marginBottom: theme.spacing(2),
  },
}));

const userInfo =
  {
    name: "Rick Talon",
    school: "University of Cincinnati",
    major: "Electrical Engineering",
  }

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

export default function ExpertProfile() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3} sm={12}>
          <Grid item sm={3}>
            <img src="https://3.bp.blogspot.com/-DVs1Ugx8LDQ/Uhx6Ol5NrRI/AAAAAAAAX9k/JPfLOUDRPgg/s1600/Mountains+Wallpapers.jpg" alt="Profile Picture" width="250" height="250"></img>
          </Grid>
          <Grid item sm={3}>
            <Card>
              <CardHeader
                title = {userInfo.name}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardContent}>
                  <List /*dense={dense}*/>
                    <ListItem>
                      {userInfo.school}
                    </ListItem>
                    <ListItem>
                      {userInfo.major}
                    </ListItem>
                  </List>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h3">Biography</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum neque vitae ipsum maximus, vel posuere arcu porttitor. Curabitur ligula nulla, rutrum vitae sapien at, consequat iaculis risus. Etiam condimentum mi leo, non aliquam urna condimentum sit amet. Vivamus ac ligula placerat, interdum diam eget, ullamcorper neque. Proin non lacus nec turpis mollis luctus ac eget augue. Integer leo nibh, lacinia ut ante eget, ultrices accumsan ex. In libero metus, gravida sed risus nec, convallis scelerisque enim. Fusce eu massa purus. Aenean a varius lectus, sit amet fermentum ex.
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Button variant="contained" color="primary">
              Contact me
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Typography variant="h5" style={{paddingTop: 20}}>
            Expertise
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
                        Rating: {post.rating}
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
        </Grid>
      </div>
    </Container>
  )
}
