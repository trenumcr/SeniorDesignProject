import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "100%",
    height: "4em",
    marginTop: "30px"
  }
}))

export default function Footer() {
  const classes = useStyles()

  return (
      <footer className={classes.footer}>
        <Typography align="center">
          placeholder for footer
        < /Typography>
      < /footer>
  )
}
