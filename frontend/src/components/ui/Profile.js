import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'baseline',
    //marginBottom: theme.spacing(2),
  },
}));

const userInfo = [
  {
    name: "Rick Talon",
    school: "University of Cincinnati",
    major: "Electrical Engineering",
    posts :   
    {
      Post1: "Post 1 Info",
      Post2: "Post 2 Info",
      Post3: "Post 3 Info"
    },
  }
]

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {userInfo.map((user) => (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <img src="https://3.bp.blogspot.com/-DVs1Ugx8LDQ/Uhx6Ol5NrRI/AAAAAAAAX9k/JPfLOUDRPgg/s1600/Mountains+Wallpapers.jpg" alt="Profile Picture" width="250" height="250"></img>
            </Grid>
            <Grid item xs={6}>
              <Card>
                  <CardHeader
                  title = {user.name}
                  className={classes.cardHeader}
                  />
                </Card>
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="subtitle1" align="left">
                          {user.school}
                        </Typography>
                        <Typography variant="subtitle1" align="left">
                          {user.major}
                        </Typography>
                    </div>
                  </CardContent>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Contact me
            </Button>
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.paper}><h1>Biography</h1></div>
            <p>This is The Biography</p>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.paper}>Component 1, Component 2, Component 3, etc.</div>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}