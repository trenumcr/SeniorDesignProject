import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MailIcon from '@material-ui/icons/Mail';
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme'
import colorLogo from "../../static/images/logo1PlugGold.png";

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.secondary.dark,
    }
  },
  greenBox: {
    "box-shadow":"0px 0px 20px #888888",
    "z-index": "1",
    background: theme.palette.primary.light,
    color: theme.palette.common.white,
    paddingTop:"20px",
    paddingBottom:"25px"
  },
  lightYellowBackground: {
    background: theme.palette.secondary.light,
    paddingTop:"50px",
    paddingBottom:"50px",
  },
  whiteBox: {
    "box-shadow": "-5px 7px 8px #888888",
    background: theme.palette.common.white,
    "border-radius": "10px",
  },
  marginLeft: {
    marginLeft:"20px",
  },
  marginRight: {
    marginRight:"20px",
  },
  card: {
    width: "30%",
    height: "30%",
    color: theme.palette.primary.main
  }
}));

export default function Home() {
  const classes = useStyles();
  return(
    <ThemeProvider theme={theme}>
    <Grid container direction="column" spacing={6}>
      <Grid item>
        <Grid container justify="flex-grow" alignItems="center" direction="row" spacing={10}>
          <Grid item xs={1} />
          <Grid item sm={6} style={{marginTop: "100px", marginBottom: "100px"}}>
            <Typography variant="h5" align="center">
              Welcome to the Component Review Network
            < /Typography>
            <Typography align="center">
              <Box lineHeight={2}>
                Make sure the first choice is the right choice!
              </Box>
            < /Typography>
            <Typography align="center">
              <Button variant="contained" className={classes.button} component={Link} to="/sign-up">Sign Up< /Button>
            </Typography>
          < /Grid>
          <Grid item xs={3}>
            <img src={colorLogo} alt="Component Clip Art" width="100%" height="100%"/>
          < /Grid>
        < /Grid>
      < /Grid>
      <Grid container direction="column" className={classes.greenBox} alignItems="center">
        <Grid item sm={12}>
          <Typography align="center">About Us:< /Typography>
        </Grid>
        <Grid item sm={8}>
          <Typography>
            Component Review Network is a community for students and professors to be able to share their experiences
            and expertise of hardware components that they have worked with. Current students will be able to look at not just the information
            of a component they're thinking about using for their project but also see how it was used in previous students projects
            and whether it performed as expected. Also, students can find professors from across the country that willing to lend their expertise on
            a specific type of component to contact them and get information from to determine whether or not the component will work with
            their project.
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" direction="row" spacing={2} className={classes.lightYellowBackground}>
        <Grid item sm={3} lg={2} className={`${classes.whiteBox} ${classes.marginRight}`}>
          <Box align="center">
            <MailIcon className={classes.card}/>
          </Box>
          <Typography align="center">Contact Students and Professors from campuses across country!< /Typography>
        </Grid>
        <Grid item sm={3} lg={2} className={classes.whiteBox}>
          <Box align="center">
            <CreateIcon className={classes.card}/>
          </Box>
          <Typography align="center">Read and write reviews or comments about hardware components!< /Typography>
        </Grid>
        <Grid item sm={3} lg={2} className={`${classes.whiteBox} ${classes.marginLeft}`}>
          <Box align="center">
            <ListAltIcon className={classes.card}/>
          </Box>
          <Typography align="center">Insert and view component datasheets along with quick access to key information about the component< /Typography>
        </Grid>
      < /Grid>
    < /Grid>
  </ThemeProvider>
  )
}
