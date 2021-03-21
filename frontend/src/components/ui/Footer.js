import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
        Component Review
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "100%",
    height: "4em",
    marginTop: "1em",
    paddingTop: "1.5em",
    position: "absolute",
    bottom: "0",
  }
}))

export default function Footer() {
  const classes = useStyles()

  return (
      <footer>
        <Typography align="center">
          <Box mt={8} className={classes.footer}>
            <Copyright />
          </Box>
        < /Typography>
      < /footer>
  )
}
