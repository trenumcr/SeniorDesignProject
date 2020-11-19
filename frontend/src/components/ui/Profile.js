import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  // Paper class pads the contents
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Profile Picture</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Name, School, etc. in a list format</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Contact Me Button</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><h1>Bio</h1><p1>Information on my projects and field of focus</p1></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><h1>Posts Made</h1>Component 1, Component 2, Component 3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}