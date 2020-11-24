import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MailIcon from '@material-ui/icons/Mail';
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';
import electronicComponent from "../../static/images/electronicComponent.png";

const useStyles = makeStyles(theme => ({}));

export default function Home() {
  const classes = useStyles();
  return(
    <Grid container direction="column" spacing={6}>
      <Grid item>
        <Grid container justify="flex-grow" alignItems="center" direction="row" spacing={10}>
          <Grid item xs={1} />
          <Grid item sm={6}>
            <Typography variant="h5" align="center">
              Welcome to the Component Review Network
            < /Typography>
            <Typography align="center">
              <Box lineHeight={2}>
                Make sure the first choice is the right choice!
              </Box>
            < /Typography>
            <Typography align="center">
              <Button variant="contained" color="primary" component={Link} to="/sign-up">Sign Up< /Button>
            </Typography>
          < /Grid>
          <Grid item xs={3}>
            <img src={electronicComponent} alt="Component Clip Art" width="100%" height="100%"/>
          < /Grid>
        < /Grid>
      < /Grid>
      <Grid container direction="column" style={{background: "#47c1cc", color: "#FFFFFF"}} alignItems="center">
        <Grid item sm={12}>
          <Typography align="center">About Us:< /Typography>
        </Grid>
        <Grid item sm={6}>
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
      <Grid container justify="center" direction="row" spacing={2}>
        <Grid item sm={3}>
          <Box align="center">
            <MailIcon style={{color:"#47c1cc", width: "40%", height: "40%" }}/>
          </Box>
          <Typography align="center">Contact Students and Professors from campuses across country!< /Typography>
        </Grid>
        <Grid item sm={3}>
          <Box align="center">
            <CreateIcon style={{color:"#47c1cc", width: "40%", height: "40%" }}/>
          </Box>
          <Typography align="center">Read and write reviews or comments about hardware components!< /Typography>
        </Grid>
        <Grid item sm={3}>
          <Box align="center">
            <ListAltIcon style={{color:"#47c1cc", width: "40%", height: "40%" }}/>
          </Box>
          <Typography align="center">Insert and view component datasheets along with quick access to key information about the component< /Typography>
        </Grid>
      < /Grid>
    < /Grid>
  )
}
